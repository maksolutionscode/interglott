import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { CreditsProvider } from "@/contexts/CreditsContext";
import { UserProgressProvider } from "@/contexts/UserProgressContext";

import StoryPlay from "./StoryPlay";

vi.mock("@/hooks/useVoiceSynthesis", () => ({
  useVoiceSynthesis: () => ({
    speak: vi.fn(),
    stop: vi.fn(),
    isSpeaking: false,
    error: null,
  }),
}));

function renderStory(id = "fr-airport") {
  localStorage.clear();
  return render(
    <UserProgressProvider>
      <CreditsProvider>
        <MemoryRouter initialEntries={[`/stories/${id}`]}>
          <Routes>
            <Route path="/stories/:id" element={<StoryPlay />} />
          </Routes>
        </MemoryRouter>
      </CreditsProvider>
    </UserProgressProvider>,
  );
}

describe("StoryPlay voice controls", () => {
  it("renders speaker controls for the story dialogue and response options", () => {
    renderStory();

    expect(screen.getAllByRole("button", { name: /play pronunciation/i }).length).toBeGreaterThan(1);
  });
});
