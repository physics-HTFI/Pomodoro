import { Stack } from "@mui/material";
import {
  HighlightOff,
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
    <Stack alignItems="center" alignSelf="center">
      <Icon icon={<KeyboardDoubleArrowUp />} onClick={clickUp} />
      <Stack direction="row">
        <Icon icon={<KeyboardDoubleArrowLeft />} onClick={clickLeft} />
        <Icon icon={<HighlightOff />} onClick={clickCenter} />
        <Icon icon={<KeyboardDoubleArrowRight />} onClick={clickRight} />
      </Stack>
      <Icon icon={<KeyboardDoubleArrowDown />} onClick={clickDown} />
    </Stack>
  );
}
