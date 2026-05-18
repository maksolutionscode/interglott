import { describe, expect, it } from "vitest";

import type { ConversationPrompt } from "@/lib/conversationEngine";

import {
  getConversationAnswerSpeechLanguage,
  getConversationFeedbackSpeech,
  getConversationPromptSpeech,
} from "./conversationSpeech";

const basePrompt: ConversationPrompt = {
  id: "prompt-1",
  type: "translate",
  instruction: "Translate into French:",
  sentence: "Hello, how are you?",
  correctAnswer: "Bonjour, comment allez-vous ?",
  category: "Greetings",
  lessonTitle: "Greetings",
  difficulty: "beginner",
};

describe("conversationSpeech", () => {
  it("keeps English source prompts in English when replayed", () => {
    const promptSpeech = getConversationPromptSpeech(basePrompt, "fr-FR");

    expect(promptSpeech).toEqual({
      transcript: "Hello, how are you?",
      language: "en-US",
    });
  });

  it("keeps reverse-translation answers in English for feedback replay", () => {
    const prompt = {
      ...basePrompt,
      type: "translate-reverse" as const,
      sentence: "Bonjour",
      correctAnswer: "Hello",
    };

    expect(getConversationAnswerSpeechLanguage(prompt, "fr-FR")).toBe("en-US");
    expect(getConversationFeedbackSpeech(prompt, "fr-FR")).toEqual({
      transcript: "Hello",
      language: "en-US",
    });
  });

  it("removes helper parentheses from fill-blank replay text", () => {
    const prompt = {
      ...basePrompt,
      type: "fill-blank" as const,
      sentence: "Je _____ fran\u00e7ais. (I speak French)",
      correctAnswer: "parle",
    };

    expect(getConversationPromptSpeech(prompt, "fr-FR")).toEqual({
      transcript: "Je _____ fran\u00e7ais.",
      language: "fr-FR",
    });
  });
});
