import { useSettingsButton } from "./SettingsButton.use";
import { Dialog } from "./ui/Dialog";
import { Settings } from "@mui/icons-material";
import { Icon } from "../common/Icon";

/**
 * ファイルとスピーカーを設定するボタン
 */
export function SettingsButton() {
  const { pipOpen, open, handleClick } = useSettingsButton();

  if (pipOpen) return null;
  return (
    <>
      {!open && ( // 設定ダイアログを表示したときに一瞬左上にツールチップが残るのを防ぐ
        <Icon
          tooltip="ファイルと音声の出力先を設定します"
          icon={Settings}
          onClick={handleClick}
        />
      )}
      <Dialog />
    </>
  );
}
