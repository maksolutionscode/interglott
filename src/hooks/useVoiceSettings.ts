import { useCallback, useEffect, useState } from "react";

import type { AiVoiceProvider, VoiceProvider, VoiceSettings } from "@/lib/voice/types";
import {
  getDefaultVoiceName,
  isVoiceNameInGenderGroup,
} from "@/lib/voice/voiceCatalog";

const STORAGE_KEY = "interglott-voice-settings";
const SETTINGS_EVENT = "interglott-voice-settings-change";
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

function getDefaultAiProvider(): AiVoiceProvider {
  const configuredProvider = getDefaultProvider();
  return configuredProvider === "browser-fallback" ? "openai-realtime" : configuredProvider;
}

function getDefaultSettings(): VoiceSettings {
  return {
    provider: getDefaultProvider(),
    aiProvider: getDefaultAiProvider(),
    rate: 1,
    volume: 1,
    muted: false,
    voiceGender: "female",
    voiceName: getDefaultVoiceName("female"),
    voicePersona: "supportive-tutor",
  };
}

function normalizeSettings(settings: VoiceSettings): VoiceSettings {
  const voiceGender = settings.voiceGender ?? "female";
  const aiProvider =
    settings.aiProvider === "gemini-live" || settings.aiProvider === "openai-realtime"
      ? settings.aiProvider
      : getDefaultAiProvider();
  const normalizedVoiceName = isVoiceNameInGenderGroup(settings.voiceName, voiceGender)
    ? settings.voiceName
    : getDefaultVoiceName(voiceGender);
  const provider =
    settings.provider === "browser-fallback"
      ? "browser-fallback"
      : aiProvider;

  return {
    ...settings,
    provider,
    aiProvider,
    rate: clamp(settings.rate, 0.65, 1.1),
    volume: clamp(settings.volume, 0, 1),
    voiceGender,
    voiceName: normalizedVoiceName,
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
    window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: settings }));
  }, [settings]);

  useEffect(() => {
    const syncSettings = (nextSettings: VoiceSettings) => {
      setSettings((currentSettings) => {
        const currentSerialized = JSON.stringify(currentSettings);
        const nextSerialized = JSON.stringify(nextSettings);
        return currentSerialized === nextSerialized ? currentSettings : nextSettings;
      });
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      syncSettings(loadSettings());
    };

    const handleSettingsEvent = (event: Event) => {
      const customEvent = event as CustomEvent<VoiceSettings>;
      if (!customEvent.detail) return;
      syncSettings(normalizeSettings(customEvent.detail));
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(SETTINGS_EVENT, handleSettingsEvent as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(SETTINGS_EVENT, handleSettingsEvent as EventListener);
    };
  }, []);

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
