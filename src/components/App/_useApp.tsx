import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";

export function useApp() {
  const updateCountsAsync = useSetAtom(atomCounts.updateAsync);
  const skipTimer = useSetAtom(atomTimer.skipBy);
  const resetTimer = useSetAtom(atomTimer.reset);
  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowUp") await updateCountsAsync(1);
      if (e.key === "ArrowDown") await updateCountsAsync(-1);
      if (e.key === "ArrowLeft") skipTimer(60);
      if (e.key === "ArrowRight") skipTimer(-60);
    },
    [updateCountsAsync, skipTimer]
  );
  const toggleTimer = useSetAtom(atomTimer.toggle);
  useEffect(() => {
    const effect = async () => {
      await updateCountsAsync();
      resetTimer();
    };
    effect();
  }, [updateCountsAsync, resetTimer]);

  return { handleKeyDown, toggleTimer };
}
