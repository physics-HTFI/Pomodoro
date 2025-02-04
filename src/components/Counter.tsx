import { Box, Stack, SxProps } from "@mui/material";
import { useCounter } from "./useCounter";
import { TypeCategory } from "../types/TypeCategory";

/**
 * カウント値を表示するコンポーネント
 */
export function Counter() {
  const { counts, handleClick } = useCounter();

  return (
    <Stack sx={styleStack} onClick={handleClick}>
      <Box sx={styles.days}>{spans(counts.days)}</Box>
      <Box sx={styles.weeks}>{spans(counts.weeks)}</Box>
      <Box sx={styles.months}>{spans(counts.months)}</Box>
      <Box sx={styles.years}>{spans(counts.years)}</Box>
    </Stack>
  );

  function spans(countsWithClassName: typeof counts.days) {
    return countsWithClassName.map((c, i) => (
      <span key={`${i}`} className={c.className}>
        {c.count}
      </span>
    ));
  }
}

const styleStack: SxProps = {
  color: "white",
  fontSize: "max(3svmin, 0.6rem)",
  position: "fixed",
  top: 0,
  left: 0,
  whiteSpace: "nowrap",
  alignItems: "start",
  width: "100%",
  px: 1,
  py: 0.5,
  // テキストのスタイル
  "& span:first-of-type": {
    marginLeft: 0,
    fontSize: "1.2em",
  },
  "& span+span": {
    pl: "0.5em",
  },
  // ホバー
  "&:hover": {
    background: "#334d",
  },
  "&:not(:hover) > :not(div:first-of-type)": {
    display: "none",
  },
};

const styles: Record<TypeCategory, SxProps> = {
  days: {
    "& > .日曜": { color: "salmon" },
    "& > .土曜": { color: "deepskyblue" },
  },
  weeks: {},
  months: {
    // (クラス名は数字始まりにできないので漢数字にしている)
    "& > .一月": { color: "salmon" },
    "& > .七月": { color: "deepskyblue" },
  },
  years: {},
};
