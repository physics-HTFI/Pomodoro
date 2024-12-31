import { getPomodoro } from "./pomodoro.js";

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
  popupButton.hidden = true;
  const pomodoro = getPomodoro();
  pipWindow.document.body.style = "margin: 0;";
  pipWindow.document.body.append(pomodoro);
  pipWindow.addEventListener("unload", () => {
    popupButton.hidden = false;
    document.body.append(pomodoro);
  });
}

//|
//| ローカル
//|

const popupButton = document.createElement("span");
popupButton.id = "pomodoro-popup-button";
popupButton.innerText = "🪟";
