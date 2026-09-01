import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { exportUserData, deleteUserData } from '@/lib/data-protection';

/**
 * Управление персональными данными пользователя
 * ФЗ-152 "О защите персональных данных"
 */

// Экспортировать данные пользователя (право на доступ)
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

    const data = await exportUserData(user.id);

    return NextResponse.json({
      message: 'Ваши персональные данные',
      data,
      timestamp: new Date(),
      note: 'Экспорт согласно ФЗ-152. Сохраните для своих записей.',
    });
  } catch (error) {
    console.error('Data export error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}

// Удалить все персональные данные (право на забывание)
export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Требуется подтверждение (пароль или код)
    const { confirmationCode } = await request.json();

    if (confirmationCode !== process.env.DATA_DELETION_CODE) {
      return NextResponse.json(
        { error: 'Invalid confirmation' },
        { status: 403 }
      );
    }

    const result = await deleteUserData(user.id);

    return NextResponse.json({
      ...result,
      message: 'Все персональные данные удалены',
      warning: 'Это действие необратимо. Ваш аккаунт останется зарегистрирован в целях безопасности.',
    });
  } catch (error) {
    console.error('Data deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete data' },
      { status: 500 }
    );
  }
}
