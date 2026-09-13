#!/usr/bin/env python3
"""Rebuild the "Прописи" pages inside private-content/products/podgotovka-k-1-klassu.pdf.

Why: the original letters section only covered А–Ц (24 of 33 letters — Ч,Ш,Щ,Ъ,Ы,Ь,Э,Ю,Я
were missing entirely) and the digits section stopped at 9, but 1st-graders practise
numbers up to 20. This script regenerates both sections with full coverage, in the same
visual style as the original (Arial, orange rule, gray trace + blank writing line), plus
a lilac card frame around each propisi page (matching the site's on-screen propisi look),
splices them into the existing PDF in place of the old pages, and renumbers every footer.

Run: python3 scripts/build-podgotovka-1klass-propisi.py
"""
import fitz  # PyMuPDF
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import io

SRC = 'private-content/products/podgotovka-k-1-klassu.pdf'
# Обложка берётся из картинки, а не из первой страницы исходника: у старой версии
# обложка была другая, розово-фиолетовая, без названия крупным планом.
COVER_IMAGE = 'output/covers/podgotovka-k-1-klassu-cover-cropped.png'

# Base14 Helvetica has no Cyrillic glyphs — register the system Arial (same family the
# original PDF already used) so buttons/буквы actually render instead of blank boxes.
ARIAL_TTF = '/System/Library/Fonts/Supplemental/Arial.ttf'
ARIAL_BOLD_TTF = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
pdfmetrics.registerFont(TTFont('Arial', ARIAL_TTF))
pdfmetrics.registerFont(TTFont('Arial-Bold', ARIAL_BOLD_TTF))

# Письменный (курсивный) шрифт — тот же, что и на сайте для "Письменные" буквы
# (components/generators/PropisiLettersGenerator.tsx, Russkopis-Normalny). Это CFF/PostScript
# OpenType — reportlab не умеет такие грузить ("postscript outlines are not supported"),
# поэтому страницы с курсивом рисуются напрямую через PyMuPDF (build_letters_pdf_fitz),
# которому формат шрифта безразличен. Нет отдельного жирного начертания — модель и
# обводка используют один и тот же файл, разница только в цвете.
CURSIVE_TTF = 'public/fonts/russkopis/Russkopis-Normalny.otf'

PAGE_W, PAGE_H = A4  # 595.2755905511812 x 841.8897637795277

ORANGE = (0.9764710068702698, 0.450980007648468, 0.08627499639987946)
NAVY = (0x1a / 255, 0x1a / 255, 0x2e / 255)
GRAY = (0x88 / 255, 0x88 / 255, 0x88 / 255)
LILAC = (0xA7 / 255, 0x8B / 255, 0xFA / 255)

LEFT_X = 51.02362060546875
RIGHT_X = 544.2520141601562
TRACE_X = 96.02362060546875
LINE_X0 = 201.0236053466797
ROW_TOP0 = 86  # topdown y of first row's text top
ROW_BOTTOM_MAX = 766  # last row must end above this so the frame+footer stay clear
FONT_ROW_RATIO = 26 / 30  # original density: 26pt font in a 30pt row


def row_metrics(n):
    """Space n rows evenly from ROW_TOP0 down to ROW_BOTTOM_MAX, so every page —
    whether it holds 8 items or 20 — fills the whole sheet instead of only the top third."""
    row_h = (ROW_BOTTOM_MAX - ROW_TOP0) / (max(n - 1, 0) + FONT_ROW_RATIO)
    row_h = max(30, min(70, row_h))
    return row_h, row_h * FONT_ROW_RATIO

# Порядок как на сайте (components/generators/PropisiLettersGenerator.tsx): стандартный
# русский алфавит А-Я с Ё после Е, все 33 буквы (в исходном PDF были только первые 24 — до Ц).
ALPHABET = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У',
            'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я']
NUMBERS = [str(n) for n in range(21)]  # 0..20


def y_bu(y_topdown):
    """topdown y -> reportlab bottom-up y"""
    return PAGE_H - y_topdown


