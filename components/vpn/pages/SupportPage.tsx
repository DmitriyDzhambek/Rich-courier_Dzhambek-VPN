'use client';

import { MessageCircle, Send, FileText, HelpCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportPage() {
  const openTelegram = (username: string) => {
    window.open(`https://t.me/${username}`, '_blank');
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
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Поддержка</h1>
            <p className="text-sm text-muted-foreground">Как первый час дня определяет ваш успех</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Тут пока что пусто для новой истории клиентов.</p>
      </motion.div>

      {/* Contact Options */}
      <motion.div 
        className="bg-card rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.button
          onClick={() => openTelegram('RichCourierVPN_support')}
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors active:scale-[0.98]"
        >
          <motion.div 
            className="w-12 h-12 rounded-full bg-[#0088cc]/20 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Send className="w-6 h-6 text-[#0088cc]" />
          </motion.div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-foreground">Написать в Telegram</p>
            <p className="text-sm text-muted-foreground">Быстрый ответ в течение часа</p>
          </div>
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.button>

        <div className="border-t border-border" />

        <motion.button
          onClick={() => openTelegram('RichCourierVPN_channel')}
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors active:scale-[0.98]"
        >
          <motion.div 
            className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <MessageCircle className="w-6 h-6 text-primary" />
          </motion.div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-foreground">Наш канал</p>
            <p className="text-sm text-muted-foreground">Новости и обновления</p>
          </div>
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* FAQ */}
      <motion.div 
        className="bg-card rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Частые вопросы</h3>
        </div>
        <div className="space-y-4">
          {[
            { q: 'Как подключиться к VPN?', a: 'Нажмите кнопку "Подключиться" на главном экране' },
            { q: 'Как сменить сервер?', a: 'Перейдите во вкладку "Серверы" и выберите нужный' },
            { q: 'Что дает премиум?', a: 'Доступ ко всем серверам и максимальная скорость' },
            { q: 'Как получить бесплатные дни?', a: 'Приглашайте друзей через раздел "Рефералы"' },
          ].map((faq, index) => (
            <motion.div 
              key={index} 
              className="border-b border-border last:border-0 pb-3 last:pb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + index * 0.05 }}
            >
              <p className="font-medium text-foreground mb-1">{faq.q}</p>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Documentation */}
      <motion.button 
        className="bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-card/80 transition-colors active:scale-[0.98]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <FileText className="w-6 h-6 text-muted-foreground" />
        </motion.div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground">Документация</p>
          <p className="text-sm text-muted-foreground">Подробные инструкции по настройке</p>
        </div>
        <ExternalLink className="w-5 h-5 text-muted-foreground" />
      </motion.button>
    </div>
  );
}
