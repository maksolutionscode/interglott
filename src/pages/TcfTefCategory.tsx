import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Headphones, PenLine, Mic, Lock, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { useProgress } from "@/contexts/UserProgressContext";
import { cn } from "@/lib/utils";

type SkillKey = "reading" | "listening" | "writing" | "speaking";

const CATEGORIES: Record<SkillKey, {
  icon: typeof BookOpen;
  emoji: string;
  title: string;
  english: string;
  description: string;
}> = {
  reading: {
    icon: BookOpen,
    emoji: "📖",
    title: "La Compréhension écrite",
    english: "Reading Comprehension",
    description: "Practice reading and short passage analysis",
  },
  listening: {
    icon: Headphones,
    emoji: "🎧",
    title: "La Compréhension orale",
    english: "Listening Comprehension",
    description: "Practice listening and audio comprehension",
  },
  writing: {
    icon: PenLine,
    emoji: "✍️",
    title: "L'Expression écrite",
    english: "Written Expression",
    description: "Practice written prompts and structured responses",
  },
  speaking: {
    icon: Mic,
    emoji: "🎤",
    title: "L'Expression Orale",
    english: "Spoken Expression",
    description: "Practice speaking and conversational simulations",
  },
};

const FREE_TESTS = 5;
const PREMIUM_TESTS = 3;

const DIFFICULTIES = ["Beginner", "Beginner", "Intermediate", "Intermediate", "Advanced"] as const;
const DURATIONS = [20, 25, 30, 35, 45];
const XP_BY_INDEX = [60, 80, 100, 120, 150];

const STORAGE_KEY = "interglott-tcf-progress";

function readCompleted(): Record<SkillKey, number[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return {
        reading: p.reading ?? [],
        listening: p.listening ?? [],
        writing: p.writing ?? [],
        speaking: p.speaking ?? [],
      };
    }
  } catch {}
  return { reading: [], listening: [], writing: [], speaking: [] };
}

function writeCompleted(data: Record<SkillKey, number[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const TcfTefCategory = () => {
  const { skill } = useParams<{ skill: string }>();
  const navigate = useNavigate();
  const { addXP } = useProgress();

  const skillKey = (skill && skill in CATEGORIES ? skill : "reading") as SkillKey;
  const meta = CATEGORIES[skillKey];
  const Icon = meta.icon;

  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(readCompleted()[skillKey]);
  }, [skillKey]);

  const handleStartTest = (testNum: number) => {
    if (skillKey === "reading" && (testNum === 1 || testNum === 2 || testNum === 3 || testNum === 4)) {
      navigate(`/tcf-tef/reading/test/${testNum}`);
      return;
    }
    if (!completed.includes(testNum)) {
      const all = readCompleted();
      all[skillKey] = [...all[skillKey], testNum];
      writeCompleted(all);
      setCompleted(all[skillKey]);
      addXP(XP_BY_INDEX[testNum - 1] ?? 100);
    }
  };

  return (
    <div className="pt-6 pb-10 space-y-6">
      <button
        onClick={() => navigate("/tcf-tef")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to TEF/TCF Practice
      </button>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
          {meta.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
            {meta.english}
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {meta.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{meta.description}</p>
        </div>
      </motion.div>

      {/* Category progress */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-foreground">Your progress</p>
          <p className="text-sm text-muted-foreground">
            {completed.length} / {FREE_TESTS} Tests Completed
          </p>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completed.length / FREE_TESTS) * 100}%` }}
          />
        </div>
      </div>

      {/* Free tests */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Available Tests
        </h2>
        {Array.from({ length: FREE_TESTS }).map((_, i) => {
          const num = i + 1;
          const isDone = completed.includes(num);
          return (
            <motion.button
              key={num}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleStartTest(num)}
              className={cn(
                "w-full text-left rounded-2xl border bg-card p-5 transition-all duration-200",
                "hover:border-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isDone ? "border-success/40" : "border-border"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                      📝 Test {num}
                      {isDone && (
                        <span className="inline-flex items-center gap-1 text-xs text-success font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Completed
                        </span>
                      )}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {DURATIONS[i]} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        {DIFFICULTIES[i]}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-accent-foreground bg-accent/20 border border-accent/30 px-2 py-1 rounded-full shrink-0">
                  +{XP_BY_INDEX[i]} XP
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Premium locked tests */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Premium Tests
        </h2>
        {Array.from({ length: PREMIUM_TESTS }).map((_, i) => {
          const num = FREE_TESTS + i + 1;
          return (
            <motion.button
              key={num}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate("/upgrade")}
              className={cn(
                "w-full text-left rounded-2xl border border-dashed border-border bg-card/60 p-5",
                "hover:border-accent hover:bg-card transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
                  <Lock className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-bold text-foreground">
                    🔒 Premium Test {num}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    Upgrade to Premium to unlock access to 30+ practice tests and expert tips to get higher scores.
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TcfTefCategory;