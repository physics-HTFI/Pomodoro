import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { Svg } from "../Svg/Svg";
import { PipPopupButton } from "../PipButton/PipPopupButton";
import { Counter } from "../Counter/Counter";
import { SettingsButton } from "../SettingsButton/SettingsButton";
import { useApp } from "./_useApp";
import { PipPortal } from "../PipPortal/PipPortal";
import { Control } from "../Control/Control";

export function App() {
  const { handleClick } = useApp();

  return (
    <PipPortal>
      <ThemeProvider theme={darkTheme}>
        <Box
          id="main"
          sx={{
            background: "#202124",
            display: "flex",
            height: "100svh",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            flexDirection: "column",
          }}
          onClick={handleClick}
        >
          <Svg />
          <Counter />
          <Stack
            direction="row"
            sx={{
              position: "fixed",
              top: 4,
              right: 4,
              alignItems: "center",
              "div:not(:hover) > &": { display: "none" },
            }}
          >
            <Control />
            <SettingsButton />
            <PipPopupButton />
          </Stack>
        </Box>
      </ThemeProvider>
    </PipPortal>
  );
}

/**
 * ボタンにマウスホバーしたときの反応が分かりやすいようにダークモードにする
 */
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
