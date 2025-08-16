import { modelTimer } from "./model/modelTimer";
import { UI_Timer } from "./Timer.ui";

/**
 * 残り時間を表示する部分（"25:00"と周囲の輪）
 */
export function Timer() {
  const timer = modelTimer.useTimerValue();

  return <UI_Timer id={ID_TIMER} timer={timer} />;
}

/**
 * クリック判定に使用する
 */
export const ID_TIMER = "timer";
