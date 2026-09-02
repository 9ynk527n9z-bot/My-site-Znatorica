'use client';
import { useState } from 'react';
import DomikScene, { DecorationArt } from '@/components/domik/DomikScene';
import { DECORATIONS } from '@/lib/decorations';
export default function Preview() {
  const [owned, setOwned] = useState(DECORATIONS.map(item => item.id));
  return <main className="min-h-screen bg-[#201535] text-white p-4"><div className="max-w-4xl mx-auto space-y-5">
    <h1 className="text-2xl font-bold">Домик Знатика · предварительный просмотр</h1>
    <p>Локальная примерка: звёзды не списываются. Нажми на комнату или кнопку, чтобы позвать белку.</p>
    <DomikScene ownedItems={owned} />
    <div className="flex gap-4"><button className="btn-primary" onClick={() => setOwned([])}>Убрать все вещи</button><button className="btn-primary" onClick={() => setOwned(DECORATIONS.map(item => item.id))}>Показать все вещи</button></div>
    <h2 className="text-xl font-bold">Новые товары — примерка</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{DECORATIONS.map(item => <button key={item.id} aria-pressed={owned.includes(item.id)} className="rounded-2xl p-3 bg-[#fffaf4] text-[#493362]" onClick={() => setOwned(items => items.includes(item.id) ? items.filter(id => id !== item.id) : [...items, item.id])}>
      <div className="h-28 flex items-center justify-center overflow-hidden"><div className="w-28"><DecorationArt id={item.id} label={item.title} /></div></div>
      <p className="text-sm font-bold">{item.title}</p><p className="text-xs mt-2">{item.cost} ⭐ · {owned.includes(item.id) ? 'В домике' : 'Примерить'}</p>
    </button>)}</div>
  </div></main>;
}
