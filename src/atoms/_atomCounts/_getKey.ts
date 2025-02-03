import { TypeCategory } from "../../types/TypeCategory";

/**
 * `date` をキーに変換して返す。
 * 省略した場合は今日のキーを変えす。
 * ex) `Date` => `20250101`
 */
export function _getKey(type: TypeCategory, date?: Date) {
  date ??= new Date();
  const YYYYMMDD = () =>
    (date.getFullYear() * 100 + date.getMonth() + 1) * 100 + date.getDate();

  switch (type) {
    case "days":
      return YYYYMMDD();
    case "weeks":
      for (; ; date.setDate(date.getDate() - 1)) {
        if (date.getDay() === 1) return YYYYMMDD();
      }
    case "months":
      return Math.trunc(YYYYMMDD() / 100);
    case "years":
      return Math.trunc(YYYYMMDD() / 10000);
  }
}