def chunk_balanced(items, max_per_page):
    import math
    n_pages = max(1, math.ceil(len(items) / max_per_page))
    base, extra = divmod(len(items), n_pages)
    chunks, i = [], 0
    for p in range(n_pages):
        size = base + (1 if p < extra else 0)
        chunks.append(items[i:i + size])
        i += size
    return chunks


# Единая рамка на ВСЕХ страницах (кроме обложки — у неё свой полноэкранный дизайн),
# а не только на прописях: одинаковый прямоугольник, чтобы весь сборник смотрелся
# как одна серия, а не вперемешку.
FRAME_RECT = fitz.Rect(28, 20, PAGE_W - 28, 785)


def add_frame_fitz(page):
    """Same frame, drawn directly on an existing/kept PyMuPDF page."""
    shape = page.new_shape()
    short_side = min(FRAME_RECT.width, FRAME_RECT.height)
    shape.draw_rect(FRAME_RECT, radius=10 / short_side)
    shape.finish(color=LILAC, width=2.4)
    shape.commit()


def draw_section_page(c, title, subtitle, items, model_font='Arial-Bold', trace_font='Arial', font_scale=1.0):
    row_h, font_size = row_metrics(len(items))
    font_size *= font_scale  # курсив тоньше печатного — крупнее размер для той же читаемости
    # Рамка добавляется один раз глобально в main() (add_frame_fitz), после сборки всех страниц.

    c.setFont('Arial-Bold', 20)
    c.setFillColorRGB(*ORANGE)
    c.drawString(LEFT_X, y_bu(56) + 4, title)

    c.setFont('Arial', 11)
    c.setFillColorRGB(*GRAY)
    c.drawString(LEFT_X, y_bu(71) + 2, subtitle)

    c.setStrokeColorRGB(*ORANGE)
    c.setLineWidth(1.2)
    c.line(LEFT_X, y_bu(77), RIGHT_X, y_bu(77))

    for i, item in enumerate(items):
        row_top = ROW_TOP0 + row_h * i
        baseline = y_bu(row_top + font_size) + font_size * 0.23  # ~descent adjustment

        c.setFont(model_font, font_size)
        c.setFillColorRGB(*NAVY)
        c.drawString(LEFT_X, baseline, item)

        c.setFont(trace_font, font_size)
        c.setFillColorRGB(*GRAY)
        c.drawString(TRACE_X, baseline, f'{item} {item} {item}')

        line_y = y_bu(row_top + font_size * 0.47)
        c.setStrokeColorRGB(*GRAY)
        c.setLineWidth(1.2)
        c.setDash(2, 2)
        c.line(LINE_X0, line_y, RIGHT_X, line_y)
        c.setDash()

    c.showPage()


def build_section_pdf(title, subtitle, all_items, per_page, model_font='Arial-Bold', trace_font='Arial', font_scale=1.0):
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    for chunk in chunk_balanced(all_items, per_page):
        draw_section_page(c, title, subtitle, chunk, model_font, trace_font, font_scale)
    c.save()
    buf.seek(0)
    return fitz.open('pdf', buf.read())


