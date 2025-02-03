import { atom } from "jotai";
import { atomTimer } from "./atomTimer";

/**
 * タイマーの残り時間を`delta`秒だけ変化させる
 */
export const derivTimerSkip = atom(null, (get, set, delta: number) => {
  const timer = get(atomTimer);
  timer.seconds = Math.max(0, timer.seconds + delta);
  set(atomTimer, { ...timer });
});
