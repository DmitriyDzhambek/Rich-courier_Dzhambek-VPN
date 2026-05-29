'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import HeroSection from '@/components/vpn/HeroSection';
import VPNStatusCard from '@/components/vpn/VPNStatusCard';
import ConnectButton from '@/components/vpn/ConnectButton';
import ServerSelector from '@/components/vpn/ServerSelector';
import PremiumCard from '@/components/vpn/PremiumCard';
import BottomNavigation from '@/components/vpn/BottomNavigation';
import ServersPage from '@/components/vpn/pages/ServersPage';
import CabinetPage from '@/components/vpn/pages/CabinetPage';
import ReferralsPage from '@/components/vpn/pages/ReferralsPage';
import SupportPage from '@/components/vpn/pages/SupportPage';
import AddDevicePage from '@/components/vpn/pages/AddDevicePage';
import AuthorTipsPage from '@/components/vpn/pages/AuthorTipsPage';
import { PageSkeleton, StatusCardSkeleton } from '@/components/vpn/SkeletonLoader';
import { useHaptic } from '@/hooks/use-haptic';

type TabType = 'home' | 'servers' | 'cabinet' | 'referrals' | 'support' | 'device' | 'tips';

interface SelectedServer {
  country: string;
  city: string;
  flagUrl: string;
  ping: string;
}

const tabOrder: TabType[] = ['home', 'servers', 'cabinet', 'device', 'referrals', 'support', 'tips'];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [loadingTab, setLoadingTab] = useState<TabType | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const haptic = useHaptic();

  const [selectedServer, setSelectedServer] = useState<SelectedServer>({
    country: 'Indonesia',
    city: 'Кута',
    flagUrl: 'https://flagcdn.com/w80/id.png',
    ping: '30 ms',
  });

  const handleConnect = () => {
    if (isConnecting) return;
    
    haptic.medium();
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(!isConnected);
      haptic.success();
      toast.success(
        isConnected ? 'VPN отключён' : 'VPN подключён',
        {
          description: isConnected 
            ? 'Ваше соединение деактивировано' 
            : 'Вы защищены и анонимны',
          duration: 3000,
        }
      );
      setIsConnecting(false);
    }, 1500);
  };

  const handleTabChange = (newTab: TabType) => {
    haptic.tap();
    if (newTab === activeTab) return;
    
    setLoadingTab(newTab);
    setTimeout(() => {
      setActiveTab(newTab);
      setLoadingTab(null);
    }, 300);
  };

  const handleSelectServer = (server: SelectedServer) => {
    haptic.light();
    setSelectedServer(server);
    handleTabChange('home');
    toast.success('Сервер выбран', {
      description: `${server.country} • ${server.city}`,
      duration: 2000,
    });
  };

  // Свайп-навигация
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
      
      if (difference > 0) {
        // Свайп влево - переход к следующей вкладке
        if (currentIndex < tabOrder.length - 1) {
          handleTabChange(tabOrder[currentIndex + 1]);
        }
      } else {
        // Свайп вправо - переход к предыдущей вкладке
        if (currentIndex > 0) {
          handleTabChange(tabOrder[currentIndex - 1]);
        }
      }
    }
  };

  const renderContent = () => {
    if (loadingTab && loadingTab !== 'home') {
      return <PageSkeleton />;
    }

    switch (activeTab) {
      case 'servers':
        return <ServersPage onSelectServer={handleSelectServer} />;
      case 'cabinet':
        return <CabinetPage />;
      case 'referrals':
        return <ReferralsPage />;
      case 'support':
        return <SupportPage />;
      case 'device':
        return <AddDevicePage />;
      case 'tips':
        return <AuthorTipsPage />;
      default:
        return (
          <>
            <HeroSection />
            {loadingTab === 'home' ? (
              <StatusCardSkeleton />
            ) : (
              <div className="flex flex-col gap-3 sm:gap-4 px-4 mt-3 sm:mt-4">
                <VPNStatusCard
                  isConnected={isConnected}
                  ping={isConnected ? selectedServer.ping : '-- ms'}
                  speed={isConnected ? '85 Mbps' : '-- Mbps'}
                  traffic={isConnected ? '1.2 GB' : '-- MB'}
                />

                <ConnectButton
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  onConnect={handleConnect}
                />

                <ServerSelector
                  country={selectedServer.country}
                  city={selectedServer.city}
                  flagUrl={selectedServer.flagUrl}
                  ping={isConnected ? selectedServer.ping : '-- ms'}
                  onClick={() => handleTabChange('servers')}
                />

                <PremiumCard onClick={() => handleTabChange('cabinet')} />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <>
      <Toaster position="top-center" />
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

        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </motion.div>
    </>
  );
}

      {renderContent()}

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
