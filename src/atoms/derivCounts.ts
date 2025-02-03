import { atom } from "jotai";
import { TypeCounts } from "../types/TypeCounts";
import { derivFileHandle } from "./derivFileHandle";

export const derivCounts = atom(
  (get) => get(atomCounts),
  async (get, set, counts: TypeCounts) => {
    set(atomCounts, counts);
    const file = await get(derivFileHandle);
    if (!file) return;
    const writer = await file.createWritable();
    await writer.write(JSON.stringify(counts, null, 2));
    await writer.close();
  }
);

const atomCounts = atom<TypeCounts>({
  days: [],
  weeks: [],
  months: [],
  years: [],
});
