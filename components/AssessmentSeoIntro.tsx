const SUBJECT_SKILLS: Record<string, string> = {
  matematika: 'вычислительные навыки, решение задач, работу с величинами и геометрическим материалом',
  russkiy: 'орфографию, грамматику, языковой анализ и понимание текста',
  'literaturnoe-chtenie': 'осознанное чтение, понимание содержания и умение находить информацию в тексте',
  okruzhayushchiy: 'знания о природе, человеке, обществе и безопасном поведении',
  angliyskiy: 'понимание английской речи, лексику, грамматику, чтение и работу с короткими текстами',
  biologiya: 'знания о живых организмах, их строении, жизнедеятельности и связях с окружающей средой',
  geografiya: 'работу с картой, географическими объектами, природными процессами и источниками информации',
  istoriya: 'хронологию, работу с историческими источниками, событиями, понятиями и причинно-следственными связями',
  literatura: 'понимание художественного текста, литературные понятия и умение подтверждать ответ содержанием произведения',
};

interface AssessmentSeoIntroProps {
  kind: 'ВПР' | 'МЦКО';
  subject: string;
  subjectTitle: string;
  grade: number;
  variantId: number;
  taskCount: number;
}

export default function AssessmentSeoIntro({
  kind,
  subject,
  subjectTitle,
  grade,
  variantId,
  taskCount,
}: AssessmentSeoIntroProps) {
  const skills = SUBJECT_SKILLS[subject] || 'основные знания и умения по предмету';

  return (
    <section className="no-print mb-8 rounded-xl border border-violet-400/30 bg-white/5 px-5 py-4">
      <h2 className="text-lg font-bold text-white mb-2">Что проверяет тренировочный вариант</h2>
      <p className="text-gray-300 leading-relaxed">
        Тренировочный вариант {kind} № {variantId} по предмету «{subjectTitle}» для {grade} класса
        включает {taskCount} заданий и помогает проверить {skills}. Сначала выполни задания самостоятельно,
        а затем открой ответы и разборы, чтобы найти и исправить ошибки.
      </p>
    </section>
  );
}
