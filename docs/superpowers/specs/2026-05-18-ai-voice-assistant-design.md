# Interglott AI Voice Assistant Design

Date: 2026-05-18
Status: Revised for Realtime AI provider support, implementation planning next

## Approved Starting Slice

Build the **Hybrid Foundation** approach with **Lessons + Chat Shell** as the first product slice.

The voice system must not be browser-native only. Browser speech APIs are acceptable only as a degraded fallback or local development convenience. The production architecture should treat Realtime AI providers as first-class adapters, especially OpenAI Realtime and Gemini Live.

The first version should make voice feel present and useful while preparing for real low-latency speech-to-speech interactions. It will use reusable voice UI, state hooks, and provider adapters. The system should support:

- OpenAI Realtime API for speech-to-speech tutor interactions.
- Gemini Live API for realtime voice interactions.
- A browser-native fallback for unsupported environments or development without provider keys.

## Product Goals

Users should be able to hear lesson content pronounced aloud, answer selected learning flows by microphone, and see their spoken words transcribed. The experience should feel like the beginning of a personal language tutor, while staying stable on mobile and preserving typed fallback paths.

Initial goals:

- Speak lesson questions, answer options, correct answers, and explanations.
- Add a microphone path for lesson answers where practical.
- Add AI chat audio playback and microphone input.
- Show both audio controls and visible text transcription in chat.
- Provide lightweight pronunciation feedback and a score in the first version.
- Keep all voice logic reusable for stories, TCF/TEF, and richer AI voice mode later.
- Keep provider keys off the client by using a backend token/session endpoint.

## First Surfaces

### Lesson Detail

Add speaker controls to:

- Exercise question text.
- Multiple-choice answer options.
- Correct answer feedback after a wrong answer.
- Completion or coaching text where useful.

Add microphone controls for answering:

- Fill-in-the-blank exercises can accept recognized speech as the answer.
- Multiple-choice exercises can use speech recognition to match the spoken option when confidence is reasonable, with tap fallback always available.

Lesson feedback should include:

- Recognized transcript.
- Lightweight pronunciation score.
- Friendly retry guidance when speech recognition fails.
- Replay button for the correct pronunciation.

### AI Chat Conversation

Add shared voice controls to the existing tutor chat:

- AI messages get speaker and replay controls.
- While speaking, show a compact waveform or pulsing voice indicator.
- User can tap a microphone button instead of typing.
- Recognized speech becomes the user message transcript.
- Chat bubbles should preserve text transcription beneath or inside the audio interaction, so the learner can read what was spoken.
- Typed input remains available as fallback.

The first version can work turn-by-turn in lessons, but chat should be architected for realtime provider sessions. If provider credentials are configured, AI Chat should use realtime audio input/output. If not, it should fall back to the non-streaming/browser-native mode while preserving the same UI.

## Voice Architecture

Create a small reusable voice layer:

- `VoiceProvider` or hook-level state for global settings.
- `useVoiceSession` for provider-backed realtime sessions.
- `useSpeechSynthesis` for text-to-speech playback through the active provider or fallback.
- `useSpeechRecognition` for microphone capture, transcript state, and fallback recognition.
- `usePronunciationFeedback` for provider scoring, heuristic fallback scoring, and future phoneme-level feedback.
- Reusable components:
  - `VoiceButton`
  - `MicButton`
  - `VoiceWaveform`
  - `VoiceTranscript`
  - `PronunciationFeedbackCard`
  - `VoiceSettingsControls`

Provider abstraction:

- OpenAI Realtime adapter for speech-to-speech sessions.
- Gemini Live adapter for realtime voice sessions.
- Browser adapter as fallback only.
- Shared interface should hide provider differences from lessons and chat.
- Provider choice should be configurable without rewriting UI surfaces.

## Realtime Provider Strategy

### OpenAI Realtime

OpenAI Realtime should be a first-class provider for conversational voice mode. Current OpenAI docs describe the Realtime API as supporting low-latency multimodal experiences with native speech-to-speech, audio/text inputs, and audio/text outputs. For browser clients, OpenAI recommends WebRTC for consistent performance and ephemeral/session credentials rather than exposing a standard API key in the client.

Reference docs:

- https://platform.openai.com/docs/guides/realtime/overview
- https://platform.openai.com/docs/guides/realtime-webrtc

Implementation implications:

- Add a backend endpoint or Supabase Edge Function that creates OpenAI realtime sessions/client secrets.
- The React client should connect through WebRTC for browser voice mode.
- Data channel events should provide transcript, response state, and tutor control events.
- API keys must stay server-side.

