'use client';

import Image from 'next/image';

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
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        
        {/* Title overlay - positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 sm:pb-8">
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
            Стабильный интернет – стабильный заработок
          </p>
        </div>
      </div>
    </div>
  );
}
