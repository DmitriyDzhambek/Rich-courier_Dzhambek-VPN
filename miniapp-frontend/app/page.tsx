'use client';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-slate-900 to-black min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-8 px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold text-white">
            Rich Courier VPN
          </h1>
          <p className="text-xl text-gray-300">
            Telegram Mini App
          </p>
          <div className="mt-8 p-6 bg-slate-800 rounded-lg max-w-sm">
            <p className="text-gray-200">
              🚀 Приложение активно и готово к использованию
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Telegram Mini App for VPN Services
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
