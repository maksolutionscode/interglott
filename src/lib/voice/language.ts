import type { LearningLanguage } from "@/contexts/UserProgressContext";
import type { VoiceLanguage, VoiceProvider, VoiceMode } from "./types";

const languageToLocale: Record<LearningLanguage, VoiceLanguage> = {
  french: "fr-FR",
  spanish: "es-ES",
  chinese: "zh-CN",
  german: "de-DE",
  arabic: "ar-SA",
};

export function getVoiceLanguage(
  language: LearningLanguage,
  options?: { mode?: VoiceMode }
): VoiceLanguage {
  if (options?.mode === "tcf-tef") return "fr-FR";
  return languageToLocale[language];
}

export function getProviderPreference(primary: VoiceProvider): VoiceProvider[] {
  const all: VoiceProvider[] = ["openai-realtime", "gemini-live", "browser-fallback"];
  return [primary, ...all.filter((provider) => provider !== primary)];
}
