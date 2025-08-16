import { TypeTimerStatus } from "./TypeTimerStatus";

export interface TypeTimer {
  isRunning: boolean;
  status: TypeTimerStatus;
  seconds: number;
}
