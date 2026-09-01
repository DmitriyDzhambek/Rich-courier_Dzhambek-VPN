import { createHmac } from 'node:crypto';
import { cookies } from 'next/headers';
import type { UserProfile } from '@/lib/types';
import { safeEqual } from '@/lib/auth/pkce';

export const SESSION_COOKIE = 'rc_session';
export const OAUTH_STATE_COOKIE = 'rc_oauth_state';
export const OAUTH_VERIFIER_COOKIE = 'rc_oauth_verifier';

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const OAUTH_FLOW_TTL_SECONDS = 60 * 10;

interface SessionPayload {
  user: UserProfile;
  /** Unix seconds. */
  exp: number;
}

const isProduction = process.env.NODE_ENV === 'production';

export const baseCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const,
  path: '/',
};

function sign(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('base64url');
}

export function encodeSession(user: UserProfile, secret: string): string {
  const payload: SessionPayload = {
    user,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${data}.${sign(data, secret)}`;
}

export function decodeSession(token: string | undefined, secret: string): UserProfile | null {
  if (!token) return null;
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;
  const data = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!safeEqual(signature, sign(data, secret))) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8')) as SessionPayload;
    if (typeof payload.exp !== 'number' || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    if (!payload.user || typeof payload.user.id !== 'string') return null;
    return payload.user;
  } catch {
    return null;
  }
}

export async function readSession(secret: string): Promise<UserProfile | null> {
  const store = await cookies();
  return decodeSession(store.get(SESSION_COOKIE)?.value, secret);
}

export async function writeSession(user: UserProfile, secret: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, encodeSession(user, secret), {
    ...baseCookieOptions,
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function writeOAuthFlow(state: string, verifier: string): Promise<void> {
  const store = await cookies();
  const options = { ...baseCookieOptions, maxAge: OAUTH_FLOW_TTL_SECONDS };
  store.set(OAUTH_STATE_COOKIE, state, options);
  store.set(OAUTH_VERIFIER_COOKIE, verifier, options);
}

export async function readAndClearOAuthFlow(): Promise<{ state: string | null; verifier: string | null }> {
  const store = await cookies();
  const state = store.get(OAUTH_STATE_COOKIE)?.value ?? null;
  const verifier = store.get(OAUTH_VERIFIER_COOKIE)?.value ?? null;
  store.delete(OAUTH_STATE_COOKIE);
  store.delete(OAUTH_VERIFIER_COOKIE);
  return { state, verifier };
}
