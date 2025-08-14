import { IconButton, Tooltip } from "@mui/material";

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
  return (
    <Tooltip
      title={tooltip}
      disableInteractive
      placement="left"
      followCursor
      slotProps={{
        popper: {
          disablePortal: true, // これがないとツールチップが<body>の末尾に追加されるてしまいピクチャインピクチャには表示できない
        },
      }}
    >
      <IconButton size={size ?? "small"} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
