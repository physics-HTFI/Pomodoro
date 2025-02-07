import { IconButton, Tooltip } from "@mui/material";
import { useAtomValue } from "jotai";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function Icon({
  icon,
  size,
  tooltip,
  onClick,
}: {
  icon: JSX.Element;
  size?: "small" | "medium" | "large";
  tooltip?: string;
  onClick?: () => void;
}) {
  const isPip = useAtomValue(atomPipWindow) !== undefined; // ツールチップは<body>の末尾に追加されるのでピクチャインピクチャには表示できない
  if (isPip) tooltip = undefined;
  return (
    <Tooltip title={tooltip} disableInteractive placement="left" followCursor>
      <IconButton size={size ?? "small"} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
