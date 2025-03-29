import { SxProps } from "@mui/material";
import { TypeCategory } from "../../types/TypeCategory";

export const sx: Record<"stack" | TypeCategory, SxProps> = {
  stack: {
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
    "& > div:first-of-type span:first-of-type": {
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
    "&:not(:hover) > div > .月曜~span": {
      display: "none",
    },
  },

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
