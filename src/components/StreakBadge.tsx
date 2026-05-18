import { useProgress } from "@/contexts/UserProgressContext";
import { getStreakMultiplier } from "@/lib/gamification";
import { Flame } from "lucide-react";

export function StreakBadge() {
  const { streak } = useProgress();
  const multiplier = getStreakMultiplier(streak);

  return (
    <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2.5">
      <div className={`${streak > 0 ? "animate-streak-fire" : ""}`}>
        <Flame className={`h-6 w-6 ${streak > 0 ? "text-xp" : "text-muted-foreground"}`} />
      </div>
      <div>
        <p className="font-display font-bold text-foreground text-lg leading-none">{streak}</p>
        <p className="text-xs text-muted-foreground">
          {streak > 0 ? `${multiplier}x bonus` : "Start streak!"}
        </p>
      </div>
    </div>
  );
}