def build_letters_pdf_fitz(title, subtitle, all_items, per_page, font_scale=1.15):
    """Same layout as build_section_pdf, drawn directly with PyMuPDF so the CFF
    cursive font (unsupported by reportlab) can be used for письменные буквы."""
    cursive_font = fitz.Font(fontfile=CURSIVE_TTF)
    doc = fitz.open()
    for chunk in chunk_balanced(all_items, per_page):
        n = len(chunk)
        row_h, font_size = row_metrics(n)
        font_size *= font_scale
        page = doc.new_page(width=PAGE_W, height=PAGE_H)


        page.insert_text((LEFT_X, 52), title, fontname='Arial-Bold', fontfile=ARIAL_BOLD_TTF, fontsize=20, color=ORANGE)
        page.insert_text((LEFT_X, 69), subtitle, fontname='Arial', fontfile=ARIAL_TTF, fontsize=11, color=GRAY)
        rule = page.new_shape()
        rule.draw_line((LEFT_X, 77), (RIGHT_X, 77))
        rule.finish(color=ORANGE, width=1.2)
        rule.commit()

        for i, item in enumerate(chunk):
            row_top = ROW_TOP0 + row_h * i
            baseline_y = row_top + font_size * 0.83
            page.insert_text((LEFT_X, baseline_y), item, fontname='Cursive', fontfile=CURSIVE_TTF, fontsize=font_size, color=NAVY)

            # Курсивные буквы сильно различаются по ширине (Ш/Щ/Ю против А/О) — фиксированный
            # TRACE_X/"item item item" накладывался на широких буквах (даже модель залезала в
            # первую обводку). Меряем реальную ширину и расставляем всё с равным зазором.
            glyph_w = cursive_font.text_length(item, fontsize=font_size)
            gap = font_size * 0.22
            x = max(TRACE_X, LEFT_X + glyph_w + gap)
            for _ in range(3):
                page.insert_text((x, baseline_y), item, fontname='Cursive', fontfile=CURSIVE_TTF, fontsize=font_size, color=GRAY)
                x += glyph_w + gap
            line_x0 = min(max(x + font_size * 0.15, LINE_X0), RIGHT_X - 20)

            line_y = row_top + font_size * 0.47
            line = page.new_shape()
            line.draw_line((line_x0, line_y), (RIGHT_X, line_y))
            line.finish(color=GRAY, width=1.2, dashes='[2 2] 0')
            line.commit()

    return doc


# Новые самодельные страницы (домики/сравнение/диктант) используют более широкие поля,
# чем плотные исходные листы (просьба "поля расширь чтобы было красиво").
WIDE_LEFT, WIDE_RIGHT = 65, PAGE_W - 65


def draw_header(page, title, subtitle):
    page.insert_text((WIDE_LEFT, 52), title, fontname='Arial-Bold', fontfile=ARIAL_BOLD_TTF, fontsize=20, color=ORANGE)
    page.insert_text((WIDE_LEFT, 69), subtitle, fontname='Arial', fontfile=ARIAL_TTF, fontsize=11, color=GRAY)
    rule = page.new_shape()
    rule.draw_line((WIDE_LEFT, 77), (WIDE_RIGHT, 77))
    rule.finish(color=ORANGE, width=1.2)
    rule.commit()


def build_domiki_pdf(pairs, title, subtitle):
    """"Домики" (числовые домики): та же геометрия, что и в оригинале (треугольная
    оранжевая крыша с суммой, два подписанных квадрата под ней), но с новыми числами —
    везде показана левая часть, правую ребёнок дописывает сам."""
    doc = fitz.open()
    page = doc.new_page(width=PAGE_W, height=PAGE_H)
    draw_header(page, title, subtitle)

    cols, rows = 3, 5
    col_w = (WIDE_RIGHT - WIDE_LEFT) / cols
    row_h = 130
    house_w, house_h, roof_h = 70, 34, 30
    top0 = 110

    for i, (total, part) in enumerate(pairs):
        col, row = i % cols, i // cols
        cx = WIDE_LEFT + col_w * col + col_w / 2
        top = top0 + row_h * row

        shape = page.new_shape()
        shape.draw_polyline([
            (cx - house_w / 2, top + roof_h), (cx, top), (cx + house_w / 2, top + roof_h), (cx - house_w / 2, top + roof_h),
        ])
        shape.finish(color=ORANGE, fill=ORANGE, closePath=True)
        shape.commit()
        page.insert_text((cx - 5, top + roof_h - 8), str(total), fontname='Arial-Bold', fontfile=ARIAL_BOLD_TTF, fontsize=16, color=(1, 1, 1))

        box_y0, box_y1 = top + roof_h, top + roof_h + house_h
        left_box = fitz.Rect(cx - house_w / 2, box_y0, cx - 2, box_y1)
        right_box = fitz.Rect(cx + 2, box_y0, cx + house_w / 2, box_y1)
        shape = page.new_shape()
        shape.draw_rect(left_box)
        shape.draw_rect(right_box)
        shape.finish(color=NAVY, width=1.2)
        shape.commit()
        page.insert_text((left_box.x0 + house_w / 4 - 5, box_y1 - 10), str(part), fontname='Arial-Bold', fontfile=ARIAL_BOLD_TTF, fontsize=15, color=NAVY)

    return doc


