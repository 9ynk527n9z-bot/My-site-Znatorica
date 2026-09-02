'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const ENGLISH_LINKS = [
  { href: '/trenazher/numbers', icon: '1️⃣', title: 'Числа' },
  { href: '/trenazher/colors', icon: '🌈', title: 'Цвета' },
  { href: '/trenazher/english-animals', icon: '🐶', title: 'Животные' },
  { href: '/trenazher/english-food', icon: '🍎', title: 'Еда' },
  { href: '/trenazher/english-family', icon: '👪', title: 'Семья' },
  { href: '/trenazher/english-clothes', icon: '👕', title: 'Одежда' },
  { href: '/trenazher/english-weather', icon: '☀️', title: 'Погода' },
  { href: '/trenazher/english-school', icon: '🎒', title: 'Школьные принадлежности' },
  { href: '/trenazher/english-words', icon: '📚', title: 'Слова по темам' },
  { href: '/trenazher/english-colors', icon: '🎨', title: 'Цвета — квиз' },
  { href: '/trenazher/english-shapes', icon: '🔺', title: 'Формы' },
  { href: '/trenazher/angliyskiy-alfavit', icon: '🔤', title: 'Алфавит' },
  { href: '/trenazher/azbuky', icon: '🔤', title: 'Алфавит — игра' },
  { href: '/trenazher/angliyskiy-schet', icon: '🔢', title: 'Счёт до 20' },
  { href: '/trenazher/irregular-verbs', icon: '📖', title: 'Неправильные глаголы' },
  { href: '/trenazher/grammatika-3klass-english', icon: '📝', title: 'Грамматика (3 класс)' },
  { href: '/3-klass/angliyskiy/vocabulary', icon: '📖', title: 'Словарный запас (теория)' },
  { href: '/3-klass/angliyskiy/grammatika', icon: '📝', title: 'Грамматика (теория)' },
];

// Считает, где показать панель, и сколько места ей реально доступно по высоте —
// если кнопка оказалась близко к низу экрана, панель не должна вылезать за край
// без возможности прокрутки (именно так и было: "окошко выходит не полностью").
function computePanelBox(rect: DOMRect) {
  const margin = 12;
  const desiredTop = rect.bottom + 8;
  const minHeight = 240; // минимум места, чтобы панель не сжималась в полоску
  const top = Math.max(margin, Math.min(desiredTop, window.innerHeight - minHeight - margin));
  const maxHeight = window.innerHeight - top - margin;
  return { top, maxHeight };
}

export default function EnglishMenu() {
  const [expanded, setExpanded] = useState(false);
  const [panelBox, setPanelBox] = useState({ top: 0, maxHeight: 400 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Переход по /#english (например, из поиска) — открыть меню автоматически.
  // Слушаем и hashchange, потому что клик по такой ссылке с той же страницы
  // не размонтирует компонент — эффект на маунте один раз не сработает.
  useEffect(() => {
    function openIfTargeted() {
      if (window.location.hash !== '#english') return;
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) setPanelBox(computePanelBox(rect));
      setExpanded(true);
    }
    openIfTargeted();
    window.addEventListener('hashchange', openIfTargeted);
    return () => window.removeEventListener('hashchange', openIfTargeted);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    function updatePosition() {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) setPanelBox(computePanelBox(rect));
    }
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [expanded]);

  function toggle() {
    if (!expanded) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) setPanelBox(computePanelBox(rect));
    }
    setExpanded((v) => !v);
  }

  return (
    <div ref={wrapRef} id="english" className="relative scroll-mt-24">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 hover:border-white/40 hover:bg-white/15 transition-all text-sm font-semibold text-white whitespace-nowrap"
      >
        <span>🇬🇧</span>Английский
      </button>

      {expanded && (
        <div
          style={{ top: panelBox.top, maxHeight: panelBox.maxHeight }}
          className="fixed z-30 left-1/2 -translate-x-1/2 w-[92vw] max-w-2xl sm:max-w-3xl bg-[#3a1c6e]/95 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-white">🇬🇧 Всё английское на сайте</p>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-white/60 hover:text-white transition-colors text-sm"
              aria-label="Свернуть"
            >
              ✕ Свернуть
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {ENGLISH_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setExpanded(false)}
                className="card flex flex-col items-center text-center gap-1 hover:border-orange/60 hover:-translate-y-0.5 transition-all !p-2"
              >
                <span className="text-xl">{l.icon}</span>
                <span className="text-xs font-semibold text-white leading-tight line-clamp-2">{l.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
