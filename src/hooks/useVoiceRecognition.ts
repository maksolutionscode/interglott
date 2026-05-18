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
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState<number | undefined>();
  const [error, setError] = useState<string | null>(null);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const start = useCallback(() => {
    setError(null);
    const recognition = createBrowserRecognition(language);

    if (!recognition) {
      setError("Microphone speech recognition is unavailable on this device.");
      return;
    }

    recognition.onresult = (event) => {
      const result = extractTranscript(event);
      setTranscript(result.transcript);
      setConfidence(result.confidence);
    };
    recognition.onerror = () => {
      setError("I could not hear you clearly. Please try again.");
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  }, [language]);

  return { start, stop, isListening, transcript, confidence, error };
}
