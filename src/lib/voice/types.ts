import type { LearningLanguage } from "@/contexts/UserProgressContext";

export type VoiceLanguage = "en-US" | "fr-FR" | "es-ES" | "zh-CN" | "de-DE" | "ar-SA";
export type VoiceProvider = "openai-realtime" | "gemini-live" | "browser-fallback";
export type AiVoiceProvider = Exclude<VoiceProvider, "browser-fallback">;
export type VoiceGender = "female" | "male";
export type VoiceMode = "lesson" | "chat" | "story" | "tcf-tef";
export type RealtimeVoiceName =
  | "alloy"
  | "ash"
  | "ballad"
  | "coral"
  | "echo"
  | "sage"
  | "shimmer"
  | "verse"
  | "marin"
  | "cedar";
export type VoicePersona =
  | "supportive-tutor"
  | "cheerful-coach"
  | "calm-guide"
  | "formal-examiner";

export interface VoiceSettings {
  provider: VoiceProvider;
  aiProvider: AiVoiceProvider;
  rate: number;
  volume: number;
  muted: boolean;
  voiceGender: VoiceGender;
  voiceName: RealtimeVoiceName;
  voicePersona: VoicePersona;
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
  voiceGender?: VoiceGender;
  voiceName?: RealtimeVoiceName;
  voicePersona?: VoicePersona;
  verbatimOnly?: boolean;
}
