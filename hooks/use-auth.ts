'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AuthStatusResponse, UserProfile } from '@/lib/types';

export type AuthState =
  | { status: 'loading'; configured: false; user: null }
  | { status: 'ready'; configured: boolean; user: UserProfile | null }
  | { status: 'error'; configured: false; user: null };

export const YANDEX_LOGIN_PATH = '/api/auth/yandex/login';

export function useAuth() {
  const [state, setState] = useState<AuthState>({ status: 'loading', configured: false, user: null });

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = (await response.json()) as AuthStatusResponse;
      setState({ status: 'ready', configured: data.configured, user: data.user });
    } catch {
      setState({ status: 'error', configured: false, user: null });
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    await refresh();
  }, [refresh]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...state, refresh, logout };
}
