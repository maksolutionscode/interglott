import { RotateCcw, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  isSpeaking?: boolean;
  onSpeak: () => void;
  disabled?: boolean;
  replay?: boolean;
  className?: string;
}

export function VoiceButton({
  isSpeaking = false,
  onSpeak,
  disabled = false,
  replay = false,
  className,
}: VoiceButtonProps) {
  const Icon = replay ? RotateCcw : Volume2;

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={replay ? "Replay audio" : "Play pronunciation"}
      disabled={disabled}
      onClick={onSpeak}
      className={cn(
        "btn-icon-sm h-10 w-10 rounded-full border border-border/70 bg-background/60 text-primary hover:bg-primary/10",
        isSpeaking && "glow-accent text-accent",
        className
      )}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
