import { atom } from "jotai";
import { atomCounts0 } from "./_atomCounts0";
import { getCountsForDisplay } from "./_getCountsForDisplay";
import { save } from "./_save";
import { update } from "./_update";
import { atomFileHandle } from "./_atomFileHandle";
import { readCounts } from "./_readCounts";
import { indexedDb } from "./_indexedDb";

/**
 * カウントの値の取得・設定を行う `atom` 群
 */
export const atomCounts = {
  /**
   * カウント値を（html表示用の形式で）取得する `atom`
   */
  getCountsForDisplay: atom((get) => {
    const counts = get(atomCounts0);
    return getCountsForDisplay(counts);
  }),

  /**
   * 選択されているファイルの名前を返す。
   * ない場合は`undefined`。
   */
  getFileName: atom((get) => {
    const file = get(atomFileHandle);
    return file?.name;
  }),

  /**
   * カウント値をファイルから取得する。
   * その後、カウント値が変更されたら、そのファイルに上書きする。
   * 読み込みに失敗したら、その後、そのファイルにはアクセスしない。
   */
  setFile: atom(null, async (_get, set, fileHandle?: FileSystemFileHandle) => {
    await set(atomFileHandle, undefined);
    const result = await readCounts(fileHandle);
    if (result.status === "failed") return;
    // 更新
    if (result.status === "old") {
      update(result.counts, 0);
      set(atomCounts0, result.counts);
    }
    await set(atomFileHandle, fileHandle);
    // アクセス許可アラートを出す（これがないとカウント値の変更時に出てしまう）
    await fileHandle?.requestPermission({ mode: "readwrite" });
  }),

  /**
   * IndexedDBに保存されているファイルを取得して`setFile`し直す。
   */
  resetFileFromIndexedDb: atom(null, async (_get, set) => {
    set(atomFileHandle, await indexedDb.fileHandle.get());
  }),

  /**
   * 必要であれば日付の追加を行う `atom`。
   * また、今日のカウント値を `delta` だけ変更する。
   * 保存も行う。
   */
  update: atom(null, async (get, set, delta: number = 0) => {
    const counts = get(atomCounts0);
    update(counts, delta);
    set(atomCounts0, { ...counts });
    await save(counts, get(atomFileHandle));
  }),
};
