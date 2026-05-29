'use client';

import Image from 'next/image';
import { Palmtree } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[340px] overflow-hidden bg-gradient-to-b from-[#72d7ff] via-[#24c6b8] to-[#ffd28a]">
        <Image
          src="/images/courier-bike.png"
          alt="Курьерский электроскутер с зеленой сумкой доставки"
          fill
          className="object-cover object-[center_60%] opacity-45 mix-blend-soft-light"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,244,190,0.88),transparent_22%),radial-gradient(circle_at_80%_22%,rgba(255,255,255,0.42),transparent_26%),linear-gradient(180deg,rgba(0,111,104,0.02)_0%,rgba(0,77,64,0.42)_58%,var(--background)_100%)]" />
        <div className="absolute -right-8 top-2 text-[9rem] leading-none drop-shadow-2xl sm:right-8 sm:text-[11rem]" aria-hidden="true">🌴</div>
        <div className="absolute left-5 top-12 text-5xl drop-shadow-xl sm:left-12 sm:text-7xl" aria-hidden="true">☀️</div>
        <div className="absolute bottom-8 left-0 right-0 h-20 bg-gradient-to-t from-[#ffe0a3]/65 via-[#35d5cb]/35 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 h-8">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M0,60 C300,100 400,20 600,60 C800,100 900,20 1200,60 L1200,120 L0,120 Z" 
              fill="var(--background)"
              opacity="0.9"
            />
          </svg>
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 p-4 pb-10 sm:pb-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-white shadow-lg backdrop-blur-md">
            <Palmtree className="w-4 h-4 sm:w-5 sm:h-5 text-primary drop-shadow-lg" />
            <span className="text-xs sm:text-sm font-semibold drop-shadow-lg">Bali VPN • тропический отдых</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">
            <span className="block">Bali</span>
            <span className="flex items-center gap-2">
              Курьер
              <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground shadow-lg shadow-primary/30 sm:px-4 sm:text-sm">
                VPN
              </span>
            </span>
          </h1>
          <p className="mt-2 max-w-xs text-sm font-medium text-white/95 drop-shadow-md sm:text-base">
            Спокойный, защищённый интернет в атмосфере пляжного отдыха
          </p>
          <p className="mt-4 max-w-xs text-[0.92rem] font-semibold uppercase tracking-[0.15em] text-white/90 drop-shadow-lg">
            Как первый час дня определяет ваш успех
          </p>
        </div>
      </div>
    </div>
  );
}
