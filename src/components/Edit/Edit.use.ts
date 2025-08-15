import { useSetAtom } from "jotai";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { modelPip } from "../PipPortal/model/modelPip";

export function useEdit() {
  const updateCounts = useSetAtom(atomCounts.updateAsync);
  const resetTimer = useSetAtom(atomTimer.reset);
  const skipTimerBy = useSetAtom(atomTimer.skipBy);
  const { pipOpen } = modelPip.useValues();

  const fontSize: "medium" | undefined = pipOpen ? "medium" : undefined;
  return {
    fontSize,
    onCountUp: () => updateCounts(1),
    onCountDown: () => updateCounts(-1),
    onTimeUp: () => skipTimerBy(60),
    onTimeDown: () => skipTimerBy(-60),
    onReset: () => resetTimer(),
  };
}
