import { atom } from "jotai";
import { Ticker } from "./_Ticker";

export const atomTicker = atom(() => new Ticker());
