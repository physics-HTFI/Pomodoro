import { atom } from "jotai";
import { derivCounts } from "./derivCounts";
import { derivFileHandle } from "./derivFileHandle";

export const derivFileLoad = atom(null, async (get, set) => {
  const fileHandle = await get(derivFileHandle);
  if (!fileHandle) return;
  const file = await fileHandle.getFile();
  const text = await file.text();
  try {
    const counts = JSON.parse(text);
    const isOk =
      "days" in counts &&
      "weeks" in counts &&
      "months" in counts &&
      "years" in counts;
    if (!isOk) return;
    set(derivCounts, counts);
  } catch {
    //
  }
});
