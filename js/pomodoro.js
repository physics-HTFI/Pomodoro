import { timerReset, timerToggle } from "./timer.js";
import { getStyle } from "./style.js";
import { getCounter } from "./counter.js";
import { getSvg } from "./svg.js";
import { getPopupButton, popupWindow } from "./popupButton.js";
import { resetCounter } from "./counter.js";
import {
  getSpeakerButton,
  getSpeakerSelectDialog,
  getSpeakers,
} from "./speakerButton.js";

/**
 * ポモドーロタイマー要素を返す
 */
export const getPomodoro = () => pomodoro;

//|
//| ローカル
//|

const pomodoro = document.createElement("div");
pomodoro.id = "pomodoro-main";

// 要素を追加
const style = getStyle();
const svg = getSvg();
const counter = getCounter();
const popup = getPopupButton();
const speakerButton = getSpeakerButton();
const speakerSelectDialog = getSpeakerSelectDialog();
pomodoro.append(style, svg, counter, popup, speakerButton, speakerSelectDialog);

// イベントハンドラを追加
const event = window.ontouchstart ? "touch" : "click";
pomodoro.addEventListener(event, timerToggle);
counter.addEventListener(event, resetCounter);
popup.addEventListener(event, popupWindow);
speakerButton.addEventListener(event, getSpeakers);

timerReset();
