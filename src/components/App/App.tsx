import { Box, Stack } from "@mui/material";
import { Svg } from "../Svg/Svg";
import { PipPopupButton } from "../PipButton/PipPopupButton";
import { Counter } from "../Counter/Counter";
import { SettingsButton } from "../SettingsButton/SettingsButton";
import { useApp } from "./_useApp";
import { PipPortal } from "../PipPortal/PipPortal";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useState } from "react";

export function App() {
  const { handleClick } = useApp();
  const [ref, setRef] = useState<unknown>();
  const cache = createCache({
    key: "css",
    container: ref as Node | undefined,
    prepend: true,
  });

  return (
    <PipPortal>
      <div ref={setRef} />
      {!!ref && (
        <CacheProvider value={cache}>
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
            <Stack direction="row" sx={{ position: "fixed", top: 4, right: 4 }}>
              <SettingsButton />
              <PipPopupButton />
            </Stack>
          </Box>
        </CacheProvider>
      )}
    </PipPortal>
  );
}
