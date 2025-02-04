import { atom } from "jotai";
import { _atom } from "./_atomCounts/_atom";
import { _getCountsForDisplay } from "./_atomCounts/_getCountsForDisplay";
import { _save } from "./_atomCounts/_save";
import { _update } from "./_atomCounts/_update";
import { _atomFileHandle } from "./_atomCounts/_atomFileHandle";
import { _readCounts } from "./_atomCounts/_readCounts";
import { _indexedDb } from "./_atomCounts/_indexedDb";

/**
 * カウントの値の取得・設定を行う `atom` 群
 */
export const atomCounts = {
  /**
   * カウント値を（html表示用の形式で）取得する `atom`
   */
  getCountsForDisplay: atom((get) => {
    const counts = get(_atom);
    return _getCountsForDisplay(counts);
  }),

  /**
   * 選択されているファイルの名前を返す。
   * ない場合は`undefined`。
   */
  getFileName: atom((get) => {
    const file = get(_atomFileHandle);
    return file?.name;
  }),

  /**
   * カウント値をファイルから取得する。
   * その後、カウント値が変更されたら、そのファイルに上書きする。
   * 読み込みに失敗したら、その後、そのファイルにはアクセスしない。
   */
  setFile: atom(null, async (_get, set, fileHandle?: FileSystemFileHandle) => {
    await set(_atomFileHandle, undefined);
    const result = await _readCounts(fileHandle);
    if (result.status === "failed") return;
    // 更新
    if (result.status === "old") {
      _update(result.counts, 0);
      set(_atom, result.counts);
    }
    await set(_atomFileHandle, fileHandle);
    // アクセス許可アラートを出す（これがないとカウント値の変更時に出てしまう）
    await fileHandle?.requestPermission({ mode: "readwrite" });
  }),

  /**
   * IndexedDBに保存されているファイルを取得して`setFile`し直す。
   */
  resetFileFromIndexedDb: atom(null, async (_get, set) => {
    set(_atomFileHandle, await _indexedDb.fileHandle.get());
  }),

  /**
   * 必要であれば日付の追加を行う `atom`。
   * また、今日のカウント値を `delta` だけ変更する。
   * 保存も行う。
   */
  update: atom(null, async (get, set, delta: number = 0) => {
    const counts = get(_atom);
    _update(counts, delta);
    set(_atom, { ...counts });
    await _save(counts, get(_atomFileHandle));
  }),
};
