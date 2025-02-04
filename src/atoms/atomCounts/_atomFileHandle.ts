import { atom } from "jotai";
import { indexedDb } from "./_indexedDb";

export const atomFileHandle = atom(
  (get) => get(__atom),
  async (_get, set, fileHandle?: FileSystemFileHandle) => {
    if (fileHandle) {
      await indexedDb.fileHandle.set(fileHandle);
    } else {
      await indexedDb.fileHandle.delete();
    }
    set(__atom, fileHandle);
  }
);

const __atom = atom<FileSystemFileHandle>();
