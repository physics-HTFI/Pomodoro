import { Box, Stack } from "@mui/material";
import { Svg } from "./components/Svg/Svg";
import { PipPopupButton } from "./components/PipPopupButton";
import { Counter } from "./components/Counter/Counter";
import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { PipPortal } from "./components/PipPortal";
import { SettingsButton } from "./components/SettingsButton";
import { SettingsDialog } from "./components/SettingsDialog";
import { atomCounts } from "./atoms/atomCounts/atomCounts";
import { atomTimer } from "./atoms/atomTimer/atomTimer";

export function App() {
  const { handleKeyDown, toggleTimer } = useApp();

  return (
    <PipPortal>
      <Box
        id="pomodoro"
        sx={{
          background: "#202124",
          display: "flex",
          height: "100svh",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
          flexDirection: "column",
        }}
        tabIndex={-1} // これがないとonKeyDownが発火しない
        onKeyDown={handleKeyDown}
        onClick={toggleTimer}
      >
        <Svg />
        <Counter />
        <Stack direction="row" sx={{ position: "fixed", top: 4, right: 4 }}>
          <SettingsButton />
          <PipPopupButton />
        </Stack>
        <SettingsDialog />
      </Box>
    </PipPortal>
  );
}

function useApp() {
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
