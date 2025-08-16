import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { atomOpenSettingsDialog } from "./model/atomOpenSettingsDialog";
import { atomPlay } from "./model/atomPlay/atomPlay";
import { modelPip } from "../pip/model/modelPip";
import { atomCountsFile } from "../History/model/atom/atomCountsFile";

export function useSettingsButton() {
  const play = useSetAtom(atomPlay.playAsync);
  const { pipOpen } = modelPip.useValues();
  const loadLastUsedFileAsync = useSetAtom(
    atomCountsFile.loadLastUsedFileAsync
  );
  const [open, setOpen] = useAtom(atomOpenSettingsDialog);
  const handleClick = useCallback(async () => {
    play();
    await loadLastUsedFileAsync();
    setOpen(true);
  }, [setOpen, play, loadLastUsedFileAsync]);

  return {
    pipOpen,
    open,
    handleClick,
  };
}
