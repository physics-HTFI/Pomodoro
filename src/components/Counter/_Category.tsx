import { Box, SxProps, Tooltip } from "@mui/material";
import { TypeClassName } from "../../types/TypeClassName";
import { useAtomValue } from "jotai";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function Category({
  tooltip,
  sx,
  counts: countsWithClassName,
}: {
  tooltip: string;
  sx?: SxProps;
  counts: { count: string; className?: TypeClassName }[];
}) {
  const isPip = useAtomValue(atomPipWindow) !== undefined; // ツールチップは<body>の末尾に追加されるのでピクチャインピクチャには表示できない
  if (isPip) tooltip = "";
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
