import { CheckCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CompletionIndicatorProps {
  completed: boolean;
  xpEarned?: number;
  className?: string;
}

export function CompletionIndicator({ completed, xpEarned, className }: CompletionIndicatorProps) {
  if (!completed) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn("inline-flex shrink-0", className)}>
            <CheckCircle className="h-4 w-4 text-success" />
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-card border-border text-foreground text-xs"
        >
          <p className="font-medium">Completed ✔</p>
          {xpEarned !== undefined && (
            <p className="text-muted-foreground">XP Earned: {xpEarned}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
