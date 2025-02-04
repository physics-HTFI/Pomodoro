import { useAtomValue } from "jotai";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { Time } from "./_Time";
import { Ring } from "./_Ring";
import { _colors } from "./_color";

/**
 * 残り時間を表示する部分（"25:00"と周囲の輪）
 */
export function Svg() {
  const { status, time, isRunning, workProgress, breakProgress } = useAtomValue(
    atomTimer.getTimeForDisplay
  );

  return (
    <svg
      viewBox="-1 -1 2 2"
      style={{
        width: "100svmin",
        fontSize: "3%",
        fontFamily: "fantasy",
        opacity: isRunning ? 1 : 0.5,
      }}
    >
      <Time time={time} color={_colors[status]} />
      <Ring Θ={workProgress} r={0.9} width={0.06} color={_colors.work} />
      <Ring Θ={breakProgress} r={0.85} width={0.01} color={_colors.break} />
    </svg>
  );
}
