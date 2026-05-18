import { useState, useRef, useEffect, useCallback } from "react";
import { ChatBubble } from "@/components/ChatBubble";
import { useProgress } from "@/contexts/UserProgressContext";
import { useCredits } from "@/contexts/CreditsContext";
import { useGameAudio } from "@/hooks/useGameAudio";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useRealtimeConversationVoice } from "@/hooks/useRealtimeConversationVoice";
import { useVoiceSettings } from "@/hooks/useVoiceSettings";
import { useVoiceSynthesis } from "@/hooks/useVoiceSynthesis";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, SkipForward, Lightbulb, RotateCcw, Sparkles } from "lucide-react";
import { OutOfCreditsModal } from "@/components/OutOfCreditsModal";
import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { languageLabels } from "@/data/lessonsByLanguage";
import { getVoiceLanguage } from "@/lib/voice/language";
import { MicButton } from "@/components/voice/MicButton";
import { VoiceTranscript } from "@/components/voice/VoiceTranscript";
import {
  generatePrompts,
  evaluateAnswer,
  buildFeedback,
  buildPromptMessage,
  type ConversationPrompt,
} from "@/lib/conversationEngine";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
  transcript?: string;
}

const greetingsByLang: Record<string, string[]> = {
  french: [
    "🇫🇷 Bienvenue! Ready to practice French? Each session brings new challenges!",
    "🇫🇷 Salut! Let's practice French with varied exercises from your lessons.",
    "🇫🇷 Bonjour! I'll mix different exercise types — translation, completion, corrections, and more!",
    "🇫🇷 Welcome! Let's dive into French practice. I'll adapt to how you're doing.",
  ],
  spanish: [
    "🇪🇸 ¡Bienvenido! Ready for Spanish practice? Let's explore different topics!",
    "🇪🇸 ¡Hola! Time to practice Spanish with exercises from your curriculum.",
    "🇪🇸 ¡Buenos días! I'll guide you through varied Spanish exercises. ¡Vamos!",
    "🇪🇸 Welcome! Let's practice Spanish — each session is unique!",
  ],
  chinese: [
    "🇨🇳 欢迎！Ready to practice Chinese? Let's try different exercise types!",
    "🇨🇳 你好！I'll pull from your Chinese lessons for varied practice.",
    "🇨🇳 Welcome! Let's explore Chinese through translation, vocab, and more. 加油！",
    "🇨🇳 你好！Each session brings fresh Chinese challenges. 我们开始吧！",
  ],
  german: [
    "🇩🇪 Willkommen! Ready for German practice? I'll adapt as we go!",
    "🇩🇪 Hallo! Let's practice German with exercises from your lessons. Los geht's!",
    "🇩🇪 Guten Tag! I'll mix translations, corrections, and vocab. Viel Erfolg!",
    "🇩🇪 Welcome! Time for varied German practice. Let's begin!",
  ],
  arabic: [
    "🇸🇦 !أهلاً وسهلاً Ready for Arabic practice? I'll keep things interesting!",
    "🇸🇦 !مرحبا Let's practice Arabic with diverse exercises from your curriculum.",
    "🇸🇦 Welcome! I'll adapt Arabic exercises to your level. !هيا بنا",
    "🇸🇦 !السلام عليكم Time for Arabic practice with variety. !يلا",
  ],
};

