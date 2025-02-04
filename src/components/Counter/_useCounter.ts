import { useCallback } from "react";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { useAtomValue, useSetAtom } from "jotai";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";

/**
 * カウント値を表示するコンポーネントのカスタムフック
 */
export function useCounter() {
  const counts = useAtomValue(atomCounts.getCountsForDisplay);
  const timerReset = useSetAtom(atomTimer.reset);
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      timerReset();
    },
    [timerReset]
  );

  return {
    counts,
    handleClick,
  };
}
