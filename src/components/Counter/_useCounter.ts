import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { useAtomValue } from "jotai";

/**
 * カウント値を表示するコンポーネントのカスタムフック
 */
export function useCounter() {
  const counts = useAtomValue(atomCounts.getCountsForDisplay);
  const hasFile = useAtomValue(atomCounts.getFileName);

  return {
    counts,
    hasFile,
  };
}
