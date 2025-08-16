import { Stack } from "@mui/material";
import { sx } from "./ui/sx";
import { Category } from "./ui/Category";
import { TypeCountsForDisplay } from "./model/atom/getCountsForDisplay";

export function UI_History({
  counts,
  hasFile,
}: {
  counts: TypeCountsForDisplay;
  hasFile: boolean;
}) {
  if (!counts) return null;
  return (
    <Stack sx={sx.stack}>
      <Category sx={sx.days} counts={counts.days} tooltip="日ごとの値" />
      {hasFile && (
        <>
          <Category sx={sx.weeks} counts={counts.weeks} tooltip="週ごとの値" />
          <Category
            sx={sx.months}
            counts={counts.months}
            tooltip="月ごとの値"
          />
          <Category sx={sx.years} counts={counts.years} tooltip="年ごとの値" />
        </>
      )}
    </Stack>
  );
}
