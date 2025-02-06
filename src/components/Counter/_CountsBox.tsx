import { Box, SxProps } from "@mui/material";
import { TypeClassName } from "../../types/TypeClassName";

export function CountsBox({
  sx,
  countsWithClassName,
}: {
  sx?: SxProps;
  countsWithClassName: { count: string; className?: TypeClassName }[];
}) {
  return (
    <Box sx={sx}>
      {countsWithClassName.map((c, i) => (
        <span key={`${i}`} className={c.className}>
          {c.count}
        </span>
      ))}
    </Box>
  );
}
