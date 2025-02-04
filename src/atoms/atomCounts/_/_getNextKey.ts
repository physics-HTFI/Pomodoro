import { TypeCategory } from "../../../types/TypeCategory";
import { getKey } from "./_getKey";

/**
 * `key`の次に来るキーを返す。
 * ex) "20241231" => "20250101"
 */
export function getNextKey(category: TypeCategory, key: string) {
  const num = Number(key);
  let year;
  let month = 1;
  let day = 1;
  switch (category) {
    case "days":
    case "weeks":
      year = Math.trunc(num / 10000);
      month = Math.trunc(num / 100) % 100;
      day = num % 100;
      day += category === "days" ? 1 : 7;
      break;
    case "months":
      year = Math.trunc(num) / 100;
      month = num % 100;
      month += 1;
      break;
    case "years":
      year = num;
      year += 1;
      break;
  }
  const date = new Date(year, month - 1, day);
  return getKey(category, date);
}
