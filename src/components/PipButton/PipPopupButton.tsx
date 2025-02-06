import { Button } from "@mui/material";
import { usePipPopupButton } from "./usePipPopupButton";

/**
 * ピクチャインピクチャのポップアップ用ボタン
 */
export function PipPopupButton() {
  const { hidden, handleClick } = usePipPopupButton();

  if (hidden) return null;
  return (
    <Button
      size="small"
      onClick={handleClick}
      sx={{ fontSize: "6svmin", minWidth: 0, p: 0 }}
    >
      🪟
    </Button>
  );
}
