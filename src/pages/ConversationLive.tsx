import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, RotateCcw, Sparkles } from "lucide-react";

import { BackButton } from "@/components/BackButton";
import { ChatBubble } from "@/components/ChatBubble";
import { MicButton } from "@/components/voice/MicButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/contexts/UserProgressContext";
import { languageLabels } from "@/data/lessonsByLanguage";
import { useRealtimeConversationVoice } from "@/hooks/useRealtimeConversationVoice";
import { useVoiceSettings } from "@/hooks/useVoiceSettings";
import { useVoiceSynthesis } from "@/hooks/useVoiceSynthesis";
import { getVoiceLanguage } from "@/lib/voice/language";
import { translateTranscript } from "@/lib/voice/transcriptTranslator";
import type { VoiceLanguage } from "@/lib/voice/types";
import { applyPersonaInstructions } from "@/lib/voice/voiceCatalog";
import { cn } from "@/lib/utils";

interface LiveMessage {
  id: string;
  text: string;
  transcript?: string;
  spokenText: string;
  isUser: boolean;
  voiceLanguage: VoiceLanguage;
  timestamp: string;
  audioUrl?: string;
}

function ts() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatTranslatedTranscript(
  translation: string,
  natural: boolean,
  feedback: string | null,
) {
  if (!natural && feedback) {
    return `${translation} - ${feedback}`;
  }

  if (!natural) {
    return `${translation} - This does not sound like a correct or natural phrase yet.`;
  }

  return translation;
}

