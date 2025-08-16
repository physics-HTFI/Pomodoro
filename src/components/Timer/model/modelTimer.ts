import { atom, useAtomValue, useSetAtom } from "jotai";
import { CONST } from "./atom/CONST";
import { atomTimer } from "./atom/atomTimer";
import { atomPlay } from "../../SettingsButton/model/atomPlay/atomPlay";
import { atomTicker } from "./atom/atomTicker";
import { getTimerDefault } from "./atom/getTimerDefault";
import { atomHistory } from "../../History/model/atom/atomHistory/atomHistory";

/**
 * タイマーの取得設定を行う `atom` 群
 */
export const modelTimer = {
  /**
   * タイマーの値を取得する
   */
  useTimerValue: () => useAtomValue(atomTimer),

  /**
   * タイマーを初期状態にする
   */
  useResetAsync: () => useSetAtom(atomResetAsync),

  /**
   * タイマーを停止する
   */
  useStopAsync: () => useSetAtom(atomStopAsync),

  /**
   * タイマーの残り時間を`delta`秒だけ変化させる
   */
  useSkipByAsync: () => useSetAtom(atomSkipByAsync),

  /**
   * タイマーの開始／停止を切り替える
   */
  useToggleAsync: () => useSetAtom(atomToggleAsync),
};

//|
//| private
//|

/**
 * タイマーを初期状態にする
 */
const atomResetAsync = atom(null, async (get, set) => {
  await set(atomHistory.atomUpdateAsync);
  set(atomTimer, getTimerDefault());
  get(atomTicker).stop();
});

/**
 * タイマーを停止する
 */
const atomStopAsync = atom(null, async (get, set) => {
  await set(atomHistory.atomUpdateAsync);
  set(atomTimer, { ...get(atomTimer), isRunning: false });
  get(atomTicker).stop();
});

/**
 * タイマーの残り時間を`delta`秒だけ変化させる
 */
const atomSkipByAsync = atom(null, async (get, set, delta: number) => {
  await set(atomHistory.atomUpdateAsync);
  const timer = get(atomTimer);
  const seconds = Math.max(0, timer.seconds + delta);
  set(atomTimer, { ...timer, seconds });
});

/**
 * タイマーの開始／停止を切り替える `atom`
 */
const atomToggleAsync = atom(null, async (get, set) => {
  await set(atomHistory.atomUpdateAsync);
  const isWork = get(atomTimer).status === "work";
  get(atomTicker).toggle(
    1000,
    // onToggleOff
    async () => (isWork ? await set(atomStopAsync) : await set(atomResetAsync)),
    // onToggleOn
    async () => {
      if (isWork) await set(atomPlay.playAsync);
      set(atomTimer, { ...get(atomTimer), isRunning: true });
    },
    // onTick
    async () => {
      const timer = get(atomTimer);
      timer.seconds -= 1;
      if (timer.seconds <= 0) {
        const isWork = timer.status === "work";
        timer.status = isWork ? "break" : "work";
        timer.seconds = CONST.seconds[timer.status];
        await set(atomHistory.atomUpdateAsync, isWork ? 1 : 0); // カウント値を+1する
        await set(atomPlay.playAsync);
      }
      set(atomTimer, { ...timer });
      if (timer.seconds === 10) {
        await set(atomPlay.playAsync, 0.0001); // 予め無音で再生しておくと、実際に鳴らしたときに遅延しない（0だと効果なし）
      }
    }
  );
});
