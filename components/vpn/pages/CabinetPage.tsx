'use client';

import { User, Crown, Clock, Shield, ChevronRight } from 'lucide-react';

interface CabinetPageProps {
  onUpgrade?: () => void;
}

export default function CabinetPage({ onUpgrade }: CabinetPageProps) {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Кабинет</h1>
            <p className="text-sm text-muted-foreground">Как первый час дня определяет ваш успех</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Премиум-история ещё не начинается. Ваша новая глава скоро будет готова.</p>
      </div>

      <div className="bg-card rounded-2xl p-5 text-left">
        <div className="flex items-center gap-3 mb-3">
          <Crown className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground">Премиум-путь</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Здесь появится история подписки и все новые награды для Premium.
        </p>
        <button
          onClick={onUpgrade}
          className="w-full rounded-2xl bg-primary text-primary-foreground py-3 font-semibold transition hover:brightness-110 active:scale-[0.98]"
        >
          Открыть новую историю
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-4">
          <p className="text-sm text-muted-foreground mb-2">План</p>
          <p className="text-2xl font-bold text-foreground">Пусто</p>
        </div>
        <div className="bg-card rounded-2xl p-4">
          <p className="text-sm text-muted-foreground mb-2">Трафик</p>
          <p className="text-2xl font-bold text-foreground">—</p>
        </div>
      </div>

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
