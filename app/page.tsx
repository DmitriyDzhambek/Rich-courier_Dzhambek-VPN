'use client';

import { useState } from 'react';
import HeroSection from '@/components/vpn/HeroSection';
import VPNStatusCard from '@/components/vpn/VPNStatusCard';
import ConnectButton from '@/components/vpn/ConnectButton';
import ServerSelector from '@/components/vpn/ServerSelector';
import PremiumCard from '@/components/vpn/PremiumCard';
import BottomNavigation from '@/components/vpn/BottomNavigation';
import AuthNotice from '@/components/vpn/AuthNotice';
import ServersPage from '@/components/vpn/pages/ServersPage';
import CabinetPage from '@/components/vpn/pages/CabinetPage';
import ReferralsPage from '@/components/vpn/pages/ReferralsPage';
import SupportPage from '@/components/vpn/pages/SupportPage';
import { useAuth } from '@/hooks/use-auth';
import { servers } from '@/lib/servers';
import type { ConnectionHistoryItem, ConnectionStats, ReferralStats, Server, UsageStats } from '@/lib/types';

type TabType = 'home' | 'servers' | 'cabinet' | 'referrals' | 'support';

/**
 * No data source exists yet for these — the UI must render empty states
 * instead of placeholder numbers until a backend/VPN client provides them.
 */
const connectionStats: ConnectionStats | null = null;
const usageStats: UsageStats | null = null;
const connectionHistory: ConnectionHistoryItem[] | null = null;
const referralStats: ReferralStats | null = null;

export default function Home() {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  const handleConnect = () => {
    if (isConnecting) return;
    if (!selectedServer) {
      setActiveTab('servers');
      return;
    }

    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(!isConnected);
      setIsConnecting(false);
    }, 1500);
  };

  const handleSelectServer = (server: Server) => {
    setSelectedServer(server);
    setActiveTab('home');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'servers':
        return (
          <ServersPage
            servers={servers}
            selectedServerId={selectedServer?.id ?? null}
            onSelectServer={handleSelectServer}
          />
        );
      case 'cabinet':
        return (
          <CabinetPage
            auth={auth}
            usage={usageStats}
            history={connectionHistory}
            onLogout={auth.logout}
          />
        );
      case 'referrals':
        return <ReferralsPage auth={auth} referrals={referralStats} />;
      case 'support':
        return <SupportPage />;
      default:
        return (
          <>
            <HeroSection />
            <AuthNotice onAuthChanged={auth.refresh} />
            <div className="flex flex-col gap-3 sm:gap-4 px-4 mt-3 sm:mt-4">
              <VPNStatusCard isConnected={isConnected} stats={connectionStats} />

              <ConnectButton
                isConnected={isConnected}
                isConnecting={isConnecting}
                hasServer={selectedServer !== null}
                onConnect={handleConnect}
              />

              <ServerSelector server={selectedServer} onClick={() => setActiveTab('servers')} />

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
