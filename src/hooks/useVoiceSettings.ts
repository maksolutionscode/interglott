import { useCallback, useEffect, useState } from "react";

import type { VoiceProvider, VoiceSettings } from "@/lib/voice/types";

const STORAGE_KEY = "interglott-voice-settings";
const VALID_PROVIDERS: VoiceProvider[] = [
  "openai-realtime",
  "gemini-live",
  "browser-fallback",
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getDefaultProvider(): VoiceProvider {
  const configuredProvider = import.meta.env.VITE_VOICE_PROVIDER;

  return VALID_PROVIDERS.includes(configuredProvider as VoiceProvider)
    ? (configuredProvider as VoiceProvider)
    : "browser-fallback";
}

function getDefaultSettings(): VoiceSettings {
  return {
    provider: getDefaultProvider(),
    rate: 1,
    volume: 1,
    muted: false,
    voiceGender: "female",
  };
}

function normalizeSettings(settings: VoiceSettings): VoiceSettings {
  return {
    ...settings,
    rate: clamp(settings.rate, 0.65, 1.1),
    volume: clamp(settings.volume, 0, 1),
  };
}

function loadSettings(): VoiceSettings {
  try {
    const storedSettings = localStorage.getItem(STORAGE_KEY);

    if (!storedSettings) {
      return getDefaultSettings();
    }

    return normalizeSettings({
      ...getDefaultSettings(),
      ...JSON.parse(storedSettings),
    });
  } catch {
    return getDefaultSettings();
  }
}

export function useVoiceSettings() {
  const [settings, setSettings] = useState<VoiceSettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((changes: Partial<VoiceSettings>) => {
    setSettings((currentSettings) =>
      normalizeSettings({
        ...currentSettings,
        ...changes,
      })
    );
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(getDefaultSettings());
  }, []);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
