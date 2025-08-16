import { atom } from "jotai";
import { getTimerDefault } from "./getTimerDefault";
import { TypeTimer } from "../type/TypeTimer";

export const atomTimer = atom<TypeTimer>(getTimerDefault());
