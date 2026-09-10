interface Props { src: string; transcript: string; voice?: string; }

export default function MckoRecordedAudio({src,transcript,voice}:Props) {
  return <div className="bg-black/40 border border-violet/40 rounded-lg p-4 mb-4">
    <p className="font-bold mb-3">Аудирование</p>
    <div className="no-print">
      <audio controls preload="none" className="w-full" aria-label="Аудиозапись задания: два прочтения">
        <source src={src} type="audio/mp4" />
        Ваш браузер не поддерживает аудиоплеер. Откройте запись по ссылке ниже.
      </audio>
      <p className="text-gray-300 text-sm mt-3">{voice} Два прочтения с паузой 10 секунд.</p>
      <a href={src} target="_blank" rel="noopener noreferrer" className="inline-block text-orange underline mt-2 text-sm">Открыть аудиозапись отдельно</a>
      <details className="mt-4">
        <summary className="cursor-pointer text-orange font-bold">Расшифровка — откройте после выполнения</summary>
        <p lang="en-GB" className="text-gray-200 leading-relaxed whitespace-pre-line mt-3">{transcript}</p>
      </details>
    </div>
    <p className="hidden print:block">Аудиозапись находится на странице этого варианта. Прослушайте её дважды.</p>
  </div>;
}
