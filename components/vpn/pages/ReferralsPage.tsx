'use client';

import { Users, Gift, Copy, Share2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'COURIER2024';
  const referralLink = `https://t.me/RichCourierVPN_bot?start=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Богатый Курьер VPN',
        text: 'Получи бесплатный VPN для работы курьером!',
        url: referralLink,
      });
    } else {
      handleCopy();
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-primary">5</p>
          <p className="text-sm text-muted-foreground">Приглашено</p>
        </div>
        <div className="bg-card rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-primary">150</p>
          <p className="text-sm text-muted-foreground">Бонусных дней</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-card rounded-2xl p-5">
        <h3 className="font-semibold text-foreground mb-3">Твоя реферальная ссылка</h3>
        <div className="bg-secondary rounded-xl p-3 flex items-center gap-2 mb-4">
          <code className="flex-1 text-sm text-muted-foreground truncate">
            {referralLink}
          </code>
          <button 
            onClick={handleCopy}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            {copied ? (
              <CheckCircle className="w-5 h-5 text-primary" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground" />
            )}
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

      {/* Rewards */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground">Награды за рефералов</span>
        </div>
        <ul className="space-y-3">
          {[
            { friends: 1, reward: '+30 дней премиум' },
            { friends: 5, reward: '+7 дней + бонус скорости' },
            { friends: 10, reward: '+14 дней + все серверы' },
            { friends: 25, reward: 'Бесплатный месяц!' },
          ].map((tier) => (
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
