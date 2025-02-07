import { Stack } from "@mui/material";
import { useCounter } from "./_useCounter";
import { sx } from "./_sx";
import { Category } from "./_Category";

/**
 * カウント値を表示するコンポーネント
 */
export function Counter() {
  const { counts, hasFile } = useCounter();
  if (!counts || !hasFile) return null;
  return (
    <Stack sx={sx.stack}>
      <Category sx={sx.days} counts={counts.days} tooltip="日ごとの値" />
      <Category sx={sx.weeks} counts={counts.weeks} tooltip="週ごとの値" />
      <Category sx={sx.months} counts={counts.months} tooltip="月ごとの値" />
      <Category sx={sx.years} counts={counts.years} tooltip="年ごとの値" />
    </Stack>
  );
}
