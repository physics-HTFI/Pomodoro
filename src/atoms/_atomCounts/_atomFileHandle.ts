import { atom } from "jotai";
import { _indexedDb } from "./_indexedDb";

export const _atomFileHandle = atom(
  (get) => get(__atom),
  async (_get, set, fileHandle?: FileSystemFileHandle) => {
    if (fileHandle) {
      await _indexedDb.fileHandle.set(fileHandle);
    } else {
      await _indexedDb.fileHandle.delete();
    }
    set(__atom, fileHandle);
  }
);

const __atom = atom<FileSystemFileHandle>();
