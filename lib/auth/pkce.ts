import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

function base64url(buffer: Buffer): string {
  return buffer.toString('base64url');
}

export function generateState(): string {
  return base64url(randomBytes(32));
}

/** RFC 7636 code_verifier: 43–128 chars from the unreserved set. */
export function generateCodeVerifier(): string {
  return base64url(randomBytes(64));
}

export function codeChallengeS256(verifier: string): string {
  return base64url(createHash('sha256').update(verifier).digest());
}

export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
