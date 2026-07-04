import nodemailer from 'nodemailer';
import crypto from 'crypto';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || 'Знаторика <noreply@znatorica.ru>';

const isConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!isConfigured) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }

  return transporter;
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  const t = getTransporter();

  if (!t) {
    // DEV FALLBACK: SMTP не настроен — не блокируем разработку, просто логируем письмо.
    console.log('\n📧 [EMAIL DEV MODE — SMTP не настроен, письмо не отправлено]');
    console.log(`   Кому: ${to}`);
    console.log(`   Тема: ${subject}`);
    console.log(`   Текст: ${text}`);
    console.log('   Настройте SMTP_HOST/SMTP_USER/SMTP_PASS в .env для реальной отправки\n');
    return { simulated: true };
  }

  await t.sendMail({ from: SMTP_FROM, to, subject, html, text });
  return { simulated: false };
}

// Код в формате XXXX-XXXX (8 символов, легко набрать вручную)
export function generateVerificationCode(): string {
  const raw = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
}

export async function sendConfirmationEmail(email: string, code: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return sendEmail({
    to: email,
    subject: 'Подтвердите email — Знаторика',
    text: `Ваш код подтверждения: ${code}\n\nВведите его на странице ${siteUrl}/confirm-email\n\nКод действителен 24 часа.`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #F97316;">🐿️ Знаторика</h2>
        <p>Здравствуйте! Спасибо за регистрацию.</p>
        <p>Ваш код подтверждения email:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 2px; background: #16102A; color: #fff; padding: 16px; border-radius: 8px; text-align: center;">
          ${code}
        </p>
        <p>Введите его на странице <a href="${siteUrl}/confirm-email">подтверждения email</a>.</p>
        <p style="color: #888; font-size: 13px;">Код действителен 24 часа. Если вы не регистрировались на Знаторике — просто проигнорируйте это письмо.</p>
      </div>
    `,
  });
}

export async function sendPaymentSuccessEmail(email: string, amount: number, endDate: Date) {
  return sendEmail({
    to: email,
    subject: 'Оплата подписки прошла успешно — Знаторика',
    text: `Спасибо! Оплата ${amount} ₽ прошла успешно. Подписка активна до ${endDate.toLocaleDateString('ru-RU')}.`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #F97316;">🐿️ Знаторика</h2>
        <p>Спасибо! Ваш платёж на сумму <strong>${amount} ₽</strong> успешно обработан.</p>
        <p>Подписка активна до <strong>${endDate.toLocaleDateString('ru-RU')}</strong>.</p>
        <p style="color: #888; font-size: 13px;">Управлять подпиской можно в личном кабинете.</p>
      </div>
    `,
  });
}

export async function sendSubscriptionCancelledEmail(email: string, endDate: Date) {
  return sendEmail({
    to: email,
    subject: 'Автопродление отключено — Знаторика',
    text: `Автопродление подписки отключено. Доступ сохранится до ${endDate.toLocaleDateString('ru-RU')}.`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #F97316;">🐿️ Знаторика</h2>
        <p>Вы отключили автопродление подписки.</p>
        <p>Доступ ко всем материалам сохранится до <strong>${endDate.toLocaleDateString('ru-RU')}</strong>.</p>
        <p style="color: #888; font-size: 13px;">Вы можете снова включить автопродление в любой момент до этой даты.</p>
      </div>
    `,
  });
}
