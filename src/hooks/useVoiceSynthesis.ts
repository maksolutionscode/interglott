import { useCallback, useState } from "react";

import { speakWithBrowser } from "@/lib/voice/browserVoiceAdapter";
import type { VoiceLanguage, VoiceMode, VoiceRequest, VoiceSettings } from "@/lib/voice/types";

interface UseVoiceSynthesisOptions {
  language: VoiceLanguage;
  mode: VoiceMode;
  settings: VoiceSettings;
}

export function useVoiceSynthesis({
  language,
  mode,
  settings,
}: UseVoiceSynthesisOptions) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback(
    async (text: string, options?: Partial<VoiceRequest>) => {
      setError(null);
      setIsSpeaking(true);
      try {
        await speakWithBrowser(
          {
            text,
            language,
            mode,
            ...options,
          },
          settings
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Voice playback failed.");
      } finally {
        setIsSpeaking(false);
      }
    },
    [language, mode, settings]
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, error };
}
