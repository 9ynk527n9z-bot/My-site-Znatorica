import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  const user = token ? await getUserFromToken(token) : null;

  if (!user) {
    return NextResponse.json({ owned: false });
  }

  const purchase = await db.purchase.findUnique({
    where: { userId_productSlug: { userId: user.id, productSlug: params.slug } },
  });

  return NextResponse.json({ owned: !!purchase });
}
