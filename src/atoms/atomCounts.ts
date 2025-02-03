import { atom } from "jotai";
import { TypeCounts } from "../types/TypeCounts";
import { derivFileHandle } from "./derivFileHandle";
import { _save } from "./_atomCounts/_save";
import { _atom } from "./_atomCounts/_atom";
import { _update } from "./_atomCounts/_update";

/**
 * カウントの値の取得・設定を行う `atom` 群
 */
export const atomCounts = {
  /**
   * カウント値の `get, set` を行う `atom`
   */
  atom: atom(
    (get) => get(_atom),
    async (get, set, counts: TypeCounts) => {
      _update(counts);
      set(_atom, counts);
      await _save(counts, get(derivFileHandle));
    }
  ),

  /**
   * 必要であれば日付の追加を行う `atom`。
   * また、今日のカウント値を `delta` だけ変更する。
   */
  update: atom(null, (get, set, delta?: number) => {
    delta ??= 0;
    const counts = get(_atom);
    _update(counts, delta);
    set(atomCounts.atom, { ...counts });
  }),
};
