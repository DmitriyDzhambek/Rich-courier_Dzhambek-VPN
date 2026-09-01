import { NextResponse } from 'next/server';
import { getYandexAuthConfig } from '@/lib/auth/config';
import { codeChallengeS256, generateCodeVerifier, generateState } from '@/lib/auth/pkce';
import { writeOAuthFlow } from '@/lib/auth/session';
import { buildAuthorizeUrl } from '@/lib/auth/yandex';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = getYandexAuthConfig();
  if (!config) {
    return NextResponse.json(
      { error: 'auth_not_configured', message: 'Вход через Яндекс не настроен на сервере.' },
      { status: 503 },
    );
  }

  const state = generateState();
  const verifier = generateCodeVerifier();
  await writeOAuthFlow(state, verifier);

  return NextResponse.redirect(buildAuthorizeUrl(config, state, codeChallengeS256(verifier)), 302);
}
