import { Launch } from "@mui/icons-material";
import { Icon } from "../common/Icon";
import { modelPip } from "./model/modelPip";

/**
 * ピクチャインピクチャのポップアップ用ボタン
 */
export function PipPopupButton() {
  const { pipOpen } = modelPip.useValues();
  const createPipWindow = modelPip.useCreatePipWindow();

  if (pipOpen) return null;
  return (
    <Icon
      icon={Launch}
      tooltip="画面をポップアップします"
      onClick={createPipWindow}
    />
  );
}
