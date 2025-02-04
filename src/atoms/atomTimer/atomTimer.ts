import { atom } from "jotai";
import { CONST } from "./_CONST";
import { atom0 } from "./_atom0";
import { atomCounts } from "../atomCounts/atomCounts";
import { play } from "../../utils/play";
import { getTimeForDisplay } from "./_getTimeForDisplay";

/**
 * タイマーの取得設定を行う `atom` 群
 */
export const atomTimer = {
  /**
   * タイマーの値を取得する `atom`
   */
  getTimeForDisplay: atom((get) => {
    const timer = get(atom0);
    return getTimeForDisplay(timer);
  }),

  /**
   * タイマーを初期状態にする `atom`
   */
  reset: atom(null, (get, set) => {
    const timer = get(atom0);
    timer.status = "work";
    timer.seconds = CONST.work_sec;
    set(atom0, { ...timer });
    set(atomTimer.stop);
  }),

  /**
   * タイマーの残り時間を`delta`秒だけ変化させる `atom`
   */
  skipBy: atom(null, (get, set, delta: number) => {
    const timer = get(atom0);
    timer.seconds = Math.max(0, timer.seconds + delta);
    set(atom0, { ...timer });
  }),

  /**
   * タイマーを停止する `atom`
   */
  stop: atom(null, (get, set) => {
    const timer = get(atom0);
    clearInterval(timer.intervalId);
    timer.intervalId = undefined;
    set(atom0, { ...timer });
  }),

  /**
   * タイマーの開始／停止を切り替える `atom`
   */
  toggle: atom(null, (get, set) => {
    set(atomCounts.update);
    const timer = get(atom0);
    const isRunning = timer.intervalId !== undefined;
    if (isRunning) {
      if (timer.status === "work") {
        set(atomTimer.stop);
      } else {
        set(atomTimer.reset);
      }
      return;
    }
    timer.intervalId = setInterval(() => {
      const timer = get(atom0);
      timer.seconds -= 1;
      if (timer.seconds <= 0) {
        const endWork = timer.status === "work";
        timer.status = endWork ? "break" : "work";
        timer.seconds = endWork ? CONST.break_sec : CONST.work_sec;
        set(atomCounts.update, endWork ? 1 : 0);
        play();
      }
      set(atom0, { ...timer });
      if (timer.seconds === 10) {
        play(0.0001); // 予め無音で再生しておくと、実際に鳴らしたときに遅延しない（0だと効果なし）
      }
    }, 1000);
    if (timer.status === "work") {
      play();
    }
    set(atom0, { ...timer });
  }),
};
