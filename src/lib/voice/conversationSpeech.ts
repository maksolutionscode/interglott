import type { ConversationPrompt } from "@/lib/conversationEngine";

import { getVoiceLanguageForText } from "./language";
import type { VoiceLanguage } from "./types";

interface ConversationSpeechMeta {
  transcript: string;
  language: VoiceLanguage;
}

function stripParentheticalHints(text: string) {
  return text.replace(/\s*\([^)]+\)/g, "").replace(/\s+/g, " ").trim();
}

export function getConversationPromptSpeech(
  prompt: ConversationPrompt,
  fallbackLanguage: VoiceLanguage,
): ConversationSpeechMeta {
  switch (prompt.type) {
    case "translate":
    case "vocab-recall":
      return {
        transcript: prompt.sentence,
        language: "en-US",
      };
    case "translate-reverse":
      return {
        transcript: prompt.sentence,
        language: fallbackLanguage,
      };
    case "fill-blank":
      return {
        transcript: stripParentheticalHints(prompt.sentence),
        language: fallbackLanguage,
      };
    case "correct-sentence":
      return {
        transcript: prompt.sentence,
        language: fallbackLanguage,
      };
    default:
      return {
        transcript: prompt.sentence,
        language: getVoiceLanguageForText(prompt.sentence, fallbackLanguage),
      };
  }
}

export function getConversationAnswerSpeechLanguage(
  prompt: ConversationPrompt,
  fallbackLanguage: VoiceLanguage,
): VoiceLanguage {
  return prompt.type === "translate-reverse" ? "en-US" : fallbackLanguage;
}

export function getConversationFeedbackSpeech(
  prompt: ConversationPrompt,
  fallbackLanguage: VoiceLanguage,
): ConversationSpeechMeta {
  return {
    transcript: prompt.correctAnswer,
    language: getConversationAnswerSpeechLanguage(prompt, fallbackLanguage),
  };
}
