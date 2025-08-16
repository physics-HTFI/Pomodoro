import { useAtomValue, useSetAtom } from "jotai";
import { atomHistory } from "./atom/atomHistory/atomHistory";

/**
 * カウントの値の取得・設定を行う `atom` 群
 */
export const modelHistory = {
  /**
   * カウント値を（html表示用の形式で）取得する `atom`
   */
  useCountsForDisplay: () => useAtomValue(atomHistory.atomGetCountsForDisplay),

  /**
   * 選択されているファイルの名前を返す `atom`。
   * ない場合および読み込み中は空白。
   */
  useFileName: () => useAtomValue(atomHistory.atomGetFileName),

  /**
   * ファイルを設定する。
   * カウント値をファイルから取得する。
   * その後、カウント値が変更されたら、そのファイルに上書きする。
   * 読み込みに失敗したら、その後、そのファイルにはアクセスしない。
   */
  useSetFileAsync: () => useSetAtom(atomHistory.atomSetFileAsync),

  /**
   * 必要であれば今日までの日付の追加を行う `atom`。
   * また、今日のカウント値を `delta` だけ変更する。
   * 保存も行う。
   */
  useUpdateAsync: () => useSetAtom(atomHistory.atomUpdateAsync),
};
