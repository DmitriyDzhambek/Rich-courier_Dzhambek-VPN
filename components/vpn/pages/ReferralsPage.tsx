'use client';

import { Users, Gift, Copy, Share2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="flex flex-col gap-2 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
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
      </motion.div>

      <motion.div 
        className="bg-card rounded-2xl p-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="font-semibold text-foreground mb-3">Твоя реферальная ссылка</h3>
        <div className="bg-secondary rounded-xl p-3 flex items-center gap-2 mb-4">
          <code className="flex-1 text-sm text-muted-foreground truncate">
            {referralLink}
          </code>
          <motion.button 
            onClick={handleCopy}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            {copied ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <CheckCircle className="w-5 h-5 text-primary" />
              </motion.div>
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground" />
            )}
          </motion.button>
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl py-3 flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
          >
            <Copy className="w-4 h-4" />
            Копировать
          </motion.button>
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4" />
            Поделиться
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-card/80 via-card to-primary/5 border border-primary/20 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Gift className="w-6 h-6 text-primary" />
          </motion.div>
          <span className="font-bold text-foreground">Условия рефералов</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Пока премиум-рефералы только готовятся. Награды и условия появятся позже, когда история начнёт свой новый виток.
        </p>
      </motion.div>
    </div>
  );
}
