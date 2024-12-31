import { getCount, timerReset } from "./timer.js";

/**
 * カウンター要素を返す
 */
export const getCounter = () => counter;

/**
 * カウンターを更新する
 */
export function updateCounter() {
  counter.innerHTML = `🍅×${getCount()}`;
}

/**
 * カウンターをリセットする
 */
export function resetCounter(e) {
  e?.stopPropagation();
  timerReset();
}

//|
//| ローカル
//|

const counter = document.createElement("span");
counter.id = "pomodoro-counter";
