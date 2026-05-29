'use client';

import { Palmtree, ShieldCheck } from 'lucide-react';

interface ConnectButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
}

export default function ConnectButton({ 
  isConnected, 
  isConnecting,
  onConnect 
}: ConnectButtonProps) {
  return (
    <button
      onClick={onConnect}
      disabled={isConnecting}
      className="w-full bg-gradient-to-r from-[#ffb703] via-[#ffc857] to-[#ffdd8a] hover:brightness-105 active:scale-[0.98] text-primary-foreground rounded-[1.5rem] p-4 sm:p-5 flex items-center justify-center gap-3 shadow-xl shadow-primary/25 transition-all disabled:opacity-70"
    >
      {isConnected ? (
        <ShieldCheck className={`w-5 h-5 ${isConnecting ? 'animate-pulse' : ''}`} />
      ) : (
        <Palmtree className={`w-5 h-5 ${isConnecting ? 'animate-pulse' : ''}`} />
      )}
      <div className="text-left">
        <p className="font-semibold">
          {isConnecting ? 'Открываем пляж...' : isConnected ? 'VPN включен' : 'Начать пляжный час'}
        </p>
        <p className="text-xs opacity-80">
          {isConnected ? 'Безопасный отдых онлайн' : 'Запустить Bali VPN и зарядиться' }
        </p>
      </div>
    </button>
  );
}
