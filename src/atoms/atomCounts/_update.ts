import { TypeCategory } from "../../types/TypeCategory";
import { TypeCounts } from "../../types/TypeCounts";
import { getKey } from "./_/_getKey";
import { getNextKey } from "./_/_getNextKey";
import { deltaIsValid } from "./_/_deltaIsValid";

/**
 * 必要であれば日付の追加を行う。
 * また、今日のカウント値を `delta` だけ変更する。
 */
export function update(counts: TypeCounts, delta: number = 0) {
  // これ以上カウント値を引けない場合は何もしない
  if (!deltaIsValid(counts, delta)) return;

  // 今日の分までキーを追加する
  addToday("days", counts);
  addToday("weeks", counts);
  addToday("months", counts);
  addToday("years", counts);

  // 各カウント値を delta だけ変更する
  addDelta("days", counts, delta);
  addDelta("weeks", counts, delta);
  addDelta("months", counts, delta);
  addDelta("years", counts, delta);

  // 多くなりすぎたキーを削除する
  //trimOldEntries(counts["days"], 1000);
}

/**
 * `counts[category]` に今日に対応するキーがない場合は追加する。
 */
function addToday(category: TypeCategory, counts: TypeCounts) {
  const todayKey = getKey(category);
  const record = counts[category];
  let lastKey = Object.keys(record).pop();
  if (!lastKey) {
    // 空の場合は今日のキーを追加する
    record[todayKey] = 0;
  } else {
    // 日をまたいだ時にキーを追加する
    for (;;) {
      lastKey = getNextKey(category, lastKey);
      if (lastKey > todayKey) break;
      record[lastKey] = 0;
    }
  }
}

/**
 * `counts[category]` の今日の値を `delta`だけ変化させる。
 * 今日に対応するキーがない場合は追加する。
 */
function addDelta(category: TypeCategory, counts: TypeCounts, delta: number) {
  const todayKey = getKey(category);
  counts[category][todayKey] += delta;
}
