import Dexie, { EntityTable } from "dexie";

export const _indexedDb = {
  fileHandle: {
    get: async () => (await db.fileHandles.get(1))?.handle,

    set: async (handle: FileSystemFileHandle) =>
      await db.fileHandles.put({ id: 1, handle }),

    delete: async () => await db.fileHandles.delete(1),
  },
};

//|
//| ローカル
//|

interface FileHandle {
  id: number;
  handle: FileSystemFileHandle;
}

const db = new Dexie("FileHandleDatabase") as Dexie & {
  fileHandles: EntityTable<FileHandle, "id">;
};

db.version(1).stores({ fileHandles: "id, handle" });
