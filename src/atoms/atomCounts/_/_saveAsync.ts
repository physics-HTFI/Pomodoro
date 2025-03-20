import { TypeCounts } from "../../../types/TypeCounts";

export async function saveAsync(
  counts: TypeCounts,
  file?: FileSystemFileHandle
): Promise<boolean> {
  if (!file) return false;
  try {
    const writer = await file.createWritable();
    await writer.write(JSON.stringify(counts, null, 2));
    await writer.close();
    return true;
  } catch {
    return false;
  }
}
