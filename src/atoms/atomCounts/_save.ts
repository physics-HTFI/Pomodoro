import { TypeCounts } from "../../types/TypeCounts";

export async function save(counts: TypeCounts, file?: FileSystemFileHandle) {
  if (!file) return;
  const writer = await file.createWritable();
  await writer.write(JSON.stringify(counts, null, 2));
  await writer.close();
}
