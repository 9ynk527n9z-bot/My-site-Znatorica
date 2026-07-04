import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { db } from './db';

// Небезопасный дефолт JWT_SECRET позволил бы подделывать токены — падаем сразу, а не тихо.
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET не задан в переменных окружения. Задайте случайную строку в .env.');
}

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '30d',
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };
  } catch {
    return null;
  }
}

export async function hashPassword(password: string) {
  return bcryptjs.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcryptjs.compare(password, hash);
}

export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  try {
    return await db.user.findUnique({ where: { id: decoded.userId } });
  } catch {
    return null;
  }
}
