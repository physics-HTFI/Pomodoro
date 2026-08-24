import { atom } from "jotai";

/**
 * オーディオデバイス一覧を取得する `atom`
 */
export const atomGetDevicesAsync = atom(async () => {
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
    console.error("Error accessing audio devices:", error);
    console.log(`
現状、デバイスの一覧を取得するには、なぜかマイクが存在している必要がある。
マイクが存在しない場合、スピーカーの一覧も取得できないので、
Bluetooth ヘッドホンなど、マイク機能を持つデバイスを接続しておくことでこの問題を回避できる。
一度実行しておけば、その後のアクセスでは、マイクが存在しなくてもデバイス一覧を取得できるもよう。
      `);
  }
  const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (d) => d.kind === "audiooutput" && d.deviceId !== "default",
  );
  return devices;
});
