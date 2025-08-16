import { TypeTimer } from "../../../../types/TypeTimer";
import { CONST } from "./_CONST";

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
  const min = Math.trunc(seconds / 60);
  const sec = `${seconds % 60}`.padStart(2, "0");
  return `${min}:${sec}`;
}
