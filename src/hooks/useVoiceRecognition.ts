import { useCallback, useRef, useState } from "react";

import {
  createBrowserRecognition,
  type BrowserSpeechRecognition,
  type BrowserSpeechRecognitionEvent,
} from "@/lib/voice/browserVoiceAdapter";
import type { VoiceLanguage } from "@/lib/voice/types";

interface UseVoiceRecognitionOptions {
  language: VoiceLanguage;
}

interface VoiceCapture {
  id: string;
  transcript: string;
  confidence?: number;
  audioUrl?: string;
  mimeType?: string;
}

function extractTranscript(event: BrowserSpeechRecognitionEvent): {
  transcript: string;
  confidence?: number;
} {
  const result = event.results.item(0)?.item(0);
  return {
    transcript: result?.transcript?.trim() ?? "",
    confidence: result?.confidence,
  };
}

export function useVoiceRecognition({ language }: UseVoiceRecognitionOptions) {
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const transcriptRef = useRef("");
  const confidenceRef = useRef<number | undefined>();
  const pendingFinalizeRef = useRef(false);
  const nextCaptureIdRef = useRef(0);
  const activeSessionIdRef = useRef(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState<number | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [completedCapture, setCompletedCapture] = useState<VoiceCapture | null>(null);

  const finalizeCapture = useCallback((audioBlob?: Blob) => {
    const trimmedTranscript = transcriptRef.current.trim();
    if (!trimmedTranscript) return;

    const audioUrl = audioBlob ? URL.createObjectURL(audioBlob) : undefined;
    setCompletedCapture({
      id: `voice-capture-${nextCaptureIdRef.current++}`,
      transcript: trimmedTranscript,
      confidence: confidenceRef.current,
      audioUrl,
      mimeType: audioBlob?.type || undefined,
    });
  }, []);

  const stop = useCallback(() => {
    activeSessionIdRef.current += 1;
    recognitionRef.current?.stop();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      pendingFinalizeRef.current = true;
      mediaRecorderRef.current.stop();
    } else {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsListening(false);
  }, []);

  const clearCapture = useCallback(() => {
    setCompletedCapture(null);
    setTranscript("");
    transcriptRef.current = "";
    setConfidence(undefined);
    confidenceRef.current = undefined;
  }, []);

  const start = useCallback(() => {
    const sessionId = activeSessionIdRef.current + 1;
    activeSessionIdRef.current = sessionId;
    setError(null);
    setTranscript("");
    transcriptRef.current = "";
    setConfidence(undefined);
    confidenceRef.current = undefined;
    setCompletedCapture(null);
    audioChunksRef.current = [];
    pendingFinalizeRef.current = false;
    const recognition = createBrowserRecognition(language);

    if (!recognition) {
      setError("Microphone speech recognition is unavailable on this device.");
      return;
    }

    recognition.onresult = (event) => {
      const result = extractTranscript(event);
      setTranscript(result.transcript);
      transcriptRef.current = result.transcript;
      setConfidence(result.confidence);
      confidenceRef.current = result.confidence;
    };
    recognition.onerror = () => {
      activeSessionIdRef.current += 1;
      setError("I could not hear you clearly. Please try again.");
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        pendingFinalizeRef.current = false;
        mediaRecorderRef.current.stop();
      } else {
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        pendingFinalizeRef.current = true;
        mediaRecorderRef.current.stop();
        return;
      }

      finalizeCapture();
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();

    if (
      typeof navigator !== "undefined" &&
      navigator.mediaDevices?.getUserMedia &&
      typeof MediaRecorder !== "undefined"
    ) {
      void navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          if (activeSessionIdRef.current !== sessionId) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }

          mediaStreamRef.current = stream;
          const recorder = new MediaRecorder(stream);
          mediaRecorderRef.current = recorder;
          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data);
            }
          };
          recorder.onstop = () => {
            const audioBlob =
              audioChunksRef.current.length > 0
                ? new Blob(audioChunksRef.current, {
                    type: recorder.mimeType || "audio/webm",
                  })
                : undefined;

            mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
            mediaStreamRef.current = null;
            mediaRecorderRef.current = null;
            audioChunksRef.current = [];

            if (pendingFinalizeRef.current) {
              pendingFinalizeRef.current = false;
              finalizeCapture(audioBlob);
            }
          };
          recorder.start();
        })
        .catch(() => {
          mediaRecorderRef.current = null;
          mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
        });
    }
  }, [finalizeCapture, language]);

  return {
    start,
    stop,
    clearCapture,
    isListening,
    transcript,
    confidence,
    error,
    completedCapture,
  };
}
