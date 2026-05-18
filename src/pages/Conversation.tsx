import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Bot, SkipForward, Lightbulb, RotateCcw, Sparkles } from "lucide-react";

import { ChatBubble } from "@/components/ChatBubble";
import { BackButton } from "@/components/BackButton";
import { OutOfCreditsModal } from "@/components/OutOfCreditsModal";
import { MicButton } from "@/components/voice/MicButton";
import { VoiceTranscript } from "@/components/voice/VoiceTranscript";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCredits } from "@/contexts/CreditsContext";
import { useGameAudio } from "@/hooks/useGameAudio";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useVoiceSettings } from "@/hooks/useVoiceSettings";
import { useVoiceSynthesis } from "@/hooks/useVoiceSynthesis";
import { useProgress } from "@/contexts/UserProgressContext";
import { languageLabels } from "@/data/lessonsByLanguage";
import {
  buildFeedback,
  buildPromptMessage,
  evaluateAnswer,
  generatePrompts,
  type ConversationPrompt,
} from "@/lib/conversationEngine";
import {
  getConversationAnswerSpeechLanguage,
  getConversationFeedbackSpeech,
  getConversationPromptSpeech,
} from "@/lib/voice/conversationSpeech";
import { getVoiceLanguage } from "@/lib/voice/language";
import { translateTranscript } from "@/lib/voice/transcriptTranslator";
import type { VoiceLanguage } from "@/lib/voice/types";
import { applyPersonaInstructions } from "@/lib/voice/voiceCatalog";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  transcript?: string;
  spokenText: string;
  voiceLanguage?: VoiceLanguage;
  audioUrl?: string;
}

const greetingsByLang: Record<string, string[]> = {
  french: [
    "Welcome to French practice. Let's work through a few fresh challenges together.",
    "Ready for French practice? I'll mix translation, completion, and correction exercises.",
  ],
  spanish: [
    "Welcome to Spanish practice. Let's work through a few fresh challenges together.",
    "Ready for Spanish practice? I'll mix translation, completion, and correction exercises.",
  ],
  chinese: [
    "Welcome to Chinese practice. Let's work through a few fresh challenges together.",
    "Ready for Chinese practice? I'll mix translation, completion, and correction exercises.",
  ],
  german: [
    "Welcome to German practice. Let's work through a few fresh challenges together.",
    "Ready for German practice? I'll mix translation, completion, and correction exercises.",
  ],
  arabic: [
    "Welcome to Arabic practice. Let's work through a few fresh challenges together.",
    "Ready for Arabic practice? I'll mix translation, completion, and correction exercises.",
  ],
};

function ts() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function toVoiceTranscript(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/^>\s?/gm, "")
    .replace(/[^\S\r\n]+/g, " ")
    .trim();
}

