import { useProgress } from "@/contexts/UserProgressContext";
import { useCredits } from "@/contexts/CreditsContext";
import { XPBar } from "@/components/XPBar";
import { StreakBadge } from "@/components/StreakBadge";
import { DailyChallenge } from "@/components/DailyChallenge";
import { LessonCard } from "@/components/LessonCard";
import { getLessonsForLanguage, languageLabels } from "@/data/lessonsByLanguage";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, MessageCircle, Globe, BookText } from "lucide-react";
import { useEffect, useRef } from "react";
import { BackButton } from "@/components/BackButton";

const Dashboard = () => {
  const { level, completedLessons, learningLanguage, streak } = useProgress();
  const { awardLoginBonus, awardStreakBonus } = useCredits();
  const navigate = useNavigate();
  const bonusAwarded = useRef(false);

  useEffect(() => {
    if (!bonusAwarded.current) {
      bonusAwarded.current = true;
      awardLoginBonus();
      if (streak >= 7) awardStreakBonus(streak);
    }
  }, [awardLoginBonus, awardStreakBonus, streak]);

  const allLessons = getLessonsForLanguage(learningLanguage);
  const langInfo = languageLabels[learningLanguage];

  const recommendedLessons = allLessons
    .filter((l) => l.level === level && !completedLessons.includes(l.id))
    .slice(0, 3);

  const continueLessons = recommendedLessons.length > 0 ? recommendedLessons : allLessons.filter((l) => l.level === level).slice(0, 3);

  return (
    <div className="pt-6 space-y-6">
      <BackButton to="/select-language" label="Languages" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{langInfo.flag}</span>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {learningLanguage === "french" ? "Bonjour" : learningLanguage === "spanish" ? "¡Hola" : learningLanguage === "german" ? "Hallo" : learningLanguage === "arabic" ? "مرحبا" : "你好"}! 👋
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Ready to practice {langInfo.name} today?
        </p>
      </motion.div>

      {/* Language indicator */}
      <button
        onClick={() => navigate("/select-language")}
        className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2 hover:glow-purple transition-all w-fit"
      >
        <Globe className="h-4 w-4 text-accent" />
        <span className="text-sm text-foreground font-medium">
          Learning {langInfo.name} {langInfo.flag}
        </span>
        <span className="text-xs text-muted-foreground ml-1">Change</span>
      </button>

      {/* Stats row */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <XPBar />
        </div>
        <StreakBadge />
      </div>

      {/* Daily Challenge */}
      <DailyChallenge />

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => navigate("/lessons")}
          className="glass-card rounded-2xl p-4 text-left hover:glow-purple transition-all hover:scale-[1.02] active-scale"
        >
          <BookOpen className="h-6 w-6 text-primary mb-2" />
          <p className="font-display font-semibold text-sm text-foreground">Lessons</p>
          <p className="text-xs text-muted-foreground">
            {completedLessons.filter(id => allLessons.some(l => l.id === id)).length}/{allLessons.length} done
          </p>
        </button>
        <button
          onClick={() => navigate("/stories")}
          className="glass-card rounded-2xl p-4 text-left hover:glow-purple transition-all hover:scale-[1.02] active-scale"
        >
          <BookText className="h-6 w-6 text-accent mb-2" />
          <p className="font-display font-semibold text-sm text-foreground">Stories</p>
          <p className="text-xs text-muted-foreground">Interactive</p>
        </button>
        <button
          onClick={() => navigate("/conversation")}
          className="glass-card rounded-2xl p-4 text-left hover:glow-accent transition-all hover:scale-[1.02] active-scale"
        >
          <MessageCircle className="h-6 w-6 text-primary mb-2" />
          <p className="font-display font-semibold text-sm text-foreground">Chat</p>
          <p className="text-xs text-muted-foreground">{langInfo.name}</p>
        </button>
      </div>

      {/* Recommended Lessons */}
      <div>
        <h2 className="font-display font-semibold text-foreground mb-3">Continue Learning</h2>
        <div className="space-y-3">
          {continueLessons.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
