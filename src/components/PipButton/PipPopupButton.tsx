import { IconButton, Tooltip } from "@mui/material";
import { usePipPopupButton } from "./PipPopupButton.use";
import { Launch } from "@mui/icons-material";

/**
 * ピクチャインピクチャのポップアップ用ボタン
 */
export function PipPopupButton() {
  const { isPip, onClick } = usePipPopupButton();

  if (isPip) return null;
  return (
    <Tooltip title="画面をポップアップします">
      <IconButton size="large" onClick={onClick}>
        <Launch fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
}
