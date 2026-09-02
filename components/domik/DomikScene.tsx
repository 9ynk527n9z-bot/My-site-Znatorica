'use client';

import { useEffect, useRef, useState } from 'react';
import { DECORATIONS } from '@/lib/decorations';
import styles from './DomikScene.module.css';

// Explicit atlas bounds keep wider items (garden, bunting) intact.
const crops = [
  [20,10,280,255],[327,25,290,242],[659,30,246,240],[957,20,228,260],[1217,56,294,208],
  [22,280,283,229],[379,274,186,240],[696,304,163,181],[950,298,202,207],[1218,288,288,211],
  [21,527,275,162],[303,535,393,192],[691,503,266,239],[1000,510,187,213],[1223,494,285,241],
  [49,699,237,311],[305,771,355,179],[677,743,209,269],[929,743,271,269],[1224,731,256,281],
];
export function DecorationArt({ id, label }: { id: string; label?: string }) {
  const index = id === 'znatik' ? 19 : DECORATIONS.findIndex(item => item.id === id);
  if (index < 0) return null;
  const [x, y, width, height] = crops[index];
  return <span role={label ? 'img' : undefined} aria-label={label} aria-hidden={!label} className={styles.art}
    style={{ aspectRatio: `${width}/${height}`, backgroundSize: `${1536 / width * 100}% ${1024 / height * 100}%`, backgroundPosition: `${x / (1536 - width) * 100}% ${y / (1024 - height) * 100}%` }} />;
}

// Coordinates are feet/ground anchors in percent of the background image.
const placements: Record<string, [number, number, number]> = {
  kovrik: [58, 59, 7], podushka: [40, 40, 12], lampa: [60, 40, 7],
  'polka-knig': [53, 35.5, 6.5], divan: [39, 63, 10.5], stol: [49.7, 67, 10],
  shkaf: [67, 39, 7], kartina: [59, 24, 3.5], chasy: [53, 23, 3.8],
  shtory: [47, 26, 8], girlyanda: [60, 18, 12], ogorod: [38, 94, 37],
  kacheli: [24, 73, 12], fonar: [74, 58, 6], derevo: [89, 79, 11],
  shary: [22, 43, 11], flazhki: [44, 20, 13], tort: [47.4, 60, 2.6], feyerverk: [88, 22, 8],
};
type Place = 'garden' | 'door' | 'living' | 'stairs' | 'landing' | 'bedroom';
const points: Record<Place, [number, number, number]> = {
  garden: [67, 95, 13], door: [72, 73, 10], living: [51, 69, 7.5],
  stairs: [66, 67, 9], landing: [67, 41, 9], bedroom: [48, 41, 7],
};
const edges: Record<Place, Place[]> = {
  garden: ['door'], door: ['garden', 'stairs'], living: ['stairs'],
  stairs: ['door', 'living', 'landing'], landing: ['stairs', 'bedroom'], bedroom: ['landing'],
};
function route(from: Place, to: Place): Place[] {
  const queue: Place[][] = [[from]];
  const seen = new Set<Place>();
  while (queue.length) {
    const path = queue.shift()!;
    const last = path[path.length - 1];
    if (last === to) return path.slice(1);
    seen.add(last);
    for (const next of edges[last]) if (!seen.has(next)) queue.push([...path, next]);
  }
  return [];
}
const destinations = [{ id: 'bedroom', label: 'Спальня' }, { id: 'living', label: 'Гостиная' }, { id: 'garden', label: 'Огород' }] as const;

export default function DomikScene({ ownedItems, happy = false }: { ownedItems: string[]; happy?: boolean }) {
  const [position, setPosition] = useState<Place>('garden');
  const [destination, setDestination] = useState<Place>('garden');
  const [walking, setWalking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const targetRef = useRef<Place>('garden');
  const movingRef = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  function move(to: Place) {
    setDestination(to);
    targetRef.current = to;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clearTimeout(timer.current);
      setPosition(to); setWalking(false); movingRef.current = false; return;
    }
    if (movingRef.current) return;
    function advance(from: Place) {
      const next = route(from, targetRef.current)[0];
      if (!next) { setWalking(false); movingRef.current = false; return; }
      movingRef.current = true;
      setWalking(true);
      setPosition(next);
      timer.current = setTimeout(() => advance(next), 650);
    }
    advance(position);
  }

  const [x, y, size] = points[position];
  return <section className={styles.panel} aria-label="Домик Знатика">
    <svg width="0" height="0" aria-hidden="true" className={styles.filterDefs}><defs><filter id="domik-cutout" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -50 -50 -50 0 145" /><feComposite in2="SourceAlpha" operator="in" /></filter></defs></svg>
    <div className={styles.scene}>
      <img src="/images/domik/house-empty.png" alt="Объёмный домик с двумя этажами, лестницей и цветами во дворе" className={styles.background} />
      {DECORATIONS.filter(item => ownedItems.includes(item.id)).map(item => {
        const [left, top, width] = placements[item.id];
        return <div key={item.id} data-decoration={item.id} className={styles.item} style={{ left: `${left}%`, top: `${top}%`, width: `${width}%` }}>
          <DecorationArt id={item.id} label={item.title} />
        </div>;
      })}
      <div className={styles.squirrel} data-position={position} data-walking={walking} style={{ left: `${x}%`, top: `${y}%`, width: `${size}%` }}>
        <div className={happy ? styles.happy : undefined}><DecorationArt id="znatik" label="Белка Знатик" /></div>
      </div>
      <button className={`${styles.hotspot} ${styles.bedroom}`} onClick={() => move('bedroom')} aria-label="Позвать белку в спальню" />
      <button className={`${styles.hotspot} ${styles.living}`} onClick={() => move('living')} aria-label="Позвать белку в гостиную" />
      <button className={`${styles.hotspot} ${styles.garden}`} onClick={() => move('garden')} aria-label="Позвать белку в огород" />
    </div>
    <div className={styles.controls}>
      <p>Куда пойдём?</p>
      <div className={styles.buttons}>{destinations.map(place => <button key={place.id} onClick={() => move(place.id)} aria-pressed={destination === place.id}>{place.label}</button>)}</div>
      <p className={styles.status} role="status">{walking ? 'Знатик идёт…' : destination === 'garden' ? 'Знатик во дворе, между грядками и цветами' : destination === 'bedroom' ? 'Знатик в спальне' : 'Знатик в гостиной'}</p>
    </div>
  </section>;
}
