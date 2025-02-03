import { atom } from "jotai";
import { atomTimer } from "./atomTimer";
import { CONST } from "../CONST";
import { derivTimerStop } from "./derivTimerStop";

/**
 * タイマーを初期状態にする
 */
export const derivTimerReset = atom(null, (get, set) => {
  const timer = get(atomTimer);
  timer.status = "work";
  timer.seconds = CONST.timer.work_sec;
  set(atomTimer, { ...timer });
  set(derivTimerStop);
});
