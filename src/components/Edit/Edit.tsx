import { UI_Edit } from "./Edit.ui";
import { modelHistory } from "../History/model/modelHistory";
import { modelTimer } from "../Timer/model/modelTimer";
import { modelPip } from "../pip/model/modelPip";

/**
 * タイマー・カウント値の編集コンポーネント
 */
export function Edit() {
  const { fontSize, onReset, onCountUp, onCountDown, onTimeUp, onTimeDown } =
    useEdit();

  return (
    <UI_Edit
      fontSize={fontSize}
      onReset={onReset}
      onCountUp={onCountUp}
      onCountDown={onCountDown}
      onTimeUp={onTimeUp}
      onTimeDown={onTimeDown}
    />
  );
}

//|
//| private
//

function useEdit() {
  const updateCounts = modelHistory.useUpdateAsync();
  const resetTimer = modelTimer.useResetAsync();
  const skipTimerBy = modelTimer.useSkipByAsync();
  const { pipOpen } = modelPip.useValues();

  const fontSize: "medium" | undefined = pipOpen ? "medium" : undefined;
  return {
    fontSize,
    onCountUp: async () => await updateCounts(1),
    onCountDown: async () => await updateCounts(-1),
    onTimeUp: async () => await skipTimerBy(60),
    onTimeDown: async () => await skipTimerBy(-60),
    onReset: async () => await resetTimer(),
  };
}
