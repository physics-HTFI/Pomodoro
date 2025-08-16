import { useEffect } from "react";
import { UI_History } from "./History.ui";
import { modelHistory } from "./model/modelHistory";

/**
 * カウント値の履歴を表示するコンポーネント
 */
export function History() {
  const counts = modelHistory.useCountsForDisplay();
  const hasFile = modelHistory.useFileName() !== "";
  const update = modelHistory.useUpdateAsync();

  // 60秒ごとに日付が変わっていないか確認する
  useEffect(() => {
    const id = window.setInterval(update, 60 * 1000);
    return clearInterval(id);
  }, [update]);

  return <UI_History counts={counts} hasFile={hasFile} />;
}
