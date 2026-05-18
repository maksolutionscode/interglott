import { supabase } from "@/integrations/supabase/client";
import type { RealtimeVoiceSessionConfig, VoiceProvider } from "./types";

export type VoiceSessionResult =
  | { ok: true; provider: VoiceProvider; session: unknown }
  | { ok: false; reason: string; fallbackProvider: "browser-fallback" };

export async function requestRealtimeVoiceSession(
  config: RealtimeVoiceSessionConfig
): Promise<VoiceSessionResult> {
  if (config.provider === "browser-fallback") {
    return {
      ok: false,
      reason: "Realtime voice provider is not configured.",
      fallbackProvider: "browser-fallback",
    };
  }

  try {
    const { data, error } = await supabase.functions.invoke("voice-session", {
      body: config,
    });

    if (error) {
      return {
        ok: false,
        reason: error.message || "Realtime voice session is unavailable.",
        fallbackProvider: "browser-fallback",
      };
    }

    return {
      ok: true,
      provider: config.provider,
      session: data,
    };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : "Realtime voice session failed.",
      fallbackProvider: "browser-fallback",
    };
  }
}
