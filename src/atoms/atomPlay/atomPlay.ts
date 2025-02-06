import { atom } from "jotai";
import { atomAudioContext } from "./_atomAudioContext";
import { atomAudioBuffer } from "./_atomAudioBuffer";
import { atomDeviceId } from "./_atomDeviceId";
import { atomSetAudioContextAsync } from "./_atomSetAudioContextAsync";
import { play } from "./_play";
import { atomGetDevicesAsync } from "./_atomGetDevicesAsync";

/**
 * 効果音の再生・設定を行う `atom` 群
 */
export const atomPlay = {
  /**
   * 出力デバイス一覧を取得する
   */
  getDevicesAsync: atom(async (get) => {
    const devices = await get(atomGetDevicesAsync); // デバイスの取得をatom化することで、atomDeviceId変更時に再取得するのを防ぐ
    const id = get(atomDeviceId);
    const selectedIndex = Math.max(
      0,
      devices.findIndex((d) => d.deviceId === id)
    );
    return { devices, selectedIndex };
  }),

  /**
   * タイムアップ時の効果音を再生する。
   * 'volume'は0の時無音、1または`undefined`の時最大。
   */
  playAsync: atom(null, async (get, set, volume: number = 1) => {
    await set(atomSetAudioContextAsync);
    const audioContext = get(atomAudioContext);
    const audioBuffer = get(atomAudioBuffer);
    if (!audioContext || !audioBuffer) return;
    // 初回再生時に、デバイスを前回使用したものに変更
    const idCurrent = audioContext.sinkId;
    const idNew = get(atomDeviceId);
    if (idCurrent !== idNew) set(atomPlay.setDeviceIdAsync, idNew, false);
    // 再生
    play(audioContext, audioBuffer, volume);
  }),

  /**
   * 出力デバイスを変更する
   */
  setDeviceIdAsync: atom(
    null,
    async (get, set, deviceId: string, play: boolean) => {
      await set(atomSetAudioContextAsync);
      const audioContext = get(atomAudioContext);
      await audioContext?.setSinkId(deviceId);
      set(atomDeviceId, deviceId);
      if (play) await set(atomPlay.playAsync);
    }
  ),
};
