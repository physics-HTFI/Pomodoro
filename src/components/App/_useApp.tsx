import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function useApp() {
  const updateCountsAsync = useSetAtom(atomCounts.updateAsync);
  const skipTimer = useSetAtom(atomTimer.skipBy);
  const toggle = useSetAtom(atomTimer.toggle);
  const pip = useAtomValue(atomPipWindow);
  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowUp") await updateCountsAsync(1);
      if (e.key === "ArrowDown") await updateCountsAsync(-1);
      if (e.key === "ArrowLeft") skipTimer(60);
      if (e.key === "ArrowRight") skipTimer(-60);
    },
    [updateCountsAsync, skipTimer]
  );
  const toggleTimer = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const doc = pip?.document ?? document;
      const isMain = doc.getElementById("main") === e.target;
      const isSvg = doc.getElementById("svg")?.contains(e.target as Node);
      if (!isMain && !isSvg) return;
      toggle();
    },
    [toggle, pip]
  );
  return { handleKeyDown, toggleTimer };
}
