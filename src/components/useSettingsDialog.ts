import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { atomPlayDeviceId } from "../atoms/atomPlayDeviceId";
import { getPlayDevice, getPlayDevices, setPlayDevice } from "../utils/play";
import { atomOpenSettingsDialog } from "../atoms/atomOpenSettingsDialog";
import { atomCounts } from "../atoms/atomCounts/atomCounts";

export function useSettingsDialog() {
  const [open, setOpen] = useAtom(atomOpenSettingsDialog);
  const fileName = useAtomValue(atomCounts.getFileName) ?? "";
  const setFile = useSetAtom(atomCounts.setFile);
  const [deviceId, setDeviceId] = useAtom(atomPlayDeviceId);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();
  useEffect(() => {
    // デバイスを取得する。
    // （ページ表示直後にオーディオアクセスを許可するかのダイアログが出るのを防ぐため、ダイアログを表示する時のみ取得する。）
    if (!open) return;
    const effect = async () => {
      setDevices(await getPlayDevices());
      setDeviceId(await getPlayDevice());
    };
    effect();
  }, [open, setDeviceId]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleClickToClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );
  // スピーカー選択時の処理
  const handleSelectSpeaker = useCallback(
    (id: string) => {
      setDeviceId(id);
      setPlayDevice(id);
    },
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
    deviceId,
    devices,
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
