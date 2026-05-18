import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { VoiceButton } from "@/components/voice/VoiceButton";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  transcript?: string;
  isSpeaking?: boolean;
  onSpeak?: () => void;
}

export function ChatBubble({
  message,
  isUser,
  timestamp,
  transcript,
  isSpeaking = false,
  onSpeak,
}: ChatBubbleProps) {
  return (
    <div className={cn("flex w-full mb-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "gradient-purple text-foreground rounded-br-sm"
            : "glass-card text-foreground rounded-bl-sm"
        )}
      >
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 text-sm leading-relaxed prose prose-sm prose-invert max-w-none [&_p]:m-0 [&_p+p]:mt-2 [&_strong]:text-foreground [&_em]:text-muted-foreground">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
          {onSpeak && (
            <VoiceButton
              isSpeaking={isSpeaking}
              onSpeak={onSpeak}
              className={cn(
                "h-8 w-8 border-foreground/15",
                isUser && "bg-foreground/10 text-foreground hover:bg-foreground/20"
              )}
            />
          )}
        </div>
        {transcript && (
          <div
            className={cn(
              "mt-3 rounded-lg border px-3 py-2 text-xs",
              isUser
                ? "border-foreground/15 bg-foreground/10 text-foreground/80"
                : "border-border/70 bg-secondary/30 text-muted-foreground"
            )}
          >
            <p className="mb-1 font-semibold uppercase tracking-wide">Transcript</p>
            <p className="leading-relaxed">{transcript}</p>
          </div>
        )}
        {timestamp && (
          <p className={cn("text-xs mt-1", isUser ? "text-foreground/60" : "text-muted-foreground")}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
