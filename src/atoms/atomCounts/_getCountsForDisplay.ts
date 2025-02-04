import { classNames, TypeClassName } from "../../types/TypeClassName";
import { TypeCategory } from "../../types/TypeCategory";
import { TypeCounts } from "../../types/TypeCounts";

/**
 * `counts`をhtml表示用の形式に変形する
 */
export function getCountsForDisplay(counts: TypeCounts) {
  return {
    days: getSpans(counts, "days").slice(0, 15),
    weeks: getSpans(counts, "weeks").slice(0, 12),
    months: getSpans(counts, "months"),
    years: getSpans(counts, "years"),
  };
}

//|
//| ローカル
//|

interface CountWithClassName {
  count: string;
  className?: TypeClassName;
}

function getSpans(
  counts: TypeCounts,
  category: TypeCategory
): CountWithClassName[] {
  return Object.values(counts[category]).reverse().map(toCountWithClassName);

  function toCountWithClassName(c: number, i: number) {
    const count = `${Math.trunc(c / 2)}${c % 2 === 0 ? "" : "'"}`;
    let className: TypeClassName | undefined;
    if (category === "days")
      className = classNames.days[mod(new Date().getDay() - i, 7)];
    if (category === "months")
      className = classNames.months[mod(new Date().getMonth() - i, 12)];
    return { count, className };
  }
}

/**
 * n/m の余りを返す。
 * 負の値にならないようにしている。
 */
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
