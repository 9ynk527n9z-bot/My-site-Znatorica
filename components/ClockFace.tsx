// Переиспользуемый SVG-циферблат: часовая и минутная стрелки под углом,
// вычисленным из часа и минуты. Используется в тренажёре /trenazher/vremya
// (там часы всегда целые, minute всегда 0) и в генераторе /generator/kotoryy-chas
// (печатный лист, минуты кратны 5).
//
// Углы: 12 наверху (=-90°), каждый час на циферблате = 30°, каждая минута = 6°.
// Часовая стрелка смещается на 0.5° за каждую минуту (иначе при, например,
// 6:30 она стояла бы ровно на 6, а должна — на полпути между 6 и 7).
interface ClockFaceProps {
  hour: number;
  minute?: number;
  size?: number;
}

export default function ClockFace({ hour, minute = 0, size = 256 }: ClockFaceProps) {
  const cx = 100;
  const cy = 100;
  const faceR = 90;

  const hourAngleDeg = (hour % 12) * 30 - 90 + minute * 0.5;
  const hourAngleRad = (hourAngleDeg * Math.PI) / 180;
  const hourHandLen = 45;
  const hourX = cx + hourHandLen * Math.cos(hourAngleRad);
  const hourY = cy + hourHandLen * Math.sin(hourAngleRad);

  const minuteAngleDeg = minute * 6 - 90;
  const minuteAngleRad = (minuteAngleDeg * Math.PI) / 180;
  const minuteHandLen = 70;
  const minuteX = cx + minuteHandLen * Math.cos(minuteAngleRad);
  const minuteY = cy + minuteHandLen * Math.sin(minuteAngleRad);

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    const angleDeg = n * 30 - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const numR = faceR - 18;
    const numX = cx + numR * Math.cos(angleRad);
    const numY = cy + numR * Math.sin(angleRad);
    const tickOuterR = faceR - 4;
    const tickInnerR = faceR - 12;
    const tx1 = cx + tickOuterR * Math.cos(angleRad);
    const ty1 = cy + tickOuterR * Math.sin(angleRad);
    const tx2 = cx + tickInnerR * Math.cos(angleRad);
    const ty2 = cy + tickInnerR * Math.sin(angleRad);
    return { n, numX, numY, tx1, ty1, tx2, ty2 };
  });

  return (
    <div className="mx-auto" style={{ width: size, height: size }}>
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="block drop-shadow-lg"
    >
      <circle cx={cx} cy={cy} r={faceR} fill="white" stroke="#7C3AED" strokeWidth="6" />
      {ticks.map((t) => (
        <line
          key={t.n}
          x1={t.tx1}
          y1={t.ty1}
          x2={t.tx2}
          y2={t.ty2}
          stroke="#7C3AED"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {ticks.map((t) => (
        <text
          key={`num-${t.n}`}
          x={t.numX}
          y={t.numY}
          fontSize="16"
          fontWeight="bold"
          fill="#3a1c6e"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {t.n}
        </text>
      ))}
      {/* Часовая стрелка — короткая и толстая */}
      <line x1={cx} y1={cy} x2={hourX} y2={hourY} stroke="#3a1c6e" strokeWidth="7" strokeLinecap="round" />
      {/* Минутная стрелка — длинная и тонкая */}
      <line x1={cx} y1={cy} x2={minuteX} y2={minuteY} stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="6" fill="#3a1c6e" />
    </svg>
    </div>
  );
}
