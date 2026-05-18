import { supabase } from "@/integrations/supabase/client";

import type { VoiceLanguage } from "./types";

export interface TranscriptTranslation {
  translation: string;
  natural: boolean;
  feedback: string | null;
}

interface TranslateTranscriptRequest {
  text: string;
  sourceLanguage: VoiceLanguage;
  expectedEnglish?: string;
}

export async function translateTranscript({
  text,
  sourceLanguage,
  expectedEnglish,
}: TranslateTranscriptRequest): Promise<TranscriptTranslation> {
  if (sourceLanguage === "en-US") {
    return {
      translation: text.trim(),
      natural: true,
      feedback: null,
    };
  }

  const { data, error } = await supabase.functions.invoke("translate-transcript", {
    body: {
      text,
      sourceLanguage,
      expectedEnglish,
    },
  });

  if (error) {
    throw new Error(error.message || "Transcript translation failed.");
  }

  if (!data || typeof data.translation !== "string") {
    throw new Error("Transcript translation did not return a valid translation.");
  }

  return {
    translation: data.translation.trim(),
    natural: data.natural !== false,
    feedback: typeof data.feedback === "string" ? data.feedback : null,
  };
}
