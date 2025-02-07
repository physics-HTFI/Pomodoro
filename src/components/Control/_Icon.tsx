import { IconButton, Tooltip } from "@mui/material";
import { useAtomValue } from "jotai";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function Icon({
  icon,
  tooltip,
  onClick,
}: {
  icon: JSX.Element;
  tooltip: string;
  onClick: () => void;
}) {
  const isPip = useAtomValue(atomPipWindow) !== undefined; // ツールチップは<body>の末尾に追加されるのでピクチャインピクチャには表示できない
  if (isPip) tooltip = "";
  return (
    <Tooltip title={tooltip} disableInteractive placement="left" followCursor>
      <IconButton size="small" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
