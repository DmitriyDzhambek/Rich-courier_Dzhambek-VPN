'use client';

import { Smartphone, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AddDevicePage() {
  return (
    <div className="flex flex-col gap-5 px-4 py-6">
      <motion.div 
        className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-card/80 p-5 shadow-xl shadow-primary/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.div 
            className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/20 text-primary shadow-lg shadow-primary/20"
            whileHover={{ scale: 1.1 }}
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Smartphone className="h-6 w-6" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Добавить устройство</h1>
            <p className="text-sm text-muted-foreground">Привяжите новое устройство к своему профилю за пару шагов.</p>
          </div>
        </motion.div>

        <motion.div 
          className="rounded-[2rem] border border-white/10 bg-white/10 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-sm leading-6 text-foreground/90">Не видите своё устройство? Откройте приложение для привязки устройства.</p>
          <p className="mt-3 text-sm text-muted-foreground">Сканируйте QR-код в приложении, чтобы добавить новое устройство. После сканирования обновите данные везде.</p>

          <motion.div 
            className="mt-5 rounded-3xl border border-white/15 bg-background/80 p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <motion.div 
              className="mx-auto mb-4 flex h-44 w-44 items-center justify-center rounded-3xl border-2 border-dashed border-white/20 bg-[#0f5a53]/70"
              animate={{ borderColor: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 183, 3, 0.4)', 'rgba(255, 255, 255, 0.2)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <QrCode className="h-20 w-20 text-primary" />
              </motion.div>
            </motion.div>
            <motion.p 
              className="text-sm font-semibold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Наведи камеру на QR и после обновите везде.
            </motion.p>
            <motion.p 
              className="mt-2 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              QR-устройство автоматически подхватится в приложении.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
