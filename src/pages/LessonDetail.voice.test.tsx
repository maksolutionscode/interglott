import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { CreditsProvider } from "@/contexts/CreditsContext";
import { UserProgressProvider } from "@/contexts/UserProgressContext";
import LessonDetail from "./LessonDetail";

vi.mock("@/hooks/useVoiceSynthesis", () => ({
  useVoiceSynthesis: () => ({
    speak: vi.fn(),
    stop: vi.fn(),
    isSpeaking: false,
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
  it("renders speaker controls for the question and answer options", () => {
    renderLesson();

    expect(screen.getAllByRole("button", { name: /play pronunciation/i }).length).toBeGreaterThan(1);
  });

  it("renders a microphone control for spoken answers", () => {
    renderLesson();

    expect(screen.getByRole("button", { name: /start speaking/i })).toBeInTheDocument();
  });
});
