import { atom } from "jotai";
import { CONST } from "./_CONST";
import { atomTimer0 } from "./_atomTimer0";
import { atomCounts } from "../atomCounts/atomCounts";
import { getTimeForDisplay } from "./_getTimeForDisplay";
import { atomPlay } from "../atomPlay/atomPlay";
import { atomTicker } from "./_atomTicker";
import { getTimerDefault as getTimerInit } from "./_getTimerInit";

/**
 * タイマーの取得設定を行う `atom` 群
 */
export const atomTimer = {
  /**
   * タイマーの値を取得する `atom`
   */
  getTimeForDisplay: atom((get) => {
    const timer = get(atomTimer0);
    return getTimeForDisplay(timer);
  }),

  /**
   * タイマーを初期状態にする `atom`
   */
  reset: atom(null, (get, set) => {
    set(atomCounts.updateAsync);
    set(atomTimer0, getTimerInit());
    get(atomTicker).stop();
  }),

  /**
   * タイマーを停止する `atom`
   */
  stop: atom(null, (get, set) => {
    set(atomCounts.updateAsync);
    set(atomTimer0, { ...get(atomTimer0), isRunning: false });
    get(atomTicker).stop();
  }),

  /**
   * タイマーの残り時間を`delta`秒だけ変化させる `atom`
   */
  skipBy: atom(null, (get, set, delta: number) => {
    set(atomCounts.updateAsync);
    const timer = get(atomTimer0);
    const seconds = Math.max(0, timer.seconds + delta);
    set(atomTimer0, { ...timer, seconds });
  }),

  /**
   * タイマーの開始／停止を切り替える `atom`
   */
  toggle: atom(null, (get, set) => {
    set(atomCounts.updateAsync);
    const timer = get(atomTimer0);
    const isWork = timer.status === "work";
    get(atomTicker).toggle(
      1000,
      // onToggleOff
      () => (isWork ? set(atomTimer.stop) : set(atomTimer.reset)),
      // onToggleOn
      () => {
        if (isWork) set(atomPlay.playAsync);
        set(atomTimer0, { ...timer, isRunning: true });
      },
      // onTick
      () => {
        const timer = get(atomTimer0);
        timer.seconds -= 1;
        if (timer.seconds <= 0) {
          timer.status = isWork ? "break" : "work";
          timer.seconds = CONST.seconds[timer.status];
          set(atomCounts.updateAsync, isWork ? 1 : 0); // カウント値を+1する
          set(atomPlay.playAsync);
        }
        set(atomTimer0, { ...timer });
        if (timer.seconds === 10) {
          set(atomPlay.playAsync, 0.0001); // 予め無音で再生しておくと、実際に鳴らしたときに遅延しない（0だと効果なし）
        }
      }
    );
  }),
};
