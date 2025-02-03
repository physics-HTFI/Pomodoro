import { atom } from "jotai";
import { TypeTimer } from "../types/TypeTimer";
import { CONST } from "../CONST";

export const atomTimer = atom<TypeTimer>({
  status: "work",
  seconds: CONST.timer.work_sec,
});
