'use client';

import { Home, HeartPulse, Activity, Zap, DollarSign, Compass, Target } from 'lucide-react';
import { motion } from 'framer-motion';

type TabType = 'home' | 'stress' | 'health' | 'energy' | 'earnings' | 'purpose' | 'productivity';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'home' as TabType, label: 'Главная', icon: Home },
  { id: 'stress' as TabType, label: 'Снизить стресс', icon: HeartPulse },
  { id: 'health' as TabType, label: 'Здоровье', icon: Activity },
  { id: 'energy' as TabType, label: 'Энергия', icon: Zap },
  { id: 'earnings' as TabType, label: 'Заработок', icon: DollarSign },
  { id: 'purpose' as TabType, label: 'Призвание', icon: Compass },
  { id: 'productivity' as TabType, label: 'Продуктивность', icon: Target },
];

export default function BottomNavigation({ 
  activeTab, 
  onTabChange 
}: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-card/90 shadow-[0_-18px_45px_rgba(2,44,34,0.35)] backdrop-blur-xl" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-7 items-center gap-1 py-2 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isActive ? { scale: 1 } : { scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-center transition-all ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                  : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
              }`}
            >
              <motion.div
                animate={isActive ? { rotate: 0, scale: 1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <motion.span 
                className="text-[8px] font-medium leading-none sm:text-[10px]"
                animate={isActive ? { opacity: 1 } : { opacity: 0.7 }}
              >
                {tab.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

