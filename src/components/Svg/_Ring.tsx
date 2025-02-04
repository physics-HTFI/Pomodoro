export function Ring({
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
