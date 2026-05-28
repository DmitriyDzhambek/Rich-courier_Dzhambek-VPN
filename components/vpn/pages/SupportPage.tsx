'use client';

import { MessageCircle, Send, FileText, HelpCircle, ExternalLink } from 'lucide-react';

export default function SupportPage() {
  const openTelegram = (username: string) => {
    window.open(`https://t.me/${username}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Поддержка</h1>
          <p className="text-sm text-muted-foreground">Мы всегда готовы помочь</p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="bg-card rounded-2xl overflow-hidden">
        <button
          onClick={() => openTelegram('RichCourierVPN_support')}
          className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors active:scale-[0.98]"
        >
          <div className="w-12 h-12 rounded-full bg-[#0088cc]/20 flex items-center justify-center">
            <Send className="w-6 h-6 text-[#0088cc]" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-foreground">Написать в Telegram</p>
            <p className="text-sm text-muted-foreground">Быстрый ответ в течение часа</p>
          </div>
          <ExternalLink className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="border-t border-border" />

        <button
          onClick={() => openTelegram('RichCourierVPN_channel')}
          className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors active:scale-[0.98]"
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-foreground">Наш канал</p>
            <p className="text-sm text-muted-foreground">Новости и обновления</p>
          </div>
          <ExternalLink className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* FAQ */}
      <div className="bg-card rounded-2xl p-5">
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
            <div key={index} className="border-b border-border last:border-0 pb-3 last:pb-0">
              <p className="font-medium text-foreground mb-1">{faq.q}</p>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation */}
      <button className="bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-card/80 transition-colors active:scale-[0.98]">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <FileText className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground">Документация</p>
          <p className="text-sm text-muted-foreground">Подробные инструкции по настройке</p>
        </div>
        <ExternalLink className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
}
