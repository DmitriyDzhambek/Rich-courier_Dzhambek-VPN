'use client';

import { Heart, ExternalLink } from 'lucide-react';

export default function AuthorTipsPage() {
  return (
    <div className="flex flex-col gap-5 px-4 py-6">
      <div className="rounded-[2rem] border border-white/10 bg-card/80 p-5 shadow-2xl shadow-primary/10">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/20 text-primary shadow-lg shadow-primary/20">
            <Heart className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Поддержка автора</h1>
            <p className="text-sm text-muted-foreground">Если вам нравится проект, оставьте чаевые автору.</p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-background/80 p-5">
          <p className="text-sm text-foreground/90">Спасибо за то, что вы с нами. Это помогает развивать проект и делать его ещё лучше.</p>
          <div className="mt-4 rounded-3xl bg-white/10 p-4 text-center shadow-inner shadow-black/10">
            <p className="text-sm font-semibold text-foreground">Оставить чаевые автору</p>
            <p className="mt-2 text-xs text-muted-foreground">Перейдите по ссылке и поддержите дальнейшее развитие.</p>
            <a
              href="https://tips.yandex.ru/guest/payment/5485470"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Перейти на Tips
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
