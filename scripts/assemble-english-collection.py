"""Склеивает сборник «Английский язык»: обложка → содержание → таблицы.

Берёт страницы, отрисованные build-english-collection.mjs, добавляет обложку
и кладёт готовый PDF в private-content/products/. Заодно пересобирает превью
для карточки товара на сайте.
"""

from io import BytesIO
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image
from pypdf import PdfReader, PdfWriter
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "tmp" / "pdfs" / "english-build"
COVER = ROOT / "public" / "products" / "angliyskiy-yazyk-sbornik-cover.jpg"
TARGET = ROOT / "private-content" / "products" / "angliyskiy-yazyk-sbornik.pdf"
PREVIEW = ROOT / "public" / "products" / "angliyskiy-yazyk-sbornik-preview.jpg"

PREVIEW_PAGES = 4  # сколько первых страниц показываем на сайте

page_width, page_height = A4


def cover_page() -> PdfReader:
    image = Image.open(COVER)
    scale = max(page_width / image.width, page_height / image.height)
    draw_w, draw_h = image.width * scale, image.height * scale
    stream = BytesIO()
    pdf = canvas.Canvas(stream, pagesize=A4)
    pdf.drawImage(
        str(COVER),
        (page_width - draw_w) / 2,
        (page_height - draw_h) / 2,
        width=draw_w,
        height=draw_h,
    )
    pdf.showPage()
    pdf.save()
    stream.seek(0)
    return PdfReader(stream)


writer = PdfWriter()
writer.add_page(cover_page().pages[0])
for source in sorted(BUILD.glob("*.pdf")):
    for page in PdfReader(str(source)).pages:
        writer.add_page(page)
writer.compress_identical_objects()
with TARGET.open("wb") as out:
    writer.write(out)

doc = fitz.open(TARGET)
print(f"Собран {TARGET.name}: {doc.page_count} страниц, {TARGET.stat().st_size / 1024:.0f} КБ")

# Превью для карточки товара — вертикальная лента из первых страниц.
tiles = []
for index in range(min(PREVIEW_PAGES, doc.page_count)):
    pix = doc[index].get_pixmap(dpi=100)
    tiles.append(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))

width = min(tile.width for tile in tiles)
tiles = [t.resize((width, round(t.height * width / t.width)), Image.LANCZOS) for t in tiles]
strip = Image.new("RGB", (width, sum(t.height for t in tiles)), "white")
offset = 0
for tile in tiles:
    strip.paste(tile, (0, offset))
    offset += tile.height
strip.save(PREVIEW, quality=85, optimize=True)
print(f"Превью {PREVIEW.name}: {strip.size[0]}x{strip.size[1]}, {PREVIEW.stat().st_size / 1024:.0f} КБ")
