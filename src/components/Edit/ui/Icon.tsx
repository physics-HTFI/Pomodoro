import { Cancel } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export function Icon({
  icon,
  size,
  tooltip,
  onClick,
}: {
  icon: typeof Cancel;
  size?: "small" | "medium" | "large";
  tooltip?: string;
  onClick?: () => void;
}) {
  const InnerIcon = icon; // 頭文字が小文字の`<icon/>`はエラーになるので大文字になるように置き換えている
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
        <InnerIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
}
