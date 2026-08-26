import { TypeTimerStatus } from "./TypeTimerStatus";

export interface TypeTimer {
  isRunning: boolean;
  hasBreak: boolean;
  status: TypeTimerStatus;
  seconds: number;
}
