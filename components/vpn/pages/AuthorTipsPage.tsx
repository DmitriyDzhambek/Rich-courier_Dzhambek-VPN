'use client';

import { Heart, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthorTipsPage() {
  return (
    <div className="flex flex-col gap-5 px-4 py-6">
      <motion.div 
        className="rounded-[2rem] border border-white/10 bg-card/80 p-5 shadow-2xl shadow-primary/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.div 
            className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/20 text-primary shadow-lg shadow-primary/20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            whileHover={{ scale: 1.15 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <Heart className="h-7 w-7" />
            </motion.div>
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Поддержка автора</h1>
            <p className="text-sm text-muted-foreground">Если вам нравится проект, оставьте чаевые автору.</p>
          </div>
        </motion.div>

        <motion.div 
          className="mt-5 rounded-[1.75rem] border border-white/10 bg-background/80 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-sm text-foreground/90">Спасибо за то, что вы с нами. Это помогает развивать проект и делать его ещё лучше.</p>
          <motion.div 
            className="mt-4 rounded-3xl bg-white/10 p-4 text-center shadow-inner shadow-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          >
            <p className="text-sm font-semibold text-foreground">Оставить чаевые автору</p>
            <p className="mt-2 text-xs text-muted-foreground">Перейдите по ссылке и поддержите дальнейшее развитие.</p>
            <motion.a
              href="https://tips.yandex.ru/guest/payment/5485470"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Перейти на Tips
              <motion.div
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                <ExternalLink className="ml-2 h-4 w-4" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
