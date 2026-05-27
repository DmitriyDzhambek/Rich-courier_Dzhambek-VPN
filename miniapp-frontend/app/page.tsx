'use client';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-slate-900 to-black">
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
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
