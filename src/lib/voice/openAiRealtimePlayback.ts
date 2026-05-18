import { requestRealtimeVoiceSession } from "./realtimeProvider";
import type { RealtimeVoiceSessionConfig, VoiceRequest } from "./types";
import { getPersonaInstructions } from "./voiceCatalog";

type RealtimeServerEvent = {
  type?: string;
  error?: {
    message?: string;
  };
  response?: {
    status?: string;
  };
};

interface RealtimePlaybackOptions {
  request: VoiceRequest;
  sessionConfig: Omit<RealtimeVoiceSessionConfig, "provider" | "language" | "mode">;
  voiceGender: "female" | "male";
  voiceName: RealtimeVoiceSessionConfig["voiceName"];
  voicePersona: RealtimeVoiceSessionConfig["voicePersona"];
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
  voiceName,
  voicePersona,
}: RealtimePlaybackOptions): Promise<void> {
  if (!canUseRealtimePlayback()) {
    throw new Error("Realtime playback is unavailable on this device.");
  }

  const sessionResult = await requestRealtimeVoiceSession({
    provider: "openai-realtime",
    language: request.language,
    mode: request.mode,
    voiceGender,
    voiceName,
    voicePersona,
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
      let audioStarted = false;
      let audioStopped = false;
      let responseCompleted = false;
      let settled = false;

      const timeoutId = window.setTimeout(() => {
        settled = true;
        reject(new Error("Realtime playback timed out."));
      }, 20000);

      const finish = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        resolve();
      };

      const fail = (message: string) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        reject(new Error(message));
      };

      const maybeFinish = () => {
        if (!responseCompleted) return;
        if (!audioStarted || audioStopped) {
          window.setTimeout(finish, 150);
        }
      };

      dataChannel.addEventListener("open", () => {
        dataChannel.send(
          JSON.stringify({
            type: "response.create",
            response: {
              output_modalities: ["audio"],
              instructions: [
                "Read the provided text out loud exactly as written.",
                "Do not translate, summarize, shorten, or continue the text.",
                "Preserve the original language of the text and pronounce the full text from start to finish.",
                getPersonaInstructions(voicePersona ?? "supportive-tutor"),
                `Text: """${request.text}"""`,
              ].join(" "),
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

        if (payload.type === "output_audio_buffer.started") {
          audioStarted = true;
          return;
        }

        if (payload.type === "output_audio_buffer.stopped") {
          audioStopped = true;
          maybeFinish();
          return;
        }

        if (payload.type === "response.done") {
          if (payload.response?.status && payload.response.status !== "completed") {
            fail(`Realtime playback ended with status "${payload.response.status}".`);
            return;
          }

          responseCompleted = true;
          maybeFinish();
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
