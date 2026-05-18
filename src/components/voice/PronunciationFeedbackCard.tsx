import type { PronunciationFeedback } from "@/lib/voice/types";

interface PronunciationFeedbackCardProps {
  feedback?: PronunciationFeedback | null;
}

export function PronunciationFeedbackCard({
  feedback,
}: PronunciationFeedbackCardProps) {
  if (!feedback) return null;

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-display text-sm font-semibold text-foreground">
          Pronunciation Score
        </p>
        <span className="rounded-full bg-accent/20 px-3 py-1 text-sm font-bold text-accent-foreground">
          {feedback.score}%
        </span>
      </div>
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <p>{feedback.pronunciation}</p>
        <p>{feedback.fluency}</p>
        <p>{feedback.grammar}</p>
        <p>{feedback.naturalness}</p>
      </div>
      {feedback.retryText && (
        <p className="mt-3 text-xs text-foreground">
          Try again: <span className="font-semibold">{feedback.retryText}</span>
        </p>
      )}
    </div>
  );
}
