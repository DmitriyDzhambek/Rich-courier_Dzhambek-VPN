export interface YandexAuthConfig {
  clientId: string;
  clientSecret: string;
  /** Public origin of this app, e.g. https://vpn.example.com (no trailing slash). */
  appUrl: string;
  redirectUri: string;
  /** Secret used to sign the session cookie. */
  sessionSecret: string;
}

export const YANDEX_AUTHORIZE_URL = 'https://oauth.yandex.ru/authorize';
export const YANDEX_TOKEN_URL = 'https://oauth.yandex.ru/token';
export const YANDEX_USERINFO_URL = 'https://login.yandex.ru/info?format=json';

const MIN_SESSION_SECRET_LENGTH = 32;

function readEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

/**
 * Returns the Yandex OAuth configuration or null when any required variable
 * is missing. Callers must treat null as "auth unavailable" and never fall
 * back to a fake/simulated login.
 */
export function getYandexAuthConfig(): YandexAuthConfig | null {
  const clientId = readEnv('YANDEX_CLIENT_ID');
  const clientSecret = readEnv('YANDEX_CLIENT_SECRET');
  const sessionSecret = readEnv('AUTH_SECRET');
  const rawAppUrl = readEnv('AUTH_URL');

  if (!clientId || !clientSecret || !sessionSecret || !rawAppUrl) return null;
  if (sessionSecret.length < MIN_SESSION_SECRET_LENGTH) return null;

  let appUrl: string;
  try {
    const parsed = new URL(rawAppUrl);
    const isLocalhost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
    if (parsed.protocol !== 'https:' && !isLocalhost) return null;
    appUrl = parsed.origin;
  } catch {
    return null;
  }

  return {
    clientId,
    clientSecret,
    appUrl,
    redirectUri: `${appUrl}/api/auth/yandex/callback`,
    sessionSecret,
  };
}

export function isYandexAuthConfigured(): boolean {
  return getYandexAuthConfig() !== null;
}
