import { NextResponse } from 'next/server';
import { getYandexAuthConfig } from '@/lib/auth/config';
import { readSession } from '@/lib/auth/session';
import type { AuthStatusResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = getYandexAuthConfig();
  const body: AuthStatusResponse = {
    configured: config !== null,
    user: config ? await readSession(config.sessionSecret) : null,
  };
  return NextResponse.json(body, { headers: { 'Cache-Control': 'no-store' } });
}
