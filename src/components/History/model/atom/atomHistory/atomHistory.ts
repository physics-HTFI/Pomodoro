import { atom } from "jotai";
import { unwrap } from "jotai/utils";
import { atomCountsFile } from "../atomCountsFile/atomCountsFile";
import { getCountsForDisplay } from "./getCountsForDisplay";
import { update } from "./update";

export const atomHistory = {
  /**
   *
   */
  atomGetCountsForDisplay: unwrap(
    atom(async (get) => {
      const { counts } = await get(atomCountsFile.getAsync);
      const saved = get(atomCountsFile.getSaved);
      return getCountsForDisplay(counts, saved);
    })
  ),

  /**
   *
   */
  atomGetFileName: unwrap(
    atom(async (get) => {
      const { file } = await get(atomCountsFile.getAsync);
      return file?.name ?? "";
    }),
    (val) => val ?? ""
  ),

  /**
   *
   */
  atomSetFileAsync: atom(
    null,
    async (_get, set, file?: FileSystemFileHandle) => {
      await set(atomCountsFile.setFileAsync, file);
      await set(atomHistory.atomUpdateAsync);
    }
  ),

  /**
   *
   */
  atomUpdateAsync: atom(null, async (get, set, delta: number = 0) => {
    const { counts } = await get(atomCountsFile.getAsync);
    update(counts, delta);
    await set(atomCountsFile.setCountsAsync, counts);
  }),
};
