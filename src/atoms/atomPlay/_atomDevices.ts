import { atom } from "jotai";

/**
 * オーディオデバイス一覧を取得する `atom`
 */
export const atomDevicesAsync = atom(async () => {
  await navigator.mediaDevices.getUserMedia({ audio: true });
  const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (d) => d.kind === "audiooutput" && d.deviceId !== "default"
  );
  return devices;
});
