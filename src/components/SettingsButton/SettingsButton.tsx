import { IconButton, Tooltip } from "@mui/material";
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
      <Tooltip title="ファイルと音声の出力先を設定します">
        <IconButton size="large" onClick={handleClick}>
          <Settings fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Dialog />
    </>
  );
}