function ts() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function toVoiceTranscript(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/^>\s?/gm, "")
    .replace(/[ðŸ][^\s]*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const Conversation = () => {
  const { level, learningLanguage, incrementConversations, addXP } = useProgress();
  const { canAfford, spendCredits } = useCredits();
  const audio = useGameAudio();
  const { settings } = useVoiceSettings();
  const langInfo = languageLabels[learningLanguage];
  const voiceLanguage = getVoiceLanguage(learningLanguage);
  const usesRealtimeVoice = settings.provider === "openai-realtime";
  const voice = useVoiceSynthesis({
    language: voiceLanguage,
    mode: "chat",
    settings,
    realtimeConfig: {
      learningLanguage,
      level,
      tutorInstructions: `
      Speak naturally in ${langInfo.name}.
      Ignore non-spoken elements such as emojis, symbols, flags, formatting marks, and decorative characters.
      Only pronounce the actual readable language content exactly as written.
      `,
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
  const usedIds = useRef(new Set<string>());
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasCountedConvo = useRef(false);
  const timeoutRefs = useRef<number[]>([]);

  const scheduleTimeout = useCallback((callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      timeoutRefs.current = timeoutRefs.current.filter((id) => id !== timeoutId);
      callback();
    }, delay);
    timeoutRefs.current.push(timeoutId);
  }, []);

  const addMessage = useCallback((text: string, isUser: boolean, transcript = toVoiceTranscript(text)) => {
    setMessages((m) => [...m, { text, isUser, timestamp: ts(), transcript }]);
  }, []);

  const speakMessage = async (messageId: string, text: string) => {
    setActiveVoiceMessageId(messageId);
    try {
      console.log("Speaking message:", text);
      await voice.speak(text);
    } finally {
      setActiveVoiceMessageId((currentMessageId) =>
        currentMessageId === messageId ? null : currentMessageId
      );
    }
  };

  const getCorrectRate = useCallback(() => {
    if (recentCorrect.length === 0) return 0.5;
    const correct = recentCorrect.filter((c) => c).length;
    return correct / recentCorrect.length;
  }, [recentCorrect]);

  const realtimeVoice = useRealtimeConversationVoice({
    enabled: usesRealtimeVoice,
    config: {
      provider: settings.provider,
      language: voiceLanguage,
      learningLanguage,
      level,
      mode: "chat",
      tutorInstructions: `You are Interglott's voice tutor for ${langInfo.name}. Speak mainly in ${langInfo.name}, keep responses short, natural, and encouraging for a ${level} learner, and gently correct mistakes when useful.`,
      voiceGender: settings.voiceGender,
    },
    onUserTranscript: (transcript) => {
      if (!hasCountedConvo.current) {
        incrementConversations();
        hasCountedConvo.current = true;
      }
      addMessage(transcript, true, transcript);
    },
    onAssistantTranscript: (transcript) => {
      addMessage(transcript, false, transcript);
    },
  });

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
        "🎓 Amazing! You've completed all available exercises for your level. Try increasing your level in Settings!",
        false
      );
      return;
    }
    usedIds.current.add(prompt.id);
    setCurrentPrompt(prompt);
    setAnswered(false);
    setShowHint(false);
    addMessage(buildPromptMessage(prompt), false);
  }, [level, learningLanguage, addMessage, getCorrectRate, canAfford, spendCredits]);

  // Initialize
  useEffect(() => {
    const greetings = greetingsByLang[learningLanguage];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    addMessage(greeting, false);
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
    if (!usesRealtimeVoice && recognition.transcript) {
      setInput(recognition.transcript);
    }
  }, [recognition.transcript, usesRealtimeVoice]);

  const send = () => {
    if (!input.trim() || answered || !currentPrompt) return;
    const userAnswer = input.trim();
    addMessage(userAnswer, true);
    setInput("");

    if (!hasCountedConvo.current) {
      incrementConversations();
      hasCountedConvo.current = true;
    }

    const result = evaluateAnswer(userAnswer, currentPrompt);
    setTotal((t) => t + 1);

    // Track recent performance (last 10 answers)
    setRecentCorrect((prev) => {
      const updated = [...prev, result.isCorrect];
      return updated.slice(-10);
    });

    if (result.isCorrect) {
      setScore((s) => s + 1);
      addXP(15);
      audio.onCorrectAnswer();
      scheduleTimeout(() => audio.onXPReward(), 300);
    } else if (result.isClose) {
      setScore((s) => s + 0.5);
      addXP(5);
      audio.onIncorrectAnswer();
      scheduleTimeout(() => audio.onXPReward(), 300);
    } else {
      audio.onIncorrectAnswer();
    }

    const feedback = buildFeedback(result, currentPrompt);
    setAnswered(true);

    scheduleTimeout(() => addMessage(feedback, false), 400);
  };

  const handleNext = () => nextPrompt();

  const giveHint = () => {
    if (showHint || answered || !currentPrompt) return;
    setShowHint(true);
    const hint = currentPrompt.hint || `Category: ${currentPrompt.category}`;
    addMessage(`💡 **Hint:** ${hint}`, false);
  };

  const resetSession = () => {
    realtimeVoice.stop();
    usedIds.current.clear();
    setMessages([]);
    setScore(0);
    setTotal(0);
    setRecentCorrect([]);
    setAnswered(false);
    setShowHint(false);
    setCurrentPrompt(null);
    setActiveVoiceMessageId(null);
    hasCountedConvo.current = false;
    const greetings = greetingsByLang[learningLanguage];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    addMessage(greeting, false);
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full gradient-purple flex items-center justify-center">
          <Bot className="h-5 w-5 text-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="font-display font-bold text-foreground flex items-center gap-2">
            AI Tutor
            {total >= 3 && (
              <span className={cn("text-xs font-normal", performanceColor)}>
                {correctRate >= 0.8 && "🔥 On fire!"}
                {correctRate >= 0.5 && correctRate < 0.8 && "👍 Good pace"}
                {correctRate < 0.5 && "💪 Keep going"}
              </span>
            )}
          </h1>
          <p className="text-xs text-muted-foreground">
            {langInfo.flag} {langInfo.name} · {level} level
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {messages.map((msg, i) => (
          <ChatBubble
            key={i}
            message={msg.text}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
            transcript={msg.transcript}
            isSpeaking={voice.isSpeaking && activeVoiceMessageId === `message-${i}`}
            onSpeak={() => void speakMessage(`message-${i}`, msg.transcript || toVoiceTranscript(msg.text))}
          />
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-2 pt-3">
        {answered && (
          <Button
            onClick={handleNext}
            className="w-full gradient-purple border-0 text-foreground rounded-xl font-display font-semibold"
          >
            <SkipForward className="h-4 w-4 mr-2" /> Next Challenge
          </Button>
        )}
        <div className="flex gap-2">
          <MicButton
            isListening={
              usesRealtimeVoice
                ? realtimeVoice.isActive || realtimeVoice.isConnecting
                : recognition.isListening
            }
            onStart={usesRealtimeVoice ? () => void realtimeVoice.start() : recognition.start}
            onStop={usesRealtimeVoice ? realtimeVoice.stop : recognition.stop}
            disabled={answered}
          />
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={
              currentPrompt?.type === "translate-reverse"
                ? "Type your answer in English…"
                : `Type your answer in ${langInfo.name}…`
            }
            disabled={answered}
            className="bg-secondary/50 border-border text-foreground"
          />
          <Button
            onClick={send}
            disabled={answered || !input.trim()}
            className={cn("gradient-purple border-0 text-foreground shrink-0")}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {!usesRealtimeVoice && (
          <VoiceTranscript transcript={recognition.transcript} label="Voice transcript" />
        )}
        {usesRealtimeVoice && (
          <p className="text-xs text-muted-foreground text-center">
            {realtimeVoice.isConnecting
              ? "Connecting live voice..."
              : realtimeVoice.isActive
                ? "Live voice chat is active."
                : "Start live voice chat with OpenAI Realtime."}
          </p>
        )}
        {(recognition.error || voice.error || realtimeVoice.error) && (
          <p className="text-xs text-destructive text-center">
            {recognition.error || voice.error || realtimeVoice.error}
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
