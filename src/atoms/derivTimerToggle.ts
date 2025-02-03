import { atom } from "jotai";
import { atomTimer } from "./atomTimer";
import { derivTimerReset } from "./derivTimerReset";
import { derivTimerStop } from "./derivTimerStop";
import { CONST } from "../CONST";
import { play } from "../utils/play";
import { derivCountsUpdate } from "./derivCountsUpdate";

/**
 * タイマーの開始／停止を切り替える
 */
export const derivTimerToggle = atom(null, (get, set) => {
  set(derivCountsUpdate);
  const timer = get(atomTimer);
  const isRunning = timer.intervalId !== undefined;
  if (isRunning) {
    if (timer.status === "work") {
      set(derivTimerStop);
    } else {
      set(derivTimerReset);
    }
    return;
  }
  timer.intervalId = setInterval(() => {
    const timer = get(atomTimer);
    timer.seconds -= 1;
    if (timer.seconds <= 0) {
      const endWork = timer.status === "work";
      timer.status = endWork ? "break" : "work";
      timer.seconds = endWork ? CONST.timer.break_sec : CONST.timer.work_sec;
      set(derivCountsUpdate, endWork ? 1 : 0);
      play();
    }
    set(atomTimer, { ...timer });
    if (timer.seconds === 10) {
      play(0.0001); // 予め無音で再生しておくと、実際に鳴らしたときに遅延しない（0だと効果なし）
    }
  }, 1000);
  if (timer.status === "work") {
    play();
  }
  set(atomTimer, { ...timer });
});
