'use client';

import { User, Crown, Clock, Shield, ChevronRight } from 'lucide-react';

interface CabinetPageProps {
  onUpgrade?: () => void;
}

export default function CabinetPage({ onUpgrade }: CabinetPageProps) {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      {/* Profile Header */}
      <div className="bg-card rounded-2xl p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-foreground">Курьер</h2>
          <p className="text-sm text-muted-foreground">ID: 12345678</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="px-2 py-0.5 bg-secondary rounded-full text-xs text-primary font-medium">
              Бесплатный план
            </span>
          </div>
        </div>
      </div>

      {/* Premium Card */}
      <button 
        onClick={onUpgrade}
        className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-5 text-left hover:border-primary/50 active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3 mb-3">
          <Crown className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground">Премиум доступ</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Разблокируйте все серверы и максимальную скорость
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">299 руб/мес</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </button>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Время подключения</span>
          </div>
          <p className="text-xl font-bold text-foreground">24ч 35м</p>
        </div>
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Трафик</span>
          </div>
          <p className="text-xl font-bold text-foreground">12.5 GB</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-card rounded-2xl overflow-hidden">
        {[
          { label: 'История подключений', icon: Clock },
          { label: 'Настройки', icon: Shield },
        ].map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${
              index > 0 ? 'border-t border-border' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
