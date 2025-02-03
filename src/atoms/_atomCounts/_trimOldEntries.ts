/**
 * `maxNum`よりも古いエントリーを削除する
 */
export function _trimOldEntries(obj: Record<string, number>, maxNum: number) {
  if (maxNum <= 0) return obj;
  const entries = Object.entries(obj);
  const sliced = entries.slice(-maxNum);
  return Object.fromEntries(sliced);
}
