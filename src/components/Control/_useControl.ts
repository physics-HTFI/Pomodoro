import { useAtomValue, useSetAtom } from "jotai";
import { atomPipWindow } from "../../atoms/atomPipWindow";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { useCallback } from "react";

export function useControl() {
  const hasPip = useAtomValue(atomPipWindow) !== undefined;
  const updateCounts = useSetAtom(atomCounts.updateAsync);
  const resetTimer = useSetAtom(atomTimer.reset);
  const skipTimerBy = useSetAtom(atomTimer.skipBy);
  const clickUp = useCallback(() => updateCounts(1), [updateCounts]);
  const clickDown = useCallback(() => updateCounts(-1), [updateCounts]);
  const clickLeft = useCallback(() => skipTimerBy(60), [skipTimerBy]);
  const clickRight = useCallback(() => skipTimerBy(-60), [skipTimerBy]);
  const clickCenter = useCallback(() => resetTimer(), [resetTimer]);
  const scale = hasPip ? 0.5 : 1.0;

  return {
    clickUp,
    clickDown,
    clickLeft,
    clickRight,
    clickCenter,
    scale,
  };
}
