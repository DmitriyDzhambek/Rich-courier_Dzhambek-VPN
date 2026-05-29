'use client';

import { useState } from 'react';
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

type TabType = 'home' | 'servers' | 'cabinet' | 'referrals' | 'support' | 'device' | 'tips';

interface SelectedServer {
  country: string;
  city: string;
  flagUrl: string;
  ping: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<SelectedServer>({
    country: 'Indonesia',
    city: 'Кута',
    flagUrl: 'https://flagcdn.com/w80/id.png',
    ping: '30 ms',
  });

  const handleConnect = () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(!isConnected);
      setIsConnecting(false);
    }, 1500);
  };

  const handleSelectServer = (server: { country: string; city: string; flagUrl: string; ping: string }) => {
    setSelectedServer(server);
    setActiveTab('home');
  };

  const renderContent = () => {
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
                onClick={() => setActiveTab('servers')}
              />

              <PremiumCard onClick={() => setActiveTab('cabinet')} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen min-h-[100dvh] bg-background pb-20 safe-area-inset">
      {renderContent()}

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
