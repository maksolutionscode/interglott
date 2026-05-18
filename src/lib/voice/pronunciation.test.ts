import { describe, expect, it } from "vitest";
import { buildPronunciationFeedback, normalizeSpeechText } from "./pronunciation";

describe("pronunciation feedback", () => {
  it("normalizes punctuation and case", () => {
    expect(normalizeSpeechText(" Bonjour, DAVID! ")).toBe("bonjour david");
  });

  it("removes Arabic diacritics without splitting letters", () => {
    expect(normalizeSpeechText("مَرْحَبًا")).toBe("مرحبا");
  });

  it("scores exact spoken answers highly", () => {
    const feedback = buildPronunciationFeedback("Bonjour", "bonjour");
    expect(feedback.score).toBe(100);
    expect(feedback.pronunciation).toContain("Excellent");
  });

  it("gives retry guidance for weak matches", () => {
    const feedback = buildPronunciationFeedback("restaurant", "maison");
    expect(feedback.score).toBeLessThan(60);
    expect(feedback.retryText).toBe("restaurant");
  });
});
