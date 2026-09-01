'use client';

import Image from 'next/image';
import { User, Crown, Clock, Shield, ChevronRight, LogOut, History, BarChart3 } from 'lucide-react';
import type { AuthState } from '@/hooks/use-auth';
import type { ConnectionHistoryItem, UsageStats } from '@/lib/types';
import { formatBytes, formatDuration } from '@/lib/format';
import EmptyState from '@/components/vpn/EmptyState';
import YandexLoginButton from '@/components/vpn/YandexLoginButton';

interface CabinetPageProps {
  auth: AuthState;
  /** Aggregated usage from the backend. Null until it exists. */
  usage: UsageStats | null;
  /** Connection history from the backend. Null until it exists. */
  history: ConnectionHistoryItem[] | null;
  onLogout: () => void;
  onUpgrade?: () => void;
}

const planLabel: Record<'free' | 'premium', string> = {
  free: 'Бесплатный план',
  premium: 'Премиум',
};

export default function CabinetPage({ auth, usage, history, onLogout, onUpgrade }: CabinetPageProps) {
  const user = auth.status === 'ready' ? auth.user : null;

  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      {/* Profile Header */}
      <div className="bg-card rounded-2xl p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center overflow-hidden relative">
          {user?.avatarUrl ? (
            <Image src={user.avatarUrl} alt={user.displayName} fill className="object-cover" />
          ) : (
            <User className="w-8 h-8 text-primary-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {user ? (
            <>
              <h2 className="text-lg font-bold text-foreground truncate">{user.displayName}</h2>
              <p className="text-xs text-muted-foreground truncate">Яндекс ID</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="px-2 py-0.5 bg-secondary rounded-full text-xs text-primary font-medium">
                  {planLabel[user.plan]}
                </span>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-foreground">Гость</h2>
              <p className="text-sm text-muted-foreground">Войдите, чтобы видеть профиль и статистику</p>
            </>
          )}
        </div>
        {user && (
          <button
            onClick={onLogout}
            aria-label="Выйти"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>

      {!user && <YandexLoginButton status={auth.status} configured={auth.configured} />}

      {/* Premium Card */}
      <button
        onClick={onUpgrade}
        className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-5 text-left hover:border-primary/50 active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3 mb-3">
          <Crown className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground">Премиум доступ</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Разблокируйте все серверы и максимальную скорость
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Тарифы и цены — скоро</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </button>

      {/* Stats */}
      {usage ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Время подключения</span>
            </div>
            <p className="text-xl font-bold text-foreground">{formatDuration(usage.connectedSeconds)}</p>
          </div>
          <div className="bg-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Трафик</span>
            </div>
            <p className="text-xl font-bold text-foreground">{formatBytes(usage.trafficBytes)}</p>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={BarChart3}
          title="Статистики пока нет"
          description={
            user
              ? 'Время подключения и трафик появятся после первого сеанса VPN.'
              : 'Войдите, чтобы статистика сохранялась в вашем профиле.'
          }
        />
      )}

      {/* History */}
      <div className="bg-card rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <History className="w-5 h-5 text-muted-foreground" />
          <span className="text-foreground font-medium">История подключений</span>
        </div>
        {history && history.length > 0 ? (
          <ul>
            {history.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-4 border-t border-border first:border-t-0">
                <div>
                  <p className="text-sm text-foreground">{item.serverId}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.startedAt).toLocaleString('ru-RU')}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">{formatBytes(item.trafficBytes)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-3">
            <EmptyState
              compact
              icon={Clock}
              title="Подключений ещё не было"
              description="Здесь появятся ваши сеансы: сервер, время и трафик."
              className="border-0 bg-transparent"
            />
          </div>
        )}
      </div>
    </div>
  );
}
