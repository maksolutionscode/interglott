import { beforeEach, describe, expect, it, vi } from "vitest";

import { requestRealtimeVoiceSession } from "./realtimeProvider";
import type { RealtimeVoiceSessionConfig } from "./types";

const { invoke } = vi.hoisted(() => ({
  invoke: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke,
    },
  },
}));

const config: RealtimeVoiceSessionConfig = {
  provider: "openai-realtime",
  language: "fr-FR",
  learningLanguage: "french",
  level: "beginner",
  mode: "chat",
  tutorInstructions: "Speak slowly and correct pronunciation.",
};

describe("realtimeProvider", () => {
  beforeEach(() => {
    invoke.mockReset();
  });

  it("requests a realtime voice session without exposing provider API keys", async () => {
    invoke.mockResolvedValue({
      data: { provider: "openai-realtime", clientSecret: "ephemeral-token" },
      error: null,
    });

    const result = await requestRealtimeVoiceSession(config);

    expect(invoke).toHaveBeenCalledWith("voice-session", {
      body: config,
    });
    expect(JSON.stringify(invoke.mock.calls[0])).not.toContain("apiKey");
    expect(result).toEqual({
      ok: true,
      provider: "openai-realtime",
      session: { provider: "openai-realtime", clientSecret: "ephemeral-token" },
    });
  });

  it("falls back to browser voice when the session endpoint fails", async () => {
    invoke.mockResolvedValue({
      data: null,
      error: { message: "Missing provider secret" },
    });

    const result = await requestRealtimeVoiceSession(config);

    expect(result).toEqual({
      ok: false,
      reason: "Missing provider secret",
      fallbackProvider: "browser-fallback",
    });
  });
});
