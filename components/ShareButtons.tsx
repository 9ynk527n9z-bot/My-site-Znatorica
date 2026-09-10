'use client';

import { useState } from 'react';
import { trackUsage } from '@/lib/track';

// Кнопки «поделиться» (ВК / Telegram / скопировать ссылку).
// WhatsApp сознательно не добавляем — он не работает в РФ.
//
// Значки — настоящие логотипы в фирменных цветах. Раньше здесь стояли эмодзи
// (синий кружок и самолётик), по которым нельзя было понять, куда ведёт кнопка.
//
// Текст задаётся снаружи и пишется ОТ ЛИЦА РОДИТЕЛЯ, а не ребёнка: аудитория
// сайта — дети 4–11 лет, но соцсети и родительские чаты в руках у взрослого.
// Прежняя формулировка «Я — Магистр игры! Сможешь лучше?» обращалась к сверстнику,
// которого у дошкольника во ВКонтакте нет — за всё время ей не воспользовались ни разу.

const VK_PATH =
  'M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.607-.313-3.486 1.801-2.335 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.808 7.376 2.808z';
const TG_PATH =
  'M9.04 15.47 8.7 20.2c.5 0 .72-.21.98-.47l2.35-2.24 4.87 3.56c.9.5 1.53.24 1.77-.83l3.2-15c.3-1.32-.48-1.84-1.34-1.52L1.63 9.9c-1.3.5-1.28 1.23-.22 1.55l4.9 1.53L18.6 5.6c.54-.36 1.03-.16.63.2z';
// Официальный знак MAX (не эмодзи и не «M» из текстового лого — фигура из
// официального SVG-лого мессенджера, commons.wikimedia.org/wiki/File:Max_(app)_logo.svg).
const MAX_PATH =
  'M21.47 41.88c-4.11 0-6.02-.6-9.34-3-2.1 2.7-8.75 4.81-9.04 1.2 0-2.71-.6-5-1.28-7.5C1 29.5.08 26.07.08 21.1.08 9.23 9.82.3 21.36.3c11.55 0 20.6 9.37 20.6 20.91a20.6 20.6 0 0 1-20.49 20.67m.17-31.32c-5.62-.29-10 3.6-10.97 9.7-.8 5.05.62 11.2 1.83 11.52.58.14 2.04-1.04 2.95-1.95a10.4 10.4 0 0 0 5.08 1.81 10.7 10.7 0 0 0 11.19-9.97 10.7 10.7 0 0 0-10.08-11.1Z';

const CIRCLE = 'w-9 h-9 flex items-center justify-center rounded-full transition-opacity hover:opacity-80';

export default function ShareButtons({
  text,
  url,
  trackKey,
}: {
  text: string;
  url: string;
  trackKey: string; // попадает в статистику как share:<канал>:<trackKey>
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <span className="text-gray-400 text-xs">Поделиться:</span>

      <a
        href={`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackUsage(`share:vk:${trackKey}`)}
        className={`${CIRCLE} bg-[#0077FF]`}
        title="Поделиться ВКонтакте"
        aria-label="Поделиться ВКонтакте"
      >
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="#fff" aria-hidden="true">
          <path d={VK_PATH} />
        </svg>
      </a>

      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackUsage(`share:telegram:${trackKey}`)}
        className={`${CIRCLE} bg-[#2AABEE]`}
        title="Поделиться в Telegram"
        aria-label="Поделиться в Telegram"
      >
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="#fff" aria-hidden="true">
          <path d={TG_PATH} />
        </svg>
      </a>

      <a
        href={`https://max.ru/:share?text=${encodeURIComponent(`${text} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackUsage(`share:max:${trackKey}`)}
        className={CIRCLE}
        style={{ background: 'linear-gradient(135deg, #471AFF, #9500FF)' }}
        title="Поделиться в MAX"
        aria-label="Поделиться в MAX"
      >
        <svg viewBox="0 0 43 42" className="w-[16px] h-[16px]" fill="#fff" aria-hidden="true">
          <path d={MAX_PATH} />
        </svg>
      </a>

      <button
        onClick={() => {
          navigator.clipboard.writeText(`${text} ${url}`).catch(() => {});
          trackUsage(`share:copy:${trackKey}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className={`${CIRCLE} bg-[#EEECF3]`}
        title="Скопировать ссылку"
        aria-label="Скопировать ссылку"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="#16a34a" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12.5 9 17.5 20 6.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="#5b5470" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
      </button>
    </div>
  );
}
