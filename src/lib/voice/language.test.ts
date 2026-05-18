import { describe, expect, it } from "vitest";
import { getVoiceLanguage, getProviderPreference } from "./language";

describe("voice language mapping", () => {
  it("maps learning languages to native speech locales", () => {
    expect(getVoiceLanguage("french")).toBe("fr-FR");
    expect(getVoiceLanguage("spanish")).toBe("es-ES");
    expect(getVoiceLanguage("chinese")).toBe("zh-CN");
    expect(getVoiceLanguage("german")).toBe("de-DE");
    expect(getVoiceLanguage("arabic")).toBe("ar-SA");
  });

  it("treats TCF/TEF as French speech", () => {
    expect(getVoiceLanguage("french", { mode: "tcf-tef" })).toBe("fr-FR");
  });

  it("prefers configured realtime providers before browser fallback", () => {
    expect(getProviderPreference("openai-realtime")).toEqual([
      "openai-realtime",
      "gemini-live",
      "browser-fallback",
    ]);
  });
});
