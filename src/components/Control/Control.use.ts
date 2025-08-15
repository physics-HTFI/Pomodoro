import { useAtomValue, useSetAtom } from "jotai";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function useControl() {
  const updateCounts = useSetAtom(atomCounts.updateAsync);
  const isPip = useAtomValue(atomPipWindow) !== undefined;
  const resetTimer = useSetAtom(atomTimer.reset);
  const skipTimerBy = useSetAtom(atomTimer.skipBy);
  const onCountUp = () => updateCounts(1);
  const onCountDown = () => updateCounts(-1);
  const onTimeUp = () => skipTimerBy(60);
  const onTimeDown = () => skipTimerBy(-60);
  const onReset = () => resetTimer();

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
