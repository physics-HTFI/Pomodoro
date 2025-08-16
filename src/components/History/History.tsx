import { useAtomValue } from "jotai";
import { UI_History } from "./History.ui";
import { modelHistory } from "./model/modelHistory";

/**
 * カウント値の履歴を表示するコンポーネント
 */
export function History() {
  const counts = useAtomValue(modelHistory.getCountsForDisplay);
  const hasFile = useAtomValue(modelHistory.getFileName) !== "";

  return <UI_History counts={counts} hasFile={hasFile} />;
}
