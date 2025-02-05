import { Button } from "@mui/material";
import { useSettingsButton } from "./_useSettingsButton";
import { Dialog } from "./_Dialog";

/**
 * ファイルとスピーカーを設定するボタン
 */
export function SettingsButton() {
  const { hidden, handleClick } = useSettingsButton();

  if (hidden) return null;
  return (
    <>
      <Button
        size="small"
        onClick={handleClick}
        sx={{ fontSize: "6svmin", minWidth: 0, p: 0 }}
      >
        ⚙️
      </Button>
      <Dialog />
    </>
  );
}
