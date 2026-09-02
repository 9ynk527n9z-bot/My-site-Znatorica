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
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 2px; background: #2A1B4D; color: #fff; padding: 16px; border-radius: 8px; text-align: center;">
          ${code}
        </p>
        <p>Введите его на странице <a href="${siteUrl}/confirm-email">подтверждения email</a>.</p>
        <p style="color: #888; font-size: 13px;">Код действителен 24 часа. Если вы не регистрировались на Знаторике — просто проигнорируйте это письмо.</p>
        <p style="color: #aaa; font-size: 12px;">Кстати, со <a href="${siteUrl}/podpiska" style="color: #aaa;">Знаторика PRO</a> тренажёры и генераторы — без дневного лимита.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, code: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return sendEmail({
    to: email,
    subject: 'Восстановление пароля — Знаторика',
    text: `Ваш код для сброса пароля: ${code}\n\nВведите его на странице ${siteUrl}/reset-password\n\nКод действителен 1 час. Если вы не запрашивали восстановление пароля — проигнорируйте это письмо.`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #F97316;">🐿️ Знаторика</h2>
        <p>Вы запросили восстановление пароля.</p>
        <p>Ваш код для сброса пароля:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 2px; background: #2A1B4D; color: #fff; padding: 16px; border-radius: 8px; text-align: center;">
          ${code}
        </p>
        <p>Введите его на странице <a href="${siteUrl}/reset-password">восстановления пароля</a> вместе с новым паролем.</p>
        <p style="color: #888; font-size: 13px;">Код действителен 1 час. Если вы не запрашивали восстановление пароля — просто проигнорируйте это письмо, ваш пароль останется прежним.</p>
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

export async function sendRenewalReminderEmail(email: string, endDate: Date, willAutoCharge: boolean, amount?: number) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const dateStr = endDate.toLocaleDateString('ru-RU');

  if (willAutoCharge) {
    const amountStr = amount ? `${amount} ₽` : 'сумму подписки';
    return sendEmail({
      to: email,
      subject: 'Подписка на Знаторике скоро продлится',
      text: `Ваша подписка на Знаторике действует до ${dateStr}. После этой даты произойдёт автосписание ${amountStr} с сохранённой карты. Если не хотите продлевать — отключите автопродление в личном кабинете (${siteUrl}/account) до ${dateStr}.`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #F97316;">🐿️ Знаторика</h2>
          <p>Ваша подписка действует до <strong>${dateStr}</strong>.</p>
          <p>После этой даты мы автоматически спишем <strong>${amountStr}</strong> с сохранённой карты — доступ продлится ещё на месяц без каких-либо действий с вашей стороны.</p>
          <p style="text-align: center; margin: 24px 0;">
            <a href="${siteUrl}/account" style="background: #2A1B4D; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; border: 1px solid #F97316;">
              Отключить автопродление
            </a>
          </p>
          <p style="color: #888; font-size: 13px;">Если всё устраивает — ничего делать не нужно, письмо просто предупреждает заранее.</p>
        </div>
      `,
    });
  }

  return sendEmail({
    to: email,
    subject: 'Подписка на Знаторике скоро закончится',
    text: `Ваша подписка на Знаторике действует до ${dateStr}. Для этой подписки автосписание недоступно — чтобы сохранить доступ к генераторам и плакатам без ограничений, продлите подписку вручную на ${siteUrl}/podpiska.`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #F97316;">🐿️ Знаторика</h2>
        <p>Ваша подписка действует до <strong>${dateStr}</strong>.</p>
        <p>Для этой подписки автосписание недоступно — чтобы сохранить доступ к генераторам без дневного лимита и плакатам, продлите подписку вручную.</p>
        <p style="text-align: center; margin: 24px 0;">
          <a href="${siteUrl}/podpiska" style="background: #F97316; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Продлить подписку
          </a>
        </p>
        <p style="color: #888; font-size: 13px;">Если вы не хотите продлевать — ничего делать не нужно, доступ к тренажёрам и ВПР останется бесплатным и без ограничений.</p>
      </div>
    `,
  });
}

export async function sendRenewalFailedEmail(email: string, endDate: Date) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return sendEmail({
    to: email,
    subject: 'Не удалось продлить подписку — Знаторика',
    text: `Автосписание за продление подписки на Знаторике не прошло (истекла ${endDate.toLocaleDateString('ru-RU')}). Автопродление отключено. Чтобы сохранить доступ, продлите подписку вручную на ${siteUrl}/podpiska.`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #F97316;">🐿️ Знаторика</h2>
        <p>Не удалось автоматически списать оплату за продление подписки (истекла <strong>${endDate.toLocaleDateString('ru-RU')}</strong>) — например, карта могла быть заблокирована или недостаточно средств.</p>
        <p>Автопродление отключено, повторных попыток списания не будет.</p>
        <p style="text-align: center; margin: 24px 0;">
          <a href="${siteUrl}/podpiska" style="background: #F97316; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Продлить подписку
          </a>
        </p>
        <p style="color: #888; font-size: 13px;">Если вы не хотите продлевать — ничего делать не нужно, доступ к тренажёрам и ВПР останется бесплатным и без ограничений.</p>
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
