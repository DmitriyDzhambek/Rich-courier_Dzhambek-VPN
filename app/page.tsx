'use client';

import { useState } from 'react';
import HeroSection from '@/components/vpn/HeroSection';
import VPNStatusCard from '@/components/vpn/VPNStatusCard';
import ConnectButton from '@/components/vpn/ConnectButton';
import ServerSelector from '@/components/vpn/ServerSelector';
import PremiumCard from '@/components/vpn/PremiumCard';
import BottomNavigation from '@/components/vpn/BottomNavigation';

type TabType = 'home' | 'servers' | 'cabinet' | 'referrals' | 'support';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(!isConnected);
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen min-h-[100dvh] bg-background pb-20 safe-area-inset">
      <HeroSection />
      
      {/* Main content with responsive padding */}
      <div className="flex flex-col gap-3 sm:gap-4 px-4 mt-3 sm:mt-4">
        <VPNStatusCard
          isConnected={isConnected}
          ping={isConnected ? '45 ms' : '-- ms'}
          speed={isConnected ? '85 Mbps' : '-- Mbps'}
          traffic={isConnected ? '1.2 GB' : '-- MB'}
        />

        <ConnectButton
          isConnected={isConnected}
          isConnecting={isConnecting}
          onConnect={handleConnect}
        />

        <ServerSelector
          country="Netherlands"
          city="Амстердам"
          flagUrl="https://flagcdn.com/w80/nl.png"
          ping={isConnected ? '45 ms' : '-- ms'}
          onClick={() => setActiveTab('servers')}
        />

        <PremiumCard onClick={() => setActiveTab('cabinet')} />
      </div>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
