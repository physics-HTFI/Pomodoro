import { getKey } from "./getKey";
import { getNextKey } from "./getNextKey";
import { deltaIsValid } from "./deltaIsValid";
import { TypeCategory } from "../../type/TypeCategory";
import { TypeHistory } from "../../type/TypeHistory";

/**
 * 必要であれば日付の追加を行う。
 * また、今日のカウント値を `delta` だけ変更する。
 * 変更されたら`true`が返る。
 */
export function update(counts: TypeHistory, delta: number = 0): boolean {
  // これ以上カウント値を引けない場合は何もしない
  if (!deltaIsValid(counts, delta)) return false;

  const changed = [
    // 今日の分までキーを追加する
    addToday("days", counts),
    addToday("weeks", counts),
    addToday("months", counts),
    addToday("years", counts),

    // 各カウント値を delta だけ変更する
    addDelta("days", counts, delta),
    addDelta("weeks", counts, delta),
    addDelta("months", counts, delta),
    addDelta("years", counts, delta),
  ];

  return changed.some((changed) => changed);

  // 多くなりすぎたキーを削除する
  //trimOldEntries(counts["days"], 1000);
}

/**
 * `counts[category]` に今日に対応するキーがない場合は追加する。
 */
function addToday(category: TypeCategory, counts: TypeHistory): boolean {
  const todayKey = getKey(category);
  const record = counts[category];
  let lastKey = Object.keys(record).pop();
  if (!lastKey) {
    // 空の場合は今日のキーを追加する
    record[todayKey] = 0;
    return true;
  } else {
    // 日をまたいだ時にキーを追加する
    let changed = false;
    for (;;) {
      lastKey = getNextKey(category, lastKey);
      if (lastKey > todayKey) break;
      record[lastKey] = 0;
      changed = true;
    }
    return changed;
  }
}

/**
 * `counts[category]` の今日の値を `delta`だけ変化させる。
 * 今日に対応するキーがない場合は追加する。
 */
function addDelta(
  category: TypeCategory,
  counts: TypeHistory,
  delta: number
): boolean {
  const todayKey = getKey(category);
  counts[category][todayKey] += delta;
  const changed = delta !== 0;
  return changed;
}
