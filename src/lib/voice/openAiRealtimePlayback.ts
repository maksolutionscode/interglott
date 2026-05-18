import { requestRealtimeVoiceSession } from "./realtimeProvider";
import type { RealtimeVoiceSessionConfig, VoiceRequest } from "./types";

type RealtimeServerEvent = {
  type?: string;
  error?: {
    message?: string;
  };
};

interface RealtimePlaybackOptions {
  request: VoiceRequest;
  sessionConfig: Omit<RealtimeVoiceSessionConfig, "provider" | "language" | "mode">;
  voiceGender: "female" | "male";
}

function canUseRealtimePlayback() {
  return (
    typeof window !== "undefined" &&
    typeof RTCPeerConnection !== "undefined" &&
    typeof Audio !== "undefined" &&
    typeof fetch !== "undefined"
  );
}

export async function speakWithOpenAiRealtime({
  request,
  sessionConfig,
  voiceGender,
}: RealtimePlaybackOptions): Promise<void> {
  if (!canUseRealtimePlayback()) {
    throw new Error("Realtime playback is unavailable on this device.");
  }

  const sessionResult = await requestRealtimeVoiceSession({
    provider: "openai-realtime",
    language: request.language,
    mode: request.mode,
    voiceGender,
    ...sessionConfig,
  });

  if (sessionResult.ok === false) {
    throw new Error(sessionResult.reason);
  }

  const session =
    typeof sessionResult.session === "object" && sessionResult.session !== null
      ? sessionResult.session
      : null;

  const clientSecret =
    session && "clientSecret" in session && typeof session.clientSecret === "string"
      ? session.clientSecret
      : null;

  if (!clientSecret) {
    throw new Error("Realtime playback session did not provide a client secret.");
  }

  const peerConnection = new RTCPeerConnection();
  const dataChannel = peerConnection.createDataChannel("oai-events");
  const remoteAudio = new Audio();
  remoteAudio.autoplay = true;

  peerConnection.addTransceiver("audio", { direction: "recvonly" });
  peerConnection.ontrack = (event) => {
    remoteAudio.srcObject = event.streams[0];
    void remoteAudio.play().catch(() => undefined);
  };

  const cleanup = () => {
    dataChannel.close();
    peerConnection.close();
    remoteAudio.pause();
    remoteAudio.srcObject = null;
  };

  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      body: offer.sdp,
      headers: {
        Authorization: `Bearer ${clientSecret}`,
        "Content-Type": "application/sdp",
      },
    });

    if (!sdpResponse.ok) {
      throw new Error(`Realtime playback SDP exchange failed (${sdpResponse.status}).`);
    }

    await peerConnection.setRemoteDescription({
      type: "answer",
      sdp: await sdpResponse.text(),
    });

    await new Promise<void>((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        reject(new Error("Realtime playback timed out."));
      }, 20000);

      const finish = () => {
        window.clearTimeout(timeoutId);
        resolve();
      };

      const fail = (message: string) => {
        window.clearTimeout(timeoutId);
        reject(new Error(message));
      };

      dataChannel.addEventListener("open", () => {
        dataChannel.send(
          JSON.stringify({
            type: "response.create",
            response: {
              output_modalities: ["audio"],
              instructions: `Pronounce the following exactly and naturally in ${request.language}: ${request.text}`,
            },
          }),
        );
      });

      dataChannel.addEventListener("message", (event) => {
        let payload: RealtimeServerEvent;
        try {
          payload = JSON.parse(event.data) as RealtimeServerEvent;
        } catch {
          return;
        }

        if (payload.type === "error") {
          fail(payload.error?.message ?? "Realtime playback failed.");
          return;
        }

        if (payload.type === "response.done") {
          finish();
        }
      });

      dataChannel.addEventListener("error", () => {
        fail("Realtime playback data channel failed.");
      });
    });
  } finally {
    cleanup();
  }
}
