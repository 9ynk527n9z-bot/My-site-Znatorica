// YuKassa не подписывает уведомления вебхука криптографически — единственная
// официальная защита, которую они рекомендуют, это сверка IP-адреса отправителя
// со списком их серверов (см. документацию YuKassa по вебхукам). Без этой
// проверки кто угодно, узнав URL /api/payments/webhook, мог бы отправить
// поддельное «payment.succeeded» и получить подписку бесплатно.
const YOOKASSA_IPV4_RANGES = [
  '185.71.76.0/27',
  '185.71.77.0/27',
  '77.75.153.0/25',
  '77.75.156.11/32',
  '77.75.156.35/32',
  '77.75.154.128/25',
];

const YOOKASSA_IPV6_PREFIX = '2a02:5180::';

function ipv4ToLong(ip: string): number | null {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function ipv4InCidr(ip: string, cidr: string): boolean {
  const [range, bitsStr] = cidr.split('/');
  const bits = parseInt(bitsStr, 10);
  const ipLong = ipv4ToLong(ip);
  const rangeLong = ipv4ToLong(range);
  if (ipLong === null || rangeLong === null) return false;
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ipLong & mask) === (rangeLong & mask);
}

export function isYooKassaIp(ip: string): boolean {
  const clean = ip.trim();
  if (clean.includes(':')) {
    // Упрощённая проверка префикса IPv6 (единственный опубликованный диапазон YuKassa).
    return clean.toLowerCase().startsWith(YOOKASSA_IPV6_PREFIX.split('::')[0].toLowerCase());
  }
  return YOOKASSA_IPV4_RANGES.some((cidr) => ipv4InCidr(clean, cidr));
}

// Достаёт реальный IP клиента из заголовков за Nginx-прокси
// (см. deploy/nginx.conf — X-Real-IP выставляется на $remote_addr).
export function getClientIp(request: Request): string | null {
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return null;
}
