import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { atomPipWindow } from "../../atoms/atomPipWindow";
import { atomOpenSettingsDialog } from "../../atoms/atomOpenSettingsDialog";
import { atomPlay } from "../../atoms/atomPlay/atomPlay";

export function useSettingsButton() {
  const play = useSetAtom(atomPlay.playAsync);
  const hidden = useAtomValue(atomPipWindow) !== undefined;
  const setOpen = useSetAtom(atomOpenSettingsDialog);
  const handleClick = useCallback(() => {
    play();
    setOpen(true);
  }, [setOpen, play]);

  return {
    hidden,
    handleClick,
  };
}
