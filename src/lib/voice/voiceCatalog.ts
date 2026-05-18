import type { RealtimeVoiceName, VoiceGender, VoicePersona } from "./types";

export const realtimeVoiceOptions: Record<
  VoiceGender,
  Array<{
    id: RealtimeVoiceName;
    label: string;
    description: string;
  }>
> = {
  female: [
    { id: "marin", label: "Marin", description: "Balanced, clear, and polished." },
    { id: "coral", label: "Coral", description: "Warm and bright for everyday practice." },
    { id: "shimmer", label: "Shimmer", description: "Lighter and more animated." },
    { id: "sage", label: "Sage", description: "Measured and reassuring." },
  ],
  male: [
    { id: "cedar", label: "Cedar", description: "Deep and steady for guided practice." },
    { id: "ash", label: "Ash", description: "Smooth and neutral." },
    { id: "echo", label: "Echo", description: "Crisp and articulate." },
    { id: "ballad", label: "Ballad", description: "Rounded and story-like." },
    { id: "alloy", label: "Alloy", description: "Balanced and modern." },
    { id: "verse", label: "Verse", description: "Expressive and conversational." },
  ],
};

export const voicePersonaOptions: Array<{
  id: VoicePersona;
  label: string;
  description: string;
  instructions: string;
}> = [
    {
      id: "supportive-tutor",
      label: "Supportive tutor",
      description: "Warm, patient, and encouraging.",
      instructions:
        "Adopt a supportive tutor persona. Sound warm, patient, and encouraging without being overly dramatic.",
    },
    {
      id: "cheerful-coach",
      label: "Cheerful coach",
      description: "Lively, upbeat, and motivating.",
      instructions:
        "Adopt a cheerful coach persona. Sound upbeat, motivating, and energetic while staying clear and natural.",
    },
    {
      id: "calm-guide",
      label: "Calm guide",
      description: "Gentle, steady, and low-pressure.",
      instructions:
        "Adopt a calm guide persona. Sound steady, low-pressure, and reassuring with a relaxed pace.",
    },
    {
      id: "formal-examiner",
      label: "Formal examiner",
      description: "Structured and test-oriented.",
      instructions:
        "Adopt a formal examiner persona. Sound structured, precise, and professional, especially for assessment-style practice.",
    },
  ];

export function getDefaultVoiceName(voiceGender: VoiceGender): RealtimeVoiceName {
  return voiceGender === "male" ? "cedar" : "marin";
}

export function getPersonaInstructions(voicePersona: VoicePersona) {
  return (
    voicePersonaOptions.find((persona) => persona.id === voicePersona)?.instructions ??
    voicePersonaOptions[0].instructions
  );
}

export function applyPersonaInstructions(baseInstructions: string, voicePersona: VoicePersona) {
  return `${baseInstructions} ${getPersonaInstructions(voicePersona)}`.trim();
}

export function isVoiceNameInGenderGroup(
  voiceName: RealtimeVoiceName,
  voiceGender: VoiceGender,
) {
  return realtimeVoiceOptions[voiceGender].some((voice) => voice.id === voiceName);
}
