import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { VoiceButton } from "@/components/voice/VoiceButton";
import { AudioMessagePlayer } from "@/components/voice/AudioMessagePlayer";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  transcript?: string;
  audioUrl?: string;
  isSpeaking?: boolean;
  onSpeak?: () => void;
}

export function ChatBubble({
  message,
  isUser,
  timestamp,
  transcript,
  audioUrl,
  isSpeaking = false,
  onSpeak,
}: ChatBubbleProps) {
  return (
    <div className={cn("flex w-full mb-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground shadow-[0_14px_36px_rgba(31,79,142,0.28)] rounded-br-sm"
            : "glass-card text-foreground rounded-bl-sm"
        )}
      >
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            {audioUrl && <AudioMessagePlayer audioUrl={audioUrl} isUser={isUser} />}
            <div
              className={cn(
                "text-sm leading-relaxed prose prose-sm max-w-none [&_p]:m-0 [&_p+p]:mt-2",
                isUser
                  ? "prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-strong:text-primary-foreground prose-em:text-primary-foreground/80"
                  : "prose-invert [&_strong]:text-foreground [&_em]:text-muted-foreground",
              )}
            >
              <ReactMarkdown>{message}</ReactMarkdown>
            </div>
          </div>
          {onSpeak && !(audioUrl && isUser) && (
            <VoiceButton
              isSpeaking={isSpeaking}
              onSpeak={onSpeak}
              className={cn(
                "h-8 w-8 border-foreground/15",
                isUser && "bg-white/10 text-primary-foreground hover:bg-white/20 border-white/15"
              )}
            />
          )}
        </div>
        {transcript && (
          <div
            className={cn(
              "mt-3 rounded-lg border px-3 py-2 text-xs",
              isUser
                ? "border-white/15 bg-white/10 text-primary-foreground"
                : "border-border/70 bg-secondary/30 text-muted-foreground"
            )}
          >
            <p className="mb-1 font-semibold uppercase tracking-wide">Translation</p>
            <p className="leading-relaxed">{transcript}</p>
          </div>
        )}
        {timestamp && (
          <p className={cn("text-xs mt-1", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
