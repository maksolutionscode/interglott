import type { LearningLanguage } from "@/contexts/UserProgressContext";

export type VoiceLanguage = "fr-FR" | "es-ES" | "zh-CN" | "de-DE" | "ar-SA";
export type VoiceProvider = "openai-realtime" | "gemini-live" | "browser-fallback";
export type VoiceGender = "female" | "male";
export type VoiceMode = "lesson" | "chat" | "story" | "tcf-tef";

export interface VoiceSettings {
  provider: VoiceProvider;
  rate: number;
  volume: number;
  muted: boolean;
  voiceGender: VoiceGender;
}

export interface VoiceRequest {
  text: string;
  language: VoiceLanguage;
  mode: VoiceMode;
  rate?: number;
  volume?: number;
}

export interface VoiceRecognitionResult {
  transcript: string;
  confidence?: number;
  language: VoiceLanguage;
}

export interface PronunciationFeedback {
  score: number;
  pronunciation: string;
  fluency: string;
  grammar: string;
  naturalness: string;
  retryText?: string;
}

export interface RealtimeVoiceSessionConfig {
  provider: VoiceProvider;
  language: VoiceLanguage;
  learningLanguage: LearningLanguage;
  level: "beginner" | "intermediate" | "advanced";
  mode: VoiceMode;
  tutorInstructions: string;
}
