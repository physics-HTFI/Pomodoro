import { useAtomValue } from "jotai";
import { atomTimer } from "../atoms/atomTimer";
import { CONST } from "../CONST";

export function useTime() {
  const { seconds, status, intervalId } = useAtomValue(atomTimer);
  const isRunning = intervalId !== undefined;
  const time = getTimeString(seconds);
  const workΘ = status === "work" ? seconds / CONST.timer.work_sec : 0;
  const breakΘ = status === "work" ? 1 : seconds / CONST.timer.break_sec;

  return {
    isRunning,
    status,
    time,
    workΘ,
    breakΘ,
  };
}

/**
 * ex) "25:00"
 */
export function getTimeString(seconds: number) {
  const min = Math.trunc(seconds / 60);
  const sec = `${seconds % 60}`.padStart(2, "0");
  return `${min}:${sec}`;
}
