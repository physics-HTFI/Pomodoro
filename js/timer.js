import { play } from "./play.js";
import { updateCounter } from "./counter.js";
import { updateSvg } from "./svg.js";

export function timerReset() {
  count = 0;
  stop();
}

export function timerToggle() {
  if (isRunning()) {
    stop();
    return;
  }
  interval = setInterval(() => {
    seconds -= 1;
    if (seconds <= 0) {
      const endWork = type === "work";
      type = endWork ? "break" : "work";
      seconds = endWork ? BREAK_SEC : WORK_SEC;
      count += endWork ? 1 : 0;
      play();
    }
    if (seconds === 10) {
      play(0.0001); // 予め無音で再生しておくと、実際に鳴らしたときに遅延しない（0だと効果なし）
    }
    update();
  }, 1000);
  if (type === "work" && seconds === WORK_SEC) {
    play();
  }
  update();
}

/**
 * type: "work" | "break" の進捗率[0~1]を返す
 */
export function getProgress(type) {
  const working = isWorking();
  const p = seconds / (working ? WORK_SEC : BREAK_SEC);
  if (type === "work") return working ? p : 0;
  if (type === "break") return working ? 1 : p;
  return 0;
}

/**
 * 残り時間を文字列で返す。ex) "25:00"
 */
export function getTimeString() {
  const sign = seconds < 0 ? "-" : "";
  const min = Math.abs(Math.trunc(seconds / 60));
  const sec = `${Math.abs(seconds % 60)}`.padStart(2, "0");
  return `${sign}${min}:${sec}`;
}

export const isWorking = () => type === "work";
export const isRunning = () => interval !== undefined;
export const getCount = () => count;

//|
//| ローカル
//|

const WORK_SEC = 25 * 60;
const BREAK_SEC = 5 * 60;

function stop() {
  clearInterval(interval);
  interval = undefined;
  type = "work";
  seconds = WORK_SEC;
  update();
}

function update() {
  updateSvg();
  updateCounter();
}

let interval;
let type; // "work" | "break"
let seconds;
let count;
timerReset();
