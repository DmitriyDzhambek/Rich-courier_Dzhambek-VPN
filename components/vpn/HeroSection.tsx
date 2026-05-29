'use client';

import Image from 'next/image';
import { Palmtree } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[360px] overflow-hidden bg-gradient-to-b from-[#7ad4ff] via-[#25c9b8] to-[#ffc37f]">
        <Image
          src="/images/courier-bike.png"
          alt="Курьерский электроскутер с зеленой сумкой доставки"
          fill
          className="object-cover object-[center_58%] opacity-95"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />

        <div className="absolute left-12 top-20 hidden h-72 w-72 rounded-full bg-white/12 blur-[92px] sm:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.35),transparent_18%),radial-gradient(circle_at_82%_24%,rgba(255,255,255,0.22),transparent_24%),linear-gradient(180deg,rgba(118,217,255,0.3)_0%,rgba(37,194,171,0.35)_35%,rgba(8,110,118,0.72)_68%,var(--background)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 h-36 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_18%)]" />
          <div className="absolute inset-x-0 bottom-0 h-full wave-swell opacity-95 sea-glow">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,65 C150,100 300,30 520,60 C730,90 860,20 1200,65 L1200,120 L0,120 Z" fill="#3ba6b2" />
            </svg>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-full wave-swell delay-150 opacity-80">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,72 C220,45 390,110 600,70 C820,30 980,100 1200,68 L1200,120 L0,120 Z" fill="#1e8f92" />
            </svg>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-full wave-swell delay-300 opacity-45">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,82 C230,50 430,100 600,70 C770,40 960,90 1200,78 L1200,120 L0,120 Z" fill="#0e5d60" />
            </svg>
          </div>
        </div>

        <div className="absolute -right-10 top-6 text-[8.8rem] leading-none drop-shadow-2xl sm:right-8 sm:text-[11rem] palm-sway" aria-hidden="true">🌴</div>
        <div className="absolute left-5 top-14 text-5xl drop-shadow-xl sm:left-12 sm:text-7xl" aria-hidden="true">☀️</div>

        <div className="absolute bottom-8 left-0 right-0 h-20 bg-gradient-to-t from-[#fff1b4]/70 via-[#3bd4ca]/35 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 h-8">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,60 C300,110 400,10 600,53 C800,96 900,20 1200,60 L1200,120 L0,120 Z"
              fill="var(--background)"
              opacity="0.92"
            />
          </svg>
        </div>

        <div className="absolute bottom-4 left-0 right-0 p-4 pb-12 sm:pb-14">
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
