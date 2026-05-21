import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MicButton } from "./MicButton";
import { PronunciationFeedbackCard } from "./PronunciationFeedbackCard";
import { VoiceButton } from "./VoiceButton";
import { VoiceSettingsControls } from "./VoiceSettingsControls";
import { VoiceTranscript } from "./VoiceTranscript";
import { VoiceWaveform } from "./VoiceWaveform";
import type { VoiceSettings } from "@/lib/voice/types";

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

describe("voice components", () => {
  it("renders an accessible voice playback button", () => {
    render(<VoiceButton isSpeaking={false} onSpeak={vi.fn()} />);

    expect(screen.getByRole("button", { name: /play pronunciation/i })).toBeInTheDocument();
  });

  it("renders microphone state labels", () => {
    const { rerender } = render(<MicButton isListening={false} onStart={vi.fn()} onStop={vi.fn()} />);

    expect(screen.getByRole("button", { name: /start speaking/i })).toBeInTheDocument();

    rerender(<MicButton isListening onStart={vi.fn()} onStop={vi.fn()} />);

    expect(screen.getByRole("button", { name: /stop listening/i })).toBeInTheDocument();
  });

  it("renders transcript and pronunciation feedback", () => {
    render(
      <>
        <VoiceTranscript transcript="bonjour david" />
        <PronunciationFeedbackCard
          feedback={{
            score: 82,
            pronunciation: "Good pronunciation.",
            fluency: "Smooth pacing.",
            grammar: "Correct structure.",
            naturalness: "Natural enough.",
            retryText: "Bonjour David",
          }}
        />
      </>
    );

    expect(screen.getByText("bonjour david")).toBeInTheDocument();
    expect(screen.getByText(/82%/)).toBeInTheDocument();
    expect(screen.getByText(/Bonjour David/)).toBeInTheDocument();
  });

  it("renders waveform bars while active", () => {
    render(<VoiceWaveform active />);

    expect(screen.getByLabelText(/voice activity/i)).toBeInTheDocument();
  });

  it("updates voice settings controls", () => {
    const updateSettings = vi.fn();
    render(<VoiceSettingsControls settings={settings} updateSettings={updateSettings} />);

    fireEvent.click(screen.getByRole("button", { name: /slow/i }));
    fireEvent.click(screen.getByRole("button", { name: /^male voice$/i }));
    fireEvent.click(screen.getByRole("switch", { name: /toggle browser fallback voice/i }));

    expect(updateSettings).toHaveBeenCalledWith({ rate: 0.75 });
    expect(updateSettings).toHaveBeenCalledWith({ voiceGender: "male", voiceName: "cedar" });
    expect(updateSettings).toHaveBeenCalledWith({ provider: "openai-realtime" });
    expect(screen.getByRole("switch", { name: /toggle browser fallback voice/i })).toBeInTheDocument();
  });
});
