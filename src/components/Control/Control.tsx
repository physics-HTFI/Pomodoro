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
  const { fontSize, clickCenter, clickDown, clickLeft, clickRight, clickUp } =
    useControl();

  return (
    <Box
      sx={{
        "&:hover > svg": { display: "none" },
        "&:not(:hover) > div": {
          display: "none",
        },
      }}
    >
      <ControlCamera
        sx={{ display: "block", color: "white" }}
        fontSize={fontSize}
      />
      <Stack
        alignItems="center"
        alignSelf="center"
        sx={{ background: "#334d", borderRadius: 5 }}
      >
        <Icon
          tooltip="カウント値 +1"
          icon={<KeyboardDoubleArrowUp fontSize="small" />}
          onClick={clickUp}
        />
        <Stack direction="row">
          <Icon
            tooltip="残り時間 +1分"
            icon={<KeyboardDoubleArrowLeft fontSize="small" />}
            onClick={clickLeft}
          />
          <Icon
            tooltip="タイマーリセット"
            icon={<Cancel fontSize="small" />}
            onClick={clickCenter}
          />
          <Icon
            tooltip="残り時間 -1分"
            icon={<KeyboardDoubleArrowRight fontSize="small" />}
            onClick={clickRight}
          />
        </Stack>
        <Icon
          tooltip="カウント値 -1"
          icon={<KeyboardDoubleArrowDown fontSize="small" />}
          onClick={clickDown}
        />
      </Stack>
    </Box>
  );
}
