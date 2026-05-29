'use client';

import { Home, Waves, User, Users, MessageCircle, Smartphone } from 'lucide-react';

type TabType = 'home' | 'servers' | 'cabinet' | 'referrals' | 'support' | 'device';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'home' as TabType, label: 'Главная', icon: Home },
  { id: 'servers' as TabType, label: 'Сервис', icon: Waves },
  { id: 'cabinet' as TabType, label: 'Кабинет', icon: User },
  { id: 'device' as TabType, label: 'Устройство', icon: Smartphone },
  { id: 'referrals' as TabType, label: 'Рефералы', icon: Users },
  { id: 'support' as TabType, label: 'Поддержка', icon: MessageCircle },
];

export default function BottomNavigation({ 
  activeTab, 
  onTabChange 
}: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-card/90 shadow-[0_-18px_45px_rgba(2,44,34,0.35)] backdrop-blur-xl" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-6 items-center gap-1 py-2 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-center transition-all active:scale-95 ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                  : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
