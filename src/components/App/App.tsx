import { Stack, ThemeProvider } from "@mui/material";
import { Timer } from "../Timer/Timer";
import { PipPopupButton } from "../pip/PipPopupButton";
import { History } from "../History/History";
import { SettingsButton } from "../SettingsButton/SettingsButton";
import { theme } from "./ui/theme";
import { MainContainer } from "./ui/MainContainer";
import { Edit } from "../Edit/Edit";
import { PipPortal } from "../pip/PipPortal";
import { modelTimer } from "../Timer/model/modelTimer";
import { modelPip } from "../pip/model/modelPip";

export function App() {
  const toggle = modelTimer.useToggleAsync();
  const { pipDocument } = modelPip.useValues();

  return (
    <PipPortal>
      <ThemeProvider theme={theme}>
        <MainContainer onTimerClick={toggle} document={pipDocument ?? document}>
          <Timer />
          <History />
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
