export function Time({ color, time }: { color: string; time: string }) {
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
