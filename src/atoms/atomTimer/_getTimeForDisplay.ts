import { TypeTimer } from "../../types/TypeTimer";
import { CONST } from "./_CONST";

export function getTimeForDisplay({ status, seconds, intervalId }: TypeTimer) {
  const isRunning = intervalId !== undefined;
  const time = getTimeString(seconds);
  const workProgress = status === "work" ? seconds / CONST.work_sec : 0;
  const breakProgress = status === "work" ? 1 : seconds / CONST.break_sec;
  return {
    status,
    time,
    workProgress,
    breakProgress,
    isRunning,
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
