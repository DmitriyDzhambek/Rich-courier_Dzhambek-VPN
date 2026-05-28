'use client';

import { Compass, ChevronRight } from 'lucide-react';

interface PremiumCardProps {
  onClick: () => void;
}

export default function PremiumCard({ onClick }: PremiumCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-card to-primary/10 border border-primary/30 rounded-2xl p-4 flex items-center justify-between hover:border-primary/50 active:scale-[0.98] transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Compass className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left">
          <p className="font-semibold text-foreground">Капитанский доступ</p>
          <p className="text-xs text-muted-foreground">
            Все порты мира и попутный ветер
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
