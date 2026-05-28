'use client';

import { Home, Anchor, User, Users, MessageCircle } from 'lucide-react';

type TabType = 'home' | 'servers' | 'cabinet' | 'referrals' | 'support';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'home' as TabType, label: 'Главная', icon: Home },
  { id: 'servers' as TabType, label: 'Серверы', icon: Anchor },
  { id: 'cabinet' as TabType, label: 'Кабинет', icon: User },
  { id: 'referrals' as TabType, label: 'Рефералы', icon: Users },
  { id: 'support' as TabType, label: 'Поддержка', icon: MessageCircle },
];

export default function BottomNavigation({ 
  activeTab, 
  onTabChange 
}: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center py-2 px-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
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
