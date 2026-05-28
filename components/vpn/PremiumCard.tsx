'use client';

import { Crown, ChevronRight } from 'lucide-react';

interface PremiumCardProps {
  onClick: () => void;
}

export default function PremiumCard({ onClick }: PremiumCardProps) {
  return (
    <button
      onClick={onClick}
      className="mx-4 w-[calc(100%-2rem)] bg-card rounded-2xl p-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Crown className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left">
          <p className="font-semibold text-foreground">Премиум доступ</p>
          <p className="text-xs text-muted-foreground">
            Больше серверов и максимальная скорость
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
