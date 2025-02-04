export const classNames = {
  // （`Date.getDay()` の並びに合わせている）
  days: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],

  // (クラス名は数字始まりにできないので漢数字にしている)
  months: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
} as const;

export type TypeClassName =
  | (typeof classNames.days)[number]
  | (typeof classNames.months)[number];
