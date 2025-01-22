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
  const today = getTodayKey();
  console.log(counts);
  if (counts.size === 0) {
    counts.set(today, 0);
  } else {
    // 日をまたいだ時にキーを追加する
    console.log(counts);
    for (let i = [...counts.keys()].at(-1) + 1; i <= today; i++) {
      console.log(i);
      counts.set(i, 0);
    }
    // 古いものを削除
    for (const key of [...counts.keys()]) {
      if (today - key >= 30) {
        counts.delete(key);
      }
    }
  }
  if (increments) {
    counts.set(today, counts.get(today) + 1);
  }
  save();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const str = [...counts.values()].reverse().map(span).join("");
  counter.innerHTML = `🍅:${str}`;

  // ローカル関数
  function span(count, i) {
    const i0 = new Date().getDay() + 7 * counts.size;
    const c = `${Math.trunc(count / 2)}${count % 2 === 0 ? "" : "'"}`;
    return `<span class="${days[(i0 - i) % 7]}">${c}</span>`;
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

const counts = loadCounts();

const counter = document.createElement("span");
counter.id = "pomodoro-counter";

function getTodayKey() {
  const date = new Date();
  return (
    (date.getFullYear() * 100 + date.getMonth() + 1) * 100 + date.getDate()
  );
}

function save() {
  localStorage.setItem("counts", JSON.stringify(Object.fromEntries(counts)));
}

function loadCounts() {
  const counts = new Map();
  const old = localStorage.getItem("counts");
  if (!old) return counts;
  const parsed = JSON.parse(old);
  for (const key in parsed) {
    counts.set(Number(key), parsed[key]);
  }
  return counts;
}
