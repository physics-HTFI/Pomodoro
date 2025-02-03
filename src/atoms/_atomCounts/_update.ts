import { TypeCategory } from "../../types/TypeCategory";
import { TypeCounts } from "../../types/TypeCounts";
import { _getKey } from "./_getKey";
import { _getNextKey } from "./_getNextKey";
import { _trimOldEntries } from "./_trimOldEntries";
import { _valid } from "./_valid";

/**
 * 必要であれば日付の追加を行う。
 * また、今日のカウント値を `delta` だけ変更する。
 */
export function _update(counts: TypeCounts, delta?: number) {
  delta ??= 0;

  // これ以上カウント値を引けない場合は何もしない
  if (!_valid(counts, delta)) return;

  // 各カウント値を delta だけ変更する
  _updatePerCategory("days", counts, delta, 1000);
  _updatePerCategory("weeks", counts, delta, 1000);
  _updatePerCategory("months", counts, delta);
  _updatePerCategory("years", counts, delta);
}

/**
 * `counts[category]` の今日の値を `delta`だけ変化させる。
 * 今日に対応するキーがない場合は追加する。
 */
export function _updatePerCategory(
  category: TypeCategory,
  counts: TypeCounts,
  delta: number,
  maxNum?: number
) {
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
  record[Object.keys(record).pop()!] += delta;
  counts[category] = _trimOldEntries(record, maxNum ?? 0);
}
