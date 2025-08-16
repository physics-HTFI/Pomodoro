import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { atomOpenSettingsDialog } from "./model/atomOpenSettingsDialog";
import { atomPlay } from "./model/atomPlay/atomPlay";
import { modelHistory } from "../History/model/modelHistory";

export function useDialog() {
  const setOpen = useSetAtom(atomOpenSettingsDialog);
  const fileName = useAtomValue(modelHistory.getFileName) ?? "";
  const setFileAsync = useSetAtom(modelHistory.setFileAsync);
  const setDeviceIdAsync = useSetAtom(atomPlay.setDeviceIdAsync);
  const { devices, selectedIndex } = useAtomValue(atomPlay.getDevicesAsync);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);
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
