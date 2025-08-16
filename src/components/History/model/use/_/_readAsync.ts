import { TypeCategory } from "../../TypeCategory";
import { TypeHistory } from "../../TypeHistory";

/**
 * ファイルからカウント値を取得する。
 * 新規ファイルの場合は `{status: "new"}`。
 * 読み込み失敗時は `{status: "failed"}`。
 */
export async function readAsync(
  fileHandle?: FileSystemFileHandle
): Promise<
  { status: "failed" | "new" } | { status: "old"; counts: TypeHistory }
> {
  if (!fileHandle) return { status: "failed" };
  try {
    const file = await fileHandle.getFile();
    const text = await file.text();
    // 新規ファイルの場合
    if (text === "") return { status: "new" };
    // 既存のファイルの場合
    const counts = JSON.parse(text);
    const keys = ["days", "weeks", "months", "years"] satisfies TypeCategory[];
    const isCounts = keys.every((key) => key in counts);
    if (!isCounts) return { status: "failed" };
    return { status: "old", counts };
  } catch {
    return { status: "failed" };
  }
}
