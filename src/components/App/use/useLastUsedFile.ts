import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { atomCountsFile } from "../../History/model/atom/atomCountsFile/atomCountsFile";
import { atomPlay } from "../../SettingsButton/model/atomPlay/atomPlay";
import { indexedDb } from "../../History/model/atom/atomCountsFile/indexedDb";

export function useLastUsedFile() {
  const [file, setFile] = useState<FileSystemHandle>();
  const loadLastUsedFileAsync = useSetAtom(
    atomCountsFile.loadLastUsedFileAsync
  );
  const play = useSetAtom(atomPlay.playAsync);

  useEffect(() => {
    indexedDb.fileHandle.getAsync().then((file) => setFile(file));
  }, []);

  return {
    open: !!file,
    close: () => setFile(undefined),
    load: async () => {
      await loadLastUsedFileAsync();
      await play();
    },
  };
}
