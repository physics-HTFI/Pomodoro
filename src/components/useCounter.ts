import { useCallback } from "react";
import { atomCounts } from "../atoms/atomCounts";
import { useAtomValue, useSetAtom } from "jotai";
import { TypeCounts } from "../types/TypeCounts";
import { TypeCategory } from "../types/TypeCategory";
import { derivTimerReset } from "../atoms/derivTimerReset";

/**
 * カウント値を表示するコンポーネントのカスタムフック
 */
export function useCounter() {
  const counts = useAtomValue(atomCounts.atom);
  const timerReset = useSetAtom(derivTimerReset);
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      timerReset();
    },
    [timerReset]
  );

  const days = getSpans(counts, "days").slice(0, 15);
  const weeks = getSpans(counts, "weeks").slice(0, 12);
  const months = getSpans(counts, "months");
  const years = getSpans(counts, "years");
  return {
    days,
    weeks,
    months,
    years,
    handleClick,
  };
}

interface TypeCountSpan {
  count: string;
  className?: string;
}

function getSpans(counts: TypeCounts, category: TypeCategory): TypeCountSpan[] {
  return Object.values(counts[category]).reverse().map(toSpan);

  function toSpan(c: number, i: number) {
    const count = `${Math.trunc(c / 2)}${c % 2 === 0 ? "" : "'"}`;
    const className =
      category === "days"
        ? classNameDays[mod(new Date().getDay() - i, 7)]
        : category === "months"
        ? classNameMonths[mod(new Date().getMonth() - i, 12)]
        : undefined;
    return { count, className };
  }
}

const classNameDays = ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"];

// (クラス名は数字始まりにできないので漢数字にしている)
const classNameMonths = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

/**
 * n/m の余りを返す。
 * 負の値にならないようにしている。
 */
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