### Gemini Live

Gemini Live should also be a first-class provider option. Current Google AI docs describe the Gemini Live API as supporting low-latency realtime voice/video interactions, continuous audio/video/text streams, voice activity detection, session management, tool use/function calling, and ephemeral tokens for secure client-side authentication.

Reference docs:

- https://ai.google.dev/gemini-api/docs/live
- https://ai.google.dev/gemini-api/docs/live-guide

Implementation implications:

- Add a backend endpoint or Supabase Edge Function that mints Gemini Live ephemeral tokens or proxies session creation.
- The provider adapter should support WebRTC or WebSocket depending on SDK/runtime fit.
- Gemini-specific voice configuration should be isolated inside the adapter.
- API keys must stay server-side.

### Provider Selection

Provider order should be:

1. Configured realtime provider: OpenAI Realtime or Gemini Live.
2. Non-realtime cloud TTS/STT/scoring adapter if added later.
3. Browser-native fallback.

The UI should show provider availability in a developer-friendly way during early builds, but end users should only see clear fallback messages.

Suggested interface shape:

```ts
type VoiceLanguage = "fr-FR" | "es-ES" | "zh-CN" | "de-DE" | "ar-SA";

interface SpeechSynthesisRequest {
  text: string;
  language: VoiceLanguage;
  rate: number;
  voiceGender: "female" | "male";
}

interface RealtimeVoiceSessionConfig {
  provider: "openai-realtime" | "gemini-live" | "browser-fallback";
  language: VoiceLanguage;
  level: "beginner" | "intermediate" | "advanced";
  tutorInstructions: string;
}

interface SpeechRecognitionResult {
  transcript: string;
  confidence?: number;
}

interface PronunciationFeedback {
  score: number;
  pronunciation: string;
  fluency: string;
  grammar: string;
  naturalness: string;
  retryText?: string;
}
```

## Language Handling

Map Interglott learning languages to speech locale codes:

- French: `fr-FR`
- Spanish: `es-ES`
- Chinese: `zh-CN`
- German: `de-DE`
- Arabic: `ar-SA`
- TCF/TEF: use French `fr-FR`

When browser voices are missing or recognition is unsupported, show graceful fallback UI and keep typed/tap interactions working.

## Settings and Accessibility

Add user-facing voice settings:

- Playback speed: normal and slow.
- Voice preference: male/female where available.
- Volume.
- Mute.
- Unlimited replay.

Settings should persist locally with the existing localStorage-based user progress model.

## Backend and Secrets

The current app is a Vite frontend with Supabase integration. Realtime providers require a secure backend boundary before production use.

Recommended backend path:

- Use Supabase Edge Functions for provider session/token creation.
- Store provider API keys in Supabase secrets, not in `VITE_*` variables.
- Expose a narrow endpoint such as `/voice/session` that returns only short-lived ephemeral credentials or session metadata.
- Include provider, language, learner level, and requested mode in the session request.
- Keep lesson and chat UI provider-agnostic.

Local development can use a browser fallback when no backend provider is configured.

## Gamification

Integrate speaking practice with the existing XP and achievements model:

- Award small XP for first successful spoken lesson answer.
- Award chat XP only when a microphone response is submitted.
- Add future achievement definitions for:
  - First Speaking Exercise Completed.
  - 7 Day Speaking Streak.
  - Pronunciation Master.

Initial implementation may add the data hooks and one or two visible rewards without building a complete new streak subsystem.

## Error Handling

Speech recognition failures should produce calm, actionable prompts:

- “I could not hear you clearly. Please try again.”
- “Microphone access is blocked. Enable microphone permissions or type your answer.”
- “Voice playback is unavailable on this device. You can still read the text.”

No voice failure should block lesson completion or chat progress.

## Testing and Verification

Test the first implementation with:

- Unit tests for language-to-locale mapping and scoring helpers.
- Component-level checks for fallback states.
- Manual browser verification on `/lessons/:id` and `/conversation`.
- Mobile viewport review for control spacing and text wrapping.

Realtime speech APIs and browser speech APIs can be difficult to automate, so verification should include controlled manual checks and mockable voice adapters.

## Future Phases

Phase 2:

- Add story narration and dialogue replay.
- Add TCF/TEF oral expression practice.
- Add richer pronunciation badges and speaking streaks.

Phase 3:

- Add deeper pronunciation analysis and phoneme-level feedback.
- Add provider comparison and switching in admin/dev configuration.
- Add real-time conversational voice mode refinements such as interruption handling, barge-in, and lower-latency turn detection.
