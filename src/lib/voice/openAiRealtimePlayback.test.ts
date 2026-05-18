import { beforeEach, describe, expect, it, vi } from "vitest";

import { requestRealtimeVoiceSession } from "./realtimeProvider";
import { speakWithOpenAiRealtime } from "./openAiRealtimePlayback";

vi.mock("./realtimeProvider", () => ({
  requestRealtimeVoiceSession: vi.fn(),
}));

class MockAudio {
  autoplay = false;
  srcObject: unknown = null;
  play = vi.fn(() => Promise.resolve());
  pause = vi.fn();
}

class MockRTCDataChannel extends EventTarget {
  send = vi.fn();
  close = vi.fn();
}

let lastDataChannel: MockRTCDataChannel | null = null;
let lastPeerConnection: MockRTCPeerConnection | null = null;

async function waitForPlaybackSetup() {
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));
}

class MockRTCPeerConnection {
  ontrack: ((event: RTCTrackEvent) => void) | null = null;
  close = vi.fn();
  addTransceiver = vi.fn();

  createDataChannel() {
    lastDataChannel = new MockRTCDataChannel();
    return lastDataChannel as unknown as RTCDataChannel;
  }

  async createOffer() {
    return { sdp: "offer-sdp", type: "offer" as const };
  }

  async setLocalDescription() {
    return undefined;
  }

  async setRemoteDescription() {
    this.ontrack?.({ streams: [{} as MediaStream] } as unknown as RTCTrackEvent);
    return undefined;
  }
}

describe("openAiRealtimePlayback", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    lastDataChannel = null;
    lastPeerConnection = null;

    vi.stubGlobal("Audio", MockAudio);
    vi.stubGlobal(
      "RTCPeerConnection",
      vi.fn(() => {
        lastPeerConnection = new MockRTCPeerConnection();
        return lastPeerConnection as unknown as RTCPeerConnection;
      }),
    );
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 201,
        text: async () => "answer-sdp",
      })),
    );

    vi.mocked(requestRealtimeVoiceSession).mockResolvedValue({
      ok: true,
      provider: "openai-realtime",
      session: { clientSecret: "client-secret" },
    });
  });

  it("waits for the output audio buffer to stop before finishing playback", async () => {
    const playbackPromise = speakWithOpenAiRealtime({
      request: {
        text: "Hello, how are you doing?",
        language: "en-US",
        mode: "chat",
      },
      sessionConfig: {
        learningLanguage: "french",
        level: "beginner",
        tutorInstructions: "Read the message exactly.",
      },
      voiceGender: "female",
      voiceName: "marin",
      voicePersona: "supportive-tutor",
    });

    await waitForPlaybackSetup();

    lastDataChannel?.dispatchEvent(new Event("open"));
    lastDataChannel?.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "output_audio_buffer.started" }),
      }),
    );
    lastDataChannel?.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "response.done",
          response: { status: "completed" },
        }),
      }),
    );

    let resolved = false;
    void playbackPromise.then(() => {
      resolved = true;
    });

    await waitForPlaybackSetup();
    expect(resolved).toBe(false);

    lastDataChannel?.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({ type: "output_audio_buffer.stopped" }),
      }),
    );

    await playbackPromise;

    expect(lastPeerConnection?.close).toHaveBeenCalled();
  });

  it("tells the model to preserve the full original text verbatim", async () => {
    const playbackPromise = speakWithOpenAiRealtime({
      request: {
        text: "Hello",
        language: "en-US",
        mode: "lesson",
      },
      sessionConfig: {
        learningLanguage: "french",
        level: "beginner",
        tutorInstructions: "Read the lesson option.",
      },
      voiceGender: "female",
      voiceName: "marin",
      voicePersona: "supportive-tutor",
    });

    await waitForPlaybackSetup();
    lastDataChannel?.dispatchEvent(new Event("open"));

    const payload = JSON.parse(
      (lastDataChannel?.send as ReturnType<typeof vi.fn>).mock.calls[0][0] as string,
    );

    expect(payload.response.instructions).toContain("Do not translate");
    expect(payload.response.instructions).toContain('Text: """Hello"""');

    lastDataChannel?.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "response.done",
          response: { status: "completed" },
        }),
      }),
    );

    await playbackPromise;
  });
});
