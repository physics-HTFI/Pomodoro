import { TypeCounts } from "../../types/TypeCounts";
import { _getKey } from "./_getKey";

/**
 * カウント値をこれ以上引けないときに`false`を返す
 */
export function _valid(counts: TypeCounts, delta: number) {
  if (0 <= delta) return true;
  const todayCount = counts.days[_getKey("days")] ?? 0;
  if (todayCount + delta < 0) return false;
  return true;
}
