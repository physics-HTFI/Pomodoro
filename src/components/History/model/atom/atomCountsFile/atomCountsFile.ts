import { atom } from "jotai";
import { indexedDb } from "./indexedDb";
import { readAsync } from "./readAsync";
import { saveAsync } from "./saveAsync";
import { update } from "../atomHistory/update";
import { TypeHistory } from "../../type/TypeHistory";

/**
 * `counts`と`fileHandle`を同時に扱う `atom` 群
 */
export const atomCountsFile = {
  /**
   * `counts`と`fileHandle`を取得する `atom`
   */
  getAsync: atom(async (get) => {
    let { counts, file } = get(atomCountsFile0);
    if (!counts) {
      // 読み込み失敗時は初期値を返す
      file = undefined;
      counts = {
        days: {},
        weeks: {},
        months: {},
        years: {},
      };
    }
    update(counts);
    return { counts, file } satisfies TypeCountFile;
  }),

  /**
   * `IndexedDB`からファイルの読み込みを試みる
   */
  loadLastUsedFileAsync: atom(null, async (_, set) => {
    const file = await indexedDb.fileHandle.getAsync();
    await file?.requestPermission({ mode: "readwrite" });
    await set(atomCountsFile.setFileAsync, file);
  }),

  /**
   * `counts`を設定する `atom`
   */
  setCountsAsync: atom(null, async (get, set, counts: TypeHistory) => {
    const countsFile = await get(atomCountsFile.getAsync);
    const saved = await saveAsync(counts, countsFile.file);
    set(atomSaved, saved);
    set(atomCountsFile0, { ...countsFile, counts });
  }),

  /**
   * 保存が成功したかを返す `atom`
   */
  getSaved: atom((get) => get(atomSaved)),

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
    // 既存ファイルの場合はファイルのカウント値、空白ファイルの場合は現在のカウント値を設定する。
    const counts = result.status === "old" ? result.counts : countsFile.counts;
    set(atomCountsFile0, { counts, file });
    await indexedDb.fileHandle.setAsync(file);

    // アクセス許可アラートを出す（これがないとカウント値の変更時に出てしまう）
    await file?.requestPermission({ mode: "readwrite" });
  }),
};

interface TypeCountFile {
  counts: TypeHistory;
  file?: FileSystemFileHandle;
}

const atomCountsFile0 = atom<Partial<TypeCountFile>>({});
const atomSaved = atom(true);
