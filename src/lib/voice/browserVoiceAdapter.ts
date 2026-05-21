import type { VoiceLanguage, VoiceRequest, VoiceSettings } from "./types";

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null;
  onerror: ((event: BrowserSpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort?: () => void;
};

type BrowserSpeechRecognitionEvent = {
  results: {
    item(index: number): {
      item(index: number): {
        transcript?: string;
        confidence?: number;
      };
    } | undefined;
  };
};

type BrowserSpeechRecognitionErrorEvent = {
  error?: string;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type BrowserWindowWithSpeech = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

export function canUseBrowserSpeechSynthesis(): boolean {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined"
  );
}

export function canUseBrowserSpeechRecognition(): boolean {
  if (typeof window === "undefined") return false;
  const speechWindow = window as BrowserWindowWithSpeech;
  return Boolean(
    speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition
  );
}

const GENDER_HINTS = {
  female: [
    "female",
    "woman",
    "zira",
    "samantha",
    "amelie",
    "victoria",
    "ava",
    "aria",
    "monica",
    "pauline",
    "audrey",
    "brigitte",
    "helena",
    "anna",
    "karen",
  ],
  male: [
    "male",
    "man",
    "david",
    "daniel",
    "cedric",
    "alex",
    "jorge",
    "diego",
    "thomas",
    "nicolas",
    "antoine",
    "oliver",
    "fred",
    "martin",
    "yannick",
  ],
} as const;

function scoreVoice(
  voice: SpeechSynthesisVoice,
  language: VoiceLanguage,
  voiceGender: VoiceSettings["voiceGender"],
) {
  const haystack = `${voice.name} ${voice.voiceURI}`.toLowerCase();
  const exactLanguage = voice.lang.toLowerCase() === language.toLowerCase();
  const languageFamily = voice.lang.toLowerCase().startsWith(language.slice(0, 2).toLowerCase());
  const explicitGender = (
    voice as SpeechSynthesisVoice & { gender?: string }
  ).gender?.toLowerCase();
  const matchingHints = GENDER_HINTS[voiceGender].filter((hint) => haystack.includes(hint)).length;
  const oppositeGender = voiceGender === "female" ? "male" : "female";
  const oppositeHints =
    GENDER_HINTS[oppositeGender].filter((hint) => haystack.includes(hint)).length;

  let score = 0;

  if (exactLanguage) score += 50;
  else if (languageFamily) score += 30;

  if (voice.localService) score += 10;
  if (matchingHints > 0) score += 40 + matchingHints * 5;
  if (oppositeHints > 0) score -= 35 + oppositeHints * 5;

  if (explicitGender === voiceGender) score += 70;
  else if (explicitGender === oppositeGender) score -= 70;

  return score;
}

function pickVoice(
  language: VoiceLanguage,
  voiceGender: VoiceSettings["voiceGender"],
  preferredVoiceName?: VoiceSettings["voiceName"],
) {
  const voices = window.speechSynthesis.getVoices();
  const languagePrefix = language.slice(0, 2).toLowerCase();
  const languageVoices = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith(languagePrefix)
  );
  const namedVoice = preferredVoiceName
    ? languageVoices.find((voice) =>
        `${voice.name} ${voice.voiceURI}`.toLowerCase().includes(preferredVoiceName)
      )
    : null;

  return (
    namedVoice ??
    [...languageVoices].sort((left, right) => {
      const scoreDelta = scoreVoice(right, language, voiceGender) - scoreVoice(left, language, voiceGender);
      if (scoreDelta !== 0) return scoreDelta;
      return left.name.localeCompare(right.name);
    })[0] ??
    languageVoices[0] ??
    null
  );
}

export function speakWithBrowser(
  request: VoiceRequest,
  settings: VoiceSettings
): Promise<void> {
  if (!canUseBrowserSpeechSynthesis() || settings.muted) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(request.text);
    utterance.lang = request.language;
    utterance.rate = request.rate ?? settings.rate;
    utterance.volume = request.volume ?? settings.volume;
    utterance.voice = pickVoice(request.language, settings.voiceGender, settings.voiceName);
    utterance.onend = () => resolve();
    utterance.onerror = () =>
      reject(new Error("Voice playback is unavailable on this device."));

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
}

export function createBrowserRecognition(
  language: VoiceLanguage
): BrowserSpeechRecognition | null {
  if (!canUseBrowserSpeechRecognition()) return null;

  const speechWindow = window as BrowserWindowWithSpeech;
  const Recognition =
    speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

  if (!Recognition) return null;

  const recognition = new Recognition();
  recognition.lang = language;
  recognition.interimResults = false;
  recognition.continuous = false;
  return recognition;
}

export type {
  BrowserSpeechRecognition,
  BrowserSpeechRecognitionErrorEvent,
  BrowserSpeechRecognitionEvent,
};
