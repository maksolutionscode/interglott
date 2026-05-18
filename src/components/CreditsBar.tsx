import { useCredits } from "@/contexts/CreditsContext";
import { Battery, BatteryLow, BatteryFull, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function CreditsBar() {
  const { creditsRemaining, dailyCredits, timeUntilReset, isPremium } = useCredits();

  if (isPremium) {
    return (
      <div className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2">
        <BatteryFull className="h-4 w-4 text-success" />
        <span className="text-sm font-medium text-foreground">Unlimited</span>
        <span className="text-xs text-success ml-auto font-medium">Premium</span>
      </div>
    );
  }

  const percentage = (creditsRemaining / dailyCredits) * 100;
  const isLow = creditsRemaining <= 3;
  const isEmpty = creditsRemaining <= 0;

  return (
    <div className="glass-card rounded-xl px-4 py-2.5 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isEmpty ? (
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <BatteryLow className="h-4 w-4 text-destructive" />
            </motion.div>
          ) : isLow ? (
            <BatteryLow className={cn("h-4 w-4 text-warning")} />
          ) : (
            <Battery className="h-4 w-4 text-primary" />
          )}
          <span className={cn(
            "text-sm font-semibold",
            isEmpty ? "text-destructive" : isLow ? "text-warning" : "text-foreground"
          )}>
            Credits: {creditsRemaining} / {dailyCredits}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span className="text-xs font-mono">{timeUntilReset}</span>
        </div>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isEmpty ? "bg-destructive" : isLow ? "bg-warning" : "gradient-xp"
          )}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>
    </div>
  );
}
