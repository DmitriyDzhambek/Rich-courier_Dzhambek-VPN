'use client';

import { Palmtree, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConnectButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
}

export default function ConnectButton({ 
  isConnected, 
  isConnecting,
  onConnect 
}: ConnectButtonProps) {
  return (
    <motion.button
      onClick={onConnect}
      disabled={isConnecting}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-gradient-to-r from-[#ffb703] via-[#ffc857] to-[#ffdd8a] hover:brightness-105 active:scale-[0.98] text-primary-foreground rounded-[1.5rem] p-4 sm:p-5 flex items-center justify-center gap-3 shadow-xl shadow-primary/25 transition-all disabled:opacity-70"
    >
      <motion.div
        animate={isConnecting ? { rotate: 360 } : { rotate: 0 }}
        transition={isConnecting ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
      >
        {isConnected ? (
          <ShieldCheck className="w-5 h-5" />
        ) : (
          <Palmtree className="w-5 h-5" />
        )}
      </motion.div>
      <div className="text-left">
        <motion.p 
          className="font-semibold"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0.7 }}
        >
          {isConnecting ? 'Открываем пляж...' : isConnected ? 'VPN включен' : 'Начать пляжный час'}
        </motion.p>
        <p className="text-xs opacity-80">
          {isConnected ? 'Безопасный отдых онлайн' : 'Запустить Bali VPN и зарядиться' }
        </p>
      </div>
    </motion.button>
  );
}
