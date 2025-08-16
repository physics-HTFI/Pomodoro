import { atom } from "jotai";
import { unwrap } from "jotai/utils";
import { atomCountsFile } from "./atom/atomCountsFile";
import { getCountsForDisplay } from "./atom/getCountsForDisplay";
import { update } from "./atom/update";

/**
 * カウントの値の取得・設定を行う `atom` 群
 */
export const modelHistory = {
  /**
   * カウント値を（html表示用の形式で）取得する `atom`
   */
  getCountsForDisplay: unwrap(
    atom(async (get) => {
      const { counts } = await get(atomCountsFile.getAsync);
      const saved = get(atomCountsFile.getSaved);
      return getCountsForDisplay(counts, saved);
    })
  ),

  /**
   * 選択されているファイルの名前を返す `atom`。
   * ない場合および読み込み中は空白。
   */
  getFileName: unwrap(
    atom(async (get) => {
      const { file } = await get(atomCountsFile.getAsync);
      return file?.name ?? "";
    }),
    (val) => val ?? ""
  ),

  /**
   * ファイルを設定する。
   * カウント値をファイルから取得する。
   * その後、カウント値が変更されたら、そのファイルに上書きする。
   * 読み込みに失敗したら、その後、そのファイルにはアクセスしない。
   */
  setFileAsync: atom(null, async (_get, set, file?: FileSystemFileHandle) => {
    await set(atomCountsFile.setFileAsync, file);
    await set(modelHistory.updateAsync);
  }),

  /**
   * 必要であれば今日までの日付の追加を行う `atom`。
   * また、今日のカウント値を `delta` だけ変更する。
   * 保存も行う。
   */
  updateAsync: atom(null, async (get, set, delta: number = 0) => {
    const { counts } = await get(atomCountsFile.getAsync);
    update(counts, delta);
    await set(atomCountsFile.setCountsAsync, counts);
  }),
};
