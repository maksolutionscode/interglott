import type { LearningLanguage } from "@/contexts/UserProgressContext";

import type { VoiceLanguage, VoiceMode, VoiceProvider } from "./types";

const languageToLocale: Record<LearningLanguage, VoiceLanguage> = {
  french: "fr-FR",
  spanish: "es-ES",
  chinese: "zh-CN",
  german: "de-DE",
  arabic: "ar-SA",
};

const englishHints = new Set([
  "a",
  "am",
  "and",
  "are",
  "at",
  "do",
  "doing",
  "for",
  "good",
  "hello",
  "help",
  "here",
  "hi",
  "how",
  "i",
  "in",
  "is",
  "it",
  "my",
  "of",
  "please",
  "thanks",
  "the",
  "this",
  "to",
  "what",
  "where",
  "you",
  "your",
]);

export function getVoiceLanguage(
  language: LearningLanguage,
  options?: { mode?: VoiceMode },
): VoiceLanguage {
  if (options?.mode === "tcf-tef") return "fr-FR";
  return languageToLocale[language];
}

export function getVoiceLanguageForText(
  text: string,
  fallbackLanguage: VoiceLanguage,
): VoiceLanguage {
  const normalized = text.trim();

  if (!normalized) return fallbackLanguage;
  if (/[\u0600-\u06FF]/.test(normalized)) return "ar-SA";
  if (/[\u4E00-\u9FFF]/.test(normalized)) return "zh-CN";
  if (/[\u00A1\u00BF\u00F1\u00E1\u00E9\u00ED\u00F3\u00FA\u00FC]/i.test(normalized)) return "es-ES";
  if (/[\u00E0\u00E2\u00E7\u00E9\u00E8\u00EA\u00EB\u00EE\u00EF\u00F4\u00FB\u00F9\u00FC\u00FF\u0153\u00E6]/i.test(normalized)) return "fr-FR";
  if (/[\u00E4\u00F6\u00FC\u00DF]/i.test(normalized)) return "de-DE";

  const words = normalized.toLowerCase().match(/[a-z']+/g) ?? [];
  const englishHits = words.filter((word) => englishHints.has(word)).length;

  if (englishHits >= 2 || (words.length === 1 && englishHints.has(words[0]))) {
    return "en-US";
  }

  return fallbackLanguage;
}

export function getProviderPreference(primary: VoiceProvider): VoiceProvider[] {
  const all: VoiceProvider[] = ["openai-realtime", "gemini-live", "browser-fallback"];
  return [primary, ...all.filter((provider) => provider !== primary)];
}
