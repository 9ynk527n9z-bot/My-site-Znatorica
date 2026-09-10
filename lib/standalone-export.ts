import type { CrosswordResult } from '@/lib/crossword';
import type { WordSearchResult } from '@/lib/wordsearch';
import type { SortResult } from '@/lib/sort-groups';

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

// Автономный, полностью офлайн-совместимый HTML-файл с интерактивным кроссвордом:
// никаких внешних скриптов/шрифтов/сети, вся логика — на ванильном JS, данные
// (сетка, номера, слова) встроены прямо в разметку как JSON. Структурно повторяет
// components/CrosswordInteractiveGrid.tsx (тот же алгоритм автоперехода и проверки),
// но не может переиспользовать его код напрямую — React/JSX тут не выполнить.
export function buildStandaloneCrosswordHtml(result: CrosswordResult, title: string): string {
  const safeTitle = escapeHtml(title);
  const data = JSON.stringify({
    grid: result.grid,
    numbers: result.numbers,
    words: result.words,
    rows: result.rows,
    cols: result.cols,
  }).replace(/<\/script/gi, '<\\/script'); // на случай, если в подсказке (свои слова) есть "</script>"

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeTitle} — Знаторика</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Arial, sans-serif; margin: 0; padding: 24px; background: #f5f5f7; color: #111; }
  h1 { font-size: 22px; margin: 0 0 20px; }
  #grid { display: inline-grid; gap: 2px; background: #ccc; padding: 2px; border-radius: 4px; margin-bottom: 16px; }
  .cell { position: relative; width: 32px; height: 32px; background: #fff; }
  .cell.blocked { background: transparent; }
  .cell input {
    width: 100%; height: 100%; text-align: center; font-weight: bold; font-size: 14px;
    border: none; outline: none; background: transparent; text-transform: uppercase;
  }
  .cell .num { position: absolute; top: 0; left: 2px; font-size: 8px; color: #888; line-height: 1; }
  .cell.correct input { background: #c6f0c6; }
  .cell.incorrect input { background: #f7c6c6; }
  .controls { margin-bottom: 20px; }
  button { font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; margin-right: 8px; }
  #check { background: #ff7a00; color: #fff; }
  #clear { background: #e5e5ea; color: #111; }
  .clues { display: grid; gap: 24px; grid-template-columns: 1fr; max-width: 700px; }
  @media (min-width: 640px) { .clues { grid-template-columns: 1fr 1fr; } }
  .clues h4 { margin: 0 0 8px; }
  .clues ol { margin: 0; padding-left: 20px; font-size: 14px; }
  .clues li { margin-bottom: 4px; }
</style>
</head>
<body>
<h1>${safeTitle}</h1>
<div id="grid"></div>
<div class="controls">
  <button id="check">Проверить</button>
  <button id="clear">Очистить</button>
</div>
<div class="clues">
  <div>
    <h4>По горизонтали</h4>
    <ol id="across"></ol>
  </div>
  <div>
    <h4>По вертикали</h4>
    <ol id="down"></ol>
  </div>
</div>
<script>
const DATA = ${data};
const gridEl = document.getElementById('grid');
gridEl.style.gridTemplateColumns = 'repeat(' + DATA.cols + ', 32px)';

const answers = DATA.grid.map(function (row) { return row.map(function () { return ''; }); });
const cellEls = [];

for (let r = 0; r < DATA.rows; r++) {
  cellEls.push([]);
  for (let c = 0; c < DATA.cols; c++) {
    const letter = DATA.grid[r][c];
    const cell = document.createElement('div');
    if (letter === null) {
      cell.className = 'cell blocked';
      gridEl.appendChild(cell);
      cellEls[r].push(null);
      continue;
    }
    cell.className = 'cell';
    const num = DATA.numbers[r][c];
    if (num !== null) {
      const numEl = document.createElement('span');
      numEl.className = 'num';
      numEl.textContent = String(num);
      cell.appendChild(numEl);
    }
    const input = document.createElement('input');
    input.maxLength = 1;
    input.addEventListener('input', function () {
      const v = input.value.slice(-1).toUpperCase();
      input.value = v;
      answers[r][c] = v;
      cell.classList.remove('correct', 'incorrect');
      if (v) focusNext(r, c);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !answers[r][c]) focusPrev(r, c);
    });
    cell.appendChild(input);
    gridEl.appendChild(cell);
    cellEls[r].push(input);
  }
}

function isFillable(r, c) {
  return r >= 0 && r < DATA.rows && c >= 0 && c < DATA.cols && DATA.grid[r][c] !== null;
}
function focusNext(r, c) {
  if (isFillable(r, c + 1)) cellEls[r][c + 1].focus();
  else if (isFillable(r + 1, c)) cellEls[r + 1][c].focus();
}
function focusPrev(r, c) {
  if (isFillable(r, c - 1)) cellEls[r][c - 1].focus();
  else if (isFillable(r - 1, c)) cellEls[r - 1][c].focus();
}

document.getElementById('check').addEventListener('click', function () {
  for (let r = 0; r < DATA.rows; r++) {
    for (let c = 0; c < DATA.cols; c++) {
      if (DATA.grid[r][c] === null || !answers[r][c]) continue;
      const cell = cellEls[r][c].parentElement;
      cell.classList.toggle('correct', answers[r][c] === DATA.grid[r][c]);
      cell.classList.toggle('incorrect', answers[r][c] !== DATA.grid[r][c]);
    }
  }
});

document.getElementById('clear').addEventListener('click', function () {
  for (let r = 0; r < DATA.rows; r++) {
    for (let c = 0; c < DATA.cols; c++) {
      if (!cellEls[r][c]) continue;
      answers[r][c] = '';
      cellEls[r][c].value = '';
      cellEls[r][c].parentElement.classList.remove('correct', 'incorrect');
    }
  }
});

function renderClues(listId, direction) {
  const list = document.getElementById(listId);
  DATA.words
    .filter(function (w) { return w.direction === direction; })
    .sort(function (a, b) { return a.number - b.number; })
    .forEach(function (w) {
      const li = document.createElement('li');
      li.textContent = w.number + '. ' + w.clue;
      list.appendChild(li);
    });
}
renderClues('across', 'across');
renderClues('down', 'down');
</script>
</body>
</html>
`;
}

// Автономный HTML-файл с интерактивным филвордом: клик по первой букве слова,
// потом по последней — совпадение с DATA.words[].cells (в любом порядке) отмечает
// слово найденным. Структурно повторяет components/WordSearchInteractiveGrid.tsx.
export function buildStandaloneWordSearchHtml(result: WordSearchResult, title: string): string {
  const safeTitle = escapeHtml(title);
  const data = JSON.stringify({ grid: result.grid, words: result.words, size: result.size })
    .replace(/<\/script/gi, '<\\/script');

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeTitle} — Знаторика</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Arial, sans-serif; margin: 0; padding: 24px; background: #f5f5f7; color: #111; }
  h1 { font-size: 22px; margin: 0 0 8px; }
  p.hint { font-size: 14px; color: #555; margin: 0 0 16px; }
  #grid { border-collapse: collapse; margin-bottom: 16px; }
  #grid td { padding: 0; }
  #grid button {
    width: 32px; height: 32px; font-family: monospace; font-weight: bold; font-size: 14px;
    border: 1px solid #ccc; background: #fff; cursor: pointer; color: #111;
  }
  #grid button.selected { background: #ff7a00; color: #fff; border-color: #ff7a00; }
  #grid button.found { background: #c6f0c6; border-color: #7bcf7b; }
  #grid button.flash { background: #f7c6c6; border-color: #e08a8a; }
  #reset { font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; background: #e5e5ea; color: #111; margin-bottom: 20px; }
  .words { display: grid; gap: 6px; grid-template-columns: 1fr; max-width: 700px; font-size: 14px; }
  @media (min-width: 640px) { .words { grid-template-columns: 1fr 1fr; } }
  .words .found-word { color: #999; text-decoration: line-through; }
</style>
</head>
<body>
<h1>${safeTitle}</h1>
<p class="hint" id="hint"></p>
<table id="grid"></table>
<button id="reset">🗑️ Начать заново</button>
<div class="words" id="words"></div>
<script>
const DATA = ${data};
const gridEl = document.getElementById('grid');
const hintEl = document.getElementById('hint');
const wordsEl = document.getElementById('words');
const found = new Set();
let selStart = null;
const cellButtons = [];

function cellsEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every(function (cell, i) { return cell[0] === b[i][0] && cell[1] === b[i][1]; });
}
function buildLine(start, end) {
  const dr = end[0] - start[0];
  const dc = end[1] - start[1];
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  if (steps === 0) return [start];
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const stepR = Math.sign(dr);
  const stepC = Math.sign(dc);
  const cells = [];
  for (let i = 0; i <= steps; i++) cells.push([start[0] + stepR * i, start[1] + stepC * i]);
  return cells;
}

function renderHint() {
  hintEl.textContent = 'Кликни по первой букве слова, потом по последней. Найдено ' + found.size + ' из ' + DATA.words.length + '.';
}

for (let r = 0; r < DATA.grid.length; r++) {
  cellButtons.push([]);
  const tr = document.createElement('tr');
  for (let c = 0; c < DATA.grid[r].length; c++) {
    const td = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = DATA.grid[r][c];
    btn.addEventListener('click', function () { handleClick(r, c); });
    td.appendChild(btn);
    tr.appendChild(td);
    cellButtons[r].push(btn);
  }
  gridEl.appendChild(tr);
}

function handleClick(r, c) {
  if (!selStart) {
    selStart = [r, c];
    cellButtons[r][c].classList.add('selected');
    return;
  }
  const line = buildLine(selStart, [r, c]);
  cellButtons[selStart[0]][selStart[1]].classList.remove('selected');
  selStart = null;
  if (!line) return;

  const match = DATA.words.find(function (w) {
    return !found.has(w.word) && (cellsEqual(line, w.cells) || cellsEqual(line, w.cells.slice().reverse()));
  });
  if (match) {
    found.add(match.word);
    match.cells.forEach(function (cell) { cellButtons[cell[0]][cell[1]].classList.add('found'); });
    renderHint();
    renderWords();
  } else {
    line.forEach(function (cell) { cellButtons[cell[0]][cell[1]].classList.add('flash'); });
    setTimeout(function () {
      line.forEach(function (cell) { cellButtons[cell[0]][cell[1]].classList.remove('flash'); });
    }, 400);
  }
}

document.getElementById('reset').addEventListener('click', function () {
  found.clear();
  if (selStart) cellButtons[selStart[0]][selStart[1]].classList.remove('selected');
  selStart = null;
  cellButtons.forEach(function (row) { row.forEach(function (btn) { btn.classList.remove('found', 'selected', 'flash'); }); });
  renderHint();
  renderWords();
});

function renderWords() {
  wordsEl.innerHTML = '';
  DATA.words.forEach(function (w) {
    const div = document.createElement('div');
    if (found.has(w.word)) {
      div.className = 'found-word';
      div.textContent = w.word + ' — ' + w.clue;
    } else {
      div.textContent = '• — ' + w.clue;
    }
    wordsEl.appendChild(div);
  });
}

renderHint();
renderWords();
</script>
</body>
</html>
`;
}

// Автономный HTML-файл с сортировкой по двум столбикам: клик по карточке в общем
// списке, потом по столбику — переносит её туда; клик по карточке в столбике
// возвращает её обратно. «Проверить» доступна только когда все карточки разложены.
// Структурно повторяет components/SortGroupsInteractive.tsx.
export function buildStandaloneSortGroupsHtml(result: SortResult, title: string): string {
  const safeTitle = escapeHtml(title);
  const data = JSON.stringify({ labelA: result.labelA, labelB: result.labelB, items: result.items })
    .replace(/<\/script/gi, '<\\/script');

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeTitle} — Знаторика</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Arial, sans-serif; margin: 0; padding: 24px; background: #f5f5f7; color: #111; }
  h1 { font-size: 22px; margin: 0 0 8px; }
  p.hint { font-size: 14px; color: #555; margin: 0 0 16px; max-width: 60ch; }
  #pool { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; padding: 12px; border-radius: 10px; background: #ececef; min-height: 20px; }
  .chip { padding: 7px 12px; border-radius: 8px; border: 1px solid #ccc; background: #fff; font-weight: bold; font-size: 13px; cursor: pointer; color: #111; }
  .chip.selected { background: #ff7a00; border-color: #ff7a00; color: #fff; }
  .chip.correct { background: #c6f0c6; border-color: #7bcf7b; }
  .chip.incorrect { background: #f7c6c6; border-color: #e08a8a; }
  .columns { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 20px; }
  @media (min-width: 560px) { .columns { grid-template-columns: 1fr 1fr; } }
  .column { text-align: left; padding: 16px; border-radius: 10px; border: 2px dashed #ccc; background: #fff; min-height: 90px; cursor: pointer; }
  .column.a { border-color: #b9a6f0; }
  .column.b { border-color: #ffb877; }
  .column h4 { margin: 0 0 10px; font-size: 15px; }
  .column.a h4 { color: #6a4fc7; }
  .column.b h4 { color: #ff7a00; }
  .column .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .controls { display: flex; gap: 10px; }
  button.action { font-size: 14px; font-weight: bold; padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer; }
  #check { background: #ff7a00; color: #fff; }
  #check:disabled { opacity: 0.5; cursor: default; }
  #reset { background: #e5e5ea; color: #111; }
</style>
</head>
<body>
<h1>${safeTitle}</h1>
<p class="hint">Кликни по карточке в общем списке, потом по нужному столбику. Чтобы вернуть карточку назад — кликни по ней в столбике.</p>
<div id="pool"></div>
<div class="columns">
  <div class="column a" id="colA"><h4 id="labelA"></h4><div class="chips" id="chipsA"></div></div>
  <div class="column b" id="colB"><h4 id="labelB"></h4><div class="chips" id="chipsB"></div></div>
</div>
<div class="controls">
  <button class="action" id="check">Проверить</button>
  <button class="action" id="reset">🗑️ Начать заново</button>
</div>
<script>
const DATA = ${data};
const placement = {};
DATA.items.forEach(function (i) { placement[i.text] = null; });
let selected = null;
let checked = false;

document.getElementById('labelA').textContent = DATA.labelA;
document.getElementById('labelB').textContent = DATA.labelB;

function render() {
  const poolEl = document.getElementById('pool');
  const chipsAEl = document.getElementById('chipsA');
  const chipsBEl = document.getElementById('chipsB');
  poolEl.innerHTML = '';
  chipsAEl.innerHTML = '';
  chipsBEl.innerHTML = '';

  DATA.items.forEach(function (item) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = item.text;
    const group = placement[item.text];

    if (group === null) {
      if (selected === item.text) chip.classList.add('selected');
      chip.addEventListener('click', function () {
        selected = selected === item.text ? null : item.text;
        checked = false;
        render();
      });
      poolEl.appendChild(chip);
    } else {
      if (checked) chip.classList.add(item.group === group ? 'correct' : 'incorrect');
      chip.addEventListener('click', function () {
        placement[item.text] = null;
        checked = false;
        render();
      });
      (group === 'a' ? chipsAEl : chipsBEl).appendChild(chip);
    }
  });

  const allPlaced = DATA.items.every(function (i) { return placement[i.text] !== null; });
  document.getElementById('check').disabled = !allPlaced;
}

function placeInto(group) {
  if (!selected) return;
  placement[selected] = group;
  selected = null;
  checked = false;
  render();
}
document.getElementById('colA').addEventListener('click', function (e) {
  if (e.target.closest('.chip')) return;
  placeInto('a');
});
document.getElementById('colB').addEventListener('click', function (e) {
  if (e.target.closest('.chip')) return;
  placeInto('b');
});
document.getElementById('check').addEventListener('click', function () {
  checked = true;
  render();
});
document.getElementById('reset').addEventListener('click', function () {
  DATA.items.forEach(function (i) { placement[i.text] = null; });
  selected = null;
  checked = false;
  render();
});

render();
</script>
</body>
</html>
`;
}
