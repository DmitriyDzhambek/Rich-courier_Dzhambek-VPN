'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const segments = [
  { icon: '😴', label: 'Сон', color: 'from-blue-500/40 to-blue-600/20' },
  { icon: '🥗', label: 'Питание', color: 'from-green-500/40 to-green-600/20' },
  { icon: '🏃', label: 'Движение', color: 'from-orange-500/40 to-orange-600/20' },
  { icon: '⚖️', label: 'Баланс', color: 'from-purple-500/40 to-purple-600/20' },
  { icon: '📚', label: 'Развитие', color: 'from-indigo-500/40 to-indigo-600/20' },
  { icon: '⚡', label: 'Заряд', color: 'from-yellow-500/40 to-yellow-600/20' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function LifeWheel() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#031918]/90 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: "url('/images/background.jpg'), url('/images/courier-bike.png')", backgroundSize: 'cover, contain', backgroundPosition: 'right center, center', backgroundRepeat: 'no-repeat, no-repeat' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent" />
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative space-y-8">
        {/* Заголовок */}
        <motion.div className="space-y-3 text-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.35em] font-medium text-primary/90">Управление жизнью</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            Колесо жизни
          </h2>
          <p className="max-w-2xl text-base leading-7 text-white/75 font-medium">
            Шесть ключевых областей для гармоничного утра. Ведите дневник, отслеживайте баланс и выстраивайте день,
            начиная с ясности и энергии.
          </p>
        </motion.div>

        {/* Интерактивное колесо */}
        <motion.div
          className="relative flex flex-col items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative h-[320px] w-[320px] md:h-[380px] md:w-[380px]">
            {/* Фоновые круги */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 bg-gradient-to-br from-white/12 via-white/5 to-transparent shadow-[inset_0_0_60px_rgba(255,255,255,0.08)]" />
            <div className="absolute inset-8 rounded-full border border-white/15 bg-white/[0.03]" />
            <div className="absolute inset-16 rounded-full border border-white/10" />

            {/* Сегменты вокруг круга */}
            <div className="absolute inset-0 flex items-center justify-center">
              {segments.map((segment, index) => {
                const angle = (index / segments.length) * 360;
                const radius = 130;
                const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                return (
                  <motion.div
                    key={segment.label}
                    className="absolute"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      className={`flex flex-col items-center gap-2 rounded-3xl bg-gradient-to-br ${segment.color} border border-white/20 px-4 py-3 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all`}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">{segment.icon}</span>
                      <span className="text-xs font-bold text-white text-center whitespace-nowrap">{segment.label}</span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Центральный блок */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-white/30 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent p-6 text-center shadow-[0_0_40px_rgba(255,200,87,0.2)] backdrop-blur-xl">
                <div className="text-3xl">📔</div>
                <strong className="text-sm font-black text-white leading-tight">Вести<br />дневник</strong>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Кнопка действия */}
        <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <button 
            onClick={() => {
              const journalInput = document.querySelector('.journal-input') as HTMLTextAreaElement;
              if (journalInput) {
                journalInput.focus();
              }
            }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            Начать ведение дневника
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
