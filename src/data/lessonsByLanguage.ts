import { lessons as frenchLessons, type Lesson, type LessonLevel } from "./lessons";
import { spanishLessons } from "./spanishLessons";
import { chineseLessons } from "./chineseLessons";
import { germanLessons } from "./germanLessons";
import { arabicLessons } from "./arabicLessons";
import type { LearningLanguage } from "@/contexts/UserProgressContext";

const lessonMap: Record<LearningLanguage, Lesson[]> = {
  french: frenchLessons,
  spanish: spanishLessons,
  chinese: chineseLessons,
  german: germanLessons,
  arabic: arabicLessons,
};

export function getLessonsForLanguage(lang: LearningLanguage): Lesson[] {
  return lessonMap[lang] || frenchLessons;
}

export function getLessonsByLevelForLanguage(lang: LearningLanguage, level: LessonLevel): Lesson[] {
  return getLessonsForLanguage(lang).filter((l) => l.level === level);
}

export function getLessonByIdForLanguage(lang: LearningLanguage, id: string): Lesson | undefined {
  return getLessonsForLanguage(lang).find((l) => l.id === id);
}

export const languageLabels: Record<LearningLanguage, { name: string; flag: string; nativeName: string }> = {
  french: { name: "French", flag: "🇫🇷", nativeName: "Français" },
  spanish: { name: "Spanish", flag: "🇪🇸", nativeName: "Español" },
  chinese: { name: "Chinese", flag: "🇨🇳", nativeName: "中文" },
  german: { name: "German", flag: "🇩🇪", nativeName: "Deutsch" },
  arabic: { name: "Arabic", flag: "🇸🇦", nativeName: "العربية" },
};
