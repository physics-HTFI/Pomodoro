import { atom } from "jotai";
import { TypeCounts } from "../../types/TypeCounts";
import { indexedDb } from "./_/_indexedDb";
import { readAsync } from "./_/_readAsync";
import { saveAsync } from "./_/_saveAsync";

/**
 * `counts`と`fileHandle`を同時に扱う `atom` 群
 */
export const atomCountsFile = {
  /**
   * `counts`と`fileHandle`を取得する `atom`
   */
  getAsync: atom(async (get) => {
    const countsFile = get(atomCountsFile0);
    const counts = countsFile.counts;
    if (counts) return { ...countsFile, counts } satisfies TypeCountFile;
    // 初回はデータベースからの読み込みを試みる
    const file = await indexedDb.fileHandle.getAsync();
    const result = await readAsync(file);
    if (result.status === "old") return { counts: result.counts, file };
    // 読み込めなければ初期値を返す
    await indexedDb.fileHandle.deleteAsync();
    return {
      counts: {
        days: {},
        weeks: {},
        months: {},
        years: {},
      },
      file: undefined,
    };
  }),

  /**
   * `counts`を設定する `atom`
   */
  setCountsAsync: atom(null, async (get, set, counts: TypeCounts) => {
    const countsFile = await get(atomCountsFile.getAsync);
    await saveAsync(counts, countsFile.file);
    set(atomCountsFile0, { ...countsFile, counts });
  }),

  /**
   * `fileHandle`を設定する `atom`
   */
  setFileAsync: atom(null, async (get, set, file?: FileSystemFileHandle) => {
    const countsFile = await get(atomCountsFile.getAsync);
    const result = await readAsync(file);

    // 読み込み失敗
    if (result.status === "failed" || !file) {
      set(atomCountsFile0, { counts: countsFile.counts });
      await indexedDb.fileHandle.deleteAsync();
      return;
    }

    // 読み込み成功
    const counts = result.status === "old" ? result.counts : countsFile.counts;
    set(atomCountsFile0, { counts, file });
    await indexedDb.fileHandle.setAsync(file);

    // アクセス許可アラートを出す（これがないとカウント値の変更時に出てしまう）
    await file?.requestPermission({ mode: "readwrite" });
  }),
};

interface TypeCountFile {
  counts: TypeCounts;
  file?: FileSystemFileHandle;
}

const atomCountsFile0 = atom<Partial<TypeCountFile>>({});
