import { useAtomValue } from "jotai";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { UI_History } from "./History.ui";

/**
 * カウント値の履歴を表示するコンポーネント
 */
export function History() {
  const counts = useAtomValue(atomCounts.getCountsForDisplay);
  const hasFile = useAtomValue(atomCounts.getFileName) !== "";

  return <UI_History counts={counts} hasFile={hasFile} />;
}
