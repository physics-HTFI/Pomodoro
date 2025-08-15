import { useControl } from "./Control.use";
import { UI_Control } from "./Control.ui";

export function Control() {
  const { fontSize, onReset, onCountUp, onCountDown, onTimeUp, onTimeDown } =
    useControl();

  return (
    <UI_Control
      fontSize={fontSize}
      onReset={onReset}
      onCountUp={onCountUp}
      onCountDown={onCountDown}
      onTimeUp={onTimeUp}
      onTimeDown={onTimeDown}
    />
  );
}
