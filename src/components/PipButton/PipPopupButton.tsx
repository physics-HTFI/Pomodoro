import { IconButton, Tooltip } from "@mui/material";
import { usePipPopupButton } from "./_usePipPopupButton";
import { Launch } from "@mui/icons-material";

/**
 * ピクチャインピクチャのポップアップ用ボタン
 */
export function PipPopupButton() {
  const { hidden, handleClick } = usePipPopupButton();

  if (hidden) return null;
  return (
    <Tooltip title="画面をポップアップします">
      <IconButton size="large" onClick={handleClick}>
        <Launch fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
}
