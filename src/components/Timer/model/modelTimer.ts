import { atom, useAtomValue, useSetAtom } from "jotai";
import { CONST } from "./atom/CONST";
import { atomTimer } from "./atom/atomTimer";
import { atomPlay } from "../../SettingsButton/model/atomPlay/atomPlay";
import { atomTicker } from "./atom/atomTicker";
import { getTimerDefault } from "./atom/getTimerDefault";
import { atomHistory } from "../../History/model/atom/atomHistory/atomHistory";
import { TypeTimer } from "./type/TypeTimer";

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

  /**
   * 休憩をはさむかを切り替える
   */
  useToggleBreakAsync: () => useSetAtom(atomToggleBreakAsync),

  localStorage: {
    saveTimer: saveTimerToLocalStorage,
    loadTimer: loadTimerFromLocalStorage,
    useLoadTimer: () => useSetAtom(atomLoadTimer),
  },
};

//|
//| private
//|

/**
 * タイマーを初期状態にする
 */
const atomResetAsync = atom(null, async (get, set) => {
  await set(atomHistory.atomUpdateAsync);
  set(atomTimer, { ...getTimerDefault(), hasBreak: get(atomTimer).hasBreak });
  modelTimer.localStorage.saveTimer(get(atomTimer));
  get(atomTicker).stop();
});

/**
 * タイマーを停止する
 */
const atomStopAsync = atom(null, async (get, set) => {
  await set(atomHistory.atomUpdateAsync);
  set(atomTimer, { ...get(atomTimer), isRunning: false });
  modelTimer.localStorage.saveTimer(get(atomTimer));
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
  modelTimer.localStorage.saveTimer(get(atomTimer));
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
      modelTimer.localStorage.saveTimer(get(atomTimer));
    },
    // onTick
    async () => {
      const timer = get(atomTimer);
      timer.seconds -= 1;
      if (timer.seconds <= 0) {
        const isWork = timer.status === "work";
        timer.status = isWork && timer.hasBreak ? "break" : "work";
        timer.seconds = CONST.seconds[timer.status];
        await set(atomHistory.atomUpdateAsync, isWork ? 1 : 0); // カウント値を+1する
        await set(atomPlay.playAsync);
      }
      set(atomTimer, { ...timer });
      modelTimer.localStorage.saveTimer(get(atomTimer));
    },
  );
});

/**
 * 休憩を有無を切り替える `atom`
 */
const atomToggleBreakAsync = atom(null, async (get, set) => {
  const isWork = get(atomTimer).status === "work";
  const isRunning = get(atomTimer).isRunning;
  const hasBreak = get(atomTimer).hasBreak;

  set(atomTimer, { ...get(atomTimer), hasBreak: !hasBreak });
  modelTimer.localStorage.saveTimer(get(atomTimer));

  if (isWork) {
    // タイマーストップ時は、作業を開始する
    if (!isRunning) {
      await set(atomToggleAsync);
    }
  } else {
    // ここは常に hasBreak === true
    // break 中は、タイマーをリセットして作業を開始する
    await set(atomResetAsync);
    await set(atomToggleAsync);
  }
});

//|
//| localStorage
//|

const TIMER_STORAGE_KEY = "timer";

function saveTimerToLocalStorage(timer: TypeTimer) {
  const stoppedTimer = { ...timer, isRunning: false };
  localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(stoppedTimer));
}

function loadTimerFromLocalStorage(): TypeTimer {
  const defaultTimer = getTimerDefault();
  try {
    const timerStr = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!timerStr) return defaultTimer;
    return { ...defaultTimer, ...JSON.parse(timerStr) };
  } catch {
    return defaultTimer;
  }
}

const atomLoadTimer = atom(null, async (_, set) => {
  set(atomTimer, modelTimer.localStorage.loadTimer());
});
