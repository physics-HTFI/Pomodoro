import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { atomOpenSettingsDialog } from "../../atoms/atomOpenSettingsDialog";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomPlay } from "../../atoms/atomPlay/atomPlay";

export function useDialog() {
  const [open, setOpen] = useAtom(atomOpenSettingsDialog);
  const fileName = useAtomValue(atomCounts.getFileName) ?? "";
  const setFile = useSetAtom(atomCounts.setFile);
  const setDeviceId = useSetAtom(atomPlay.setDeviceId);
  const { devices, selectedIndex } = useAtomValue(atomPlay.getDevices);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleClickToClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );
  // スピーカー選択時の処理
  const handleSelectSpeaker = useCallback(
    async (id: string) => await setDeviceId(id, true),
    [setDeviceId]
  );

  // ファイル選択ダイアログからファイルを選択する
  const selectFile = useCallback(async () => {
    try {
      // 選択をキャンセルすると例外がthrowされる
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "カウント値ファイル",
            accept: { "text/plain": [".txt"] },
          },
        ],
      });
      await setFile(fileHandle);
    } catch {
      /* */
    }
  }, [setFile]);
  const unselectFile = useCallback(
    async () => await setFile(undefined),
    [setFile]
  );

  return {
    open,
    fileName,
    devices,
    selectedIndex,
    selectFile,
    unselectFile,
    handleClose,
    handleClickToClose,
    handleSelectSpeaker,
  };
}

/**
 * `documentPictureInPicture`関連の型エラーを防ぐ
 */
declare global {
  interface Window {
    showOpenFilePicker: (options?: {
      excludeAcceptAllOption?: boolean;
      multiple?: boolean;
      types?: { description: string; accept: Record<string, string[]> }[];
    }) => Promise<FileSystemFileHandle[]>;
  }
}
