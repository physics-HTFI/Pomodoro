import { Cancel } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export function Icon({
  icon,
  tooltip,
  size = "large",
  followCursor = false,
  onClick,
}: {
  icon: typeof Cancel;
  followCursor?: boolean;
  size?: "small" | "medium" | "large";
  tooltip?: string;
  onClick?: () => void;
}) {
  const InnerIcon = icon; // 頭文字が小文字の`<icon/>`はエラーになるので大文字になるように置き換えている
  return (
    <Tooltip
      title={tooltip}
      disableInteractive
      placement={followCursor ? "left" : undefined}
      followCursor={followCursor}
      slotProps={{
        popper: {
          disablePortal: true, // これがない場合→ツールチップが<body>の末尾に追加される→ピクチャインピクチャで表示できない
        },
      }}
    >
      <IconButton size={size} onClick={onClick}>
        <InnerIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
}
