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
  // カウント値を更新
  increment("day", counts日, increments);
  increment("week", counts週, increments);
  increment("month", counts月, increments);
  increment("year", counts年, increments);
  // 古いものを削除
  take(counts日, 30);
  take(counts週, 30);
  take(counts月, 30);
  saveCounts();

  setHtml(counter日, counts日, toSpan日);
  setHtml(counter週, counts週, toSpan);
  setHtml(counter月, counts月, toSpan月);
  setHtml(counter年, counts年, toSpan);

  // ローカル関数
  function setHtml(counter, counts, toSpan) {
    const str = [...counts.values()].reverse().map(toSpan).join("");
    counter.innerHTML = `${str}`;
  }
  function toSpan日(count, i) {
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    const i0 = new Date().getDay() + 7 * counts日.size;
    return `<span class="${days[(i0 - i) % 7]}">${toStr(count)}</span>`;
  }
  function toSpan月(count, i) {
    const i0 = new Date().getMonth() + 12 * counts月.size;
    // (クラス名は数字始まりにできない)
    return `<span class="月${(i0 - i + 1) % 12}">${toStr(count)}</span>`;
  }
  function toSpan(count) {
    return `<span>${toStr(count)}</span>`;
  }
  function toStr(count) {
    return `${Math.trunc(count / 2)}${count % 2 === 0 ? "" : "'"}`;
  }
  function take(map, max) {
    for (const key of [...map.keys()]) {
      if (map.size <= max) return;
      map.delete(key);
    }
  }
  function increment(type, map, increments) {
    const key = getKey(type);
    if (map.size === 0) {
      map.set(key, 0);
    } else {
      // 日をまたいだ時にキーを追加する
      let lastKey = [...map.keys()].at(-1);
      for (;;) {
        lastKey = getNextKey(type, lastKey);
        if (lastKey > key) break;
        map.set(lastKey, 0);
      }
    }
    if (!increments) return;
    map.set(key, map.get(key) + 1);
  }
}

/**
 * カウンターをリセットする
 */
export function resetCounter(e) {
  e?.stopPropagation();
  timerReset();
  counts日.clear();
  counts週.clear();
  counts月.clear();
  counts年.clear();
  updateCounter();
}

//|
//| ローカル
//|

const { counts日, counts週, counts月, counts年 } = loadCounts();

const counter = document.createElement("div");
const counter日 = document.createElement("div");
const counter週 = document.createElement("div");
const counter月 = document.createElement("div");
const counter年 = document.createElement("div");
counter.id = "pomodoro-counter";
counter日.id = "pomodoro-counter-日";
counter週.id = "pomodoro-counter-週";
counter月.id = "pomodoro-counter-月";
counter年.id = "pomodoro-counter-年";
counter.append(counter日, counter週, counter月, counter年);

function getKey(type, d) {
  d ??= new Date();
  switch (type) {
    case "year":
      return d.getFullYear();
    case "month":
      return d.getFullYear() * 100 + d.getMonth() + 1;
    case "week":
      for (; ; d.setDate(d.getDate() - 1)) {
        if (d.getDay() === 1) break;
      }
    case "day":
      return (d.getFullYear() * 100 + d.getMonth() + 1) * 100 + d.getDate();
  }
  return null;
}
function getNextKey(type, key) {
  let year;
  let month = 1;
  let day = 1;
  switch (type) {
    case "day":
    case "week":
      year = Math.trunc(key / 10000);
      month = Math.trunc(key / 100) % 100;
      day = key % 100;
      day += type === "day" ? 1 : 7;
      break;
    case "month":
      year = Math.trunc(key) / 100;
      month = key % 100;
      month += 1;
      break;
    case "year":
      year = key;
      year += 1;
      break;
  }
  const date = new Date(year, month - 1, day);
  return getKey(type, date);
}

function saveCounts() {
  save("counts日", counts日);
  save("counts週", counts週);
  save("counts月", counts月);
  save("counts年", counts年);

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(Object.fromEntries(value)));
  }
}

function loadCounts() {
  return {
    counts日: parse("counts日"),
    counts週: parse("counts週"),
    counts月: parse("counts月"),
    counts年: parse("counts年"),
  };

  function parse(localStrageKey) {
    const json = localStorage.getItem(localStrageKey);
    if (!json) return new Map();
    const map = new Map();
    const parsed = JSON.parse(json);
    for (const key in parsed) {
      map.set(Number(key), parsed[key]);
    }
    return map;
  }
}
