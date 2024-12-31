import { timerReset, timerToggle } from "./timer.js";
import { getStyle } from "./style.js";
import { getCounter } from "./counter.js";
import { getSvg } from "./svg.js";

export function getPomodoro() {
  const pomodoro = document.createElement("div");
  pomodoro.id = "pomodoro-main";

  // 要素を追加
  const style = getStyle();
  const svg = getSvg();
  const counter = getCounter();
  pomodoro.append(style, svg, counter);

  // イベントハンドラを追加
  const event = window.ontouchstart ? "touch" : "click";
  pomodoro.addEventListener(event, timerToggle);
  counter.addEventListener(event, timerReset);

  timerReset();

  return pomodoro;
}
