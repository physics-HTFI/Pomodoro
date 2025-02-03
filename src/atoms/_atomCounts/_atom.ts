import { atom } from "jotai";
import { TypeCounts } from "../../types/TypeCounts";

export const _atom = atom<TypeCounts>({
  days: {},
  weeks: {},
  months: {},
  years: {},
});
