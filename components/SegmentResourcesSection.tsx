import Link from 'next/link';
import { SEGMENT_RESOURCES } from '@/lib/segment-resources';

const VPR_SUBJECTS = [
  { slug: 'matematika', title: 'Математика', icon: '🔢' },
  { slug: 'russkiy', title: 'Русский язык', icon: '📝' },
  { slug: 'okruzhayushchiy-mir', title: 'Окружающий мир', icon: '🌍' },
  { slug: 'angliyskiy', title: 'Английский язык', icon: '🇬🇧' },
];

const MCKO_SUBJECTS = [
  { slug: 'matematika', title: 'Математика', icon: '🔢' },
  { slug: 'russkiy', title: 'Русский язык', icon: '📝' },
  { slug: 'angliyskiy', title: 'Английский язык', icon: '🇬🇧' },
  { slug: 'okruzhayushchiy-mir', title: 'Окружающий мир', icon: '🌍' },
  { slug: 'literaturnoe-chtenie', title: 'Литературное чтение', icon: '📚' },
];

interface Props {
  segmentId: string;
  gradeTitle: string; // например «4 класса» — используется в заголовках "для {gradeTitle}"
}

export default function SegmentResourcesSection({ segmentId, gradeTitle }: Props) {
  const resources = SEGMENT_RESOURCES[segmentId];
  if (!resources) return null;

  return (
    <>
      {resources.trainers.length > 0 && (
        <div className="bg-[#2A1B4D] border-t border-[#2D2350] py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">✨ Тренажёры для {gradeTitle}</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {resources.trainers.map((trainer) => (
                <Link
                  key={trainer.slug}
                  href={`/trenazher/${trainer.slug}`}
                  className="block bg-[#1E1035] border border-[#2D2350] rounded-lg p-8 hover:border-orange transition-colors"
                >
                  <div className="text-5xl mb-4">{trainer.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{trainer.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{trainer.desc}</p>
                  <span className="text-orange font-bold">Играть →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {resources.generators && resources.generators.length > 0 && (
        <div className="bg-black border-t border-[#2D2350] py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">⚙️ Генераторы для {gradeTitle}</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {resources.generators.map((gen) => (
                <Link
                  key={gen.slug}
                  href={`/generator/${gen.slug}`}
                  className="block bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 hover:border-orange transition-colors"
                >
                  <div className="text-5xl mb-4">{gen.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{gen.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{gen.desc}</p>
                  <span className="text-orange font-bold">Создать →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {resources.vprKlass && (
        <div className="bg-black border-t border-[#2D2350] py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">📋 Подготовка к ВПР для {gradeTitle}</h2>
            <p className="text-gray-400 mb-8">10 авторских вариантов по каждому предмету</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VPR_SUBJECTS.map((subj) => (
                <Link
                  key={subj.slug}
                  href={`/vpr/${resources.vprKlass}/${subj.slug}`}
                  className="block bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors text-center"
                >
                  <div className="text-4xl mb-2">{subj.icon}</div>
                  <h3 className="font-bold">{subj.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {resources.mckoKlass && (
        <div className="bg-black border-t border-[#2D2350] py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">🏙️ Подготовка к МЦКО для {gradeTitle}</h2>
            <p className="text-gray-400 mb-8">Для Москвы и Московской области — формат отличается от ВПР, 20 вариантов по каждому предмету</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {MCKO_SUBJECTS.map((subj) => (
                <Link
                  key={subj.slug}
                  href={`/podgotovka-k-mcko/${resources.mckoKlass}/${subj.slug}`}
                  className="block bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors text-center"
                >
                  <div className="text-4xl mb-2">{subj.icon}</div>
                  <h3 className="font-bold">{subj.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {resources.posterKlass && (
        <div className="bg-[#2A1B4D] border-t border-[#2D2350] py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">🖼️ Плакаты для {gradeTitle}</h2>
            <p className="text-gray-400 mb-6">Учебные плакаты — можно распечатать</p>
            <Link
              href={`/plakaty?klass=${resources.posterKlass}`}
              className="btn-primary inline-block px-8 py-3"
            >
              Открыть плакаты →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
