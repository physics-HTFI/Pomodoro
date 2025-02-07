import { Stack } from "@mui/material";
import { useCounter } from "./_useCounter";
import { styles } from "./_styles";
import { Category } from "./_Category";

/**
 * カウント値を表示するコンポーネント
 */
export function Counter() {
  const { counts, hasFile } = useCounter();
  if (!counts || !hasFile) return null;
  return (
    <Stack sx={styles.stack}>
      <Category sx={styles.days} countsWithClassName={counts.days} />
      <Category sx={styles.weeks} countsWithClassName={counts.weeks} />
      <Category sx={styles.months} countsWithClassName={counts.months} />
      <Category sx={styles.years} countsWithClassName={counts.years} />
    </Stack>
  );
}
