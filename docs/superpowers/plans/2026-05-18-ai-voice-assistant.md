# AI Voice Assistant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a provider-ready AI voice foundation to Interglott, starting with lesson voice controls and an AI chat voice/transcript shell that can use OpenAI Realtime, Gemini Live, or browser fallback.

**Architecture:** Build a reusable voice module with provider-neutral types, settings, fallback browser speech, UI controls, and a secure Supabase Edge Function boundary for realtime provider sessions. Lesson and chat pages should consume the same hooks/components so future story and TCF/TEF voice features are additive. Browser-native speech is fallback only; OpenAI Realtime and Gemini Live are first-class provider targets.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind, shadcn/Radix, lucide-react, Vitest/jsdom, Supabase Edge Functions, OpenAI Realtime API, Gemini Live API.

---

## Scope Notes

This plan implements the first working slice:

- Voice UI and hooks.
- Lesson speaker/microphone controls.
- AI chat speaker/microphone/transcript shell.
- Local fallback speech adapter.
- Provider-ready OpenAI/Gemini session contract and Supabase Edge Function scaffold.
- Lightweight pronunciation feedback and XP hooks.

This plan does not attempt complete phoneme-level pronunciation analysis or fully production-tuned realtime streaming. Those belong in a later provider-hardening phase after the UI and session boundary exist.

## File Structure

- Create `src/lib/voice/types.ts`: shared voice provider, locale, settings, session, transcript, and feedback types.
- Create `src/lib/voice/language.ts`: maps Interglott languages and TCF/TEF mode to speech locales and display labels.
- Create `src/lib/voice/pronunciation.ts`: lightweight transcript similarity and feedback scoring.
- Create `src/lib/voice/browserVoiceAdapter.ts`: browser fallback adapter for `speechSynthesis` and `SpeechRecognition`.
- Create `src/lib/voice/realtimeProvider.ts`: provider selection and session request helpers for OpenAI/Gemini.
- Create `src/hooks/useVoiceSettings.ts`: localStorage-backed voice settings.
- Create `src/hooks/useVoiceSynthesis.ts`: speak/replay/stop hook over the active adapter.
- Create `src/hooks/useVoiceRecognition.ts`: microphone/listening/transcript hook over the active adapter.
- Create `src/components/voice/VoiceButton.tsx`: speaker/replay control.
- Create `src/components/voice/MicButton.tsx`: microphone control with state.
- Create `src/components/voice/VoiceWaveform.tsx`: compact animated waveform/orb.
- Create `src/components/voice/VoiceTranscript.tsx`: transcript display.
- Create `src/components/voice/PronunciationFeedbackCard.tsx`: score and coaching UI.
- Create `src/components/voice/VoiceSettingsControls.tsx`: speed, volume, voice preference, mute.
- Modify `src/pages/LessonDetail.tsx`: add lesson voice controls and spoken answer path.
- Modify `src/pages/Conversation.tsx`: add AI audio playback, mic input, and transcript metadata.
- Modify `src/data/achievements.ts`: add speaking-related achievements.
- Modify `src/contexts/UserProgressContext.tsx`: track speaking practice count and best pronunciation score.
- Create `supabase/functions/voice-session/index.ts`: secure provider session endpoint scaffold.
- Create focused tests under `src/lib/voice/*.test.ts` and component/page tests where practical.

## Commands

Use the bundled Node runtime when `npm` is unavailable in PowerShell:

```powershell
& 'C:\Users\Brainy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\node_modules\vitest\vitest.mjs run
& 'C:\Users\Brainy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\node_modules\vite\bin\vite.js build
```

---

### Task 1: Voice Types and Language Mapping

**Files:**
- Create: `src/lib/voice/types.ts`
- Create: `src/lib/voice/language.ts`
- Test: `src/lib/voice/language.test.ts`

- [ ] **Step 1: Write language mapping tests**

```ts
import { describe, expect, it } from "vitest";
import { getVoiceLanguage, getProviderPreference } from "./language";

describe("voice language mapping", () => {
  it("maps learning languages to native speech locales", () => {
    expect(getVoiceLanguage("french")).toBe("fr-FR");
    expect(getVoiceLanguage("spanish")).toBe("es-ES");
    expect(getVoiceLanguage("chinese")).toBe("zh-CN");
    expect(getVoiceLanguage("german")).toBe("de-DE");
    expect(getVoiceLanguage("arabic")).toBe("ar-SA");
  });

  it("treats TCF/TEF as French speech", () => {
    expect(getVoiceLanguage("french", { mode: "tcf-tef" })).toBe("fr-FR");
  });

  it("prefers configured realtime providers before browser fallback", () => {
    expect(getProviderPreference("openai-realtime")).toEqual([
      "openai-realtime",
      "gemini-live",
      "browser-fallback",
    ]);
  });
});
```

