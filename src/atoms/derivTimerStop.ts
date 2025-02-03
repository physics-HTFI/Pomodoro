import { atom } from "jotai";
import { atomTimer } from "./atomTimer";

/**
 * タイマーを停止する
 */
export const derivTimerStop = atom(null, (get, set) => {
  const timer = get(atomTimer);
  clearInterval(timer.intervalId);
  timer.intervalId = undefined;
  set(atomTimer, { ...timer });
});
