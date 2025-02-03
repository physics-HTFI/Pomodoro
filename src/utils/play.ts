/**
 * タイムアップ時の効果音を再生する。
 * 'volume'は0の時無音、1または`undefined`の時最大。
 */
export async function play(volume?: number) {
  await setAudioContextIfNeeded();
  if (!audioContext || !audioBuffer) return;
  if (defaultId) setPlayDevice(defaultId, true);

  const gainNode = audioContext.createGain();
  gainNode.gain.value = volume ?? 1;
  gainNode.connect(audioContext.destination);

  const bufferSource = audioContext.createBufferSource();
  bufferSource.buffer = audioBuffer;
  bufferSource.connect(gainNode);
  bufferSource.start();
}

/**
 * 出力デバイス一覧を取得する
 */
export async function getPlayDevices() {
  await navigator.mediaDevices.getUserMedia({ audio: true });
  const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (d) => d.kind === "audiooutput" && d.deviceId !== "default"
  );
  return devices;
}

/**
 * 出力デバイスを変更する
 */
export async function setPlayDevice(id: string, silent?: boolean) {
  await setAudioContextIfNeeded();
  await audioContext?.setSinkId(id);
  if (!silent) play();
  localStorage.setItem("deviceId", id);
  defaultId = null;
}

/**
 * 出力デバイスを取得する
 */
export async function getPlayDevice() {
  await setAudioContextIfNeeded();
  return audioContext?.sinkId ?? "";
}

//|
//| ローカル
//|

let audioContext: AudioContext | undefined;
let audioBuffer: AudioBuffer | undefined;
let defaultId = localStorage.getItem("deviceId");

/**
 * `AudioContext`を生成する。
 * （ユーザーがクリックする前に生成するとコンソールに警告が出るので、生成を遅らせるため。）
 */
async function setAudioContextIfNeeded() {
  if (audioContext && audioBuffer) return;
  audioContext ??= new AudioContext();
  const response = await fetch("./sound.mp3");
  const arrayBuffer = await response.arrayBuffer();
  audioBuffer ??= await audioContext.decodeAudioData(arrayBuffer);
}

// 型エラーへの対応
declare global {
  interface AudioContext {
    setSinkId: (id: string) => Promise<unknown>;
    sinkId: string;
  }
}