def build_odd_word_pdf(rows, title, subtitle):
    """«Найди лишнее слово» — оба исходных листа (7+5 строк) на одной странице,
    чуть компактнее (та же чересполосица кремовый/лавандовый, что и в оригинале)."""
    doc = fitz.open()
    page = doc.new_page(width=PAGE_W, height=PAGE_H)
    draw_header(page, title, subtitle)

    row_h = 42
    top0 = 100
    col_w = (WIDE_RIGHT - WIDE_LEFT - 40) / 4
    cream = (1, 0.957, 0.925)
    lavender = (0.953, 0.933, 0.988)

    for i, words in enumerate(rows):
        top = top0 + row_h * i
        band = fitz.Rect(WIDE_LEFT, top, WIDE_RIGHT, top + row_h)
        shape = page.new_shape()
        shape.draw_rect(band)
        shape.finish(color=None, fill=cream if i % 2 == 0 else lavender)
        shape.commit()

        page.insert_text((WIDE_LEFT + 6, top + row_h / 2 + 4), f'{i + 1}.', fontname='Arial', fontfile=ARIAL_TTF, fontsize=11, color=GRAY)
        for k, word in enumerate(words):
            page.insert_text((WIDE_LEFT + 40 + col_w * k, top + row_h / 2 + 4), word, fontname='Arial', fontfile=ARIAL_TTF, fontsize=13.5, color=NAVY)

    return doc


def build_dictant_pdf(dictations, title, subtitle):
    """Графический диктант — 3 компактных диктанта на одной странице вместо одного
    на весь лист: свой список команд и своя сетка у каждого."""
    doc = fitz.open()
    page = doc.new_page(width=PAGE_W, height=PAGE_H)
    draw_header(page, title, subtitle)

    block_h = 220
    grid_size, cell = 8, 22
    top0 = 100

    for i, (label, steps, start) in enumerate(dictations):
        top = top0 + block_h * i
        page.insert_text((WIDE_LEFT, top), label, fontname='Arial-Bold', fontfile=ARIAL_BOLD_TTF, fontsize=13, color=ORANGE)

        instr = '   '.join(f'{n}. {s}' for n, s in enumerate(steps, 1))
        page.insert_textbox(fitz.Rect(WIDE_LEFT, top + 8, WIDE_RIGHT, top + 45), instr,
                             fontname='Arial', fontfile=ARIAL_TTF, fontsize=10, color=NAVY)

        grid_x0, grid_y0 = WIDE_LEFT, top + 50
        shape = page.new_shape()
        for gx in range(grid_size + 1):
            shape.draw_line((grid_x0 + gx * cell, grid_y0), (grid_x0 + gx * cell, grid_y0 + grid_size * cell))
        for gy in range(grid_size + 1):
            shape.draw_line((grid_x0, grid_y0 + gy * cell), (grid_x0 + grid_size * cell, grid_y0 + gy * cell))
        shape.finish(color=(0.85, 0.85, 0.85), width=0.8)
        shape.commit()

        dot = fitz.Point(grid_x0 + start[0] * cell, grid_y0 + start[1] * cell)
        shape = page.new_shape()
        shape.draw_circle(dot, 4)
        shape.finish(color=None, fill=ORANGE)
        shape.commit()

    return doc


def build_filword_combo_pdf(orig, page_indices):
    """Склеивает уже готовые страницы филвордов (заголовок+сетка+список слов) —
    берём их как картинку 1:1 из исходного PDF и просто уменьшаем, чтобы не
    пересобирать сетку слов заново."""
    doc = fitz.open()
    page = doc.new_page(width=PAGE_W, height=PAGE_H)
    draw_header(page, 'Филворды', 'Найди спрятанные слова в каждой сетке букв')

    crop = fitz.Rect(20, 30, PAGE_W - 20, 528)
    block_h = (FRAME_RECT.y1 - 95) / len(page_indices)
    scale = min((WIDE_RIGHT - WIDE_LEFT) / crop.width, (block_h - 10) / crop.height)
    block_w = crop.width * scale
    left = WIDE_LEFT + ((WIDE_RIGHT - WIDE_LEFT) - block_w) / 2  # центрируем — по высоте она у нас узкая
    for i, idx in enumerate(page_indices):
        top = 95 + block_h * i
        target = fitz.Rect(left, top, left + block_w, top + crop.height * scale)
        page.show_pdf_page(target, orig, idx, clip=crop)

    return doc




