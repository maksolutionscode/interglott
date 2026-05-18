import { beforeEach, describe, expect, it, vi } from "vitest";

import { translateTranscript } from "./transcriptTranslator";

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

describe("transcriptTranslator", () => {
  beforeEach(() => {
    invoke.mockReset();
  });

  it("returns English text directly without calling the edge function", async () => {
    await expect(
      translateTranscript({ text: "Hello", sourceLanguage: "en-US" }),
    ).resolves.toEqual({
      translation: "Hello",
      natural: true,
      feedback: null,
    });

    expect(invoke).not.toHaveBeenCalled();
  });

  it("calls the edge function for non-English transcript translation", async () => {
    invoke.mockResolvedValue({
      data: { translation: "Hello", natural: true, feedback: null },
      error: null,
    });

    await expect(
      translateTranscript({
        text: "Bonjour",
        sourceLanguage: "fr-FR",
        expectedEnglish: "Hello",
      }),
    ).resolves.toEqual({
      translation: "Hello",
      natural: true,
      feedback: null,
    });

    expect(invoke).toHaveBeenCalledWith("translate-transcript", {
      body: {
        text: "Bonjour",
        sourceLanguage: "fr-FR",
        expectedEnglish: "Hello",
      },
    });
  });
});
