import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { atomCountsFile } from "../../History/model/atom/atomCountsFile/atomCountsFile";
import { indexedDb } from "../../History/model/atom/atomCountsFile/indexedDb";
import { modelTimer } from "../../Timer/model/modelTimer";

export function useLastUsedFile() {
  const [file, setFile] = useState<FileSystemHandle>();
  const loadLastUsedFileAsync = useSetAtom(
    atomCountsFile.loadLastUsedFileAsync,
  );
  const loadTimer = modelTimer.localStorage.useLoadTimer();

  useEffect(() => {
    indexedDb.fileHandle.getAsync().then((file) => setFile(file));
  }, []);

  return {
    open: !!file,
    close: () => setFile(undefined),
    load: async () => {
      await loadLastUsedFileAsync();
      loadTimer();
    },
  };
}
