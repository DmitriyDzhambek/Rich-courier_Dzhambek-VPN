'use client';

import { Sailboat, Anchor } from 'lucide-react';

interface ConnectButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  hasServer: boolean;
  onConnect: () => void;
}

export default function ConnectButton({ 
  isConnected, 
  isConnecting,
  hasServer,
  onConnect 
}: ConnectButtonProps) {
  const title = isConnecting
    ? 'Отплываем...'
    : isConnected
      ? 'Бросить якорь'
      : hasServer
        ? 'Отплыть'
        : 'Выбрать сервер';
  const subtitle = isConnected
    ? 'Остановить плавание'
    : hasServer
      ? 'Выйти в открытое море'
      : 'Сначала выберите порт назначения';

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
        <p className="font-semibold">{title}</p>
        <p className="text-xs opacity-80">{subtitle}</p>
      </div>
    </button>
  );
}
