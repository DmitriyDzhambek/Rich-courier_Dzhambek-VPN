'use client';

import { Signal, MapPin, Zap, ServerOff, Check } from 'lucide-react';
import Image from 'next/image';
import type { Server } from '@/lib/types';
import { formatPing } from '@/lib/format';
import EmptyState from '@/components/vpn/EmptyState';

interface ServersPageProps {
  servers: Server[];
  selectedServerId: string | null;
  onSelectServer?: (server: Server) => void;
}

function ServerRow({
  server,
  selected,
  onSelect,
}: {
  server: Server;
  selected: boolean;
  onSelect?: (server: Server) => void;
}) {
  const hasLoad = server.loadPercent != null;
  return (
    <button
      onClick={() => onSelect?.(server)}
      aria-pressed={selected}
      className={
        server.premium
          ? 'bg-gradient-to-r from-card to-primary/10 border border-primary/30 rounded-2xl p-4 flex items-center gap-4 hover:border-primary/50 active:scale-[0.98] transition-all'
          : `bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-card/80 active:scale-[0.98] transition-all border ${
              selected ? 'border-primary/60' : 'border-transparent'
            }`
      }
    >
      <Image
        src={server.flagUrl}
        alt={server.country}
        width={40}
        height={30}
        className="rounded-md object-cover"
      />
      <div className="flex-1 text-left">
        <p className="font-semibold text-foreground flex items-center gap-2">
          {server.country}
          {selected && <Check className="w-4 h-4 text-primary" />}
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {server.city}
        </p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${server.pingMs != null ? 'text-primary' : 'text-muted-foreground'}`}>
          {formatPing(server.pingMs)}
        </p>
        {hasLoad ? (
          <div className="w-16 h-1.5 bg-secondary rounded-full mt-1" aria-label={`Загрузка ${server.loadPercent}%`}>
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${server.loadPercent}%` }} />
          </div>
        ) : (
          <p className="text-[10px] text-muted-foreground mt-1">нагрузка неизвестна</p>
        )}
      </div>
    </button>
  );
}

export default function ServersPage({ servers, selectedServerId, onSelectServer }: ServersPageProps) {
  const free = servers.filter((s) => !s.premium);
  const premium = servers.filter((s) => s.premium);

  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Signal className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Серверы</h1>
          <p className="text-sm text-muted-foreground">Выберите сервер для подключения</p>
        </div>
      </div>

      {servers.length === 0 ? (
        <EmptyState
          icon={ServerOff}
          title="Серверы пока недоступны"
          description="Список появится, когда сервер приложения передаст доступные локации."
        />
      ) : (
        <>
          <p className="text-xs text-muted-foreground -mt-2">
            Пинг и нагрузка измеряются VPN-клиентом и показываются только после реального замера.
          </p>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Бесплатные</h2>
            {free.length === 0 ? (
              <EmptyState compact icon={ServerOff} title="Нет бесплатных серверов" />
            ) : (
              free.map((server) => (
                <ServerRow key={server.id} server={server} selected={server.id === selectedServerId} onSelect={onSelectServer} />
              ))
            )}
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Премиум
            </h2>
            {premium.length === 0 ? (
              <EmptyState compact icon={ServerOff} title="Нет премиум-серверов" />
            ) : (
              premium.map((server) => (
                <ServerRow key={server.id} server={server} selected={server.id === selectedServerId} onSelect={onSelectServer} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
