/**
 * タイムアップ時の効果音を再生する。
 * 'volume'は0の時無音、1または`undefined`の時最大。
 */
export function play(volume) {
  const gainNode = ctx.createGain();
  gainNode.gain.value = volume ?? 1;
  gainNode.connect(ctx.destination);

  const bufferSource = ctx.createBufferSource();
  bufferSource.buffer = audioBuffer;
  bufferSource.connect(gainNode);
  bufferSource.start();
}

/**
 * 出力デバイスを変更する
 */
export async function setPlayDevice(id) {
  await ctx.setSinkId(id);
}

//|
//| ローカル
//|

const ctx = new AudioContext();
const response = await fetch("./sound.mp3");
const arrayBuffer = await response.arrayBuffer();
const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
