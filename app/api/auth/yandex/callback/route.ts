import { NextResponse, type NextRequest } from 'next/server';
import { getYandexAuthConfig } from '@/lib/auth/config';
import { safeEqual } from '@/lib/auth/pkce';
import { readAndClearOAuthFlow, writeSession } from '@/lib/auth/session';
import { YandexAuthError, exchangeCodeForToken, fetchYandexProfile } from '@/lib/auth/yandex';

export const dynamic = 'force-dynamic';

const ALLOWED_REASONS = new Set([
  'access_denied',
  'invalid_state',
  'missing_code',
  'token_exchange_failed',
  'userinfo_failed',
  'userinfo_invalid',
  'provider_error',
]);

function redirectToApp(appUrl: string, params: Record<string, string>) {
  const url = new URL('/', appUrl);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return NextResponse.redirect(url, 302);
}

function sanitizeReason(reason: string): string {
  return ALLOWED_REASONS.has(reason) ? reason : 'provider_error';
}

export async function GET(request: NextRequest) {
  const config = getYandexAuthConfig();
  if (!config) {
    return NextResponse.json({ error: 'auth_not_configured' }, { status: 503 });
  }

  const { searchParams } = request.nextUrl;
  const { state: expectedState, verifier } = await readAndClearOAuthFlow();

  const providerError = searchParams.get('error');
  if (providerError) {
    return redirectToApp(config.appUrl, { auth: 'error', reason: sanitizeReason(providerError) });
  }

  const returnedState = searchParams.get('state');
  if (!expectedState || !verifier || !returnedState || !safeEqual(returnedState, expectedState)) {
    return redirectToApp(config.appUrl, { auth: 'error', reason: 'invalid_state' });
  }

  const code = searchParams.get('code');
  if (!code) {
    return redirectToApp(config.appUrl, { auth: 'error', reason: 'missing_code' });
  }

  try {
    const accessToken = await exchangeCodeForToken(config, code, verifier);
    const profile = await fetchYandexProfile(accessToken);
    await writeSession(profile, config.sessionSecret);
    return redirectToApp(config.appUrl, { auth: 'ok' });
  } catch (error) {
    const reason = error instanceof YandexAuthError ? error.reason : 'provider_error';
    return redirectToApp(config.appUrl, { auth: 'error', reason: sanitizeReason(reason) });
  }
}
