import { useEdit } from "./Edit.use";
import { UI_Edit } from "./Edit.ui";

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
