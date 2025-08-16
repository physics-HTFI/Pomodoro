import { atom } from "jotai";
import { TypeTimer } from "../../../../types/TypeTimer";
import { getTimerDefault } from "./_getTimerInit";

export const atomTimer0 = atom<TypeTimer>(getTimerDefault());
