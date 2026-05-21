import { afterEach, describe, expect, it, vi } from "vitest";
import {
  canUseBrowserSpeechRecognition,
  canUseBrowserSpeechSynthesis,
  createBrowserRecognition,
  speakWithBrowser,
} from "./browserVoiceAdapter";
import type { VoiceSettings } from "./types";

const settings: VoiceSettings = {
  provider: "browser-fallback",
  aiProvider: "openai-realtime",
  rate: 1,
  volume: 1,
  muted: false,
  voiceGender: "female",
  voiceName: "marin",
  voicePersona: "supportive-tutor",
};

describe("browserVoiceAdapter", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(window, "speechSynthesis");
    Reflect.deleteProperty(window, "SpeechRecognition");
    Reflect.deleteProperty(window, "webkitSpeechRecognition");
  });

  it("reports unavailable browser speech APIs without throwing", () => {
    expect(canUseBrowserSpeechSynthesis()).toBe(false);
    expect(canUseBrowserSpeechRecognition()).toBe(false);
    expect(createBrowserRecognition("fr-FR")).toBeNull();
  });

  it("speaks with browser speech synthesis when available", async () => {
    class MockSpeechSynthesisUtterance {
      lang = "";
      onend: ((event: SpeechSynthesisEvent) => void) | null = null;
      onerror: ((event: SpeechSynthesisErrorEvent) => void) | null = null;
      rate = 1;
      text: string;
      voice: SpeechSynthesisVoice | null = null;
      volume = 1;

      constructor(text: string) {
        this.text = text;
      }
    }

    vi.stubGlobal("SpeechSynthesisUtterance", MockSpeechSynthesisUtterance);

    const speak = vi.fn((utterance: SpeechSynthesisUtterance) => {
      utterance.onend?.({} as SpeechSynthesisEvent);
    });

    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        cancel: vi.fn(),
        getVoices: vi.fn(() => []),
        speak,
      },
    });

    await expect(
      speakWithBrowser(
        { text: "Bonjour", language: "fr-FR", mode: "lesson" },
        settings
      )
    ).resolves.toBeUndefined();

    expect(speak).toHaveBeenCalledTimes(1);
    const utterance = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.text).toBe("Bonjour");
    expect(utterance.lang).toBe("fr-FR");
  });

  it("prefers a female browser voice when female fallback is selected", async () => {
    class MockSpeechSynthesisUtterance {
      lang = "";
      onend: ((event: SpeechSynthesisEvent) => void) | null = null;
      onerror: ((event: SpeechSynthesisErrorEvent) => void) | null = null;
      rate = 1;
      text: string;
      voice: SpeechSynthesisVoice | null = null;
      volume = 1;

      constructor(text: string) {
        this.text = text;
      }
    }

    vi.stubGlobal("SpeechSynthesisUtterance", MockSpeechSynthesisUtterance);

    const speak = vi.fn((utterance: SpeechSynthesisUtterance) => {
      utterance.onend?.({} as SpeechSynthesisEvent);
    });

    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        cancel: vi.fn(),
        getVoices: vi.fn(() => [
          { name: "Microsoft David", voiceURI: "microsoft-david", lang: "fr-FR", localService: true },
          { name: "Microsoft Hortense", voiceURI: "microsoft-hortense", lang: "fr-FR", localService: true },
        ]),
        speak,
      },
    });

    await speakWithBrowser({ text: "Bonjour", language: "fr-FR", mode: "lesson" }, settings);

    const utterance = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.voice?.name).toBe("Microsoft Hortense");
  });

  it("prefers a male browser voice when male fallback is selected", async () => {
    class MockSpeechSynthesisUtterance {
      lang = "";
      onend: ((event: SpeechSynthesisEvent) => void) | null = null;
      onerror: ((event: SpeechSynthesisErrorEvent) => void) | null = null;
      rate = 1;
      text: string;
      voice: SpeechSynthesisVoice | null = null;
      volume = 1;

      constructor(text: string) {
        this.text = text;
      }
    }

    vi.stubGlobal("SpeechSynthesisUtterance", MockSpeechSynthesisUtterance);

    const speak = vi.fn((utterance: SpeechSynthesisUtterance) => {
      utterance.onend?.({} as SpeechSynthesisEvent);
    });

    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        cancel: vi.fn(),
        getVoices: vi.fn(() => [
          { name: "Microsoft Amelie", voiceURI: "microsoft-amelie", lang: "fr-FR", localService: true },
          { name: "Microsoft Henri", voiceURI: "microsoft-henri", lang: "fr-FR", localService: true },
        ]),
        speak,
      },
    });

    await speakWithBrowser(
      { text: "Bonjour", language: "fr-FR", mode: "lesson" },
      { ...settings, voiceGender: "male", voiceName: "cedar" }
    );

    const utterance = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.voice?.name).toBe("Microsoft Henri");
  });

  it("creates browser speech recognition with the requested language", () => {
    class MockRecognition {
      lang = "";
      interimResults = true;
      continuous = true;
    }

    Object.defineProperty(window, "SpeechRecognition", {
      configurable: true,
      value: MockRecognition,
    });

    const recognition = createBrowserRecognition("de-DE");

    expect(recognition).toBeInstanceOf(MockRecognition);
    expect(recognition?.lang).toBe("de-DE");
    expect(recognition?.interimResults).toBe(false);
    expect(recognition?.continuous).toBe(false);
  });
});
