import { classNames, TypeClassName } from "../../types/TypeClassName";
import { TypeCategory } from "../../types/TypeCategory";
import { TypeCounts } from "../../types/TypeCounts";

/**
 * `counts`をhtml表示用の形式に変形する
 */
export function getCountsForDisplay(counts: TypeCounts, saved: boolean) {
  return {
    days: getSpans(counts, "days", saved ? 100 : 1),
    weeks: saved ? getSpans(counts, "weeks", 100) : [],
    months: saved ? getSpans(counts, "months") : [],
    years: saved ? getSpans(counts, "years") : [],
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
  category: TypeCategory,
  maxNum?: number
): CountWithClassName[] {
  return Object.values(counts[category])
    .slice(-(maxNum ?? 0))
    .reverse()
    .map(toCountWithClassName);

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
