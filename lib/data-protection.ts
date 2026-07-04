import crypto from 'crypto';
import { db } from './db';

/**
 * Защита персональных данных по ФЗ-152 "О защите персональных данных"
 */

// Небезопасный дефолт позволил бы расшифровать данные, зная только код — падаем сразу, а не тихо.
if (!process.env.DATA_ENCRYPTION_KEY) {
  throw new Error('DATA_ENCRYPTION_KEY не задан в переменных окружения. Задайте случайную строку 32+ символов в .env.');
}

const ENCRYPTION_KEY = process.env.DATA_ENCRYPTION_KEY;

export function encryptData(data: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.padEnd(32)), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export function decryptData(encryptedData: string): string {
  const [ivHex, encrypted] = encryptedData.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.padEnd(32)), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Логирование доступа к данным для аудита
export async function logDataAccess(
  userId: string,
  action: 'read' | 'update' | 'delete' | 'export',
  dataType: string,
  adminId?: string
) {
  console.log(`[DATA ACCESS LOG] ${new Date().toISOString()}`, {
    userId,
    action,
    dataType,
    adminId,
    ipHash: crypto.createHash('sha256').update(Date.now().toString()).digest('hex').slice(0, 8),
  });

  // TODO: Сохранять в отдельную таблицу для аудита
}

// Удаление всех персональных данных пользователя (право на забывчивость)
export async function deleteUserData(userId: string) {
  try {
    // Логировать удаление
    await logDataAccess(userId, 'delete', 'all_user_data');

    // Удалить все данные пользователя (по порядку из-за зависимостей)
    await db.generatorUse.deleteMany({ where: { userId } });
    await db.payment.deleteMany({ where: { userId } });
    await db.subscription.deleteMany({ where: { userId } });
    await db.pageView.deleteMany({ where: { userId } });

    // Сохранить только минимальные данные для целей безопасности
    const anonEmail = `deleted-${crypto.randomBytes(8).toString('hex')}@deleted.local`;
    await db.user.update({
      where: { id: userId },
      data: {
        email: anonEmail,
        passwordHash: '',
        role: 'deleted',
      },
    });

    return { success: true, message: 'All personal data deleted' };
  } catch (error) {
    console.error('Data deletion error:', error);
    throw error;
  }
}

// Экспорт данных пользователя в формате GDPR (ФЗ-152 аналог)
export async function exportUserData(userId: string) {
  try {
    await logDataAccess(userId, 'export', 'all_user_data');

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        subscriptions: true,
        payments: true,
        generatorUses: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Экспорт в JSON
    const exportData = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      subscriptions: user.subscriptions,
      payments: user.payments,
      generatorUses: user.generatorUses,
      exportDate: new Date(),
      exportNote: 'Экспорт персональных данных согласно ФЗ-152',
    };

    return exportData;
  } catch (error) {
    console.error('Data export error:', error);
    throw error;
  }
}

// Проверить согласие на обработку данных
export async function hasDataProcessingConsent(userId: string): Promise<boolean> {
  const consent = await db.userConsent.findFirst({
    where: { userId, consentType: 'general', isActive: true, revokedAt: null },
  });
  return consent !== null;
}

// Получить данные для отправки в ответ на запрос (ФЗ-152)
export async function getUserDataForRequest(userId: string) {
  const data = await exportUserData(userId);
  return {
    personalData: data,
    timestamp: new Date(),
    requestId: crypto.randomUUID(),
  };
}
