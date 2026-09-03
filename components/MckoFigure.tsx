import type { MckoFigure as Figure } from '@/lib/mcko';

/** Рисунки заданий: векторные, без скрытых ответов и внешних картинок. */
export default function MckoFigure({ figure, id }: { figure: Figure; id: string }) {
  const titleId = `mcko-figure-${id}`;
  if (figure.kind === 'image') {
    return <figure className="my-4 rounded-lg bg-white p-3 text-black break-inside-avoid">
      {/* SVG сохраняет чёткость схем при увеличении и печати. */}
      <div className="overflow-x-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={figure.src} alt={figure.alt} className="block w-full min-w-[560px] sm:min-w-0 print:min-w-0 h-auto" loading="eager" />
      </div>
      <figcaption className="no-print mt-2 text-sm">
        <a href={figure.src} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">Открыть рисунок крупно ↗</a>
      </figcaption>
    </figure>;
  }
  if (figure.kind === 'bars') {
    const max = Math.max(...figure.values);
    const step = max <= 30 ? 2 : max <= 60 ? 5 : 10;
    const bound = Math.ceil(max / step) * step;
    const scale = 330 / bound;
    return <div className="my-4 overflow-x-auto rounded-lg bg-white p-3 text-black">
      <svg viewBox="0 0 570 260" className="w-full min-w-[340px]" role="img" aria-labelledby={titleId}>
        <title id={titleId}>Диаграмма. Значения: {figure.labels.map((label, i) => `${label}: ${figure.values[i]}`).join('; ')}.</title>
        {Array.from({ length: bound / step + 1 }, (_, i) => <g key={i}>
          <line x1={165 + i * step * scale} x2={165 + i * step * scale} y1="15" y2="210" stroke="#d1d5db" />
          <text x={165 + i * step * scale} y="232" textAnchor="middle" fontSize="12" fill="#111">{i * step}</text>
        </g>)}
        {figure.labels.map((label, i) => <g key={label}>
          <text x="155" y={43 + i * 48} textAnchor="end" fontSize="14" fill="#111">{label}</text>
          <rect x="165" y={22 + i * 48} width={figure.values[i] * scale} height="30" fill="#c4b5fd" stroke="#4c1d95" />
        </g>)}
        <text x="535" y="232" fontSize="12" fill="#111">{figure.unit}</text>
      </svg>
    </div>;
  }
  if (figure.kind === 'grid') {
    const { width: w, height: h, cutWidth: cw, cutHeight: ch } = figure;
    return <div className="my-4 rounded-lg bg-white p-3 text-black max-w-xl">
      <svg viewBox={`0 0 ${(w + 2) * 28} ${(h + 2) * 28}`} className="w-full" role="img" aria-labelledby={titleId}>
        <title id={titleId}>Клетчатая фигура: прямоугольник {w} на {h} клеток, из правого верхнего угла удалён прямоугольник {cw} на {ch} клеток. Сторона клетки — 1 см.</title>
        <path d={`M28 28 H${(w - cw + 1) * 28} V${(ch + 1) * 28} H${(w + 1) * 28} V${(h + 1) * 28} H28 Z`} fill="#ddd6fe" />
        {Array.from({ length: w + 1 }, (_, i) => <line key={`x${i}`} x1={(i + 1) * 28} x2={(i + 1) * 28} y1="28" y2={(h + 1) * 28} stroke="#9ca3af" strokeWidth="0.7" />)}
        {Array.from({ length: h + 1 }, (_, i) => <line key={`y${i}`} y1={(i + 1) * 28} y2={(i + 1) * 28} x1="28" x2={(w + 1) * 28} stroke="#9ca3af" strokeWidth="0.7" />)}
        <path d={`M28 28 H${(w - cw + 1) * 28} V${(ch + 1) * 28} H${(w + 1) * 28} V${(h + 1) * 28} H28 Z`} fill="none" stroke="#111827" strokeWidth="2" />
        <text x="28" y={(h + 1) * 28 + 20} fontSize="12" fill="#111">Сторона клетки — 1 см</text>
      </svg>
    </div>;
  }
  if (figure.kind === 'ray') {
    return <div className="my-4 rounded-lg bg-white p-3 text-black">
      <svg viewBox="0 0 580 110" className="w-full" role="img" aria-labelledby={titleId}>
        <title id={titleId}>Числовой луч с равными делениями. Ноль на первом штрихе, {figure.step} на следующем. Точка A находится на {figure.point}-м делении вправо от нуля.</title>
        <path d="M30 55 H550 L540 50 M550 55 L540 60" fill="none" stroke="#111" strokeWidth="2" />
        {Array.from({ length: figure.ticks + 1 }, (_, i) => <line key={i} x1={35 + 46 * i} x2={35 + 46 * i} y1="47" y2="63" stroke="#111" />)}
        <text x="35" y="87" textAnchor="middle" fill="#111">0</text>
        <text x="81" y="87" textAnchor="middle" fill="#111">{figure.step}</text>
        <circle cx={35 + 46 * figure.point} cy="55" r="5" fill="#4c1d95" />
        <text x={35 + 46 * figure.point} y="32" textAnchor="middle" fontWeight="bold" fill="#111">A</text>
      </svg>
    </div>;
  }
  return <div className="my-4 rounded-lg bg-white p-3 text-black max-w-lg">
    <svg viewBox="0 0 420 230" className="w-full" role="img" aria-labelledby={titleId}>
      <title id={titleId}>Прямоугольный параллелепипед: длина {figure.length}, ширина {figure.width}, высота {figure.height} {figure.unit}. Рисунок не в масштабе.</title>
      <path d="M80 75 H270 V175 H80 Z M80 75 L135 35 H325 V135 L270 175 M270 75 L325 35" fill="#ede9fe" stroke="#111" strokeWidth="2" />
      <path d="M80 175 L135 135 V35 M135 135 H325" fill="none" stroke="#6b7280" strokeDasharray="5 5" />
      <text x="170" y="201" textAnchor="middle" fill="#111">{figure.length} {figure.unit}</text>
      <text x="310" y="180" fill="#111">{figure.width} {figure.unit}</text>
      <text x="20" y="127" fill="#111">{figure.height} {figure.unit}</text>
      <text x="80" y="222" fontSize="12" fill="#111">Рисунок не в масштабе</text>
    </svg>
  </div>;
}
