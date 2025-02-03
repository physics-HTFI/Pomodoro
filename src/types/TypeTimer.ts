import { TypeTimerStatus } from "./TypeTimerStatus";

export interface TypeTimer {
  status: TypeTimerStatus;
  seconds: number;
  /** `setInterval`の戻り値。カウントダウン中のみ値を持つ。 */
  intervalId?: number;
}
