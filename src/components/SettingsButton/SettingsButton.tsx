import { IconButton } from "@mui/material";
import { useSettingsButton } from "./_useSettingsButton";
import { Dialog } from "./_Dialog";
import { Settings } from "@mui/icons-material";

/**
 * ファイルとスピーカーを設定するボタン
 */
export function SettingsButton() {
  const { hidden, handleClick } = useSettingsButton();

  if (hidden) return null;
  return (
    <>
      <IconButton size="large" onClick={handleClick}>
        <Settings fontSize="inherit" />
      </IconButton>
      <Dialog />
    </>
  );
}
