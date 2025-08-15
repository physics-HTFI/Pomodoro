import { useAtomValue, useSetAtom } from "jotai";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function useControl() {
  const updateCounts = useSetAtom(atomCounts.updateAsync);
  const resetTimer = useSetAtom(atomTimer.reset);
  const skipTimerBy = useSetAtom(atomTimer.skipBy);
  const isPip = useAtomValue(atomPipWindow) !== undefined;

  const fontSize: "medium" | "large" = isPip ? "medium" : "large";
  return {
    fontSize,
    onCountUp: () => updateCounts(1),
    onCountDown: () => updateCounts(-1),
    onTimeUp: () => skipTimerBy(60),
    onTimeDown: () => skipTimerBy(-60),
    onReset: () => resetTimer(),
  };
}
