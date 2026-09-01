import type { UserProfile } from '@/lib/types';
import {
  YANDEX_AUTHORIZE_URL,
  YANDEX_TOKEN_URL,
  YANDEX_USERINFO_URL,
  type YandexAuthConfig,
} from '@/lib/auth/config';

export class YandexAuthError extends Error {
  constructor(public readonly reason: string) {
    super(reason);
    this.name = 'YandexAuthError';
  }
}

export function buildAuthorizeUrl(
  config: YandexAuthConfig,
  state: string,
  codeChallenge: string,
): string {
  const url = new URL(YANDEX_AUTHORIZE_URL);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('redirect_uri', config.redirectUri);
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('force_confirm', 'yes');
  return url.toString();
}

interface YandexTokenResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

interface YandexUserInfo {
  id?: string;
  login?: string;
  display_name?: string;
  real_name?: string;
  first_name?: string;
  default_avatar_id?: string;
  is_avatar_empty?: boolean;
}

export async function exchangeCodeForToken(
  config: YandexAuthConfig,
  code: string,
  codeVerifier: string,
): Promise<string> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code_verifier: codeVerifier,
  });

  const response = await fetch(YANDEX_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    cache: 'no-store',
  });

  const data = (await response.json().catch(() => ({}))) as YandexTokenResponse;
  if (!response.ok || !data.access_token) {
    throw new YandexAuthError(data.error ?? 'token_exchange_failed');
  }
  return data.access_token;
}

export async function fetchYandexProfile(accessToken: string): Promise<UserProfile> {
  const response = await fetch(YANDEX_USERINFO_URL, {
    headers: { Authorization: `OAuth ${accessToken}` },
    cache: 'no-store',
  });
  if (!response.ok) throw new YandexAuthError('userinfo_failed');

  const info = (await response.json().catch(() => ({}))) as YandexUserInfo;
  if (!info.id) throw new YandexAuthError('userinfo_invalid');

  const displayName =
    info.display_name?.trim() || info.real_name?.trim() || info.first_name?.trim() || info.login?.trim() || 'Курьер';

  const avatarUrl =
    info.default_avatar_id && !info.is_avatar_empty
      ? `https://avatars.yandex.net/get-yapic/${encodeURIComponent(info.default_avatar_id)}/islands-200`
      : null;

  return {
    id: `yandex:${info.id}`,
    displayName,
    avatarUrl,
    plan: 'free',
  };
}
