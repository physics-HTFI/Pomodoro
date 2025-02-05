import { TypeTimer } from "../../types/TypeTimer";
import { CONST } from "./_CONST";

/**
 * `TypeTimer`の初期値を返す
 */
export function getTimerDefault(): TypeTimer {
  return {
    status: "work",
    seconds: CONST.seconds["work"],
    isRunning: false,
  };
}
