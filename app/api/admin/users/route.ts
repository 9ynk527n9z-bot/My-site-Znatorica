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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const users = await db.user.findMany({
      skip,
      take: limit,
      include: {
        subscriptions: {
          select: {
            status: true,
            endDate: true,
          },
        },
        payments: {
          select: {
            amount: true,
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = await db.user.count();

    return NextResponse.json({
      users: users.map(u => ({
        id: u.id,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
        subscriptionStatus: u.subscriptions[0]?.status || 'none',
        subscriptionEndDate: u.subscriptions[0]?.endDate || null,
        totalSpent: u.payments.reduce((sum, p) => sum + (p.status === 'succeeded' ? p.amount : 0), 0),
        lastPayment: u.payments[0]?.createdAt || null,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Users list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
