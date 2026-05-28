'use client';

import { Sailboat, Anchor } from 'lucide-react';

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
      className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground rounded-2xl p-3 sm:p-4 flex items-center justify-center gap-3 transition-all disabled:opacity-70"
    >
      {isConnected ? (
        <Anchor className={`w-5 h-5 ${isConnecting ? 'animate-pulse' : ''}`} />
      ) : (
        <Sailboat className={`w-5 h-5 ${isConnecting ? 'animate-pulse' : ''}`} />
      )}
      <div className="text-left">
        <p className="font-semibold">
          {isConnecting ? 'Отплываем...' : isConnected ? 'Бросить якорь' : 'Отплыть'}
        </p>
        <p className="text-xs opacity-80">
          {isConnected ? 'Остановить плавание' : 'Выйти в открытое море'}
        </p>
      </div>
    </button>
  );
}
