import { TypeCategory } from "../../types/TypeCategory";
import { TypeCounts } from "../../types/TypeCounts";
import { _getKey } from "./_getKey";
import { _getNextKey } from "./_getNextKey";
import { _trimOldEntries } from "./_trimOldEntries";
import { _deltaIsValid } from "./_deltaIsValid";

/**
 * 必要であれば日付の追加を行う。
 * また、今日のカウント値を `delta` だけ変更する。
 */
export function _update(counts: TypeCounts, delta?: number) {
  delta ??= 0;

  // これ以上カウント値を引けない場合は何もしない
  if (!_deltaIsValid(counts, delta)) return;

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
  _trimOldEntries(counts["days"], 1000);
}

/**
 * `counts[category]` に今日に対応するキーがない場合は追加する。
 */
function addToday(category: TypeCategory, counts: TypeCounts) {
  const todayKey = _getKey(category);
  const record = counts[category];
  let lastKey = Object.keys(record).pop();
  if (!lastKey) {
    // 空の場合は今日のキーを追加する
    record[todayKey] = 0;
  } else {
    // 日をまたいだ時にキーを追加する
    for (;;) {
      lastKey = _getNextKey(category, lastKey);
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
  const todayKey = _getKey(category);
  counts[category][todayKey] += delta;
}