function getExpectedEnglish(prompt: ConversationPrompt | null) {
  if (!prompt) return undefined;

  switch (prompt.type) {
    case "translate":
    case "vocab-recall":
      return prompt.sentence;
    case "translate-reverse":
      return prompt.correctAnswer;
    default:
      return undefined;
  }
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

const Conversation = () => {
  const { level, learningLanguage, incrementConversations, addXP } = useProgress();
  const { canAfford, spendCredits } = useCredits();
  const audio = useGameAudio();
  const { settings } = useVoiceSettings();
  const navigate = useNavigate();
  const langInfo = languageLabels[learningLanguage];
  const voiceLanguage = getVoiceLanguage(learningLanguage);

  const voice = useVoiceSynthesis({
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

  const recognition = useVoiceRecognition({ language: voiceLanguage });
  const [input, setInput] = useState("");
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<ConversationPrompt | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [recentCorrect, setRecentCorrect] = useState<boolean[]>([]);
  const [activeVoiceMessageId, setActiveVoiceMessageId] = useState<string | null>(null);
  const [liveTranslation, setLiveTranslation] = useState("");

  const usedIds = useRef(new Set<string>());
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasCountedConvo = useRef(false);
  const timeoutRefs = useRef<number[]>([]);
  const nextMessageId = useRef(0);
  const lastProcessedCaptureId = useRef<string | null>(null);

  const scheduleTimeout = useCallback((callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      timeoutRefs.current = timeoutRefs.current.filter((id) => id !== timeoutId);
      callback();
    }, delay);
    timeoutRefs.current.push(timeoutId);
  }, []);

  const updateMessageTranscript = useCallback((messageId: string, transcript: string) => {
    setMessages((items) =>
      items.map((item) =>
        item.id === messageId
          ? {
              ...item,
              transcript,
            }
          : item,
      ),
    );
  }, []);

  const addMessage = useCallback(
    (
      text: string,
      isUser: boolean,
      transcript?: string,
      messageVoiceLanguage = voiceLanguage,
      spokenText = toVoiceTranscript(text),
      audioUrl?: string,
    ) => {
      const id = `message-${nextMessageId.current++}`;
      setMessages((items) => [
        ...items,
        {
          id,
          text,
          isUser,
          timestamp: ts(),
          transcript,
          spokenText,
          voiceLanguage: messageVoiceLanguage,
          audioUrl,
        },
      ]);
      return id;
    },
    [voiceLanguage],
  );

  const queueTranslatedTranscript = useCallback(
    async (
      messageId: string,
      text: string,
      sourceLanguage: VoiceLanguage,
      expectedEnglish?: string,
    ) => {
      try {
        const translated = await translateTranscript({
          text,
          sourceLanguage,
          expectedEnglish,
        });

        updateMessageTranscript(
          messageId,
          formatTranslatedTranscript(
            translated.translation,
            translated.natural,
            translated.feedback,
          ),
        );
      } catch {
        updateMessageTranscript(messageId, expectedEnglish ?? text);
      }
    },
    [updateMessageTranscript],
  );

  const speakMessage = async (
    messageId: string,
    text: string,
    language = voiceLanguage,
  ) => {
    setActiveVoiceMessageId(messageId);
    try {
      await voice.speak(text, { language });
    } finally {
      setActiveVoiceMessageId((currentMessageId) =>
        currentMessageId === messageId ? null : currentMessageId,
      );
    }
  };

  const getCorrectRate = useCallback(() => {
    if (recentCorrect.length === 0) return 0.5;
    const correct = recentCorrect.filter(Boolean).length;
    return correct / recentCorrect.length;
  }, [recentCorrect]);

  const nextPrompt = useCallback(() => {
    if (!canAfford("conversation")) {
      setShowCreditsModal(true);
      return;
    }

    spendCredits("conversation");
    const correctRate = getCorrectRate();
    const [prompt] = generatePrompts(level, usedIds.current, 1, learningLanguage, correctRate);

    if (!prompt) {
      addMessage(
        "Amazing! You've completed all available exercises for your level. Try increasing your level in Settings!",
        false,
        "Amazing! You've completed all available exercises for your level. Try increasing your level in Settings!",
        "en-US",
        "Amazing! You've completed all available exercises for your level. Try increasing your level in Settings!",
      );
      return;
    }

    usedIds.current.add(prompt.id);
    setCurrentPrompt(prompt);
    setAnswered(false);
    setShowHint(false);

    const promptSpeech = getConversationPromptSpeech(prompt, voiceLanguage);
    addMessage(
      buildPromptMessage(prompt),
      false,
      promptSpeech.transcript,
      promptSpeech.language,
      promptSpeech.transcript,
    );
  }, [addMessage, canAfford, getCorrectRate, learningLanguage, level, spendCredits, voiceLanguage]);

  useEffect(() => {
    const greetings = greetingsByLang[learningLanguage];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    addMessage(greeting, false, toVoiceTranscript(greeting), "en-US", toVoiceTranscript(greeting));
    scheduleTimeout(() => nextPrompt(), 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutRefs.current = [];
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!recognition.transcript) {
      setLiveTranslation("");
      return;
    }

    let cancelled = false;
    void translateTranscript({
      text: recognition.transcript,
      sourceLanguage: currentPrompt
        ? getConversationAnswerSpeechLanguage(currentPrompt, voiceLanguage)
        : voiceLanguage,
      expectedEnglish: getExpectedEnglish(currentPrompt),
    })
      .then((translated) => {
        if (cancelled) return;
        setLiveTranslation(
          formatTranslatedTranscript(
            translated.translation,
            translated.natural,
            translated.feedback,
          ),
        );
      })
      .catch(() => {
        if (cancelled) return;
        setLiveTranslation("");
      });

    return () => {
      cancelled = true;
    };
  }, [currentPrompt, recognition.transcript, voiceLanguage]);

  const submitAnswer = useCallback((
    userAnswer: string,
    options?: {
      audioUrl?: string;
    },
  ) => {
    if (!userAnswer.trim() || answered || !currentPrompt) return;

    const trimmedAnswer = userAnswer.trim();
    const answerLanguage = getConversationAnswerSpeechLanguage(currentPrompt, voiceLanguage);
    const englishExpectation = getExpectedEnglish(currentPrompt);
    const messageId = addMessage(
      trimmedAnswer,
      true,
      undefined,
      answerLanguage,
      trimmedAnswer,
      options?.audioUrl,
    );
    void queueTranslatedTranscript(messageId, trimmedAnswer, answerLanguage, englishExpectation);
    setLiveTranslation("");

    if (!hasCountedConvo.current) {
      incrementConversations();
      hasCountedConvo.current = true;
    }

    const result = evaluateAnswer(trimmedAnswer, currentPrompt);
    setTotal((value) => value + 1);
    setRecentCorrect((previous) => [...previous, result.isCorrect].slice(-10));

    if (result.isCorrect) {
      setScore((value) => value + 1);
      addXP(15);
      audio.onCorrectAnswer();
      scheduleTimeout(() => audio.onXPReward(), 300);
    } else if (result.isClose) {
      setScore((value) => value + 0.5);
      addXP(5);
      audio.onIncorrectAnswer();
      scheduleTimeout(() => audio.onXPReward(), 300);
    } else {
      audio.onIncorrectAnswer();
    }

    const feedback = buildFeedback(result, currentPrompt);
    const feedbackSpeech = getConversationFeedbackSpeech(currentPrompt, voiceLanguage);
    setAnswered(true);
    scheduleTimeout(
      () =>
        addMessage(
          feedback,
          false,
          feedbackSpeech.transcript,
          feedbackSpeech.language,
          feedbackSpeech.transcript,
        ),
      400,
    );
  }, [
    addMessage,
    addXP,
    answered,
    audio,
    currentPrompt,
    incrementConversations,
    queueTranslatedTranscript,
    scheduleTimeout,
    voiceLanguage,
  ]);

  useEffect(() => {
    const capture = recognition.completedCapture;
    if (!capture || !currentPrompt) return;
    if (lastProcessedCaptureId.current === capture.id) return;

    lastProcessedCaptureId.current = capture.id;
    submitAnswer(capture.transcript, { audioUrl: capture.audioUrl });
    recognition.clearCapture();
  }, [currentPrompt, recognition, submitAnswer]);

  const send = () => {
    if (!input.trim()) return;
    submitAnswer(input.trim());
    setInput("");
  };

  const giveHint = () => {
    if (showHint || answered || !currentPrompt) return;
    setShowHint(true);
    const hint = currentPrompt.hint || `Category: ${currentPrompt.category}`;
    addMessage(`Hint: **${hint}**`, false, hint, "en-US", hint);
  };

  const resetSession = () => {
    usedIds.current.clear();
    setMessages([]);
    setScore(0);
    setTotal(0);
    setRecentCorrect([]);
    setAnswered(false);
    setShowHint(false);
    setCurrentPrompt(null);
    setActiveVoiceMessageId(null);
    setLiveTranslation("");
    setInput("");
    hasCountedConvo.current = false;
    lastProcessedCaptureId.current = null;
    recognition.clearCapture();

    const greetings = greetingsByLang[learningLanguage];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    addMessage(greeting, false, toVoiceTranscript(greeting), "en-US", toVoiceTranscript(greeting));
    scheduleTimeout(() => nextPrompt(), 300);
  };

  const correctRate = getCorrectRate();
  const performanceColor =
    correctRate >= 0.8 ? "text-green-400" : correctRate >= 0.5 ? "text-yellow-400" : "text-red-400";

  return (
    <div className="pt-6 flex flex-col" style={{ height: "calc(100dvh - 5rem)" }}>
      <div className="mb-3">
        <BackButton to="/dashboard" label="Dashboard" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full gradient-purple flex items-center justify-center">
          <Bot className="h-5 w-5 text-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="font-display font-bold text-foreground flex items-center gap-2">
            AI Tutor
            {total >= 3 && (
              <span className={cn("text-xs font-normal", performanceColor)}>
                {correctRate >= 0.8 && "On fire"}
                {correctRate >= 0.5 && correctRate < 0.8 && "Good pace"}
                {correctRate < 0.5 && "Keep going"}
              </span>
            )}
          </h1>
          <p className="text-xs text-muted-foreground">
            {langInfo.flag} {langInfo.name} - {level} level
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={resetSession}
          className="text-muted-foreground"
          title="New session"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="glass-card rounded-xl px-3 py-1.5 text-xs font-display">
          <span className="text-accent font-bold">{score}</span>
          <span className="text-muted-foreground">/{total}</span>
        </div>
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
            isSpeaking={voice.isSpeaking && activeVoiceMessageId === msg.id}
            onSpeak={() =>
              void speakMessage(
                msg.id,
                msg.spokenText,
                msg.voiceLanguage ?? voiceLanguage,
              )
            }
          />
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="flex flex-col gap-2 pt-3">
        {answered && (
          <Button
            onClick={nextPrompt}
            className="w-full gradient-purple border-0 text-foreground rounded-xl font-display font-semibold"
          >
            <SkipForward className="h-4 w-4 mr-2" /> Next Challenge
          </Button>
        )}

        <div className="flex gap-2">
          <MicButton
            isListening={recognition.isListening}
            onStart={recognition.start}
            onStop={recognition.stop}
            disabled={answered}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/conversation/live")}
            aria-label="Open live voice chat"
            className="shrink-0 rounded-full border-border px-3 text-xs text-foreground"
          >
            Live chat
          </Button>
          <Button
            onClick={giveHint}
            disabled={showHint || answered}
            variant="outline"
            size="icon"
            className="shrink-0 border-border text-muted-foreground"
            title="Get a hint"
          >
            <Lightbulb className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && send()}
            placeholder={
              currentPrompt?.type === "translate-reverse"
                ? "Type your answer in English..."
                : `Type your answer in ${langInfo.name}...`
            }
            disabled={answered}
            className="bg-secondary/50 border-border text-foreground"
          />
          <Button
            onClick={send}
            disabled={answered || !input.trim()}
            className="gradient-purple border-0 text-foreground shrink-0"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <VoiceTranscript transcript={liveTranslation} label="English translation" />

        {(recognition.error || voice.error) && (
          <p className="text-xs text-destructive text-center">
            {recognition.error || voice.error}
          </p>
        )}

        {!answered && currentPrompt && total >= 1 && (
          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" />
            Difficulty adapts to your performance
          </p>
        )}
      </div>

      <OutOfCreditsModal open={showCreditsModal} onClose={() => setShowCreditsModal(false)} />
    </div>
  );
};

export default Conversation;
