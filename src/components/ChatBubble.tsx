import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
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
        <div className="text-sm leading-relaxed prose prose-sm prose-invert max-w-none [&_p]:m-0 [&_p+p]:mt-2 [&_strong]:text-foreground [&_em]:text-muted-foreground">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
        {timestamp && (
          <p className={cn("text-xs mt-1", isUser ? "text-foreground/60" : "text-muted-foreground")}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