- [ ] **Step 2: Run test and confirm failure**

Run:

```powershell
& 'C:\Users\Brainy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\node_modules\vitest\vitest.mjs run src/lib/voice/language.test.ts
```

Expected: fails because files do not exist.

- [ ] **Step 3: Implement voice types**

Add `src/lib/voice/types.ts`:

```ts
import type { LearningLanguage } from "@/contexts/UserProgressContext";

export type VoiceLanguage = "fr-FR" | "es-ES" | "zh-CN" | "de-DE" | "ar-SA";
export type VoiceProvider = "openai-realtime" | "gemini-live" | "browser-fallback";
export type VoiceGender = "female" | "male";
export type VoiceMode = "lesson" | "chat" | "story" | "tcf-tef";

export interface VoiceSettings {
  provider: VoiceProvider;
  rate: number;
  volume: number;
  muted: boolean;
  voiceGender: VoiceGender;
}

export interface VoiceRequest {
  text: string;
  language: VoiceLanguage;
  mode: VoiceMode;
  rate?: number;
  volume?: number;
}

export interface VoiceRecognitionResult {
  transcript: string;
  confidence?: number;
  language: VoiceLanguage;
}

export interface PronunciationFeedback {
  score: number;
  pronunciation: string;
  fluency: string;
  grammar: string;
  naturalness: string;
  retryText?: string;
}

export interface RealtimeVoiceSessionConfig {
  provider: VoiceProvider;
  language: VoiceLanguage;
  learningLanguage: LearningLanguage;
  level: "beginner" | "intermediate" | "advanced";
  mode: VoiceMode;
  tutorInstructions: string;
}
```

- [ ] **Step 4: Implement language mapping**

Add `src/lib/voice/language.ts`:

```ts
import type { LearningLanguage } from "@/contexts/UserProgressContext";
import type { VoiceLanguage, VoiceProvider, VoiceMode } from "./types";

const languageToLocale: Record<LearningLanguage, VoiceLanguage> = {
  french: "fr-FR",
  spanish: "es-ES",
  chinese: "zh-CN",
  german: "de-DE",
  arabic: "ar-SA",
};

export function getVoiceLanguage(
  language: LearningLanguage,
  options?: { mode?: VoiceMode }
): VoiceLanguage {
  if (options?.mode === "tcf-tef") return "fr-FR";
  return languageToLocale[language];
}

export function getProviderPreference(primary: VoiceProvider): VoiceProvider[] {
  const all: VoiceProvider[] = ["openai-realtime", "gemini-live", "browser-fallback"];
  return [primary, ...all.filter((provider) => provider !== primary)];
}
```

- [ ] **Step 5: Run test and commit**

Run language test. Expected: pass.

```bash
git add src/lib/voice/types.ts src/lib/voice/language.ts src/lib/voice/language.test.ts
git commit -m "Add voice language provider types"
```

---

### Task 2: Pronunciation Feedback Helpers

**Files:**
- Create: `src/lib/voice/pronunciation.ts`
- Test: `src/lib/voice/pronunciation.test.ts`

- [ ] **Step 1: Write scoring tests**

```ts
import { describe, expect, it } from "vitest";
import { buildPronunciationFeedback, normalizeSpeechText } from "./pronunciation";

describe("pronunciation feedback", () => {
  it("normalizes punctuation and case", () => {
    expect(normalizeSpeechText(" Bonjour, DAVID! ")).toBe("bonjour david");
  });

  it("scores exact spoken answers highly", () => {
    const feedback = buildPronunciationFeedback("Bonjour", "bonjour");
    expect(feedback.score).toBe(100);
    expect(feedback.pronunciation).toContain("Excellent");
  });

  it("gives retry guidance for weak matches", () => {
    const feedback = buildPronunciationFeedback("restaurant", "maison");
    expect(feedback.score).toBeLessThan(60);
    expect(feedback.retryText).toBe("restaurant");
  });
});
```

