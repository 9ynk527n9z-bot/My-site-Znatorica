// «Турнир Знаторики» — бесплатное участие для всех классов, платный только
// именной PDF-диплом с результатом (99₽). Вопросы НЕ пишутся заново для турнира —
// треки просто группируют уже существующие, проверенные банки вопросов сайта
// (lib/quiz/banks-*.ts) по классу и предмету, используя общий реестр викторин.
import { getQuizSource } from './quiz/registry';
import type { QuizQuestion } from './quiz/types';

const GRADE_LABELS: Record<string, string> = {
  '4-5-let': '4–5 лет',
  '6-7-let': '6–7 лет',
  '1-klass': '1 класс',
  '2-klass': '2 класс',
  '3-klass': '3 класс',
  '4-klass': '4 класс',
};

const GRADE_ORDER = ['4-5-let', '6-7-let', '1-klass', '2-klass', '3-klass', '4-klass'];

const SUBJECT_LABELS: Record<string, string> = {
  matematika: 'Математика',
  russkiy: 'Русский язык',
  gramota: 'Грамота',
  logika: 'Логика',
  okruzhayushchiy: 'Окружающий мир',
  razvitie: 'Развитие речи',
  chtenie: 'Чтение',
  literatura: 'Литература',
};

// Полный список тем реестра — та же карта путей, что использует TopicQuiz на
// страницах теории. Задан явно (а не импортом внутренностей registry.ts),
// чтобы группировка по трекам не зависела от приватной структуры модуля.
const ALL_TOPICS = [
  '4-5-let/gramota/bukvy', '4-5-let/gramota/slogov', '4-5-let/razvitie/slova', '4-5-let/razvitie/zvuki',
  '4-5-let/logika/naydi-lishnee', '4-5-let/logika/sravnenie-predmetov', '4-5-let/logika/zagadki',
  '4-5-let/matematika/figury', '4-5-let/matematika/tsveta', '4-5-let/matematika/schet-do-5', '4-5-let/matematika/schet-do-10',
  '4-5-let/okruzhayushchiy/domashnie-i-dikie-zhivotnye', '4-5-let/okruzhayushchiy/vremena-goda', '4-5-let/razvitie/pereskaz-po-kartinkam',
  '6-7-let/gramota/chtenie', '6-7-let/gramota/pisanie', '6-7-let/logika/zagadki', '6-7-let/logika/zakonomernosti',
  '6-7-let/matematika/schet-do-20', '6-7-let/matematika/slozhenie', '6-7-let/matematika/vychitanie', '6-7-let/matematika/sostav-chisla', '6-7-let/matematika/vremya',
  '6-7-let/okruzhayushchiy/prirodnye-yavleniya', '6-7-let/okruzhayushchiy/telo-cheloveka',
  '6-7-let/razvitie/dialogi', '6-7-let/razvitie/rasskazy', '6-7-let/razvitie/pereskaz-po-kartinkam',
  '1-klass/chtenie/proza', '1-klass/chtenie/stihi', '1-klass/logika/analogii', '1-klass/logika/orientaciya-v-prostranstve', '1-klass/logika/zagadki',
  '1-klass/matematika/slozhenie-5-10', '1-klass/matematika/vychitanie-5-10', '1-klass/matematika/slozhenie-do-20', '1-klass/matematika/sostav-chisla', '1-klass/matematika/zadachi',
  '1-klass/okruzhayushchiy/pravila-bezopasnosti', '1-klass/okruzhayushchiy/zhivaya-i-nezhivaya-priroda',
  '1-klass/russkiy/glasnye-i-soglasnye', '1-klass/russkiy/punktuaciya', '1-klass/russkiy/udarenie', '1-klass/russkiy/zhi-shi-cha-scha',
  '2-klass/logika/logicheskie-zadachi', '2-klass/logika/rebusy', '2-klass/logika/zagadki',
  '2-klass/matematika/delenie', '2-klass/matematika/dvuznachnye', '2-klass/matematika/perimetr', '2-klass/matematika/sravnenie-chisel', '2-klass/matematika/umnozhenie',
  '2-klass/okruzhayushchiy/chelovek', '2-klass/okruzhayushchiy/priroda',
  '2-klass/russkiy/bezudarnye-glasnye', '2-klass/russkiy/chasti-rechi', '2-klass/russkiy/koren-slova', '2-klass/russkiy/predlozhenie', '2-klass/russkiy/sinonimy-antonimy',
  '3-klass/matematika/delenie-s-ostatkom', '3-klass/matematika/doli', '3-klass/matematika/ploshchad-perimetr', '3-klass/matematika/slozhnie-primery',
  '3-klass/matematika/trekhznachnye', '3-klass/matematika/uravneniya', '3-klass/matematika/vnetablichnoe-umnozhenie',
  '3-klass/russkiy/razbor-slova-po-sostavu', '3-klass/russkiy/slozhnie-predlozheniya', '3-klass/russkiy/spryazhenie',
  '3-klass/logika/kombinatorika', '3-klass/logika/zadachi-na-vzveshivanie',
  '4-klass/matematika/desyatichnie-drobi', '4-klass/matematika/geometriya', '4-klass/matematika/poryadok-deystviy', '4-klass/matematika/velikie-chisla',
  '4-klass/matematika/skorost-vremya-rasstoyanie', '4-klass/matematika/edinitsy-izmereniya', '4-klass/matematika/umnozhenie-delenie-stolbikom',
  '4-klass/russkiy/sintaksis', '4-klass/russkiy/sklonenie-suschestvitelnykh', '4-klass/russkiy/stili-rechi',
  '4-klass/logika/logicheskie-tablitsy', '4-klass/logika/zadachi-na-perelivanie',
  '4-klass/literatura/analiz-teksta', '4-klass/literatura/klassika',
];

export interface TournamentTrack {
  id: string; // "1-klass/matematika"
  grade: string;
  gradeLabel: string;
  subject: string;
  subjectLabel: string;
  title: string; // "1 класс · Математика"
  topicCount: number;
}

function buildTrackMap(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const topic of ALL_TOPICS) {
    const [grade, subject] = topic.split('/');
    const trackId = `${grade}/${subject}`;
    if (!map.has(trackId)) map.set(trackId, []);
    map.get(trackId)!.push(topic);
  }
  return map;
}

const TRACK_MAP = buildTrackMap();

export function getTournamentTracks(): TournamentTrack[] {
  const tracks: TournamentTrack[] = [];
  for (const [trackId, topics] of TRACK_MAP) {
    const [grade, subject] = trackId.split('/');
    const gradeLabel = GRADE_LABELS[grade] ?? grade;
    const subjectLabel = SUBJECT_LABELS[subject] ?? subject;
    tracks.push({
      id: trackId,
      grade,
      gradeLabel,
      subject,
      subjectLabel,
      title: `${gradeLabel} · ${subjectLabel}`,
      topicCount: topics.length,
    });
  }
  return tracks.sort((a, b) => {
    const gi = GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade);
    return gi !== 0 ? gi : a.subjectLabel.localeCompare(b.subjectLabel, 'ru');
  });
}

export function getTournamentTrack(trackId: string): TournamentTrack | undefined {
  return getTournamentTracks().find((t) => t.id === trackId);
}

// Собирает пул вопросов трека — объединяет вопросы всех тем предмета внутри класса.
export function getTournamentQuestionPool(trackId: string): QuizQuestion[] {
  const topics = TRACK_MAP.get(trackId) ?? [];
  const pool: QuizQuestion[] = [];
  for (const topic of topics) {
    const source = getQuizSource(topic);
    if (source) pool.push(...source());
  }
  return pool;
}
