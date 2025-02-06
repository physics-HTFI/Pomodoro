import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { atomOpenSettingsDialog } from "../../atoms/atomOpenSettingsDialog";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";
import { atomPlay } from "../../atoms/atomPlay/atomPlay";

export function useDialog() {
  const setOpen = useSetAtom(atomOpenSettingsDialog);
  const fileName = useAtomValue(atomCounts.getFileName) ?? "";
  const setFileAsync = useSetAtom(atomCounts.setFileAsync);
  const setDeviceIdAsync = useSetAtom(atomPlay.setDeviceIdAsync);
  const { devices, selectedIndex } = useAtomValue(atomPlay.getDevicesAsync);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleClickToClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );
  // スピーカー選択時の処理
  const handleSelectSpeaker = useCallback(
    async (id: string) => await setDeviceIdAsync(id, true),
    [setDeviceIdAsync]
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
      await setFileAsync(fileHandle);
    } catch {
      /* */
    }
  }, [setFileAsync]);
  const unselectFile = useCallback(
    async () => await setFileAsync(undefined),
    [setFileAsync]
  );

  return {
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
