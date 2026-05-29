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
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Рефералы</h1>
            <p className="text-sm text-muted-foreground">Как первый час дня определяет ваш успех</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Пока что программа рефералов пустая — скоро станет новой историей.</p>
      </div>

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

      <div className="bg-gradient-to-r from-card/80 via-card to-primary/5 border border-primary/20 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground">Условия рефералов</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Пока премиум-рефералы только готовятся. Награды и условия появятся позже, когда история начнёт свой новый виток.
        </p>
      </div>
    </div>
  );
}
