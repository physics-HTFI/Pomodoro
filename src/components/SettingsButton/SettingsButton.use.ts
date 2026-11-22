import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { atomOpenSettingsDialog } from "./model/atomOpenSettingsDialog";
import { atomPlay } from "./model/atomPlay/atomPlay";
import { modelPip } from "../pip/model/modelPip";
import { atomCountsFile } from "../History/model/atom/atomCountsFile/atomCountsFile";

export function useSettingsButton() {
  const play = useSetAtom(atomPlay.playAsync);
  const { pipOpen } = modelPip.useValues();
  const loadLastUsedFileAsync = useSetAtom(
    atomCountsFile.loadLastUsedFileAsync
  );
  const [open, setOpen] = useAtom(atomOpenSettingsDialog);
  const handleClick = useCallback(async () => {
    play();
    // 先にダイアログを開く（ファイルの読み込みが失敗・保留されてもダイアログが表示されるように）
    setOpen(true);
    try {
      await loadLastUsedFileAsync();
    } catch (error) {
      console.warn("前回のファイルの読み込みに失敗しました:", error);
    }
  }, [setOpen, play, loadLastUsedFileAsync]);

  return {
    pipOpen,
    open,
    handleClick,
  };
}
