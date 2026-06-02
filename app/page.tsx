'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/vpn/HeroSection';
import BottomNavigation from '@/components/vpn/BottomNavigation';
import LifeWheel from '@/components/wellness/LifeWheel';
import JournalSection from '@/components/wellness/JournalSection';
import BlogTab from '@/components/wellness/BlogTab';

type TabType = 'home' | 'stress' | 'health' | 'energy' | 'earnings' | 'purpose' | 'productivity';

const tabOrder: TabType[] = ['home', 'stress', 'health', 'energy', 'earnings', 'purpose', 'productivity'];

const tabInfo: Record<Exclude<TabType, 'home'>, { title: string; placeholder: string }> = {
  stress: {
    title: 'Снизить уровень стресса',
    placeholder: 'Запишите, как вы справляетесь со стрессом утром. Какие практики релаксации вам помогают? Что меняется в вашем состоянии?',
  },
  health: {
    title: 'Улучшить общее здоровье',
    placeholder: 'Записывайте свои утренние привычки: упражнения, питание, медитацию. Отслеживайте прогресс в похудении и укреплении здоровья.',
  },
  energy: {
    title: 'Просыпаться с зарядом энергии',
    placeholder: 'Опишите, как вы начинаете день. Какие действия дают вам энергию? Как меняется ваш уровень активности?',
  },
  earnings: {
    title: 'Больше зарабатывать',
    placeholder: 'Планируйте финансовые цели на день. Записывайте идеи для заработка, действия по развитию, результаты.',
  },
  purpose: {
    title: 'Найти своё призвание',
    placeholder: 'Размышляйте о своем истинном предназначении. Какие занятия вас вдохновляют? К чему вы стремитесь?',
  },
  productivity: {
    title: 'Повысить продуктивность',
    placeholder: 'Планируйте ключевые задачи дня. Отмечайте, что удалось завершить. Анализируйте, как утро влияет на вашу продуктивность.',
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [loadingTab, setLoadingTab] = useState<TabType | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
      const time = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setCurrentDate(date.charAt(0).toUpperCase() + date.slice(1));
      setCurrentTime(time);
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60000);
    return () => window.clearInterval(interval);
  }, []);

  const handleTabChange = (newTab: TabType) => {
    if (newTab === activeTab) return;
    setLoadingTab(newTab);
    window.setTimeout(() => {
      setActiveTab(newTab);
      setLoadingTab(null);
    }, 250);
  };

  const handleOpenJournal = () => {
    handleTabChange('home');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const difference = touchStart - touchEnd;

    if (Math.abs(difference) > swipeThreshold) {
      const currentIndex = tabOrder.indexOf(activeTab);

      if (difference > 0 && currentIndex < tabOrder.length - 1) {
        handleTabChange(tabOrder[currentIndex + 1]);
      }

      if (difference < 0 && currentIndex > 0) {
        handleTabChange(tabOrder[currentIndex - 1]);
      }
    }
  };

  const renderContent = () => {
    if (loadingTab) {
      return (
        <div className="mx-auto flex max-w-4xl items-center justify-center p-10 text-white/70">
          Загрузка раздела...
        </div>
      );
    }

    if (activeTab === 'home') {
      return (
        <div className="min-h-[100dvh] w-full overflow-y-auto px-4 sm:px-6 pb-28">
          <HeroSection />

          <div className="mx-auto mt-6 max-w-5xl space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-[0_35px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Bali</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Как первый час дня определяет ваш успех</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
                Настройте своё утро так, чтобы заряд энергии, ясность мыслей и внутренний баланс
                стали основой для продуктивного и гармоничного дня.
              </p>
            </section>

            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <LifeWheel />
              <JournalSection currentDate={currentDate} currentTime={currentTime} />
            </div>
          </div>
        </div>
      );
    }

    const info = tabInfo[activeTab];
    return (
      <div className="px-4 sm:px-6">
        <div className="mx-auto mt-6 max-w-5xl pb-28">
          <BlogTab tabId={activeTab} title={info.title} placeholder={info.placeholder} />
        </div>
      </div>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex flex-col min-h-screen min-h-[100dvh] bg-background pb-20 safe-area-inset"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </motion.div>
  );
}
