import { Box, SxProps, Tooltip } from "@mui/material";
import { TypeClassName } from "../model/type/TypeClassName";

export function Category({
  tooltip,
  sx,
  counts: countsWithClassName,
}: {
  tooltip?: string;
  sx?: SxProps;
  counts: { count: string; className?: TypeClassName }[];
}) {
  return (
    <Tooltip
      title={tooltip}
      disableInteractive
      placement="bottom"
      followCursor
      slotProps={{
        popper: {
          disablePortal: true, // これがない場合→ツールチップが<body>の末尾に追加される→ピクチャインピクチャで表示できない
        },
      }}
    >
      <Box sx={sx}>
        {countsWithClassName.map((c, i) => (
          <span key={`${i}`} className={c.className}>
            {c.count}
          </span>
        ))}
      </Box>
    </Tooltip>
  );
}
