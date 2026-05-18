import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { CreditsProvider } from "@/contexts/CreditsContext";
import { UserProgressProvider } from "@/contexts/UserProgressContext";
import ConversationLive from "./ConversationLive";

HTMLElement.prototype.scrollIntoView = vi.fn();

vi.mock("@/hooks/useVoiceSynthesis", () => ({
  useVoiceSynthesis: () => ({
    speak: vi.fn(),
    stop: vi.fn(),
    isSpeaking: false,
    error: null,
  }),
}));

vi.mock("@/hooks/useRealtimeConversationVoice", () => ({
  useRealtimeConversationVoice: () => ({
    error: null,
    isActive: false,
    isConnecting: false,
    start: vi.fn(),
    stop: vi.fn(),
  }),
}));

function renderConversationLive() {
  localStorage.clear();
  return render(
    <UserProgressProvider>
      <CreditsProvider>
        <MemoryRouter>
          <ConversationLive />
        </MemoryRouter>
      </CreditsProvider>
    </UserProgressProvider>,
  );
}

describe("ConversationLive voice controls", () => {
  it("renders a dedicated microphone control for live voice chat", () => {
    renderConversationLive();

    expect(screen.getByRole("button", { name: /start speaking/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /live voice chat/i })).toBeInTheDocument();
  });
});
