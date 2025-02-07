import { Box, Stack } from "@mui/material";
import {
  Cancel,
  ControlCamera,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { Icon } from "./_Icon";
import { useControl } from "./_useControl";

export function Control() {
  const { clickCenter, clickDown, clickLeft, clickRight, clickUp } =
    useControl();

  return (
    <Box
      sx={{
        "&:hover > :first-child": { display: "none" },
        "&:not(:hover) > :not(:first-child)": {
          display: "none",
        },
      }}
    >
      <ControlCamera
        sx={{ display: "block", color: "white" }}
        fontSize="large"
      />
      <Stack
        alignItems="center"
        alignSelf="center"
        sx={{ background: "#334d", borderRadius: 5 }}
      >
        <Icon
          icon={<KeyboardDoubleArrowUp fontSize="small" />}
          onClick={clickUp}
        />
        <Stack direction="row">
          <Icon
            icon={<KeyboardDoubleArrowLeft fontSize="small" />}
            onClick={clickLeft}
          />
          <Icon icon={<Cancel fontSize="small" />} onClick={clickCenter} />
          <Icon
            icon={<KeyboardDoubleArrowRight fontSize="small" />}
            onClick={clickRight}
          />
        </Stack>
        <Icon
          icon={<KeyboardDoubleArrowDown fontSize="small" />}
          onClick={clickDown}
        />
      </Stack>
    </Box>
  );
}
