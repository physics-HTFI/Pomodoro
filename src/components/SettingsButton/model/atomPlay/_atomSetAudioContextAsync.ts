import { atom } from "jotai";
import { atomAudioBuffer } from "./_atomAudioBuffer";
import { atomAudioContext } from "./_atomAudioContext";

/**
 * `AudioContext`を（まだ生成されていなければ）生成する。
 * （ユーザーがクリックする前に生成するとコンソールに警告が出るので、生成を遅らせるため。）
 */
export const atomSetAudioContextAsync = atom(null, async (get, set) => {
  let audioContext = get(atomAudioContext);
  const audioBuffer = get(atomAudioBuffer);
  if (!audioContext) {
    audioContext = new AudioContext();
    set(atomAudioContext, audioContext);
  }
  if (!audioBuffer) {
    const response = await fetch("./sound.mp3");
    const arrayBuffer = await response.arrayBuffer();
    set(atomAudioBuffer, await audioContext.decodeAudioData(arrayBuffer));
  }
});
