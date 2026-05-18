import { Lesson } from "@/data/lessons";
import { useProgress } from "@/contexts/UserProgressContext";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CompletionIndicator } from "@/components/CompletionIndicator";

interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

export function LessonCard({ lesson, index }: LessonCardProps) {
  const { completedLessons } = useProgress();
  const navigate = useNavigate();
  const completed = completedLessons.includes(lesson.id);

  const levelColors = {
    beginner: "bg-success/20 text-success",
    intermediate: "bg-xp/20 text-xp",
    advanced: "bg-accent/20 text-accent",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/lessons/${lesson.id}`)}
      className={`glass-card rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:glow-purple active-scale ${
        completed ? "border-success/30" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">{lesson.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-foreground truncate">{lesson.title}</h3>
            <CompletionIndicator completed={completed} xpEarned={lesson.xpReward} />
          </div>
          <p className="text-xs text-muted-foreground mb-2">{lesson.titleFr}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${levelColors[lesson.level]} border-0 text-xs`}>
              {lesson.level}
            </Badge>
            <span className="text-xs text-xp font-medium">+{lesson.xpReward} XP</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {lesson.estimatedMinutes}m
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
