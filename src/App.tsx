import { Box, Stack } from "@mui/material";
import { Svg } from "./components/Svg";
import { PipPopupButton } from "./components/PipPopupButton";
import { Counter } from "./components/Counter";
import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { derivTimerToggle } from "./atoms/derivTimerToggle";
import { derivTimerReset } from "./atoms/derivTimerReset";
import { PipPortal } from "./components/PipPortal";
import { derivFileHandle } from "./atoms/derivFileHandle";
import { loadFileHandle } from "./utils/fileHandle";
import { SettingsButton } from "./components/SettingsButton";
import { SettingsDialog } from "./components/SettingsDialog";
import { derivTimerSkip } from "./atoms/derivTimerSkip";
import { atomCounts } from "./atoms/atomCounts";

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
  const setFileHandle = useSetAtom(derivFileHandle);
  const updateCounts = useSetAtom(atomCounts.update);
  const moveTimer = useSetAtom(derivTimerSkip);
  const resetTimer = useSetAtom(derivTimerReset);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowUp") updateCounts(1);
      if (e.key === "ArrowDown") updateCounts(-1);
      if (e.key === "ArrowLeft") moveTimer(60);
      if (e.key === "ArrowRight") moveTimer(-60);
    },
    [updateCounts, moveTimer]
  );
  const toggleTimer = useSetAtom(derivTimerToggle);
  useEffect(() => {
    const effect = async () => {
      setFileHandle(await loadFileHandle());
      updateCounts();
      resetTimer();
    };
    effect();
  }, [updateCounts, resetTimer, setFileHandle]);

  return { handleKeyDown, toggleTimer };
}
