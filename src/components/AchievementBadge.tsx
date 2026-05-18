import { Achievement } from "@/data/achievements";
import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
}

export function AchievementBadge({ achievement, unlocked }: AchievementBadgeProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-4 text-center transition-all duration-300",
        unlocked ? "border-accent/30 glow-accent" : "opacity-40 grayscale"
      )}
    >
      <div className="text-3xl mb-2">{achievement.icon}</div>
      <p className="font-display font-semibold text-sm text-foreground">{achievement.title}</p>
      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
    </div>
  );
}
