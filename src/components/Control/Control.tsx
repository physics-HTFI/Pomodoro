import { IconButton, Stack } from "@mui/material";
import { useAtomValue } from "jotai";
import { atomPipWindow } from "../../atoms/atomPipWindow";
import {
  HighlightOff,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";

export function Control() {
  const hasPip = useAtomValue(atomPipWindow) !== undefined;

  const transform = hasPip ? "scale(0.5)" : undefined;
  return (
    <Stack
      alignItems="center"
      alignSelf="center"
      sx={{
        transform,
      }}
    >
      <IconButton sx={{ color: "white" }}>
        <KeyboardDoubleArrowUp />
      </IconButton>
      <Stack direction="row">
        <IconButton sx={{ color: "white" }}>
          <KeyboardDoubleArrowLeft />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <HighlightOff />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <KeyboardDoubleArrowRight />
        </IconButton>
      </Stack>
      <IconButton sx={{ color: "white" }}>
        <KeyboardDoubleArrowDown />
      </IconButton>
    </Stack>
  );
}
