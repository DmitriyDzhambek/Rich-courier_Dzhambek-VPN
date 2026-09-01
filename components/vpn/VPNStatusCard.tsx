'use client';

import { Anchor, Ship, Activity } from 'lucide-react';
import type { ConnectionStats } from '@/lib/types';
import { formatBytes, formatPing, formatSpeed } from '@/lib/format';
import EmptyState from '@/components/vpn/EmptyState';

interface VPNStatusCardProps {
  isConnected: boolean;
  /** Real-time metrics from the VPN client. Null when nothing is measured yet. */
  stats: ConnectionStats | null;
}

export default function VPNStatusCard({ isConnected, stats }: VPNStatusCardProps) {
  return (
    <div className="bg-card rounded-2xl p-3 sm:p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isConnected ? 'bg-primary/20' : 'bg-muted'
        }`}>
          {isConnected ? (
            <Ship className="w-5 h-5 text-primary" />
          ) : (
            <Anchor className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="font-semibold text-foreground">
            {isConnected ? 'На волне!' : 'На якоре'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isConnected ? 'Плывем безопасно' : 'Корабль стоит в порту'}
          </p>
        </div>
      </div>

      {stats ? (
        <div className="flex justify-between border-t border-border pt-4">
          <div className="text-center flex-1">
            <p className="text-xs text-muted-foreground mb-1">Пинг</p>
            <p className="font-semibold text-foreground">{formatPing(stats.pingMs)}</p>
          </div>
          <div className="text-center flex-1 border-x border-border">
            <p className="text-xs text-muted-foreground mb-1">Скорость</p>
            <p className="font-semibold text-foreground">{formatSpeed(stats.speedMbps)}</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-xs text-muted-foreground mb-1">Трафик</p>
            <p className="font-semibold text-foreground">{formatBytes(stats.trafficBytes)}</p>
          </div>
        </div>
      ) : (
        <div className="border-t border-border pt-3">
          <EmptyState
            compact
            icon={Activity}
            title={isConnected ? 'Собираем статистику' : 'Нет данных о соединении'}
            description={
              isConnected
                ? 'Пинг, скорость и трафик появятся, как только их передаст VPN-клиент.'
                : 'Пинг, скорость и трафик будут показаны после подключения.'
            }
          />
        </div>
      )}
    </div>
  );
}
