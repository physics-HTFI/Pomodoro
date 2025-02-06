import { Stack } from "@mui/material";
import { useCounter } from "./_useCounter";
import { styles } from "./_styles";
import { CountsBox } from "./_CountsBox";

/**
 * カウント値を表示するコンポーネント
 */
export function Counter() {
  const { counts, hasFile, handleClick } = useCounter();
  if (!counts) return null;
  return (
    <Stack sx={styles.stack} onClick={handleClick}>
      <CountsBox sx={styles.days} countsWithClassName={counts.days} />
      <CountsBox
        sx={styles.weeks}
        countsWithClassName={counts.weeks}
        hide={!hasFile}
      />
      <CountsBox
        sx={styles.months}
        countsWithClassName={counts.months}
        hide={!hasFile}
      />
      <CountsBox
        sx={styles.years}
        countsWithClassName={counts.years}
        hide={!hasFile}
      />
    </Stack>
  );
}
