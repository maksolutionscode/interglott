import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/UserProgressContext";
import { BookOpen, Headphones, PenLine, Mic, ArrowLeft, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type SkillKey = "reading" | "listening" | "writing" | "speaking";

interface Skill {
  key: SkillKey;
  icon: typeof BookOpen;
  emoji: string;
  title: string;
  english: string;
  description: string;
  xp: number;
  freeTests: number;
}

const skills: Skill[] = [
  {
    key: "reading",
    icon: BookOpen,
    emoji: "📖",
    title: "La Compréhension écrite",
    english: "Reading Comprehension",
    description: "Practice reading and short passage analysis",
    xp: 100,
    freeTests: 5,
  },
  {
    key: "listening",
    icon: Headphones,
    emoji: "🎧",
    title: "La Compréhension orale",
    english: "Listening Comprehension",
    description: "Practice listening and audio comprehension",
    xp: 100,
    freeTests: 5,
  },
  {
    key: "writing",
    icon: PenLine,
    emoji: "✍️",
    title: "L'Expression écrite",
    english: "Written Expression",
    description: "Practice written prompts and structured responses",
    xp: 100,
    freeTests: 5,
  },
  {
    key: "speaking",
    icon: Mic,
    emoji: "🎤",
    title: "L'Expression Orale",
    english: "Spoken Expression",
    description: "Practice speaking and conversational simulations",
    xp: 100,
    freeTests: 5,
  },
];

const STORAGE_KEY = "interglott-tcf-progress";

function getCompletedTests(): Record<SkillKey, number[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        reading: parsed.reading ?? [],
        listening: parsed.listening ?? [],
        writing: parsed.writing ?? [],
        speaking: parsed.speaking ?? [],
      };
    }
  } catch {}
  return { reading: [], listening: [], writing: [], speaking: [] };
}

const TcfTefPractice = () => {
  const navigate = useNavigate();
  const { displayName } = useProgress();
  const completed = getCompletedTests();
  const totalFree = skills.reduce((s, k) => s + k.freeTests, 0);
  const totalDone =
    completed.reading.length +
    completed.listening.length +
    completed.writing.length +
    completed.speaking.length;
  const readiness = Math.round((totalDone / totalFree) * 100);

  return (
    <div className="pt-6 pb-10 space-y-6">
      <button
        onClick={() => navigate("/select-language")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
          TEF / TCF Practice
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Bonjour{displayName ? ` ${displayName}` : ""}, what do you want to practice today?
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Choose a skill category below — each one contains multiple tests from A1 to C2.
        </p>
      </motion.div>

      {/* Readiness score */}
      <div className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">TEF/TCF readiness</p>
          <p className="font-display text-xl font-bold text-foreground">{readiness}%</p>
        </div>
        <div className="flex-1 mx-4 h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${readiness}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          const done = completed[skill.key].length;
          return (
            <motion.button
              key={skill.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(`/tcf-tef/${skill.key}`)}
              className={cn(
                "text-left rounded-2xl border border-border bg-card p-5",
                "hover:border-accent hover:shadow-md transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold text-accent-foreground bg-accent/20 border border-accent/30 px-2 py-1 rounded-full">
                  +{skill.xp} XP
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                <span className="mr-1.5">{skill.emoji}</span>
                {skill.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{skill.english}</p>
              <p className="text-sm text-foreground/80 mt-2">{skill.description}</p>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground/80 font-medium">
                  A1 → C2
                </span>
                <span className="text-muted-foreground">
                  {done} / {skill.freeTests} completed
                </span>
              </div>

              <div className="mt-3 rounded-lg bg-secondary/60 border border-border px-3 py-2 flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground leading-snug">
                  <span className="font-semibold text-foreground">Only {skill.freeTests} tests available.</span>{" "}
                  Upgrade to Premium to unlock more tests.
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TcfTefPractice;