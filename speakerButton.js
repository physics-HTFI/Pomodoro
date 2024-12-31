import { play, setPlayDevice } from "./play.js";

/**
 * 出力デバイス選択ボタン要素を返す
 */
export const getSpeakerButton = () => speakerButton;

/**
 * 出力デバイス選択リストダイアログを返す
 */
export const getSpeakerSelectDialog = () => speakerSelectDialog;

/**
 * 出力デバイスリストを取得する
 */
export async function getSpeakers(e) {
  e?.stopPropagation();
  if (speakerSelect.children.length === 0) {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
      (d) => d.kind === "audiooutput"
    );
    console.log(devices);
    if (devices.length === 0) return;
    for (const d of devices) {
      const option = document.createElement("option");
      option.value = d.deviceId;
      option.innerText = d.label;
      speakerSelect.append(option);
    }
  }
  speakerSelectDialog.showModal();
}

//|
//| ローカル
//|

const speakerButton = document.createElement("span");
speakerButton.id = "pomodoro-speaker-button";
speakerButton.innerText = "🔈";

const speakerSelect = document.createElement("select");
speakerSelect.id = "pomodoro-speaker-select";
speakerSelect.onclick = (e) => {
  e.stopPropagation();
};
speakerSelect.onchange = async (e) => {
  await setPlayDevice(e.currentTarget.value);
  speakerSelectDialog.close();
  play();
};

const speakerSelectDialog = document.createElement("dialog");
speakerSelectDialog.onclick = (e) => {
  speakerSelectDialog.close();
  e.stopPropagation();
};
speakerSelectDialog.append(speakerSelect);