def jpeg_bytes(image_path, max_width=1240, quality=85):
    """Полностраничная картинка в JPEG: исходные PNG обложки и диплома весят по 3 МБ."""
    from PIL import Image as PILImage

    image = PILImage.open(image_path).convert('RGB')
    if image.width > max_width:
        image = image.resize((max_width, round(image.height * max_width / image.width)),
                             PILImage.LANCZOS)
    buffer = io.BytesIO()
    image.save(buffer, format='JPEG', quality=quality, optimize=True, progressive=True)
    return buffer.getvalue()


def full_page_image_pdf(image_source):
    """Лист A4 целиком занятый картинкой, положенной как JPEG.

    Через PyMuPDF не получается: insert_image перекодирует поток обратно в PNG,
    и одна обложка весит 2,7 МБ. Reportlab кладёт JPEG как есть.
    """
    from reportlab.lib.utils import ImageReader

    stream = io.BytesIO()
    c = canvas.Canvas(stream, pagesize=A4)
    c.drawImage(ImageReader(io.BytesIO(jpeg_bytes(image_source))), 0, 0, width=PAGE_W, height=PAGE_H)
    c.showPage()
    c.save()
    stream.seek(0)
    return fitz.open('pdf', stream.read())


def build_contents_pdf(doc):
    """Страница «Содержание» по уже собранному сборнику.

    Заголовки берутся из самих страниц, а не из списка в коде: так содержание не
    разъедется, если состав сборника поменяется. Номера считаются с поправкой на то,
    что сама эта страница встанет второй и сдвинет всё дальше на одну.
    """
    sections = []
    for index in range(1, len(doc)):
        lines = [line.strip() for line in doc[index].get_text().split('\n') if line.strip()]
        title = lines[0] if lines else ''
        if not title or (sections and sections[-1][0] == title):
            continue
        sections.append((title, index + 2))  # +1 за нумерацию с единицы, +1 за содержание

    stream = io.BytesIO()
    c = canvas.Canvas(stream, pagesize=A4)

    c.setFont('Arial-Bold', 24)
    c.setFillColorRGB(*ORANGE)
    c.drawCentredString(PAGE_W / 2, y_bu(96), 'Содержание')

    c.setFont('Arial', 11)
    c.setFillColorRGB(*GRAY)
    c.drawCentredString(PAGE_W / 2, y_bu(116), f'{len(sections)} разделов с заданиями')

    row_h = min(34, (720 - 150) / max(len(sections), 1))
    for i, (title, page_no) in enumerate(sections):
        top = 160 + row_h * i
        c.setStrokeColorRGB(0.88, 0.88, 0.92)
        c.setLineWidth(1)
        c.roundRect(LEFT_X, y_bu(top + row_h - 8), RIGHT_X - LEFT_X, row_h - 10, 7, stroke=1, fill=0)

        c.setFillColorRGB(*ORANGE)
        c.circle(LEFT_X + 18, y_bu(top + row_h / 2 - 4), 9, stroke=0, fill=1)
        c.setFont('Arial-Bold', 9)
        c.setFillColorRGB(1, 1, 1)
        c.drawCentredString(LEFT_X + 18, y_bu(top + row_h / 2 - 1), str(i + 1))

        c.setFont('Arial-Bold', 12)
        c.setFillColorRGB(*NAVY)
        c.drawString(LEFT_X + 36, y_bu(top + row_h / 2 - 1), title)

        c.setFont('Arial', 10)
        c.setFillColorRGB(*GRAY)
        c.drawRightString(RIGHT_X - 12, y_bu(top + row_h / 2 - 1), f'стр. {page_no}')

    c.showPage()
    c.save()
    stream.seek(0)
    return fitz.open('pdf', stream.read())


