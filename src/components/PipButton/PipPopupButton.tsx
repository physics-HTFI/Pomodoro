import { usePipPopupButton } from "./PipPopupButton.use";
import { Launch } from "@mui/icons-material";
import { Icon } from "../common/Icon";

/**
 * ピクチャインピクチャのポップアップ用ボタン
 */
export function PipPopupButton() {
  const { isPip, onClick } = usePipPopupButton();

  if (isPip) return null;
  return (
    <Icon icon={Launch} tooltip="画面をポップアップします" onClick={onClick} />
  );
}
