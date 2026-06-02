'use client';

import { useState } from 'react';

interface JournalSectionProps {
  currentTime: string;
  currentDate: string;
}

export default function JournalSection({ currentTime, currentDate }: JournalSectionProps) {
  const [note, setNote] = useState('');

  return (
    <section className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_35px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Утренний дневник</p>
          <h3 className="mt-2 text-2xl font-black">Запишите своё намерение</h3>
        </div>
        <div className="rounded-3xl bg-white/10 px-4 py-3 text-right text-sm text-white/80 ring-1 ring-white/10">
          <div>{currentDate}</div>
          <div className="mt-1 text-lg font-semibold text-white">{currentTime}</div>
        </div>
      </div>

      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Запишите, что важно сегодня..."
        className="journal-input mt-6 h-44 w-full rounded-3xl border border-white/10 bg-[#061a1b] p-4 text-sm text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/70">
          Здесь вы можете фиксировать утренние ощущения, цели и первые шаги к дню.
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5"
        >
          Сохранить заметку
        </button>
      </div>
    </section>
  );
}
