import { useCallback, useEffect, useRef, useState } from "react";

import { requestRealtimeVoiceSession } from "@/lib/voice/realtimeProvider";
import type { RealtimeVoiceSessionConfig } from "@/lib/voice/types";

type RealtimeServerEvent = {
  type?: string;
  transcript?: string;
  text?: string;
  error?: {
    message?: string;
  };
};

interface UserRealtimeTurn {
  transcript: string;
  audioUrl?: string;
}

interface UseRealtimeConversationVoiceOptions {
  config: RealtimeVoiceSessionConfig;
  enabled: boolean;
  onAssistantTranscript: (transcript: string) => void;
  onUserTranscript: (turn: UserRealtimeTurn) => void;
}

function canUseRealtimeBrowserApis() {
  return (
    typeof window !== "undefined" &&
    typeof RTCPeerConnection !== "undefined" &&
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia)
  );
}

export function useRealtimeConversationVoice({
  config,
  enabled,
  onAssistantTranscript,
  onUserTranscript,
}: UseRealtimeConversationVoiceOptions) {
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const activeTurnRecorderRef = useRef<{
    recorder: MediaRecorder;
    stream: MediaStream;
  } | null>(null);
  const pendingTurnAudioRef = useRef<Promise<string | undefined>[]>([]);

  const stop = useCallback(() => {
    dataChannelRef.current?.close();
    dataChannelRef.current = null;

    if (activeTurnRecorderRef.current?.recorder.state !== "inactive") {
      activeTurnRecorderRef.current?.recorder.stop();
    }
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;

    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;

    if (remoteAudioRef.current) {
      remoteAudioRef.current.pause();
      remoteAudioRef.current.srcObject = null;
      remoteAudioRef.current = null;
    }

    setIsActive(false);
    setIsConnecting(false);
  }, []);

  const startUserTurnRecording = useCallback(() => {
    if (
      typeof MediaRecorder === "undefined" ||
      activeTurnRecorderRef.current ||
      !localStreamRef.current
    ) {
      return;
    }

    const sourceTrack = localStreamRef.current.getAudioTracks()[0];
    if (!sourceTrack) return;

    const stream = new MediaStream([sourceTrack.clone()]);
    const chunks: Blob[] = [];
    let resolveAudio: (audioUrl?: string) => void = () => undefined;
    const audioPromise = new Promise<string | undefined>((resolve) => {
      resolveAudio = resolve;
    });

    pendingTurnAudioRef.current.push(audioPromise);

    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    recorder.onstop = () => {
      const mimeType = recorder.mimeType || "audio/webm";
      const audioBlob = chunks.length > 0 ? new Blob(chunks, { type: mimeType }) : undefined;
      resolveAudio(audioBlob ? URL.createObjectURL(audioBlob) : undefined);
      stream.getTracks().forEach((track) => track.stop());

      if (activeTurnRecorderRef.current?.recorder === recorder) {
        activeTurnRecorderRef.current = null;
      }
    };

    activeTurnRecorderRef.current = { recorder, stream };
    recorder.start();
  }, []);

  const stopUserTurnRecording = useCallback(() => {
    const activeRecorder = activeTurnRecorderRef.current?.recorder;
    if (activeRecorder && activeRecorder.state !== "inactive") {
      activeRecorder.stop();
    }
  }, []);

  const handleServerEvent = useCallback(
    async (event: RealtimeServerEvent) => {
      switch (event.type) {
        case "input_audio_buffer.speech_started":
          startUserTurnRecording();
          return;
        case "input_audio_buffer.speech_stopped":
          stopUserTurnRecording();
          return;
        case "conversation.item.input_audio_transcription.completed":
          if (event.transcript?.trim()) {
            const nextAudio = pendingTurnAudioRef.current.shift();
            onUserTranscript({
              transcript: event.transcript.trim(),
              audioUrl: nextAudio ? await nextAudio : undefined,
            });
          }
          return;
        case "response.output_audio_transcript.done":
          if (event.transcript?.trim()) {
            onAssistantTranscript(event.transcript.trim());
          }
          return;
        case "response.output_text.done":
          if (event.text?.trim()) {
            onAssistantTranscript(event.text.trim());
          }
          return;
        case "error":
          setError(event.error?.message ?? "Realtime voice session failed.");
          return;
        default:
          return;
      }
    },
    [onAssistantTranscript, onUserTranscript, startUserTurnRecording, stopUserTurnRecording]
  );

  const start = useCallback(async () => {
    if (!enabled || isConnecting || isActive) return false;

    if (!canUseRealtimeBrowserApis()) {
      setError("Realtime voice needs microphone and WebRTC support on this device.");
      return false;
    }

    setError(null);
    setIsConnecting(true);

    try {
      const result = await requestRealtimeVoiceSession(config);

      if (result.ok === false) {
        setError(result.reason);
        setIsConnecting(false);
        return false;
      }

      const clientSecret =
        typeof result.session === "object" &&
        result.session !== null &&
        "clientSecret" in result.session &&
        typeof result.session.clientSecret === "string"
          ? result.session.clientSecret
          : null;

      if (!clientSecret) {
        throw new Error("Realtime session did not provide a client secret.");
      }

      const peerConnection = new RTCPeerConnection();
      const remoteAudio = new Audio();
      remoteAudio.autoplay = true;

      peerConnection.ontrack = (event) => {
        remoteAudio.srcObject = event.streams[0];
        void remoteAudio.play().catch(() => undefined);
      };

      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

      const dataChannel = peerConnection.createDataChannel("oai-events");
      dataChannel.addEventListener("open", () => {
        dataChannel.send(
          JSON.stringify({
            type: "session.update",
            session: {
              type: "realtime",
              audio: {
                input: {
                  turn_detection: {
                    type: "semantic_vad",
                    eagerness: "low",
                    create_response: true,
                    interrupt_response: true,
                  },
                },
              },
            },
          }),
        );
      });
      dataChannel.addEventListener("message", (event) => {
        let payload: RealtimeServerEvent;
        try {
          payload = JSON.parse(event.data) as RealtimeServerEvent;
        } catch {
          setError("Received an unreadable realtime event.");
          return;
        }

        void handleServerEvent(payload);
      });

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
        throw new Error(`Realtime SDP exchange failed (${sdpResponse.status}).`);
      }

      const answer = {
        type: "answer" as const,
        sdp: await sdpResponse.text(),
      };

      await peerConnection.setRemoteDescription(answer);

      peerConnectionRef.current = peerConnection;
      dataChannelRef.current = dataChannel;
      localStreamRef.current = localStream;
      remoteAudioRef.current = remoteAudio;

      setIsActive(true);
      setIsConnecting(false);
      return true;
    } catch (err) {
      stop();
      setError(err instanceof Error ? err.message : "Realtime voice session failed.");
      return false;
    }
  }, [config, enabled, handleServerEvent, isActive, isConnecting, stop]);

  useEffect(() => stop, [stop]);

  return {
    error,
    isActive,
    isConnecting,
    start,
    stop,
  };
}
