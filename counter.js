import { getCount } from "./timer.js";

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

//|
//| ローカル
//|

const counter = document.createElement("span");
counter.id = "pomodoro-counter";
