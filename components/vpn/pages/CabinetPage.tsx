'use client';

import { User, Crown, Clock, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CabinetPageProps {
  onUpgrade?: () => void;
}

export default function CabinetPage({ onUpgrade }: CabinetPageProps) {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <motion.div 
        className="flex flex-col gap-2 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Кабинет</h1>
            <p className="text-sm text-muted-foreground">Как первый час дня определяет ваш успех</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Премиум-история ещё не начинается. Ваша новая глава скоро будет готова.</p>
      </motion.div>

      <motion.div 
        className="bg-card rounded-2xl p-5 text-left"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="w-6 h-6 text-primary" />
          </motion.div>
          <span className="font-bold text-foreground">Премиум-путь</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Здесь появится история подписки и все новые награды для Premium.
        </p>
        <motion.button
          onClick={onUpgrade}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl bg-primary text-primary-foreground py-3 font-semibold transition hover:brightness-110 active:scale-[0.98]"
        >
          Открыть новую историю
        </motion.button>
      </motion.div>

      <motion.div 
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <motion.div 
          className="bg-card rounded-2xl p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-muted-foreground mb-2">План</p>
          <p className="text-2xl font-bold text-foreground">Пусто</p>
        </motion.div>
        <motion.div 
          className="bg-card rounded-2xl p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Трафик</p>
          <p className="text-2xl font-bold text-foreground">—</p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="bg-card rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {[
          { label: 'История подключений', icon: Clock },
          { label: 'Настройки', icon: Shield },
        ].map((item, index) => (
          <motion.button
            key={item.label}
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            className={`w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${
              index > 0 ? 'border-t border-border' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">{item.label}</span>
            </div>
            <motion.div
              animate={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
