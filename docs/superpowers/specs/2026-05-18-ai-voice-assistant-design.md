# Interglott AI Voice Assistant Design

Date: 2026-05-18
Status: Approved direction, implementation planning next

## Approved Starting Slice

Build the **Hybrid Foundation** approach with **Lessons + Chat Shell** as the first product slice.

The first version should make voice feel present and useful without requiring a full AI speech backend on day one. It will use reusable voice UI, state hooks, and provider adapters. The default adapter can use browser-native speech APIs where available, while the architecture remains ready for a later backend provider for high-quality text-to-speech, speech-to-text, conversational AI, and pronunciation scoring.

## Product Goals

Users should be able to hear lesson content pronounced aloud, answer selected learning flows by microphone, and see their spoken words transcribed. The experience should feel like the beginning of a personal language tutor, while staying stable on mobile and preserving typed fallback paths.

Initial goals:

- Speak lesson questions, answer options, correct answers, and explanations.
- Add a microphone path for lesson answers where practical.
- Add AI chat audio playback and microphone input.
- Show both audio controls and visible text transcription in chat.
- Provide lightweight pronunciation feedback and a score in the first version.
- Keep all voice logic reusable for stories, TCF/TEF, and richer AI voice mode later.

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

The first version should not require true streaming conversation. It should feel responsive, but can work turn-by-turn: AI prompt text is spoken, user records a response, transcript is evaluated, feedback is shown.

## Voice Architecture

Create a small reusable voice layer:

- `VoiceProvider` or hook-level state for global settings.
- `useSpeechSynthesis` for text-to-speech playback.
- `useSpeechRecognition` for microphone capture and transcript state.
- `usePronunciationFeedback` for lightweight local scoring and future provider scoring.
- Reusable components:
  - `VoiceButton`
  - `MicButton`
  - `VoiceWaveform`
  - `VoiceTranscript`
  - `PronunciationFeedbackCard`
  - `VoiceSettingsControls`

Provider abstraction:

- Browser adapter for initial implementation.
- Future AI adapter for backend TTS/STT/scoring.
- Shared interface should hide provider differences from lessons and chat.

Suggested interface shape:

```ts
type VoiceLanguage = "fr-FR" | "es-ES" | "zh-CN" | "de-DE" | "ar-SA";

interface SpeechSynthesisRequest {
  text: string;
  language: VoiceLanguage;
  rate: number;
  voiceGender: "female" | "male";
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

Browser speech APIs can be difficult to automate, so verification should include controlled manual checks and mockable voice adapters.

## Future Phases

Phase 2:

- Add story narration and dialogue replay.
- Add TCF/TEF oral expression practice.
- Add richer pronunciation badges and speaking streaks.

Phase 3:

- Add backend AI speech provider.
- Add high-quality native voices.
- Add true pronunciation analysis and phoneme-level feedback.
- Add real-time conversational voice mode with streaming if latency is acceptable.
