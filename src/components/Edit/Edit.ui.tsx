import { Box, Stack } from "@mui/material";
import {
  Cancel,
  ControlCamera,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { Icon } from "../common/Icon";

export function UI_Edit({
  fontSize,
  onCountDown,
  onCountUp,
  onReset,
  onTimeDown,
  onTimeUp,
}: {
  fontSize?: "small" | "medium" | "large";
  onReset: () => void;
  onCountUp: () => void;
  onCountDown: () => void;
  onTimeUp: () => void;
  onTimeDown: () => void;
}) {
  return (
    <Box
      sx={{
        "&:hover > button": { display: "none" },
        "&:not(:hover) > div": {
          display: "none",
        },
      }}
    >
      <Icon size={fontSize} icon={ControlCamera} />
      <Stack
        alignItems="center"
        alignSelf="center"
        sx={{ background: "#334d", borderRadius: 5 }}
      >
        <Icon
          tooltip="カウント値 +1"
          icon={KeyboardDoubleArrowUp}
          size="small"
          onClick={onCountUp}
        />
        <Stack direction="row">
          <Icon
            tooltip="残り時間 +1分"
            icon={KeyboardDoubleArrowLeft}
            size="small"
            onClick={onTimeUp}
          />
          <Icon
            tooltip="タイマーリセット"
            icon={Cancel}
            size="small"
            onClick={onReset}
          />
          <Icon
            tooltip="残り時間 -1分"
            icon={KeyboardDoubleArrowRight}
            size="small"
            onClick={onTimeDown}
          />
        </Stack>
        <Icon
          tooltip="カウント値 -1"
          icon={KeyboardDoubleArrowDown}
          size="small"
          onClick={onCountDown}
        />
      </Stack>
    </Box>
  );
}
