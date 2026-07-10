import type { QuestionSource, QuizQuestion } from './types';
import {
  genCounting,
  genAddition,
  genSubtraction,
  genNumberBonds,
  genComparison,
  genMultiplication,
  genDivision,
  genTwoDigit,
} from './math-generators';
import * as B45 from './banks-4-5';
import * as B67 from './banks-6-7';
import * as B1 from './banks-1-klass';
import * as B2 from './banks-2-klass';

function fromBank(bank: QuizQuestion[]): QuestionSource {
  return () => bank;
}

// slug темы (без сегмента) -> источник вопросов для викторины.
// Математика — генераторы (бесконечно свежие вопросы), остальное — банки вручную написанных вопросов.
const REGISTRY: Record<string, QuestionSource> = {
  // 4-5 лет
  '4-5-let/gramota/bukvy': fromBank(B45.BUKVY_4_5),
  '4-5-let/gramota/slogov': fromBank(B45.SLOGI_4_5),
  '4-5-let/razvitie/slova': fromBank(B45.SLOVA_4_5),
  '4-5-let/razvitie/zvuki': fromBank(B45.ZVUKI_4_5),
  '4-5-let/logika/naydi-lishnee': fromBank(B45.NAYDI_LISHNEE_4_5),
  '4-5-let/logika/sravnenie-predmetov': fromBank(B45.SRAVNENIE_PREDMETOV_4_5),
  '4-5-let/logika/zagadki': fromBank(B45.ZAGADKI_4_5),
  '4-5-let/matematika/figury': fromBank(B45.FIGURY_4_5),
  '4-5-let/matematika/tsveta': fromBank(B45.TSVETA_4_5),
  '4-5-let/matematika/schet-do-5': () => genCounting(5),
  '4-5-let/matematika/schet-do-10': () => genCounting(10),
  '4-5-let/okruzhayushchiy/domashnie-i-dikie-zhivotnye': fromBank(B45.ZHIVOTNYE_4_5),
  '4-5-let/okruzhayushchiy/vremena-goda': fromBank(B45.VREMENA_GODA_4_5),
  '4-5-let/razvitie/pereskaz-po-kartinkam': fromBank(B45.PERESKAZ_4_5),

  // 6-7 лет
  '6-7-let/gramota/chtenie': fromBank(B67.CHTENIE_6_7),
  '6-7-let/gramota/pisanie': fromBank(B67.PISANIE_6_7),
  '6-7-let/logika/zagadki': fromBank(B67.ZAGADKI_6_7),
  '6-7-let/logika/zakonomernosti': fromBank(B67.ZAKONOMERNOSTI_6_7),
  '6-7-let/matematika/schet-do-20': () => genCounting(20),
  '6-7-let/matematika/slozhenie': () => genAddition(1, 20),
  '6-7-let/matematika/vychitanie': () => genSubtraction(1, 20),
  '6-7-let/matematika/sostav-chisla': () => genNumberBonds(10),
  '6-7-let/matematika/vremya': fromBank(B67.VREMYA_6_7),
  '6-7-let/okruzhayushchiy/prirodnye-yavleniya': fromBank(B67.PRIRODNYE_YAVLENIYA_6_7),
  '6-7-let/okruzhayushchiy/telo-cheloveka': fromBank(B67.TELO_CHELOVEKA_6_7),
  '6-7-let/razvitie/dialogi': fromBank(B67.DIALOGI_6_7),
  '6-7-let/razvitie/rasskazy': fromBank(B67.RASSKAZY_6_7),
  '6-7-let/razvitie/pereskaz-po-kartinkam': fromBank(B67.PERESKAZ_6_7),

  // 1 класс
  '1-klass/chtenie/proza': fromBank(B1.PROZA_1),
  '1-klass/chtenie/stihi': fromBank(B1.STIHI_1),
  '1-klass/logika/analogii': fromBank(B1.ANALOGII_1),
  '1-klass/logika/orientaciya-v-prostranstve': fromBank(B1.ORIENTACIYA_1),
  '1-klass/logika/zagadki': fromBank(B1.ZAGADKI_1),
  '1-klass/matematika/slozhenie-5-10': () => genAddition(5, 10),
  '1-klass/matematika/vychitanie-5-10': () => genSubtraction(5, 10),
  '1-klass/matematika/sostav-chisla': fromBank(B1.SOSTAV_CHISLA_1),
  '1-klass/matematika/zadachi': fromBank(B1.ZADACHI_1),
  '1-klass/okruzhayushchiy/pravila-bezopasnosti': fromBank(B1.PRAVILA_BEZOPASNOSTI_1),
  '1-klass/okruzhayushchiy/zhivaya-i-nezhivaya-priroda': fromBank(B1.ZHIVAYA_NEZHIVAYA_PRIRODA_1),
  '1-klass/russkiy/glasnye-i-soglasnye': fromBank(B1.GLASNYE_SOGLASNYE_1),
  '1-klass/russkiy/punktuaciya': fromBank(B1.PUNKTUACIYA_1),
  '1-klass/russkiy/udarenie': fromBank(B1.UDARENIE_1),

  // 2 класс
  '2-klass/logika/logicheskie-zadachi': fromBank(B2.LOGICHESKIE_ZADACHI_2),
  '2-klass/logika/rebusy': fromBank(B2.REBUSY_2),
  '2-klass/logika/zagadki': fromBank(B2.ZAGADKI_2),
  '2-klass/matematika/delenie': () => genDivision(),
  '2-klass/matematika/dvuznachnye': () => genTwoDigit(),
  '2-klass/matematika/sravnenie-chisel': () => genComparison(99),
  '2-klass/matematika/umnozhenie': () => genMultiplication(),
  '2-klass/okruzhayushchiy/chelovek': fromBank(B2.CHELOVEK_2),
  '2-klass/okruzhayushchiy/priroda': fromBank(B2.PRIRODA_2),
  '2-klass/russkiy/bezudarnye-glasnye': fromBank(B2.BEZUDARNYE_GLASNYE_2),
  '2-klass/russkiy/chasti-rechi': fromBank(B2.CHASTI_RECHI_2),
  '2-klass/russkiy/koren-slova': fromBank(B2.KOREN_SLOVA_2),
  '2-klass/russkiy/predlozhenie': fromBank(B2.PREDLOZHENIE_2),
};

export function getQuizSource(topic: string): QuestionSource | null {
  return REGISTRY[topic] ?? null;
}
