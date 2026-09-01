'use client';

import { Users, Gift, Copy, Share2, CheckCircle, Link2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import type { AuthState } from '@/hooks/use-auth';
import type { ReferralStats } from '@/lib/types';
import EmptyState from '@/components/vpn/EmptyState';
import YandexLoginButton from '@/components/vpn/YandexLoginButton';

const BOT_USERNAME = 'RichCourierVPN_bot';

const rewardTiers = [
  { friends: 1, reward: '+30 дней премиум' },
  { friends: 5, reward: '+7 дней + бонус скорости' },
  { friends: 10, reward: '+14 дней + все серверы' },
  { friends: 25, reward: 'Бесплатный месяц!' },
];

interface ReferralsPageProps {
  auth: AuthState;
  /** Referral data from the backend. Null until it exists. */
  referrals: ReferralStats | null;
}

export default function ReferralsPage({ auth, referrals }: ReferralsPageProps) {
  const [copied, setCopied] = useState(false);
  const user = auth.status === 'ready' ? auth.user : null;
  const referralLink = referrals ? `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(referrals.code)}` : null;

  const handleCopy = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!referralLink) return;
    if (navigator.share) {
      await navigator.share({
        title: 'Богатый Курьер VPN',
        text: 'Получи VPN для работы курьером!',
        url: referralLink,
      });
    } else {
      await handleCopy();
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Рефералы</h1>
          <p className="text-sm text-muted-foreground">Приглашай друзей и получай бонусы</p>
        </div>
      </div>

      {!user ? (
        <EmptyState
          icon={UserPlus}
          title="Войдите, чтобы получить реферальную ссылку"
          description="Приглашения и бонусные дни привязываются к вашему аккаунту."
          action={<YandexLoginButton status={auth.status} configured={auth.configured} />}
        />
      ) : referrals ? (
        <>
          {/* Stats Cards */}
          {referrals.invitedCount === 0 ? (
            <EmptyState
              compact
              icon={Users}
              title="Пока никого не пригласили"
              description="Поделитесь ссылкой ниже — первый друг принесёт бонусные дни."
            />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-primary">{referrals.invitedCount}</p>
                <p className="text-sm text-muted-foreground">Приглашено</p>
              </div>
              <div className="bg-card rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-primary">{referrals.bonusDays}</p>
                <p className="text-sm text-muted-foreground">Бонусных дней</p>
              </div>
            </div>
          )}

          {/* Referral Link */}
          <div className="bg-card rounded-2xl p-5">
            <h3 className="font-semibold text-foreground mb-3">Твоя реферальная ссылка</h3>
            <div className="bg-secondary rounded-xl p-3 flex items-center gap-2 mb-4">
              <code className="flex-1 text-sm text-muted-foreground truncate">{referralLink}</code>
              <button onClick={handleCopy} aria-label="Скопировать" className="p-2 hover:bg-card rounded-lg transition-colors">
                {copied ? <CheckCircle className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl py-3 flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
              >
                <Copy className="w-4 h-4" />
                Копировать
              </button>
              <button
                onClick={handleShare}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
              >
                <Share2 className="w-4 h-4" />
                Поделиться
              </button>
            </div>
          </div>
        </>
      ) : (
        <EmptyState
          icon={Link2}
          title="Реферальная ссылка ещё не выдана"
          description="Ссылка и счётчики появятся, когда сервер приложения создаст ваш реферальный код."
        />
      )}

      {/* Rewards */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground">Награды за рефералов</span>
        </div>
        <ul className="space-y-3">
          {rewardTiers.map((tier) => (
            <li key={tier.friends} className="flex items-center justify-between">
              <span className="text-muted-foreground">{tier.friends} друзей</span>
              <span className="text-primary font-medium">{tier.reward}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
