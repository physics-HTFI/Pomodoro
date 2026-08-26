import { atom } from "jotai";

/**
 * オーディオデバイス一覧を取得する `atom`
 */
export const atomGetDevicesAsync = atom(async () => {
  const devices = await getAudioOutputDevices();
  if (devices.length > 0) return devices;

  // 初回の実行時は、以下を実行してデバイスを取得するためのユーザー許可を求める必要がある
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    // 👆を実行するとオーディオデバイスの一覧を取得できるようになる。
    // しかし、この関数は実際には、ユーザーにマイク使用許可を求めるダイアログが表示するものである。
    // そのため、マイクが存在しないと例外を出してしまい、デバイス一覧を取得できない。
    //
    // const device = await navigator.mediaDevices.selectAudioOutput();
    // というスピーカーのみを取得する関数もあるが、現時点では Firefox しか対応していない。
    // <https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/selectAudioOutput>
  } catch (error) {
    console.warn("Error accessing audio devices:", error);
    console.log(`
スピーカーの一覧を取得するには、なぜかマイクが必要 (Firefox では回避できるらしい)。
そのため、Bluetooth ヘッドホンなど、マイク機能を持つデバイスを接続すること。
一度実行しておけば、その後のアクセスでは、マイクが存在しなくてもデバイス一覧が取得できるようになる。
      `);
  }
  return await getAudioOutputDevices();
});

async function getAudioOutputDevices(): Promise<MediaDeviceInfo[]> {
  const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (d) =>
      d.kind === "audiooutput" && d.deviceId !== "default" && d.deviceId !== "",
  );
  return devices;
}
