import { UI_History } from "./History.ui";
import { modelHistory } from "./model/modelHistory";

/**
 * カウント値の履歴を表示するコンポーネント
 */
export function History() {
  const counts = modelHistory.useCountsForDisplay();
  const hasFile = modelHistory.useFileName() !== "";

  return <UI_History counts={counts} hasFile={hasFile} />;
}
