import { useSetAtom } from "jotai";
import { atomTimer } from "../Svg/model/atomTimer";
import { modelPip } from "../pip/model/modelPip";
import { modelHistory } from "../History/model/modelHistory";

export function useEdit() {
  const updateCounts = useSetAtom(modelHistory.updateAsync);
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
