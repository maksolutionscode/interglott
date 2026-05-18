import type { PronunciationFeedback } from "./types";

export function normalizeSpeechText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getEditDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  const current = Array.from({ length: right.length + 1 }, () => 0);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    current[0] = leftIndex;

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost =
        left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;

      current[rightIndex] = Math.min(
        previous[rightIndex] + 1,
        current[rightIndex - 1] + 1,
        previous[rightIndex - 1] + substitutionCost,
      );
    }

    for (let index = 0; index < previous.length; index += 1) {
      previous[index] = current[index];
    }
  }

  return previous[right.length];
}

function getTokenOverlapScore(expected: string, spoken: string): number {
  const expectedTokens = expected.split(" ").filter(Boolean);
  const spokenTokens = new Set(spoken.split(" ").filter(Boolean));

  if (expectedTokens.length === 0) {
    return spokenTokens.size === 0 ? 100 : 0;
  }

  const matchedTokens = expectedTokens.filter((token) => spokenTokens.has(token));
  return (matchedTokens.length / expectedTokens.length) * 100;
}

function getSimilarityScore(expected: string, spoken: string): number {
  if (expected === spoken) {
    return 100;
  }

  const longestLength = Math.max(expected.length, spoken.length);
  if (longestLength === 0) {
    return 100;
  }

  const distance = getEditDistance(expected, spoken);
  return Math.max(0, (1 - distance / longestLength) * 100);
}

function buildFeedbackCopy(score: number): Omit<PronunciationFeedback, "score"> {
  if (score >= 90) {
    return {
      pronunciation: "Excellent pronunciation. Your words matched the target clearly.",
      fluency: "Smooth pacing with confident delivery.",
      grammar: "The spoken phrase preserved the expected wording.",
      naturalness: "Natural and easy to understand.",
    };
  }

  if (score >= 70) {
    return {
      pronunciation: "Good pronunciation. A few sounds may need another pass.",
      fluency: "Mostly steady, with room to smooth the rhythm.",
      grammar: "The main wording came through.",
      naturalness: "Understandable and close to natural speech.",
    };
  }

  return {
    pronunciation: "Try again and focus on matching the target phrase.",
    fluency: "Slow down and say each word clearly.",
    grammar: "Repeat the expected wording exactly.",
    naturalness: "Aim for a clear, steady delivery.",
  };
}

export function buildPronunciationFeedback(
  expectedPhrase: string,
  spokenPhrase: string,
): PronunciationFeedback {
  const expected = normalizeSpeechText(expectedPhrase);
  const spoken = normalizeSpeechText(spokenPhrase);

  const score =
    expected === spoken
      ? 100
      : Math.round(
          getSimilarityScore(expected, spoken) * 0.7 +
            getTokenOverlapScore(expected, spoken) * 0.3,
        );

  return {
    score,
    ...buildFeedbackCopy(score),
    ...(score < 80 ? { retryText: expectedPhrase } : {}),
  };
}
