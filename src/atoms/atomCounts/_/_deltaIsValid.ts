import { TypeCounts } from "../../../types/TypeCounts";
import { getKey } from "./_getKey";

/**
 * カウント値をこれ以上引けないときに`false`を返す
 */
export function deltaIsValid(counts: TypeCounts, delta: number) {
  if (0 <= delta) return true;
  const todayCount = counts["days"][getKey("days")] ?? 0;
  if (todayCount + delta < 0) return false;
  return true;
}
