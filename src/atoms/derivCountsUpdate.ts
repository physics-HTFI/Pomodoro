import { atom } from "jotai";
import { derivCounts } from "./derivCounts";
import { TypeCategory } from "../types/TypeCategory";
import { TypeCounts } from "../types/TypeCounts";

/**
 * atomCountsを更新する。
 * 日付の追加を行い、今日のカウント値を`delta`だけ変更する。
 */
export const derivCountsUpdate = atom(null, (get, set, delta?: number) => {
  delta ??= 0;
  const counts = get(derivCounts);
  if (!valid(counts, delta)) return;
  update("days", counts, delta, 7 * 12 /*3か月*/);
  update("weeks", counts, delta, 53 * 2 /*2年*/);
  update("months", counts, delta);
  update("years", counts, delta);
  set(derivCounts, { ...counts });
});

//|
//| ローカル
//|

/**
 * カウント値をこれ以上引けないときに`false`を返す
 */
function valid(counts: TypeCounts, delta: number) {
  if (0 <= delta) return true;
  const keyCount = counts.days.at(-1);
  if (!keyCount || keyCount.key !== getKey("days")) return false;
  if (keyCount.count + delta < 0) return false;
  return true;
}

function update(
  category: TypeCategory,
  counts: TypeCounts,
  delta: number,
  maxNum?: number
) {
  const todayKey = getKey(category);
  const target = counts[category] ?? [];
  let lastKey = target.at(-1)?.key;
  if (!lastKey) {
    target.push({ key: todayKey, count: 0 });
  } else {
    // 日をまたいだ時にキーを追加する
    for (;;) {
      lastKey = getNextKey(category, lastKey);
      if (lastKey > todayKey) break;
      target.push({ key: lastKey, count: 0 });
    }
  }
  target.at(-1)!.count += delta;
  counts[category] = target.slice(-(maxNum ?? 0));
}

/**
 * ex) 20241231 => 20250101
 */
function getNextKey(category: TypeCategory, key: number) {
  let year;
  let month = 1;
  let day = 1;
  switch (category) {
    case "days":
    case "weeks":
      year = Math.trunc(key / 10000);
      month = Math.trunc(key / 100) % 100;
      day = key % 100;
      day += category === "days" ? 1 : 7;
      break;
    case "months":
      year = Math.trunc(key) / 100;
      month = key % 100;
      month += 1;
      break;
    case "years":
      year = key;
      year += 1;
      break;
  }
  const date = new Date(year, month - 1, day);
  return getKey(category, date);
}

/**
 * ex) `Date` => 20250101
 */
function getKey(type: TypeCategory, d?: Date) {
  d ??= new Date();
  const YYYYMMDD = () =>
    (d.getFullYear() * 100 + d.getMonth() + 1) * 100 + d.getDate();

  switch (type) {
    case "days":
      return YYYYMMDD();
    case "weeks":
      for (; ; d.setDate(d.getDate() - 1)) {
        if (d.getDay() === 1) return YYYYMMDD();
      }
    case "months":
      return Math.trunc(YYYYMMDD() / 100);
    case "years":
      return Math.trunc(YYYYMMDD() / 10000);
  }
}
