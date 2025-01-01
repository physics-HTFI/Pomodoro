import { getPomodoro } from "./pomodoro.js";
import { getSpeakerButton } from "./speakerButton.js";

/**
 * ポップアップボタン要素を返す
 */
export const getPopupButton = () => popupButton;

/**
 * ポップアップウィンドウを表示する
 */
export async function popupWindow(e) {
  e?.stopPropagation();
  const pipWindow = await window.documentPictureInPicture.requestWindow({
    width: 200,
    height: 200,
    disallowReturnToOpener: true,
  });
  const pomodoro = getPomodoro();
  const speakerButton = getSpeakerButton();
  popupButton.hidden = true;
  speakerButton.hidden = true;
  pipWindow.document.body.style = "margin: 0;";
  pipWindow.document.body.append(pomodoro);
  pipWindow.addEventListener("unload", () => {
    popupButton.hidden = false;
    speakerButton.hidden = false;
    document.body.append(pomodoro);
  });
}

//|
//| ローカル
//|

const popupButton = document.createElement("span");
popupButton.id = "pomodoro-popup-button";
popupButton.innerText = "🪟";