- [ ] **Step 2: Run test and confirm failure**

Expected: missing module failure.

- [ ] **Step 3: Implement helper**

Implement a simple token/character similarity helper in `pronunciation.ts`. Keep it deterministic and provider-independent. Use it only for first-pass feedback until provider scoring exists.

- [ ] **Step 4: Run test and commit**

```bash
git add src/lib/voice/pronunciation.ts src/lib/voice/pronunciation.test.ts
git commit -m "Add lightweight pronunciation feedback"
```

---

### Task 3: Voice Settings Hook

**Files:**
- Create: `src/hooks/useVoiceSettings.ts`
- Test: `src/hooks/useVoiceSettings.test.tsx`

- [ ] **Step 1: Write hook tests**

Use Testing Library `renderHook` to assert default settings and localStorage persistence. Default provider should be `openai-realtime` if `VITE_VOICE_PROVIDER=openai-realtime`, otherwise `browser-fallback`.

- [ ] **Step 2: Implement hook**

Store settings under `interglott-voice-settings`.

Default values:

```ts
{
  provider: "browser-fallback",
  rate: 1,
  volume: 1,
  muted: false,
  voiceGender: "female"
}
```

Clamp `rate` between `0.65` and `1.1`, and `volume` between `0` and `1`.

- [ ] **Step 3: Run tests and commit**

```bash
git add src/hooks/useVoiceSettings.ts src/hooks/useVoiceSettings.test.tsx
git commit -m "Add persistent voice settings"
```

---

### Task 4: Browser Fallback Voice Adapter

**Files:**
- Create: `src/lib/voice/browserVoiceAdapter.ts`
- Create: `src/hooks/useVoiceSynthesis.ts`
- Create: `src/hooks/useVoiceRecognition.ts`
- Test: `src/lib/voice/browserVoiceAdapter.test.ts`

- [ ] **Step 1: Write adapter tests**

Mock `window.speechSynthesis` and `window.SpeechRecognition`/`webkitSpeechRecognition`. Assert unavailable states do not throw and return friendly errors.

- [ ] **Step 2: Implement browser adapter**

Expose:

```ts
export function canUseBrowserSpeechSynthesis(): boolean;
export function canUseBrowserSpeechRecognition(): boolean;
export function speakWithBrowser(request: VoiceRequest, settings: VoiceSettings): Promise<void>;
export function createBrowserRecognition(language: VoiceLanguage): SpeechRecognition | null;
```

- [ ] **Step 3: Implement hooks**

`useVoiceSynthesis` should expose:

```ts
{
  speak(text: string, options?: Partial<VoiceRequest>): Promise<void>;
  stop(): void;
  isSpeaking: boolean;
  error: string | null;
}
```

`useVoiceRecognition` should expose:

```ts
{
  start(): void;
  stop(): void;
  isListening: boolean;
  transcript: string;
  confidence?: number;
  error: string | null;
}
```

- [ ] **Step 4: Run tests and commit**

```bash
git add src/lib/voice/browserVoiceAdapter.ts src/hooks/useVoiceSynthesis.ts src/hooks/useVoiceRecognition.ts src/lib/voice/browserVoiceAdapter.test.ts
git commit -m "Add browser fallback voice adapter"
```

---

### Task 5: Realtime Provider Session Contract

**Files:**
- Create: `src/lib/voice/realtimeProvider.ts`
- Test: `src/lib/voice/realtimeProvider.test.ts`
- Create: `supabase/functions/voice-session/index.ts`

- [ ] **Step 1: Write provider request tests**

Assert that the client request body includes provider, language, level, mode, and tutor instructions, and never includes API keys.

- [ ] **Step 2: Implement client helper**

`requestRealtimeVoiceSession(config)` should call the Supabase Edge Function endpoint:

```ts
const { data, error } = await supabase.functions.invoke("voice-session", {
  body: config,
});
```

Return a discriminated result:

```ts
type VoiceSessionResult =
  | { ok: true; provider: VoiceProvider; session: unknown }
  | { ok: false; reason: string; fallbackProvider: "browser-fallback" };
```

- [ ] **Step 3: Create Edge Function scaffold**

Create `supabase/functions/voice-session/index.ts`.

Behavior:

- Validate provider is `openai-realtime` or `gemini-live`.
- If the required secret is missing, return `503` with a safe message.
- For OpenAI, prepare the session/client-secret request boundary.
- For Gemini, prepare the ephemeral-token/session boundary.
- Do not expose secret values.

