import { timerReset, timerToggle } from "./timer.js";
import { getStyle } from "./style.js";
import { getCounter } from "./counter.js";
import { getSvg } from "./svg.js";
import { getPopupButton, popupWindow } from "./popupButton.js";
import { resetCounter } from "./counter.js";

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
pomodoro.append(style, svg, counter, popup);

// イベントハンドラを追加
const event = window.ontouchstart ? "touch" : "click";
pomodoro.addEventListener(event, timerToggle);
counter.addEventListener(event, resetCounter);
popup.addEventListener(event, popupWindow);

timerReset();
