import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AudioMessagePlayerProps {
  audioUrl: string;
  isUser?: boolean;
}

function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "0:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function AudioMessagePlayer({
  audioUrl,
  isUser = false,
}: AudioMessagePlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(audio.duration || 0);
    };
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [audioUrl]);

  const progress = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, (currentTime / duration) * 100);
  }, [currentTime, duration]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    await audio.play();
  };

  return (
    <div
      className={cn(
        "mb-3 rounded-xl border px-3 py-2",
        isUser
          ? "border-white/20 bg-white/12 text-primary-foreground"
          : "border-border/70 bg-secondary/40 text-foreground",
      )}
    >
      <audio ref={audioRef} preload="metadata" src={audioUrl} />
      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          onClick={() => void togglePlayback()}
          aria-label={isPlaying ? "Pause voice message" : "Play voice message"}
          className={cn(
            "h-9 w-9 shrink-0 rounded-full border-0",
            isUser
              ? "bg-white text-primary hover:bg-white/90"
              : "gradient-purple text-primary-foreground",
          )}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-medium">
              <Volume2 className="h-3.5 w-3.5" />
              Voice message
            </span>
            <span className={cn(isUser ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {formatDuration(isPlaying ? duration - currentTime : duration)}
            </span>
          </div>
          <div
            className={cn(
              "mt-2 h-1.5 overflow-hidden rounded-full",
              isUser ? "bg-white/20" : "bg-border/70",
            )}
          >
            <div
              className={cn(
                "h-full rounded-full transition-[width]",
                isUser ? "bg-white" : "bg-primary",
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
