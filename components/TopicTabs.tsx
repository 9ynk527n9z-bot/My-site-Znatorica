'use client';

import { useState, type ReactNode } from 'react';

const TABS = [
  { key: 'theory', label: '📝 Теория' },
  { key: 'trainer', label: '🎮 Тренажёр' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function TopicTabs({ theory, trainer }: { theory: ReactNode; trainer: ReactNode }) {
  const [active, setActive] = useState<TabKey>('theory');

  return (
    <>
      <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-6 py-3 border-b-2 font-bold transition-colors whitespace-nowrap ${
              active === tab.key ? 'border-orange text-white' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === 'theory' ? theory : trainer}
    </>
  );
}
