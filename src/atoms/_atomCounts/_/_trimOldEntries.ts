/**
 * `maxNum`よりも古いエントリーを削除する
 */
export function _trimOldEntries(obj: Record<string, number>, maxNum: number) {
  if (maxNum <= 0) return obj;
  const oldKeys = Object.keys(obj).slice(0, -maxNum);
  for (const key of oldKeys) {
    delete obj[key];
  }
}
