import { useCallback } from "react";
import { useProgress } from "@/contexts/UserProgressContext";
import {
  playCorrectAnswer,
  playIncorrectAnswer,
  playLessonComplete,
  playMissionComplete,
  playStreakCelebration,
  playXPGain,
  playBadgeUnlock,
  playChallengeFailed,
} from "@/lib/audioEngine";

export function useGameAudio() {
  const { soundEnabled } = useProgress();

  const play = useCallback(
    (fn: () => void) => {
      if (soundEnabled) fn();
    },
    [soundEnabled]
  );

  return {
    onCorrectAnswer: useCallback(() => play(playCorrectAnswer), [play]),
    onIncorrectAnswer: useCallback(() => play(playIncorrectAnswer), [play]),
    onLessonComplete: useCallback(() => play(playLessonComplete), [play]),
    onMissionComplete: useCallback(() => play(playMissionComplete), [play]),
    onStreakMilestone: useCallback(() => play(playStreakCelebration), [play]),
    onXPReward: useCallback(() => play(playXPGain), [play]),
    onBadgeUnlock: useCallback(() => play(playBadgeUnlock), [play]),
    onChallengeFailed: useCallback(() => play(playChallengeFailed), [play]),
  };
}
