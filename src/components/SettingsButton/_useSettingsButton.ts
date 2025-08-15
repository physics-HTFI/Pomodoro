import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { atomOpenSettingsDialog } from "../../atoms/atomOpenSettingsDialog";
import { atomPlay } from "../../atoms/atomPlay/atomPlay";
import { atomCountsFile } from "../../atoms/atomCounts/_atomCountsFile";
import { modelPip } from "../pip/model/modelPip";

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
