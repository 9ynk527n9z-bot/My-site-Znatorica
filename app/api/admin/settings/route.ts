import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { getNumberSetting, setSetting } from '@/lib/settings';
import { SUBSCRIPTION_PRICE, YEARLY_PRICE, LIFETIME_PRICE } from '@/lib/constants';

async function requireAdmin(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) return null;
  const user = await getUserFromToken(token);
  if (!user || user.role !== 'admin') return null;
  return user;
}

export async function GET(request: NextRequest) {
  const user = await requireAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const monthlyPrice = await getNumberSetting('monthlyPrice', SUBSCRIPTION_PRICE / 100);
  const yearlyPrice = await getNumberSetting('yearlyPrice', YEARLY_PRICE / 100);
  const lifetimePrice = await getNumberSetting('lifetimePrice', LIFETIME_PRICE / 100);

  return NextResponse.json({ monthlyPrice, yearlyPrice, lifetimePrice });
}

export async function POST(request: NextRequest) {
  const user = await requireAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { monthlyPrice, yearlyPrice, lifetimePrice } = await request.json();

  if (typeof monthlyPrice !== 'number' || !Number.isFinite(monthlyPrice) || monthlyPrice <= 0) {
    return NextResponse.json({ error: 'Некорректная цена подписки' }, { status: 400 });
  }
  if (typeof yearlyPrice !== 'number' || !Number.isFinite(yearlyPrice) || yearlyPrice <= 0) {
    return NextResponse.json({ error: 'Некорректная цена годового доступа' }, { status: 400 });
  }
  if (typeof lifetimePrice !== 'number' || !Number.isFinite(lifetimePrice) || lifetimePrice <= 0) {
    return NextResponse.json({ error: 'Некорректная цена разового доступа' }, { status: 400 });
  }

  await setSetting('monthlyPrice', String(monthlyPrice));
  await setSetting('yearlyPrice', String(yearlyPrice));
  await setSetting('lifetimePrice', String(lifetimePrice));

  return NextResponse.json({ ok: true, monthlyPrice, yearlyPrice, lifetimePrice });
}
