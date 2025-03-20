import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { atomPipWindow } from "../../atoms/atomPipWindow";
import { atomOpenSettingsDialog } from "../../atoms/atomOpenSettingsDialog";
import { atomPlay } from "../../atoms/atomPlay/atomPlay";
import { atomCountsFile } from "../../atoms/atomCounts/_atomCountsFile";

export function useSettingsButton() {
  const play = useSetAtom(atomPlay.playAsync);
  const isPip = useAtomValue(atomPipWindow) !== undefined;
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
    isPip,
    open,
    handleClick,
  };
}
