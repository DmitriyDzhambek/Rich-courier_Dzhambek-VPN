'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[420px] overflow-hidden rounded-[2rem] bg-[#0b3f3a] shadow-2xl shadow-slate-950/20">
        <Image
          src="/images/courier-bike.png"
          alt="Девушка на велосипеде в стиле Bali"
          fill
          className="object-cover object-[80%_50%] opacity-95"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.18),transparent_22%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.12),transparent_20%),linear-gradient(180deg,rgba(8,109,90,0.12)_0%,rgba(2,34,35,0.82)_70%,#031b1a_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/90" />

        <div className="absolute left-6 top-6 hidden h-28 w-28 rounded-full bg-white/10 blur-3xl sm:block" />
        <div className="absolute right-6 top-16 hidden h-36 w-36 rounded-full border border-white/10 bg-white/10 blur-2xl sm:block" />

        <div className="absolute left-6 top-6 rounded-3xl bg-white/10 px-4 py-3 text-xs uppercase tracking-[0.26em] text-white/85 shadow-lg shadow-slate-950/20 backdrop-blur-md">
          Магия утра
        </div>

        <div className="absolute left-6 bottom-6 right-6 rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary/90">Bali</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Как первый час дня определяет ваш успех
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80">
            Оставь велосипед, почувствуй атмосферу утра и начни день с ясной целью, энергией и легкостью.
          </p>
        </div>

        <div className="absolute right-8 bottom-24 hidden h-28 w-28 rounded-full border border-white/15 bg-white/5 shadow-[0_0_80px_rgba(255,255,255,0.14)] sm:block" />
      </div>
    </div>
  );
}
