'use client';

import Image from 'next/image';
import { ChevronRight, MapPin } from 'lucide-react';
import type { Server } from '@/lib/types';
import { formatPing } from '@/lib/format';

interface ServerSelectorProps {
  server: Server | null;
  onClick: () => void;
}

export default function ServerSelector({ server, onClick }: ServerSelectorProps) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-2">Выбранный сервер</p>
      <button
        onClick={onClick}
        className="w-full bg-card rounded-2xl p-4 flex items-center justify-between hover:bg-card/80 active:scale-[0.98] transition-all"
      >
        {server ? (
          <>
            <div className="flex items-center gap-3">
              <div className="w-8 h-6 rounded overflow-hidden relative">
                <Image src={server.flagUrl} alt={server.country} fill className="object-cover" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{server.country}</p>
                <p className="text-xs text-muted-foreground">{server.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="font-semibold text-foreground">{formatPing(server.pingMs)}</p>
                <p className="text-xs text-muted-foreground">Пинг</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Сервер не выбран</p>
                <p className="text-xs text-muted-foreground">Нажмите, чтобы выбрать порт назначения</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </>
        )}
      </button>
    </div>
  );
}
