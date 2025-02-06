import { Box, Stack } from "@mui/material";
import { Svg } from "../Svg/Svg";
import { PipPopupButton } from "../PipButton/PipPopupButton";
import { Counter } from "../Counter/Counter";
import { SettingsButton } from "../SettingsButton/SettingsButton";
import { useApp } from "./_useApp";
import { PipPortal } from "../PipPortal/PipPortal";

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
      </Box>
    </PipPortal>
  );
}
