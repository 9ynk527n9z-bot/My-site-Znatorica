interface Props {
  gameTitle: string; // напр. «Найди лишнее» — идёт в титул «Магистр игры «X»!»
  statLine?: string; // напр. «8 из 8 без ошибок» — необязательная строка под титулом
}

// Значок «Магистр игры» на экране победы.
//
// Кнопки «поделиться» отсюда вынесены в отдельный компонент ShareButtons:
// по всему сайту полоса шеринга стоит В САМОМ НИЗУ карточки результата, под
// кнопками действий, а этот значок — наверху, рядом со счётом.
export default function GameShareBadge({ gameTitle, statLine }: Props) {
  return (
    <div className="mb-6">
      <div className="inline-block bg-orange/10 border border-orange/30 rounded-full px-4 py-2 mb-2">
        <p className="font-bold text-[#3a1c6e]">🏆 Магистр игры «{gameTitle}»!</p>
      </div>
      {statLine && <p className="text-gray-500 text-sm">{statLine}</p>}
    </div>
  );
}
