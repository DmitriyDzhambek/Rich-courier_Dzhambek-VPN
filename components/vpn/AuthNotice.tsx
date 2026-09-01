'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

const reasonText: Record<string, string> = {
  access_denied: 'Вы отменили вход через Яндекс.',
  invalid_state: 'Сессия входа устарела или недействительна. Попробуйте ещё раз.',
  missing_code: 'Яндекс не вернул код авторизации.',
  token_exchange_failed: 'Не удалось обменять код на токен.',
  userinfo_failed: 'Не удалось получить профиль Яндекс ID.',
  userinfo_invalid: 'Яндекс вернул некорректный профиль.',
  provider_error: 'Ошибка на стороне Яндекс. Попробуйте позже.',
};

type Notice = { kind: 'ok' } | { kind: 'error'; text: string };

interface AuthNoticeProps {
  onAuthChanged?: () => void;
}

export default function AuthNotice({ onAuthChanged }: AuthNoticeProps) {
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get('auth');
    if (!auth) return;

    if (auth === 'ok') {
      setNotice({ kind: 'ok' });
      onAuthChanged?.();
    } else if (auth === 'error') {
      const reason = params.get('reason') ?? 'provider_error';
      setNotice({ kind: 'error', text: reasonText[reason] ?? reasonText.provider_error });
    }

    params.delete('auth');
    params.delete('reason');
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  }, [onAuthChanged]);

  if (!notice) return null;

  return (
    <div
      role="alert"
      className={`mx-4 mt-3 rounded-xl px-4 py-3 flex items-start gap-3 text-sm ${
        notice.kind === 'ok'
          ? 'bg-primary/15 border border-primary/40 text-foreground'
          : 'bg-destructive/15 border border-destructive/40 text-foreground'
      }`}
    >
      {notice.kind === 'ok' ? (
        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      ) : (
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
      )}
      <p className="flex-1">{notice.kind === 'ok' ? 'Вы вошли через Яндекс ID.' : notice.text}</p>
      <button onClick={() => setNotice(null)} aria-label="Закрыть" className="text-muted-foreground hover:text-foreground">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
