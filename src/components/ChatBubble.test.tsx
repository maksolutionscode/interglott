import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChatBubble } from "./ChatBubble";

describe("ChatBubble", () => {
  it("renders audio controls for voice messages while keeping transcript text visible", () => {
    const { container } = render(
      <ChatBubble
        message="Bonjour, comment allez-vous ?"
        transcript="Hello, how are you?"
        audioUrl="blob:voice-message"
        isUser
        timestamp="10:12 PM"
      />,
    );

    expect(container.querySelector("audio")).toBeTruthy();
    expect(screen.getByRole("button", { name: /play voice message/i })).toBeInTheDocument();
    expect(screen.getByText(/bonjour, comment allez-vous/i)).toBeInTheDocument();
    expect(screen.getByText(/hello, how are you/i)).toBeInTheDocument();
  });
});