Use official docs as implementation references:

- OpenAI Realtime overview: `https://platform.openai.com/docs/guides/realtime/overview`
- OpenAI Realtime WebRTC: `https://platform.openai.com/docs/guides/realtime-webrtc`
- Gemini Live API: `https://ai.google.dev/gemini-api/docs/live`

- [ ] **Step 4: Run tests and commit**

```bash
git add src/lib/voice/realtimeProvider.ts src/lib/voice/realtimeProvider.test.ts supabase/functions/voice-session/index.ts
git commit -m "Add realtime voice session contract"
```

---

### Task 6: Voice UI Components

**Files:**
- Create: `src/components/voice/VoiceButton.tsx`
- Create: `src/components/voice/MicButton.tsx`
- Create: `src/components/voice/VoiceWaveform.tsx`
- Create: `src/components/voice/VoiceTranscript.tsx`
- Create: `src/components/voice/PronunciationFeedbackCard.tsx`
- Create: `src/components/voice/VoiceSettingsControls.tsx`
- Test: `src/components/voice/voice-components.test.tsx`

- [ ] **Step 1: Write component tests**

Test accessible labels:

- Voice button says `Play pronunciation`.
- Mic button says `Start speaking` or `Stop listening`.
- Transcript renders the recognized text.
- Feedback card renders score and retry text.

- [ ] **Step 2: Implement components**

Design rules:

- Use lucide icons: `Volume2`, `VolumeX`, `Mic`, `MicOff`, `RotateCcw`.
- Use compact icon buttons with accessible labels.
- Keep controls mobile-friendly with `min-h-[44px]`.
- Use existing `gradient-purple`, `glass-card`, border, and muted text styles.
- `VoiceWaveform` can use 3-5 animated bars via CSS/Tailwind classes.

- [ ] **Step 3: Run tests and commit**

```bash
git add src/components/voice src/components/voice/voice-components.test.tsx
git commit -m "Add reusable voice controls"
```

---

### Task 7: Lesson Voice Integration

**Files:**
- Modify: `src/pages/LessonDetail.tsx`
- Test: `src/pages/LessonDetail.voice.test.tsx`

- [ ] **Step 1: Write page tests**

Test that:

- Question has a speaker button.
- Multiple-choice options each have speaker buttons.
- Fill-blank input has a microphone button.
- Spoken transcript fills the answer input.
- Feedback card appears after a spoken answer.

- [ ] **Step 2: Add question and option speaker controls**

In `LessonDetail.tsx`, wrap the question text in a row:

```tsx
<div className="flex items-start gap-2">
  <p className="font-display font-semibold text-foreground text-lg flex-1">
    {exercise.question}
  </p>
  <VoiceButton text={exercise.question} language={voiceLanguage} mode="lesson" />
</div>
```

For options, keep the whole row selectable, but place a small `VoiceButton` in the right side with `event.stopPropagation()` so playback does not select the answer.

- [ ] **Step 3: Add spoken answer path**

For fill-blank:

- Add `MicButton` beside the input.
- When recognition transcript changes, set `inputVal`.
- Show `VoiceTranscript` below input.

For multiple-choice:

- Add one mic button below options.
- When transcript matches an option or correct answer after normalization, call `setSelected`.
- If no match, show friendly retry text.

- [ ] **Step 4: Add pronunciation feedback**

On spoken answer submission, call `buildPronunciationFeedback(exercise.correctAnswer, spokenTranscript)` and render `PronunciationFeedbackCard`.

- [ ] **Step 5: Run tests and commit**

```bash
git add src/pages/LessonDetail.tsx src/pages/LessonDetail.voice.test.tsx
git commit -m "Add voice practice to lesson exercises"
```

---

### Task 8: AI Chat Voice and Transcript Shell

**Files:**
- Modify: `src/pages/Conversation.tsx`
- Modify: `src/components/ChatBubble.tsx`
- Test: `src/pages/Conversation.voice.test.tsx`

- [ ] **Step 1: Extend message model**

Add optional voice metadata:

```ts
interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
  transcript?: string;
  spoken?: boolean;
  pronunciationScore?: number;
}
```

- [ ] **Step 2: Write tests**

Assert:

- AI messages render a replay/speaker button.
- AI message text remains visible as transcription.
- Mic button appears in input controls.
- Recognized transcript can be sent as a user message.
- Spoken user message shows transcript and optional score.

