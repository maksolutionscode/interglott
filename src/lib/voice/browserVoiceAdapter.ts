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

function pickVoice(language: VoiceLanguage, voiceGender: VoiceSettings["voiceGender"]) {
  const voices = window.speechSynthesis.getVoices();
  const languageVoices = voices.filter((voice) => voice.lang.startsWith(language));
  const genderHint = voiceGender === "female" ? /female|woman|zira|samantha|amelie/i : /male|man|david|daniel/i;

  return (
    languageVoices.find((voice) => genderHint.test(`${voice.name} ${voice.voiceURI}`)) ??
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
    utterance.voice = pickVoice(request.language, settings.voiceGender);
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
