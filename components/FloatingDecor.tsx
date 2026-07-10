// Летающие воздушные шарики и звёздочки — фоновый декор для всего сайта.
// Рендерится фиксированным слоем позади контента (pointer-events: none).

const BALLOONS = [
  { color: '#FF4D6D', top: '8%', left: '6%', size: 58, duration: '11s', delay: '0s' },
  { color: '#FFD43B', top: '62%', left: '90%', size: 46, duration: '13s', delay: '1.5s' },
  { color: '#4DABF7', top: '78%', left: '14%', size: 52, duration: '15s', delay: '0.5s' },
  { color: '#69DB7C', top: '20%', left: '84%', size: 42, duration: '12s', delay: '2s' },
  { color: '#FFA94D', top: '44%', left: '4%', size: 48, duration: '14s', delay: '1s' },
  { color: '#DA77F2', top: '14%', left: '46%', size: 40, duration: '16s', delay: '3s' },
  { color: '#3BC9DB', top: '70%', left: '52%', size: 44, duration: '13s', delay: '0.8s' },
  { color: '#FF8787', top: '38%', left: '72%', size: 50, duration: '17s', delay: '2.4s' },
];

const STARS = Array.from({ length: 28 }, (_, i) => ({
  top: `${(i * 37) % 100}%`,
  left: `${(i * 53) % 100}%`,
  size: 8 + (i % 4) * 4,
  color: i % 3 === 0 ? '#FFD43B' : '#FFFFFF',
  duration: `${2 + (i % 4)}s`,
  delay: `${(i % 5) * 0.4}s`,
}));

function Balloon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.55} viewBox="0 0 40 62" fill="none" aria-hidden="true">
      <ellipse cx="20" cy="21" rx="18" ry="21" fill={color} />
      <ellipse cx="14" cy="14" rx="5" ry="7" fill="#FFFFFF" opacity="0.35" />
      <path d="M20 42 l-4 6 h8 z" fill={color} />
      <path d="M20 48 q6 7 0 14" stroke={color} strokeWidth="1.4" fill="none" opacity="0.7" />
    </svg>
  );
}

export default function FloatingDecor() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {BALLOONS.map((b, i) => (
        <div
          key={`balloon-${i}`}
          className="absolute balloon-float"
          style={{
            top: b.top,
            left: b.left,
            opacity: 0.55,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        >
          <Balloon color={b.color} size={b.size} />
        </div>
      ))}
      {STARS.map((s, i) => (
        <div
          key={`star-${i}`}
          className="absolute twinkle"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            lineHeight: 1,
            color: s.color,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
}
