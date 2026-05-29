'use client';

import { Smartphone, QrCode } from 'lucide-react';

export default function AddDevicePage() {
  return (
    <div className="flex flex-col gap-5 px-4 py-6">
      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-card/80 p-5 shadow-xl shadow-primary/10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/20 text-primary shadow-lg shadow-primary/20">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Добавить устройство</h1>
            <p className="text-sm text-muted-foreground">Привяжите новое устройство к своему профилю за пару шагов.</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5">
          <p className="text-sm leading-6 text-foreground/90">Не видите своё устройство? Откройте приложение для привязки устройства.</p>
          <p className="mt-3 text-sm text-muted-foreground">Сканируйте QR-код в приложении, чтобы добавить новое устройство. После сканирования обновите экран везде.</p>

          <div className="mt-5 rounded-3xl border border-white/15 bg-background/80 p-4 text-center">
            <div className="mx-auto mb-4 flex h-44 w-44 items-center justify-center rounded-3xl border-2 border-dashed border-white/20 bg-[#0f5a53]/70">
              <QrCode className="h-20 w-20 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">Наведи камеру на QR и после везде обнови.</p>
            <p className="mt-2 text-xs text-muted-foreground">QR-устройство автоматически подхватится в приложении.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
