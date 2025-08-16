import { TypeHistory } from "../../type/TypeHistory";
import { getKey } from "./getKey";

/**
 * カウント値をこれ以上引けないときに`false`を返す
 */
export function deltaIsValid(counts: TypeHistory, delta: number) {
  if (0 <= delta) return true;
  const todayCount = counts["days"][getKey("days")] ?? 0;
  if (todayCount + delta < 0) return false;
  return true;
}
