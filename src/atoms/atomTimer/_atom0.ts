import { atom } from "jotai";
import { TypeTimer } from "../../types/TypeTimer";
import { CONST } from "./_CONST";

export const atom0 = atom<TypeTimer>({
  status: "work",
  seconds: CONST.work_sec,
});
