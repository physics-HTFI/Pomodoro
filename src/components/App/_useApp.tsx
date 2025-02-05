import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";

export function useApp() {
  const resetFile = useSetAtom(atomCounts.resetFileFromIndexedDb);
  const updateCounts = useSetAtom(atomCounts.update);
  const skipTimer = useSetAtom(atomTimer.skipBy);
  const resetTimer = useSetAtom(atomTimer.reset);
  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowUp") await updateCounts(1);
      if (e.key === "ArrowDown") await updateCounts(-1);
      if (e.key === "ArrowLeft") skipTimer(60);
      if (e.key === "ArrowRight") skipTimer(-60);
    },
    [updateCounts, skipTimer]
  );
  const toggleTimer = useSetAtom(atomTimer.toggle);
  useEffect(() => {
    const effect = async () => {
      await resetFile();
      await updateCounts();
      resetTimer();
    };
    effect();
  }, [updateCounts, resetTimer, resetFile]);

  return { handleKeyDown, toggleTimer };
}
