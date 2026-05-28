'use client';

import { Palmtree, ShieldCheck } from 'lucide-react';

interface VPNStatusCardProps {
  isConnected: boolean;
  ping: string;
  speed: string;
  traffic: string;
}

export default function VPNStatusCard({ 
  isConnected, 
  ping, 
  speed, 
  traffic 
}: VPNStatusCardProps) {
  return (
    <div className="bg-card/90 rounded-[1.5rem] border border-white/10 p-3 shadow-lg shadow-black/10 sm:p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isConnected ? 'bg-primary/20' : 'bg-muted'
        }`}>
          {isConnected ? (
            <ShieldCheck className="w-5 h-5 text-primary" />
          ) : (
            <Palmtree className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="font-semibold text-foreground">
            {isConnected ? 'Bali VPN активен' : 'Готов к пляжному интернету'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isConnected ? 'Безопасный интернет без лишнего шума' : 'Нажмите кнопку, чтобы включить Bali VPN'}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between border-t border-border pt-4">
        <div className="text-center flex-1">
          <p className="text-xs text-muted-foreground mb-1">Пинг</p>
          <p className="font-semibold text-foreground">{ping}</p>
        </div>
        <div className="text-center flex-1 border-x border-border">
          <p className="text-xs text-muted-foreground mb-1">Скорость</p>
          <p className="font-semibold text-foreground">{speed}</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-xs text-muted-foreground mb-1">Трафик</p>
          <p className="font-semibold text-foreground">{traffic}</p>
        </div>
      </div>
    </div>
  );
}
