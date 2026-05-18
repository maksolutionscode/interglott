import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useVoiceSettings } from "./useVoiceSettings";

const STORAGE_KEY = "interglott-voice-settings";

const defaultSettings = {
  provider: "browser-fallback",
  rate: 1,
  volume: 1,
  muted: false,
  voiceGender: "female",
};

describe("useVoiceSettings", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_VOICE_PROVIDER", "");
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllEnvs();
  });

  it("returns defaults when localStorage is empty", () => {
    const { result } = renderHook(() => useVoiceSettings());

    expect(result.current.settings).toEqual(defaultSettings);
  });

  it("uses a valid configured provider as the default provider", () => {
    vi.stubEnv("VITE_VOICE_PROVIDER", "gemini-live");

    const { result } = renderHook(() => useVoiceSettings());

    expect(result.current.settings.provider).toBe("gemini-live");
  });

  it("merges stored partial settings with defaults", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        rate: 0.8,
        muted: true,
      })
    );

    const { result } = renderHook(() => useVoiceSettings());

    expect(result.current.settings).toEqual({
      ...defaultSettings,
      rate: 0.8,
      muted: true,
    });
  });

  it("persists changed settings from updateSettings", () => {
    const { result } = renderHook(() => useVoiceSettings());

    act(() => {
      result.current.updateSettings({
        muted: true,
        rate: 0.9,
      });
    });

    expect(result.current.settings).toEqual({
      ...defaultSettings,
      muted: true,
      rate: 0.9,
    });
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}")).toEqual(
      result.current.settings
    );
  });

  it("clamps rate and volume", () => {
    const { result } = renderHook(() => useVoiceSettings());

    act(() => {
      result.current.updateSettings({
        rate: 2,
        volume: -1,
      });
    });

    expect(result.current.settings.rate).toBe(1.1);
    expect(result.current.settings.volume).toBe(0);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}")).toMatchObject({
      rate: 1.1,
      volume: 0,
    });
  });
});
