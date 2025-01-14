import { timerReset } from "./timer.js";

/**
 * カウンター要素を返す
 */
export const getCounter = () => counter;

/**
 * カウンターを更新する。
 * `increments === true`の場合は、カウンターをインクリメントする。
 */
export function updateCounter(increments) {
  const keyToday = today();
  if (counts.size === 0) {
    counts.set(today(), 0);
  } else {
    // 日をまたいだ時にキーを追加する
    for (let i = [...counts.keys()].pop() + 1; i <= keyToday; i++) {
      counts.set(i, 0);
    }
    // 古いものを削除
    for (const key of [...counts.keys()]) {
      if (keyToday - key >= 30) {
        counts.delete(key);
      }
    }
  }
  if (increments) {
    counts.set(keyToday, counts.get(keyToday) + 1);
  }
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const str = [...counts.values()].reverse().map(span).join("");
  counter.innerHTML = `🍅:${str}`;

  // ローカル関数
  function span(day, count) {
    const day0 = new Date().getDay() + 7 * counts.size;
    const c = `${Math.trunc(count / 2)}${count % 2 === 0 ? "" : "'"}`;
    return `<span class="${days[(day0 - day) % 7]}">${c}</span>`;
  }
}

/**
 * カウンターをリセットする
 */
export function resetCounter(e) {
  e?.stopPropagation();
  timerReset();
  counts.clear();
  updateCounter();
}

//|
//| ローカル
//|

const counts = new Map();

const counter = document.createElement("span");
counter.id = "pomodoro-counter";

function today() {
  const date = new Date();
  return (
    (date.getFullYear() * 100 + date.getMonth() + 1) * 100 + date.getDate()
  );
}
