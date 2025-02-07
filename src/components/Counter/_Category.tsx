import { Box, SxProps, Tooltip } from "@mui/material";
import { TypeClassName } from "../../types/TypeClassName";

export function Category({
  tooltip,
  sx,
  counts: countsWithClassName,
}: {
  tooltip: string;
  sx?: SxProps;
  counts: { count: string; className?: TypeClassName }[];
}) {
  return (
    <Tooltip title={tooltip} disableInteractive placement="bottom" followCursor>
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
