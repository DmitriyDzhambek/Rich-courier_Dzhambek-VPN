'use client';

import Image from 'next/image';
import { Anchor } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative w-full">
      {/* Responsive hero image container - adapts to different screen sizes */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[320px] overflow-hidden">
        <Image
          src="/images/courier-bike.png"
          alt="Курьерский электроскутер с зеленой сумкой доставки"
          fill
          className="object-cover object-[center_60%]"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        {/* Marine theme gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/30 via-transparent to-background" />
        
        {/* Decorative wave effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M0,60 C300,100 400,20 600,60 C800,100 900,20 1200,60 L1200,120 L0,120 Z" 
              fill="var(--background)"
              opacity="0.9"
            />
          </svg>
        </div>
        
        {/* Title overlay - positioned at bottom */}
        <div className="absolute bottom-4 left-0 right-0 p-4 pb-10 sm:pb-12">
          <div className="flex items-center gap-2 mb-1">
            <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-primary drop-shadow-lg" />
            <span className="text-xs sm:text-sm text-primary font-medium drop-shadow-lg">Морской VPN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            <span className="block">Богатый</span>
            <span className="flex items-center gap-2">
              Курьер
              <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 bg-primary text-primary-foreground text-xs sm:text-sm font-bold rounded">
                VPN
              </span>
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1 drop-shadow-md">
            Плыви по волнам интернета без преград
          </p>
        </div>
      </div>
    </div>
  );
}
