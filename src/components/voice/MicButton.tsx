import { Mic, MicOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MicButtonProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
  className?: string;
}

export function MicButton({
  isListening,
  onStart,
  onStop,
  disabled = false,
  className,
}: MicButtonProps) {
  const Icon = isListening ? MicOff : Mic;

  return (
    <Button
      type="button"
      size="icon"
      aria-label={isListening ? "Stop listening" : "Start speaking"}
      disabled={disabled}
      onClick={isListening ? onStop : onStart}
      className={cn(
        "h-11 w-11 shrink-0 rounded-full border-0",
        isListening ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "gradient-purple text-primary-foreground",
        className
      )}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