def restamp_footers(doc):
    total = len(doc)
    footer_font = fitz.Font(fontfile=ARIAL_TTF)
    footer_band = fitz.Rect(0, 798, PAGE_W, PAGE_H)
    for i, page in enumerate(doc):
        # Обложка и диплом — цельные картинки, своего колонтитула у них нет. Их нельзя
        # чистить редактированием: оно перерисовывает страницу и раздувает JPEG обратно
        # в PNG, из-за чего файл вырастал вчетверо.
        if i == 0 or i == total - 1:
            continue
        # Реально вырезать старый футер через redaction (не просто закрасить поверх) —
        # иначе старый текст "N / 34" остаётся в контенте страницы под новым.
        page.add_redact_annot(footer_band, fill=(1, 1, 1))
        page.apply_redactions()
        text = f'Знаторика · znatorica.ru · {i + 1} / {total}'
        width = footer_font.text_length(text, fontsize=8)
        x = (PAGE_W - width) / 2
        page.insert_text((x, 812), text, fontname='Arial', fontfile=ARIAL_TTF, fontsize=8, color=GRAY)


# Новые числа для второго листа "домиков" — своя подборка, отличная от исходной.
DOMIKI_PAIRS_2 = [(8, 3), (9, 5), (6, 4), (10, 2), (7, 2), (9, 6), (10, 3), (8, 5), (6, 5),
                  (10, 8), (9, 4), (7, 6), (8, 2), (10, 9), (9, 2)]

# Новые пары для второго листа "сравнения чисел" — свои числа, отличные от исходных.
# Оба исходных листа "Найди лишнее слово" (7 строк + 5 строк), объединённые в один.
ODD_WORD_ROWS = [
    ['Яблоко', 'Груша', 'Банан', 'Огурец'],
    ['Кошка', 'Собака', 'Волк', 'Корова'],
    ['Стол', 'Стул', 'Шкаф', 'Яблоко'],
    ['Роза', 'Тюльпан', 'Ромашка', 'Берёза'],
    ['Зима', 'Весна', 'Понедельник', 'Лето'],
    ['Карандаш', 'Ручка', 'Фломастер', 'Ложка'],
    ['Курица', 'Утка', 'Гусь', 'Лиса'],
    ['Молоко', 'Сыр', 'Хлеб', 'Творог'],
    ['Автобус', 'Трамвай', 'Поезд', 'Диван'],
    ['Врач', 'Учитель', 'Повар', 'Дождь'],
    ['Круг', 'Квадрат', 'Треугольник', 'Река'],
    ['Январь', 'Март', 'Среда', 'Август'],
]

DICTATIONS = [
    ('Диктант 1 — ёлочка', ['1 вниз', '1 вправо', '1 вверх', '1 вправо', '1 вниз', '1 вправо', '1 вверх'], (1, 1)),
    ('Диктант 2 — ступеньки', ['1 вправо', '1 вниз', '1 вправо', '1 вниз', '1 вправо', '1 вниз'], (1, 1)),
    ('Диктант 3 — домик', ['2 вправо', '2 вниз', '2 влево', '2 вверх'], (2, 2)),
]


def build_answers_page(orig):
    """Оставляет страницу ответов, но вырезает записи по кроссвордам (Еда/Животные
    внизу листа) — кроссворды из сборника убраны целиком."""
    page = orig[31]
    page.add_redact_annot(fitz.Rect(0, 630, PAGE_W, 725), fill=(1, 1, 1))
    page.apply_redactions()
    return page


