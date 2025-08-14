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
  const onCountUp = useCallback(() => updateCounts(1), [updateCounts]);
  const onCountDown = useCallback(() => updateCounts(-1), [updateCounts]);
  const onTimeUp = useCallback(() => skipTimerBy(60), [skipTimerBy]);
  const onTimeDown = useCallback(() => skipTimerBy(-60), [skipTimerBy]);
  const onReset = useCallback(() => resetTimer(), [resetTimer]);

  const fontSize: "medium" | "large" = isPip ? "medium" : "large";
  return {
    fontSize,
    onCountUp,
    onCountDown,
    onTimeUp,
    onTimeDown,
    onReset,
  };
}
