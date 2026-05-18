import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreditsProvider } from "@/contexts/CreditsContext";
import { UserProgressProvider } from "@/contexts/UserProgressContext";
import LessonDetail from "./LessonDetail";

const speakMock = vi.fn(() => new Promise(() => {}));

vi.mock("@/hooks/useVoiceSynthesis", () => ({
  useVoiceSynthesis: () => ({
    speak: speakMock,
    stop: vi.fn(),
    isSpeaking: true,
    error: null,
  }),
}));

vi.mock("@/hooks/useVoiceRecognition", () => ({
  useVoiceRecognition: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    isListening: false,
    transcript: "",
    confidence: undefined,
    error: null,
  }),
}));

function renderLesson(id = "greetings") {
  localStorage.clear();
  return render(
    <UserProgressProvider>
      <CreditsProvider>
        <MemoryRouter initialEntries={[`/lessons/${id}`]}>
          <Routes>
            <Route path="/lessons/:id" element={<LessonDetail />} />
          </Routes>
        </MemoryRouter>
      </CreditsProvider>
    </UserProgressProvider>
  );
}

describe("LessonDetail voice controls", () => {
  beforeEach(() => {
    speakMock.mockClear();
  });

  it("renders speaker controls only for multiple-choice options", () => {
    renderLesson();

    expect(screen.getAllByRole("button", { name: /play pronunciation/i })).toHaveLength(4);
  });

  it("does not render a microphone control in the lesson question card", () => {
    renderLesson();

    expect(screen.queryByRole("button", { name: /start speaking/i })).not.toBeInTheDocument();
  });

  it("only highlights the clicked speaker control", () => {
    renderLesson();

    const buttons = screen.getAllByRole("button", { name: /play pronunciation/i });
    fireEvent.click(buttons[1]);

    expect(buttons[1].className).toContain("glow-accent");
    expect(buttons[0].className).not.toContain("glow-accent");
    expect(buttons[2].className).not.toContain("glow-accent");
  });
});
