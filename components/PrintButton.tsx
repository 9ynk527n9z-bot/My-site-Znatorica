'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print bg-violet text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
    >
      🖨️ Распечатать вариант
    </button>
  );
}
