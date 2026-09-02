import { NextResponse } from 'next/server';
import { getNumberSetting } from '@/lib/settings';
import { SUBSCRIPTION_PRICE, YEARLY_PRICE, LIFETIME_PRICE } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  const monthlyPrice = await getNumberSetting('monthlyPrice', SUBSCRIPTION_PRICE / 100);
  const yearlyPrice = await getNumberSetting('yearlyPrice', YEARLY_PRICE / 100);
  const lifetimePrice = await getNumberSetting('lifetimePrice', LIFETIME_PRICE / 100);

  return NextResponse.json({ monthlyPrice, yearlyPrice, lifetimePrice });
}
