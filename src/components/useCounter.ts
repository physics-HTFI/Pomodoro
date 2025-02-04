import { useCallback } from "react";
import { atomCounts } from "../atoms/atomCounts";
import { useAtomValue, useSetAtom } from "jotai";
import { derivTimerReset } from "../atoms/derivTimerReset";

/**
 * カウント値を表示するコンポーネントのカスタムフック
 */
export function useCounter() {
  const counts = useAtomValue(atomCounts.getCountsForDisplay);
  const timerReset = useSetAtom(derivTimerReset);
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
