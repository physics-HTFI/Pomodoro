import { Stack } from "@mui/material";
import { useCounter } from "./_useCounter";
import { styles } from "./_styles";
import { CountsBox } from "./_CountsBox";
import { Control } from "../Control/Control";

/**
 * カウント値を表示するコンポーネント
 */
export function Counter() {
  const { counts, hasFile } = useCounter();
  if (!counts || !hasFile) return null;
  return (
    <Stack sx={styles.stack}>
      <CountsBox sx={styles.days} countsWithClassName={counts.days} />
      <CountsBox sx={styles.weeks} countsWithClassName={counts.weeks} />
      <CountsBox sx={styles.months} countsWithClassName={counts.months} />
      <CountsBox sx={styles.years} countsWithClassName={counts.years} />
      <Control />
    </Stack>
  );
}
