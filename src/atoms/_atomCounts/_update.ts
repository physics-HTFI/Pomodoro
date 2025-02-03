import { TypeCategory } from "../../types/TypeCategory";
import { TypeCounts } from "../../types/TypeCounts";
import { _getKey } from "./_getKey";

/**
 * `counts[category]` の今日の値を `delta`だけ変化させる。
 * 今日に対応するキーがない場合は追加する。
 */
export function _update(
  category: TypeCategory,
  counts: TypeCounts,
  delta: number,
  maxNum?: number
) {
  const todayKey = _getKey(category);
  const target = counts[category];
  let lastKey = target.at(-1)?.key;
  if (!lastKey) {
    // 空の場合は今日のキーを追加する
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
  return _getKey(category, date);
}
