import { useTime } from "./useSvg";

/**
 * 残り時間を表示する部分（"25:00"と周囲のリング）
 */
export function Svg() {
  const { status, time, isRunning, workΘ, breakΘ } = useTime();

  const colors = { work: "#4fff81", break: "#ff6363" };
  const colorTime = colors[status];

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
      <SvgTime time={time} color={colorTime} />
      <SvgRing Θ={workΘ} r={0.9} width={0.06} color={colors.work} />
      <SvgRing Θ={breakΘ} r={0.85} width={0.01} color={colors.break} />
    </svg>
  );
}

function SvgTime({ color, time }: { color: string; time: string }) {
  return (
    <text
      fill={color}
      stroke="none"
      dominantBaseline="central"
      textAnchor="middle"
    >
      {time}
    </text>
  );
}

function SvgRing({
  Θ,
  r,
  width,
  color,
}: {
  Θ: number;
  r: number;
  width: number;
  color: string;
}) {
  if (Θ < 0.0001) return null;
  const style = { fill: "none", stroke: `${color}`, strokeWidth: `${width}` };
  if (Θ > 0.9999) return <circle cx="0" cy="0" r={r} {...style} />;
  return (
    <path
      d={`M ${r * Math.sin(Math.min(0.9999, Θ) * 2 * Math.PI)} ${
        -r * Math.cos(Math.min(0.9999, Θ) * 2 * Math.PI)
      } A ${r} ${r} 0 ${Θ < 0.5 ? 0 : 1} 0 ${r * Math.cos(0.5 * Math.PI)} ${
        -r * Math.sin(0.5 * Math.PI)
      } ${Θ >= 0.9999 ? "z" : ""}`}
      {...style}
    />
  );
}
