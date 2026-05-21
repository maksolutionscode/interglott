import { useCallback, useState } from "react";

import { speakWithBrowser } from "@/lib/voice/browserVoiceAdapter";
import { speakWithOpenAiRealtime } from "@/lib/voice/openAiRealtimePlayback";
import type {
  RealtimeVoiceSessionConfig,
  VoiceLanguage,
  VoiceMode,
  VoiceRequest,
  VoiceSettings,
} from "@/lib/voice/types";

interface UseVoiceSynthesisOptions {
  language: VoiceLanguage;
  mode: VoiceMode;
  settings: VoiceSettings;
  realtimeConfig?: Omit<
    RealtimeVoiceSessionConfig,
    "provider" | "language" | "mode" | "voiceGender" | "voiceName" | "voicePersona" | "verbatimOnly"
  >;
}

export function useVoiceSynthesis({
  language,
  mode,
  settings,
  realtimeConfig,
}: UseVoiceSynthesisOptions) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback(
    async (text: string, options?: Partial<VoiceRequest>) => {
      setError(null);
      setIsSpeaking(true);
      try {
        const request = {
          text,
          language,
          mode,
          ...options,
        };

        if (settings.provider === "openai-realtime" && realtimeConfig) {
          try {
            // console.log("Attempting realtime playback with OpenAI...", {
            //   request,
            //   sessionConfig: realtimeConfig,
            //   voiceGender: settings.voiceGender,
            // });
            await speakWithOpenAiRealtime({
              request,
              sessionConfig: realtimeConfig,
              voiceGender: settings.voiceGender,
              voiceName: settings.voiceName,
              voicePersona: settings.voicePersona,
              verbatimOnly: true,
            });
            return;
          } catch (realtimeError) {
            setError(
              realtimeError instanceof Error
                ? realtimeError.message
                : "Realtime voice playback failed."
            );
          }
        }

        await speakWithBrowser(request, settings);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Voice playback failed.");
      } finally {
        setIsSpeaking(false);
      }
    },
    [language, mode, realtimeConfig, settings]
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, error };
}