export default function ConversationLive() {
  const { learningLanguage, level } = useProgress();
  const { settings } = useVoiceSettings();
  const langInfo = languageLabels[learningLanguage];
  const voiceLanguage = getVoiceLanguage(learningLanguage);

  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [topic, setTopic] = useState("");
  const [activeVoiceMessageId, setActiveVoiceMessageId] = useState<string | null>(null);

  const nextMessageId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioUrlsRef = useRef<string[]>([]);

  const playbackVoice = useVoiceSynthesis({
    language: voiceLanguage,
    mode: "chat",
    settings,
    realtimeConfig: {
      learningLanguage,
      level,
      tutorInstructions: applyPersonaInstructions(
        [
          "Read the provided message naturally.",
          "Ignore decorative formatting, emojis, flags, and symbols.",
          "Only pronounce the readable content exactly as written.",
          "Preserve the text's original language and never translate it.",
        ].join(" "),
        settings.voicePersona,
      ),
    },
  });

  const addMessage = useCallback(
    (
      text: string,
      isUser: boolean,
      sourceLanguage: VoiceLanguage,
      audioUrl?: string,
    ) => {
      const id = `live-message-${nextMessageId.current++}`;
      if (audioUrl) {
        audioUrlsRef.current.push(audioUrl);
      }
      setMessages((items) => [
        ...items,
        {
          id,
          text,
          isUser,
          spokenText: text,
          voiceLanguage: sourceLanguage,
          timestamp: ts(),
          audioUrl,
        },
      ]);
      return id;
    },
    [],
  );

  const updateMessageTranscript = useCallback((messageId: string, transcript: string) => {
    setMessages((items) =>
      items.map((item) => (item.id === messageId ? { ...item, transcript } : item)),
    );
  }, []);

  const queueTranslatedTranscript = useCallback(
    async (messageId: string, text: string, sourceLanguage: VoiceLanguage) => {
      try {
        const translated = await translateTranscript({ text, sourceLanguage });
        updateMessageTranscript(
          messageId,
          formatTranslatedTranscript(
            translated.translation,
            translated.natural,
            translated.feedback,
          ),
        );
      } catch {
        updateMessageTranscript(messageId, text);
      }
    },
    [updateMessageTranscript],
  );

  const speakMessage = async (messageId: string, text: string, language: VoiceLanguage) => {
    setActiveVoiceMessageId(messageId);
    try {
      await playbackVoice.speak(text, { language });
    } finally {
      setActiveVoiceMessageId((currentMessageId) =>
        currentMessageId === messageId ? null : currentMessageId,
      );
    }
  };

  const realtimeVoice = useRealtimeConversationVoice({
    enabled: settings.provider === "openai-realtime",
    config: {
      provider: settings.provider,
      language: voiceLanguage,
      learningLanguage,
      level,
      mode: "chat",
      tutorInstructions: applyPersonaInstructions(
        [
          `You are Interglott's live voice tutor for ${langInfo.name}.`,
          `Speak mainly in ${langInfo.name}.`,
          "Keep the conversation natural, short, and encouraging.",
          topic.trim() ? `Center the conversation on this topic when helpful: ${topic.trim()}.` : "Let the learner choose any topic.",
          "Correct mistakes gently when useful.",
        ].join(" "),
        settings.voicePersona,
      ),
      voiceGender: settings.voiceGender,
      voiceName: settings.voiceName,
      voicePersona: settings.voicePersona,
    },
    onUserTranscript: ({ transcript, audioUrl }) => {
      const messageId = addMessage(transcript, true, voiceLanguage, audioUrl);
      void queueTranslatedTranscript(messageId, transcript, voiceLanguage);
    },
    onAssistantTranscript: (transcript) => {
      const messageId = addMessage(transcript, false, voiceLanguage);
      void queueTranslatedTranscript(messageId, transcript, voiceLanguage);
    },
  });

  useEffect(() => {
    setMessages([
      {
        id: "live-intro",
        text: `Start a hands-free conversation in ${langInfo.name}. Set a topic if you want, then use the microphone when you're ready.`,
        transcript: "Start a hands-free conversation in English translation mode.",
        spokenText: `Start a hands-free conversation in ${langInfo.name}. Set a topic if you want, then use the microphone when you're ready.`,
        isUser: false,
        voiceLanguage: "en-US",
        timestamp: ts(),
      },
    ]);
  }, [langInfo.name]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      audioUrlsRef.current.forEach((audioUrl) => URL.revokeObjectURL(audioUrl));
      audioUrlsRef.current = [];
    };
  }, []);

  const resetSession = () => {
    realtimeVoice.stop();
    audioUrlsRef.current.forEach((audioUrl) => URL.revokeObjectURL(audioUrl));
    audioUrlsRef.current = [];
    nextMessageId.current = 0;
    setMessages([
      {
        id: "live-intro-reset",
        text: `Start a hands-free conversation in ${langInfo.name}. Set a topic if you want, then use the microphone when you're ready.`,
        transcript: "Start a hands-free conversation in English translation mode.",
        spokenText: `Start a hands-free conversation in ${langInfo.name}. Set a topic if you want, then use the microphone when you're ready.`,
        isUser: false,
        voiceLanguage: "en-US",
        timestamp: ts(),
      },
    ]);
  };

  return (
    <div className="pt-6 flex flex-col" style={{ height: "calc(100dvh - 5rem)" }}>
      <div className="mb-3">
        <BackButton to="/conversation" label="Practice chat" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full gradient-purple flex items-center justify-center">
          <Bot className="h-5 w-5 text-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="font-display font-bold text-foreground">Live Voice Chat</h1>
          <p className="text-xs text-muted-foreground">
            {langInfo.flag} {langInfo.name} - hands-free conversation
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={resetSession}
          className="text-muted-foreground"
          title="Reset live session"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="glass-card rounded-2xl p-3 mb-3 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Topic
        </p>
        <Input
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder="Optional topic, for example travel, work, food, or movies"
          className="bg-secondary/50 border-border text-foreground"
        />
        <p className="text-xs text-muted-foreground">
          Change the topic before you start, or leave it open for a free conversation.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
            transcript={msg.transcript}
            audioUrl={msg.audioUrl}
            isSpeaking={playbackVoice.isSpeaking && activeVoiceMessageId === msg.id}
            onSpeak={() => void speakMessage(msg.id, msg.spokenText, msg.voiceLanguage)}
          />
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="flex flex-col gap-3 pt-3">
        <div className="flex items-center gap-3">
          <MicButton
            isListening={realtimeVoice.isActive || realtimeVoice.isConnecting}
            onStart={() => void realtimeVoice.start()}
            onStop={realtimeVoice.stop}
            className="h-12 w-12"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">Hands-free conversation</p>
            <p className="text-xs text-muted-foreground">
              {realtimeVoice.isConnecting
                ? "Connecting live voice..."
                : realtimeVoice.isActive
                  ? "Live voice chat is active."
                  : "Tap the microphone to start speaking naturally."}
            </p>
          </div>
        </div>

        {realtimeVoice.error && (
          <p className="text-xs text-destructive text-center">{realtimeVoice.error}</p>
        )}

        <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
          <Sparkles className="h-3 w-3" />
          English translation stays visible under each spoken message
        </p>
      </div>
    </div>
  );
}
