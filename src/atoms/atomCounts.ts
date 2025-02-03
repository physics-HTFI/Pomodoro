import { atom } from "jotai";
import { TypeCounts } from "../types/TypeCounts";
import { derivFileHandle } from "./derivFileHandle";
import { _save } from "./_atomCounts/_save";
import { _atom } from "./_atomCounts/_atom";
import { _valid } from "./_atomCounts/_valid";
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
      set(_atom, counts);
      // counts を derivFileHandle に保存する
      await _save(counts, await get(derivFileHandle));
    }
  ),

  /**
   * 必要であれば日付の追加を行う。
   * また、今日のカウント値を `delta` だけ変更する `atom`。
   */
  update: atom(null, (get, set, delta?: number) => {
    delta ??= 0;
    const counts = get(_atom);

    // delta の値が不正な場合は return
    if (!_valid(counts, delta)) return;

    // 各カウント値を delta だけ変更する
    _update("days", counts, delta, 1000);
    _update("weeks", counts, delta, 1000);
    _update("months", counts, delta);
    _update("years", counts, delta);
    set(_atom, { ...counts });
  }),
};
