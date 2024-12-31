/**
 * タイムアップ時の効果音を再生する
 */
export function play() {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

/**
 * 出力デバイスを変更する
 */
export async function setPlayDevice(id) {
  await audio.setSinkId(id);
}

//|
//| ローカル
//|

const audio = document.createElement("audio");
audio.src = "sound.mp3";
