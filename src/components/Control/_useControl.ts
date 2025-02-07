import { useAtomValue, useSetAtom } from "jotai";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { useCallback } from "react";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function useControl() {
  const updateCounts = useSetAtom(atomCounts.updateAsync);
  const isPip = useAtomValue(atomPipWindow) !== undefined;
  const resetTimer = useSetAtom(atomTimer.reset);
  const skipTimerBy = useSetAtom(atomTimer.skipBy);
  const clickUp = useCallback(() => updateCounts(1), [updateCounts]);
  const clickDown = useCallback(() => updateCounts(-1), [updateCounts]);
  const clickLeft = useCallback(() => skipTimerBy(60), [skipTimerBy]);
  const clickRight = useCallback(() => skipTimerBy(-60), [skipTimerBy]);
  const clickCenter = useCallback(() => resetTimer(), [resetTimer]);

  const fontSize: "medium" | "large" = isPip ? "medium" : "large";
  return {
    fontSize,
    clickUp,
    clickDown,
    clickLeft,
    clickRight,
    clickCenter,
  };
}