- [ ] **Step 3: Add AI speaker controls**

For every non-user message, render `VoiceButton` in `ChatBubble` or pass a voice actions slot from `Conversation`.

Transcription rule:

- The message text must remain visible in the bubble.
- Audio controls supplement the text; they never replace it.

- [ ] **Step 4: Add mic input**

Add `MicButton` next to text input. Recognition transcript should populate input. User can edit before sending.

- [ ] **Step 5: Add realtime session preparation**

On chat page load, call `requestRealtimeVoiceSession` only when provider is OpenAI/Gemini and required configuration exists. If it returns fallback, continue with browser fallback. Do not block normal chat on session failure.

- [ ] **Step 6: Run tests and commit**

```bash
git add src/pages/Conversation.tsx src/components/ChatBubble.tsx src/pages/Conversation.voice.test.tsx
git commit -m "Add voice transcript shell to AI chat"
```

---

### Task 9: Speaking Progress and Achievements

**Files:**
- Modify: `src/contexts/UserProgressContext.tsx`
- Modify: `src/data/achievements.ts`
- Modify: `src/pages/Profile.tsx`
- Test: `src/data/achievements.test.ts`

- [ ] **Step 1: Write achievement tests**

Add stats for:

- `speakingExercises`
- `bestPronunciationScore`

Assert unlocks:

- `first-speaking`
- `pronunciation-master`

- [ ] **Step 2: Extend progress context**

Add:

```ts
speakingExercises: number;
bestPronunciationScore: number;
recordSpeakingPractice: (score?: number) => void;
```

Update localStorage merge defaults so old users are safe.

- [ ] **Step 3: Wire XP/progress calls**

Call `recordSpeakingPractice(score)` when a lesson or chat spoken answer is submitted. Award small XP once per relevant action, not on every recognition retry.

- [ ] **Step 4: Update profile stats**

Show speaking practice count and best pronunciation score in profile stats if space allows.

- [ ] **Step 5: Run tests and commit**

```bash
git add src/contexts/UserProgressContext.tsx src/data/achievements.ts src/pages/Profile.tsx src/data/achievements.test.ts
git commit -m "Track speaking practice achievements"
```

---

### Task 10: Voice Settings UI

**Files:**
- Modify: `src/pages/Profile.tsx`
- Create or use: `src/components/voice/VoiceSettingsControls.tsx`
- Test: `src/components/voice/VoiceSettingsControls.test.tsx`

- [ ] **Step 1: Write settings tests**

Assert rate, mute, volume, and voice gender controls update persisted settings.

- [ ] **Step 2: Add profile settings panel**

Place it near existing sound settings. Keep it compact:

- Playback speed segmented buttons: Slow, Normal.
- Voice preference: Female, Male.
- Volume slider.
- Mute switch.
- Provider display: OpenAI Realtime, Gemini Live, or Browser fallback.

- [ ] **Step 3: Run tests and commit**

```bash
git add src/pages/Profile.tsx src/components/voice/VoiceSettingsControls.tsx src/components/voice/VoiceSettingsControls.test.tsx
git commit -m "Add voice accessibility settings"
```

---

### Task 11: Verification

**Files:**
- Potentially modify small fixes based on test/build/manual review.

- [ ] **Step 1: Run full tests**

```powershell
& 'C:\Users\Brainy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\node_modules\vitest\vitest.mjs run
```

Expected: all tests pass.

- [ ] **Step 2: Run production build**

```powershell
& 'C:\Users\Brainy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\node_modules\vite\bin\vite.js build
```

Expected: build succeeds. Existing large chunk warning may remain unless this task introduces new avoidable chunk growth.

- [ ] **Step 3: Manual browser verification**

With dev server running on port 3000:

- Open `/lessons`.
- Enter a lesson.
- Confirm speaker buttons appear and do not accidentally submit answers.
- Confirm fill-blank mic flow can populate transcript or shows fallback prompt.
- Open `/conversation`.
- Confirm AI messages include speaker/replay control.
- Confirm text transcription remains visible beneath/inside audio interaction.
- Confirm mic button exists and typed fallback still works.

- [ ] **Step 4: Final cleanup commit**

```bash
git status --short
git add .
git commit -m "Polish AI voice assistant foundation"
```

Only create this final commit if there are verification fixes not already committed in earlier tasks.
