import { TypeCounts } from "../../types/TypeCounts";
import { _getKey } from "./_getKey";

/**
 * カウント値をこれ以上引けないときに`false`を返す
 */
export function _valid(counts: TypeCounts, delta: number) {
  if (0 <= delta) return true;
  const keyCount = counts.days.at(-1);
  const isToday = keyCount?.key === _getKey("days");
  if (!isToday) return false;
  if (keyCount.count + delta < 0) return false;
  return true;
}
