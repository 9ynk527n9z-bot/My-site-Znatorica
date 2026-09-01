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
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Total users
    const totalUsers = await db.user.count();

    // Active subscribers
    const subscribers = await db.subscription.count({
      where: {
        status: 'active',
        endDate: { gt: new Date() },
      },
    });

    // Total revenue
    const payments = await db.payment.findMany({
      where: { status: 'succeeded' },
    });

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    // Recent payments
    const recentPayments = await db.payment.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    // Page views
    const pageViews = await db.pageView.count();

    // Generator usage
    const generatorUses = await db.generatorUse.count();

    return NextResponse.json({
      stats: {
        totalUsers,
        subscribers,
        totalRevenue,
        pageViews,
        generatorUses,
      },
      recentPayments: recentPayments.map(p => ({
        id: p.id,
        email: p.user.email,
        amount: p.amount,
        status: p.status,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
