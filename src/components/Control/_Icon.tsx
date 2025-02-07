import { IconButton, Tooltip } from "@mui/material";

export function Icon({
  icon,
  tooltip,
  onClick,
}: {
  icon: JSX.Element;
  tooltip: string;
  onClick: () => void;
}) {
  return (
    <Tooltip title={tooltip} disableInteractive placement="left" followCursor>
      <IconButton size="small" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
