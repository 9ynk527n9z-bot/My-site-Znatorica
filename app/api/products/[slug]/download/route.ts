import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { getProduct } from '@/lib/products';

// Файлы сборников лежат вне /public (private-content/), поэтому недоступны
// напрямую по URL — единственный путь получить файл это этот роут, который
// проверяет реальную покупку в БД перед отдачей.
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  const user = token ? await getUserFromToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const product = getProduct(params.slug);
  if (!product || !product.fileName) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const purchase = await db.purchase.findUnique({
    where: { userId_productSlug: { userId: user.id, productSlug: params.slug } },
  });
  if (!purchase) {
    return NextResponse.json({ error: 'Not purchased' }, { status: 403 });
  }

  try {
    const filePath = path.join(process.cwd(), 'private-content', 'products', product.fileName);
    const file = await readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${product.fileName}"`,
      },
    });
  } catch (error) {
    console.error('Product file read error:', error);
    return NextResponse.json({ error: 'File not available' }, { status: 500 });
  }
}
