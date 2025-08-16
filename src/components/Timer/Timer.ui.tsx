import { Time } from "./ui/Time";
import { Ring } from "./ui/Ring";
import { TypeTimer } from "./model/type/TypeTimer";
import { getTimeForDisplay } from "./use/getTimeForDisplay";
import { TypeTimerStatus } from "./model/type/TypeTimerStatus";

export function UI_Timer({ timer, id }: { timer: TypeTimer; id?: string }) {
  const { breakProgress, isRunning, status, time, workProgress } =
    getTimeForDisplay(timer);
  return (
    <svg
      id={id}
      viewBox="-1 -1 2 2"
      style={{
        width: "100%",
        fontSize: "3%",
        fontFamily: "fantasy",
        opacity: isRunning ? 1 : 0.5,
      }}
    >
      <Time time={time} color={COLORS[status]} />
      <Ring Θ={workProgress} r={0.9} width={0.06} color={COLORS.work} />
      <Ring Θ={breakProgress} r={0.85} width={0.01} color={COLORS.break} />
    </svg>
  );
}

//|
//| private
//|

const COLORS = {
  work: "#4fff81",
  break: "#ff6363",
} satisfies Record<TypeTimerStatus, string>;
