'use client';

import { LogIn, Loader2, ShieldOff } from 'lucide-react';
import { YANDEX_LOGIN_PATH } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

interface YandexLoginButtonProps {
  status: 'loading' | 'ready' | 'error';
  configured: boolean;
  className?: string;
}

function YandexMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FC3F1D] text-white text-xs font-black leading-none',
        className,
      )}
    >
      Я
    </span>
  );
}

export default function YandexLoginButton({ status, configured, className }: YandexLoginButtonProps) {
  if (status === 'loading') {
    return (
      <div
        className={cn(
          'w-full rounded-xl py-3 px-4 bg-secondary/60 text-muted-foreground flex items-center justify-center gap-2 text-sm',
          className,
        )}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        Проверяем авторизацию…
      </div>
    );
  }

  if (status === 'error' || !configured) {
    return (
      <div
        className={cn(
          'w-full rounded-xl py-3 px-4 bg-secondary/60 border border-dashed border-border text-left flex items-start gap-3',
          className,
        )}
      >
        <ShieldOff className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-medium text-foreground">Вход через Яндекс пока недоступен</p>
          <p className="text-xs text-muted-foreground">
            {status === 'error'
              ? 'Не удалось связаться с сервером авторизации.'
              : 'Сервер ещё не настроен (нужны Client ID, Client Secret и AUTH_SECRET).'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={YANDEX_LOGIN_PATH}
      className={cn(
        'w-full rounded-xl py-3 px-4 bg-white text-[#0a1628] hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-semibold text-sm',
        className,
      )}
    >
      <YandexMark />
      Войти через Яндекс ID
      <LogIn className="w-4 h-4 opacity-60" />
    </a>
  );
}
