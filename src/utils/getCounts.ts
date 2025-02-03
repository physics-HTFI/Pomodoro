import { TypeCounts } from "../types/TypeCounts";

export async function getCounts(fileHandle: FileSystemFileHandle) {
  if (!fileHandle) return null;
  const file = await fileHandle.getFile();
  const text = await file.text();
  try {
    const counts = JSON.parse(text);
    const isOk =
      "days" in counts &&
      "weeks" in counts &&
      "months" in counts &&
      "years" in counts;
    if (!isOk) return null;
    return counts as TypeCounts;
  } catch {
    return null;
  }
}
