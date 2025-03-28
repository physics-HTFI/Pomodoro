import { TypeCategory } from "../../../types/TypeCategory";

// オブジェクト中でソートされた状態を保つには、キーは数値に変換できなければならない。
// そのため、`20250101`のようなキーは良いが、`2025-01-01`はダメ。

/**
 * `date` をキーに変換して返す。
 * 省略した場合は今日のキーを返す。
 * ex) `Date` => `20250101`
 */
export function getKey(type: TypeCategory, date?: Date) {
  date ??= new Date();
  const key = getKeyNumber(type, date);
  return `${key}`;
}

function getKeyNumber(type: TypeCategory, date: Date) {
  switch (type) {
    case "days":
      return YYYYMMDD(date);
    case "weeks":
      for (; ; date.setDate(date.getDate() - 1)) {
        if (date.getDay() === 1) return YYYYMMDD(date);
      }
    case "months":
      return Math.trunc(YYYYMMDD(date) / 100);
    case "years":
      return Math.trunc(YYYYMMDD(date) / 10000);
  }
}

function YYYYMMDD(date: Date) {
  return (
    (date.getFullYear() * 100 + date.getMonth() + 1) * 100 + date.getDate()
  );
}
