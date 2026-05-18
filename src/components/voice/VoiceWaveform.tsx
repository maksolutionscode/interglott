import { cn } from "@/lib/utils";

interface VoiceWaveformProps {
  active: boolean;
  className?: string;
}

export function VoiceWaveform({ active, className }: VoiceWaveformProps) {
  return (
    <div
      aria-label="Voice activity"
      className={cn("flex h-6 items-center gap-1", className)}
    >
      {[0, 1, 2, 3, 4].map((bar) => (
        <span
          key={bar}
          className={cn(
            "block w-1 rounded-full bg-accent transition-all",
            active ? "animate-pulse" : "opacity-40"
          )}
          style={{
            height: active ? `${10 + ((bar % 3) + 1) * 4}px` : "8px",
            animationDelay: `${bar * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}
