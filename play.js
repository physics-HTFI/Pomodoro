/**
 * タイムアップ時の効果音を再生する
 */
export const play = () => audio.play();

//|
//| ローカル
//|

const audio = document.createElement("audio");
audio.src = "sound.mp3";
