import { atom } from "jotai";
import { atomCounts } from "./atomCounts";
import { deleteFileHandle, saveFileHandle } from "../utils/fileHandle";

export const derivFileHandle = atom(
  (get) => get(atomFileHandle),
  async (_get, set, fileHandle?: FileSystemFileHandle) => {
    set(atomFileHandle, undefined);
    if (!fileHandle) return;
    await deleteFileHandle();
    const file = await fileHandle.getFile();
    const text = await file.text();
    // 新規ファイルの場合
    if (text === "") {
      await saveFileHandle(fileHandle);
      set(atomFileHandle, fileHandle);
      await fileHandle.requestPermission({ mode: "readwrite" }); // 選択時にアクセス許可アラートを出す
      return;
    }
    // 既存のファイルの場合
    try {
      const counts = JSON.parse(text);
      const isOk =
        "days" in counts &&
        "weeks" in counts &&
        "months" in counts &&
        "years" in counts;
      if (!isOk) return;
      await saveFileHandle(fileHandle);
      set(atomFileHandle, fileHandle);
      set(atomCounts.atom, counts); // ここで書き込むのでアクセス許可アラートが出る
    } catch {
      //
    }
  }
);

const atomFileHandle = atom<FileSystemFileHandle>();

/**
 * `documentPictureInPicture`関連の型エラーを防ぐ
 */
declare global {
  interface FileSystemFileHandle {
    requestPermission: (options?: {
      mode?: "read" | "write" | "readwrite";
    }) => Promise<PermissionState>;
  }
}