def main():
    orig = fitz.open(SRC)
    print('original pages:', len(orig))

    letters_doc = build_letters_pdf_fitz(
        'Прописи: русский алфавит',
        'Обведи буквы по контуру, затем напиши сам(а)',
        ALPHABET, per_page=22,
    )
    digits_doc = build_section_pdf(
        'Прописи: числа до 20',
        'Обведи цифры по контуру, затем напиши сам(а)',
        NUMBERS, per_page=22,
    )
    domiki_doc = build_domiki_pdf(
        DOMIKI_PAIRS_2, 'Состав числа (лист 2)', 'Впиши недостающее число в каждый «домик»',
    )
    odd_word_doc = build_odd_word_pdf(
        ODD_WORD_ROWS, 'Найди лишнее слово', 'Обведи слово, которое не подходит к остальным по смыслу',
    )
    dictant_doc = build_dictant_pdf(
        DICTATIONS, 'Графический диктант', 'Веди линию по клеточкам по инструкции, начиная с точки',
    )
    filword_doc = build_filword_combo_pdf(orig, [25, 26, 27])  # еда, животные, насекомые
    build_answers_page(orig)  # редактирует orig[31] на месте (перед insert_pdf ниже)

    print('new letters pages:', len(letters_doc), 'new digits pages:', len(digits_doc))

    new_doc = fitz.open()
    new_doc.insert_pdf(full_page_image_pdf(COVER_IMAGE))     # обложка во весь лист
    new_doc.insert_pdf(letters_doc)                         # прописи: алфавит (было 1-3)
    new_doc.insert_pdf(orig, from_page=4, to_page=7)        # примеры, счёт, словарные слова
    new_doc.insert_pdf(digits_doc)                           # прописи: числа до 20 (было 8)
    new_doc.insert_pdf(orig, from_page=9, to_page=9)         # состав числа (лист 1, оригинал)
    new_doc.insert_pdf(domiki_doc)                            # состав числа (лист 2, новые числа)
    new_doc.insert_pdf(orig, from_page=10, to_page=10)       # сравнение чисел (оригинал, без второго листа)
    new_doc.insert_pdf(orig, from_page=11, to_page=11)       # который час
    new_doc.insert_pdf(odd_word_doc)                          # найди лишнее слово — оба листа на одном (было 12-13)
    new_doc.insert_pdf(orig, from_page=14, to_page=17)       # слово из букв, штриховка, лабиринты
    new_doc.insert_pdf(dictant_doc)                           # графический диктант — 3 на странице (было 1 на всю)
    # кроссворды (было 19-24) удалены целиком
    new_doc.insert_pdf(filword_doc)                           # 3 филворда на одной странице (было 6 отдельных, 25-30)
    new_doc.insert_pdf(orig, from_page=31, to_page=31)       # ответы (кроссвордные записи вырезаны)
    # orig[32] — ответы по кроссвордам, не нужны: самих кроссвордов в сборнике больше нет
    # Диплом — последняя страница. Пересобирается из растра в JPEG: в оригинале это
    # PNG на 2,9 МБ, то есть десятая часть веса всего сборника ради одной страницы.
    # Старый колонтитул «34 / 34» вырезается до растеризации: на готовой странице его
    # уже не убрать, там будет картинка.
    diploma_src = orig[33]
    diploma_src.add_redact_annot(fitz.Rect(0, 798, PAGE_W, PAGE_H), fill=(1, 1, 1))
    diploma_src.apply_redactions()
    diploma_png = diploma_src.get_pixmap(dpi=150).tobytes('png')
    new_doc.insert_pdf(full_page_image_pdf(io.BytesIO(diploma_png)))

    # Содержание строится по готовой сборке и встаёт сразу после обложки.
    new_doc.insert_pdf(build_contents_pdf(new_doc), start_at=1)

    # Сиреневая рамка на содержательных страницах — сборник смотрится единой серией.
    # Обложка и диплом остаются без рамки: у них свой полностраничный дизайн.
    for page in new_doc[1:-1]:
        add_frame_fitz(page)

    restamp_footers(new_doc)

    out_path = SRC
    # Без этого файл выходит под 26 МБ — неудобно скачивать с телефона. Шрифты
    # встраиваются целиком (Arial — 750 КБ на начертание), поэтому урезаются до
    # использованных букв. deflate_images не включаем: он перекодирует JPEG обложки
    # и диплома обратно в несжатый вид и раздувает файл вместо экономии.
    new_doc.subset_fonts()
    new_doc.save(out_path + '.tmp', garbage=4, deflate=True)
    new_doc.close()
    orig.close()
    import os
    os.replace(out_path + '.tmp', out_path)
    print('saved', out_path, '- total pages now:', fitz.open(out_path).page_count)


if __name__ == '__main__':
    main()
