import { Stack, ThemeProvider } from "@mui/material";
import { Svg } from "../Svg/Svg";
import { PipPopupButton } from "../pip/PipPopupButton";
import { Counter } from "../Counter/Counter";
import { SettingsButton } from "../SettingsButton/SettingsButton";
import { useClick } from "./App.use";
import { theme } from "./ui/theme";
import { MainContainer } from "./ui/MainContainer";
import { Edit } from "../Edit/Edit";
import { PipPortal } from "../pip/PipPortal";

export function App() {
  const { onTimerClick, document } = useClick();

  return (
    <PipPortal>
      <ThemeProvider theme={theme}>
        <MainContainer onTimerClick={onTimerClick} document={document}>
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
            <Edit />
            <SettingsButton />
            <PipPopupButton />
          </Stack>
        </MainContainer>
      </ThemeProvider>
    </PipPortal>
  );
}
