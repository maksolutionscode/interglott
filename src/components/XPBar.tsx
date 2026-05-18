import { useProgress } from "@/contexts/UserProgressContext";
import { getLevelProgress, getCurrentLevel, getNextLevel } from "@/lib/gamification";
import { motion } from "framer-motion";

export function XPBar() {
  const { xp } = useProgress();
  const level = getCurrentLevel(xp);
  const next = getNextLevel(xp);
  const progress = getLevelProgress(xp);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-display font-semibold text-foreground">
          <span className="text-lg">{level.icon}</span>
          {level.name}
        </span>
        <span className="text-xp font-semibold">{xp} XP</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full gradient-xp"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {next && (
        <p className="text-xs text-muted-foreground text-right">
          {next.minXP - xp} XP to {next.name} {next.icon}
        </p>
      )}
    </div>
  );
}
