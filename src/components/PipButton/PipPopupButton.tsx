import { IconButton } from "@mui/material";
import { usePipPopupButton } from "./_usePipPopupButton";
import { Launch } from "@mui/icons-material";

/**
 * ピクチャインピクチャのポップアップ用ボタン
 */
export function PipPopupButton() {
  const { hidden, handleClick } = usePipPopupButton();

  if (hidden) return null;
  return (
    <IconButton size="large" onClick={handleClick}>
      <Launch fontSize="inherit" />
    </IconButton>
  );
}
