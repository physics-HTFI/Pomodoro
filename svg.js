import { isRunning, isWorking, getTimeString, getProgress } from "./timer.js";

/**
 * svg要素を返す
 */
export const getSvg = () => svg;

/**
 * svg要素を更新する
 */
export function updateSvg() {
  svg.style.opacity = isRunning() ? 1 : 0.5;
  const time = getTimeElement(isWorking(), getTimeString());
  const ringWork = getRingElement(getProgress("work"), "work");
  const ringBreak = getRingElement(getProgress("break"), "break");
  svg.innerHTML = time + ringWork + ringBreak;
}

//|
//| ローカル
//|

const WORK_COLOR = "#4fff81";
const BREAK_COLOR = "#ff6363";

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.id = "pomodoro-svg";
svg.setAttribute("viewBox", "-1 -1 2 2");

function getTimeElement(isWorking, time) {
  const color = isWorking ? WORK_COLOR : BREAK_COLOR;
  return `<text fill="${color}" stroke="none" dominant-baseline="central" text-anchor="middle">${time}</text>`;
}

function getRingElement(Θ, type) {
  if (Θ < 0.0001) return "";
  const [r, width, color] =
    type === "work" ? [0.9, 0.06, WORK_COLOR] : [0.85, 0.01, BREAK_COLOR];
  const style = `fill="none" stroke="${color}" stroke-width="${width}"`;
  if (Θ > 0.9999) return `<circle cx="0" cy="0" r="${r}" ${style}/>`;
  return `<path d="M ${r * Math.sin(Math.min(0.9999, Θ) * 2 * Math.PI)} ${
    -r * Math.cos(Math.min(0.9999, Θ) * 2 * Math.PI)
  } A ${r} ${r} 0 ${Θ < 0.5 ? 0 : 1} 0 ${r * Math.cos(0.5 * Math.PI)} ${
    -r * Math.sin(0.5 * Math.PI)
  } ${Θ >= 0.9999 ? "z" : ""}" ${style}/>`;
}
