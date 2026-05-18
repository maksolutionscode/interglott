import { type LessonLevel } from "@/data/lessons";
import { getLessonsForLanguage, languageLabels } from "@/data/lessonsByLanguage";
import { useProgress } from "@/contexts/UserProgressContext";
import { LessonCard } from "@/components/LessonCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { BackButton } from "@/components/BackButton";

const validFilters = ["all", "beginner", "intermediate", "advanced"] as const;

const tabs: { key: LessonLevel | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "beginner", label: "🌱 Beginner" },
  { key: "intermediate", label: "📖 Intermediate" },
  { key: "advanced", label: "🚀 Advanced" },
];

const Lessons = () => {
  const { learningLanguage, completedLessons } = useProgress();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramFilter = searchParams.get("level");
  const filter: LessonLevel | "all" = validFilters.includes(paramFilter as any) ? (paramFilter as LessonLevel | "all") : "all";
  const setFilter = (key: LessonLevel | "all") => {
    setSearchParams(key === "all" ? {} : { level: key }, { replace: true });
  };

  const allLessons = getLessonsForLanguage(learningLanguage);
  const langInfo = languageLabels[learningLanguage];
  const filtered = filter === "all" ? allLessons : allLessons.filter((l) => l.level === filter);
  const completedCount = allLessons.filter((l) => completedLessons.includes(l.id)).length;

  return (
    <div className="pt-6 space-y-5">
      <BackButton to="/dashboard" label="Dashboard" />
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">
          {langInfo.flag} {langInfo.name} Lessons
        </h1>
        <p className="text-sm text-muted-foreground">
          {completedCount}/{allLessons.length} completed • Choose a lesson to start learning
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full gradient-xp rounded-full"
          animate={{ width: `${(completedCount / Math.max(allLessons.length, 1)) * 100}%` }}
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              filter === key
                ? "gradient-purple text-foreground"
                : "glass-card text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((lesson, i) => (
          <LessonCard key={lesson.id} lesson={lesson} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
