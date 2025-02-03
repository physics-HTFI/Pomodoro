import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { atomPipWindow } from "../atoms/atomPipWindow";
import { play } from "../utils/play";
import { atomOpenSettingsDialog } from "../atoms/atomOpenSettingsDialog";

export function useSettingsButton() {
  const hidden = useAtomValue(atomPipWindow) !== undefined;
  const setOpen = useSetAtom(atomOpenSettingsDialog);
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      play();
      setOpen(true);
    },
    [setOpen]
  );

  return {
    hidden,
    handleClick,
  };
}
