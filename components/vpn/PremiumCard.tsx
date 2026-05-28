'use client';

import { Crown, ChevronRight } from 'lucide-react';

interface PremiumCardProps {
  onClick: () => void;
}

export default function PremiumCard({ onClick }: PremiumCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-[#ffb703]/20 via-card to-[#2dd4bf]/20 border border-primary/40 rounded-[1.5rem] p-4 flex items-center justify-between shadow-lg shadow-black/10 hover:border-primary/70 active:scale-[0.98] transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Crown className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left">
          <p className="font-semibold text-foreground">Премиум отдых</p>
          <p className="text-xs text-muted-foreground">
            Максимальная скорость и все VPN-локации
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
