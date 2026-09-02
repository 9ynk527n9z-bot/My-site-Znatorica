import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const subscription = await db.subscription.findUnique({
      where: { userId: user.id },
    });

    const payments = await db.payment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const generatorUsesCount = await db.generatorUse.count({
      where: { userId: user.id },
    });

    const tournamentDiplomas = await db.tournamentResult.findMany({
      where: { userId: user.id, paid: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        emailConfirmed: user.emailConfirmed,
        createdAt: user.createdAt,
        starsBalance: user.starsBalance,
      },
      subscription: subscription
        ? {
            plan: subscription.plan,
            status: subscription.status,
            endDate: subscription.endDate,
            autoRenew: subscription.autoRenew,
            willAutoCharge: !!subscription.paymentMethodId && subscription.autoRenew,
            isActive: subscription.status === 'active' && subscription.endDate > new Date(),
          }
        : null,
      payments: payments.map((p) => ({
        id: p.id,
        amount: p.amount,
        status: p.status,
        createdAt: p.createdAt,
      })),
      generatorUsesCount,
      tournamentDiplomas: tournamentDiplomas.map((d) => ({
        id: d.id,
        trackTitle: d.trackTitle,
        childName: d.childName,
        score: d.score,
        total: d.total,
        createdAt: d.createdAt,
      })),
    });
  } catch (error) {
    console.error('User profile error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
