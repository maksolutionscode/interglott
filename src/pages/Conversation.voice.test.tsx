import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { CreditsProvider } from "@/contexts/CreditsContext";
import { UserProgressProvider } from "@/contexts/UserProgressContext";
import Conversation from "./Conversation";

HTMLElement.prototype.scrollIntoView = vi.fn();

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

function renderConversation() {
  localStorage.clear();
  return render(
    <UserProgressProvider>
      <CreditsProvider>
        <MemoryRouter>
          <Conversation />
        </MemoryRouter>
      </CreditsProvider>
    </UserProgressProvider>
  );
}

describe("Conversation voice controls", () => {
  it("renders a microphone control for spoken chat answers", () => {
    renderConversation();

    expect(screen.getByRole("button", { name: /start speaking/i })).toBeInTheDocument();
  });

  it("renders speaker controls for tutor messages", () => {
    renderConversation();

    expect(screen.getAllByRole("button", { name: /play pronunciation/i }).length).toBeGreaterThan(0);
  });
});
