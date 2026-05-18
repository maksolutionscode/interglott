interface VoiceTranscriptProps {
  transcript?: string;
  label?: string;
}

export function VoiceTranscript({
  transcript,
  label = "Transcript",
}: VoiceTranscriptProps) {
  if (!transcript) return null;

  return (
    <div className="rounded-xl border border-border bg-secondary/40 px-3 py-2 text-sm">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-foreground">{transcript}</p>
    </div>
  );
}
