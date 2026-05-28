'use client';

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface ServerSelectorProps {
  country: string;
  city: string;
  flagUrl: string;
  ping: string;
  onClick: () => void;
}

export default function ServerSelector({ 
  country, 
  city, 
  flagUrl, 
  ping,
  onClick 
}: ServerSelectorProps) {
  return (
    <div className="mx-4">
      <p className="text-xs text-muted-foreground mb-2">Выбранная VPN-локация</p>
      <button
        onClick={onClick}
        className="w-full bg-card/90 border border-white/10 rounded-[1.5rem] p-4 flex items-center justify-between shadow-lg shadow-black/10 transition-all active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-6 rounded overflow-hidden relative">
            <Image
              src={flagUrl}
              alt={country}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">{country}</p>
            <p className="text-xs text-muted-foreground">{city}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="font-semibold text-foreground">{ping}</p>
            <p className="text-xs text-muted-foreground">Пинг</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </button>
    </div>
  );
}
