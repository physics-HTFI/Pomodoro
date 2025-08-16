import { TypeCategory } from "../../type/TypeCategory";
import { classNames, TypeClassName } from "../../type/TypeClassName";
import { TypeHistory } from "../../type/TypeHistory";

/**
 * `counts`をhtml表示用の形式に変形する
 */
export function getCountsForDisplay(counts: TypeHistory, saved: boolean) {
  return {
    days: getSpans(counts, "days", saved ? 30 : 1),
    weeks: saved ? getSpans(counts, "weeks", 30) : [],
    months: saved ? getSpans(counts, "months", 30) : [],
    years: saved ? getSpans(counts, "years", 30) : [],
  };
}

export type TypeCountsForDisplay =
  | {
      days: CountWithClassName[];
      weeks: CountWithClassName[];
      months: CountWithClassName[];
      years: CountWithClassName[];
    }
  | undefined;

//|
//| ローカル
//|

interface CountWithClassName {
  count: string;
  className?: TypeClassName;
}

function getSpans(
  counts: TypeHistory,
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
