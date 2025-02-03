import Dexie, { EntityTable } from "dexie";

export async function loadFileHandle() {
  return (await db.fileHandles.get(1))?.handle;
}

export async function saveFileHandle(handle: FileSystemFileHandle) {
  await db.fileHandles.put({ id: 1, handle });
}

export async function deleteFileHandle() {
  await db.fileHandles.delete(1);
}

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
