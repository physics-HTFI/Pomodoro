import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function useApp() {
  const toggle = useSetAtom(atomTimer.toggle);
  const pip = useAtomValue(atomPipWindow);
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const doc = pip?.document ?? document;
      const isMain = doc.getElementById("main") === e.target;
      const isSvg = doc.getElementById("svg")?.contains(e.target as Node);
      if (!isMain && !isSvg) return;
      toggle();
    },
    [toggle, pip]
  );
  return { handleClick };
}
