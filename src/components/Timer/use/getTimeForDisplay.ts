import { TypeTimer } from "../model/type/TypeTimer";
import { CONST } from "../model/atom/CONST";

export function getTimeForDisplay({ status, seconds, isRunning }: TypeTimer) {
  const time = getTimeString(seconds);
  const progress = seconds / CONST.seconds[status];
  const workProgress = status === "work" ? progress : 0;
  const breakProgress = status === "break" ? progress : 1;
  return {
    time,
    status,
    isRunning,
    workProgress,
    breakProgress,
  };
}

/**
 * ex) 25*60 => "25:00"
 */
export function getTimeString(seconds: number) {
  const sign = seconds < 0 ? "-" : "";
  const abs = Math.abs(seconds);
  const min = Math.trunc(abs / 60);
  const sec = `${abs % 60}`.padStart(2, "0");
  return `${sign}${min}:${sec}`;
}
