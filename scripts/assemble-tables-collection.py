"""Собирает сборник «Таблицы для начальной школы».

Структура: обложка → содержание по четырём предметам → 39 таблиц.
Страницы берёт из build-tables-collection.mjs, готовый PDF кладёт
в private-content/products/ и пересобирает превью для карточки товара.
"""

import io
import json
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "tmp" / "pdfs" / "tables-build"
COVER = ROOT / "public" / "products" / "tablicy-nachalnaya-shkola-cover.jpg"
TARGET = ROOT / "private-content" / "products" / "tablicy-nachalnaya-shkola.pdf"
PREVIEW = ROOT / "public" / "products" / "tablicy-nachalnaya-shkola-preview.jpg"

ARIAL = "/System/Library/Fonts/Supplemental/Arial.ttf"
ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
pdfmetrics.registerFont(TTFont("Arial", ARIAL))
pdfmetrics.registerFont(TTFont("Arial-Bold", ARIAL_BOLD))

PAGE_W, PAGE_H = A4
PREVIEW_PAGES = 6

SECTIONS = [
    ("Математика", (0.85, 0.25, 0.35)),
    ("Русский язык", (0.25, 0.55, 0.85)),
    ("Окружающий мир", (0.17, 0.62, 0.40)),
    ("Английский язык", (0.49, 0.29, 0.86)),
]


def table_titles():
    """Порядок, разделы и названия берутся из index.json, который пишет скрипт
    отрисовки: в самих PDF заголовок набран вразрядку и из текста не читается."""
    manifest = json.loads((BUILD / "index.json").read_text())
    return [(item["section"], item["title"], BUILD / item["file"]) for item in manifest]


def contents_pages(entries, first_content_page):
    """Содержание: четыре блока по предметам. Возвращает готовый PDF —
    страниц столько, сколько нужно, чтобы разделы не налезали друг на друга."""
    rows = []  # (kind, text, page_no, color)
    page_no = first_content_page
    for index, (title, color) in enumerate(SECTIONS):
        section_tables = [e for e in entries if e[0] == index]
        rows.append(("section", title, None, color))
        for _, table_title, _ in section_tables:
            rows.append(("table", table_title, page_no, color))
            page_no += 1

    per_page = 34
    chunks = [rows[i:i + per_page] for i in range(0, len(rows), per_page)]

    stream = io.BytesIO()
    c = canvas.Canvas(stream, pagesize=A4)
    for chunk_index, chunk in enumerate(chunks):
        if chunk_index == 0:
            c.setFont("Arial-Bold", 26)
            c.setFillColorRGB(0.16, 0.11, 0.31)
            c.drawCentredString(PAGE_W / 2, PAGE_H - 78, "Содержание")
            c.setFont("Arial", 11)
            c.setFillColorRGB(0.45, 0.43, 0.52)
            c.drawCentredString(PAGE_W / 2, PAGE_H - 96, f"{len(entries)} таблиц по четырём предметам")
            top = 126
        else:
            top = 64

        for kind, text, number, color in chunk:
            if kind == "section":
                top += 12
                c.setFillColorRGB(*color)
                c.roundRect(46, PAGE_H - top - 15, PAGE_W - 92, 21, 6, stroke=0, fill=1)
                c.setFont("Arial-Bold", 12)
                c.setFillColorRGB(1, 1, 1)
                c.drawString(56, PAGE_H - top - 9, text)
                top += 26
            else:
                c.setFont("Arial", 11)
                c.setFillColorRGB(0.16, 0.11, 0.31)
                c.drawString(62, PAGE_H - top - 8, text)
                c.setFont("Arial", 10)
                c.setFillColorRGB(0.6, 0.58, 0.66)
                c.drawRightString(PAGE_W - 54, PAGE_H - top - 8, str(number))
                c.setStrokeColorRGB(0.9, 0.89, 0.93)
                c.setLineWidth(0.6)
                c.setDash(1, 3)
                c.line(62 + c.stringWidth(text, "Arial", 11) + 8, PAGE_H - top - 5,
                       PAGE_W - 66, PAGE_H - top - 5)
                c.setDash()
                top += 19
        c.showPage()
    c.save()
    stream.seek(0)
    return fitz.open("pdf", stream.read())


def cover_page():
    if not COVER.exists():
        raise SystemExit(f"Нет обложки: {COVER}")
    image = Image.open(COVER).convert("RGB")
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG", quality=86, optimize=True)
    buffer.seek(0)
    stream = io.BytesIO()
    c = canvas.Canvas(stream, pagesize=A4)
    c.drawImage(ImageReader(buffer), 0, 0, width=PAGE_W, height=PAGE_H)
    c.showPage()
    c.save()
    stream.seek(0)
    return fitz.open("pdf", stream.read())


entries = table_titles()

# Сколько страниц займёт содержание, зависит от числа строк, а номера таблиц зависят
# от содержания — считаем в два прохода.
probe = contents_pages(entries, first_content_page=0)
first_page = 1 + probe.page_count + 1
contents = contents_pages(entries, first_content_page=first_page)

doc = fitz.open()
doc.insert_pdf(cover_page())
doc.insert_pdf(contents)
for _, _, pdf_path in entries:
    doc.insert_pdf(fitz.open(pdf_path))

doc.subset_fonts()
doc.save(TARGET, garbage=4, deflate=True)
print(f"Собран {TARGET.name}: {doc.page_count} страниц, {TARGET.stat().st_size / 1024 / 1024:.2f} МБ")

tiles = []
for index in range(min(PREVIEW_PAGES, doc.page_count)):
    pix = doc[index].get_pixmap(dpi=100)
    tiles.append(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))
width = min(t.width for t in tiles)
tiles = [t.resize((width, round(t.height * width / t.width)), Image.LANCZOS) for t in tiles]
strip = Image.new("RGB", (width, sum(t.height for t in tiles)), "white")
offset = 0
for tile in tiles:
    strip.paste(tile, (0, offset))
    offset += tile.height
strip.save(PREVIEW, quality=85, optimize=True)
print(f"Превью {PREVIEW.name}: {strip.size[0]}x{strip.size[1]}, {PREVIEW.stat().st_size / 1024:.0f} КБ")


def compress_images(pdf_path, min_bytes=250_000, quality=82):
    """Пережимает крупные растровые картинки в JPEG.

    Иллюстрации окружающего мира приходят со страниц как PNG по 1,5-2,9 МБ каждая —
    вшестером они дают почти весь вес сборника.
    """
    doc = fitz.open(pdf_path)
    saved = 0
    for page in doc:
        for info in page.get_images(full=True):
            xref = info[0]
            data = doc.extract_image(xref)
            if len(data["image"]) < min_bytes:
                continue
            image = Image.open(io.BytesIO(data["image"])).convert("RGB")
            buffer = io.BytesIO()
            image.save(buffer, format="JPEG", quality=quality, optimize=True)
            if buffer.tell() < len(data["image"]):
                saved += len(data["image"]) - buffer.tell()
                page.replace_image(xref, stream=buffer.getvalue())
    doc.save(str(pdf_path) + ".tmp", garbage=4, deflate=True)
    doc.close()
    Path(str(pdf_path) + ".tmp").replace(pdf_path)
    print(f"Картинки пережаты, сэкономлено {saved / 1024 / 1024:.1f} МБ")


compress_images(TARGET)
print(f"Итог: {TARGET.stat().st_size / 1024 / 1024:.2f} МБ")
