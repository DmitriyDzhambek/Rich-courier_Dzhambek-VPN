'use client';

import { Signal, MapPin, Zap } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Server {
  id: string;
  country: string;
  city: string;
  flagUrl: string;
  ping: string;
  load: number;
  premium: boolean;
}

const servers: Server[] = [
  { id: '1', country: 'Indonesia', city: 'Кута', flagUrl: 'https://flagcdn.com/w80/id.png', ping: '30 ms', load: 25, premium: false },
  { id: '2', country: 'Indonesia', city: 'Убуд', flagUrl: 'https://flagcdn.com/w80/id.png', ping: '32 ms', load: 30, premium: false },
  { id: '3', country: 'Indonesia', city: 'Чангу', flagUrl: 'https://flagcdn.com/w80/id.png', ping: '28 ms', load: 20, premium: false },
];

interface ServersPageProps {
  onSelectServer?: (server: Server) => void;
}

export default function ServersPage({ onSelectServer }: ServersPageProps) {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <motion.div 
        className="flex items-center gap-3 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Signal className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Сервис</h1>
          <p className="text-sm text-muted-foreground">Выберите островной маршрут для подключения</p>
        </div>
      </motion.div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Бесплатные</h2>
        {servers.filter(s => !s.premium).map((server, index) => (
          <motion.button
            key={server.id}
            onClick={() => onSelectServer?.(server)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-card/80 active:scale-[0.98] transition-all"
          >
            <Image
              src={server.flagUrl}
              alt={server.country}
              width={40}
              height={30}
              className="rounded-md object-cover"
            />
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">{server.country}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {server.city}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary font-medium">{server.ping}</p>
              <div className="w-16 h-1.5 bg-secondary rounded-full mt-1">
                <motion.div 
                  className="h-full bg-primary rounded-full transition-all"
                  initial={{ width: 0 }}
                  animate={{ width: `${server.load}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div 
        className="bg-gradient-to-r from-card/90 via-card to-primary/5 border border-primary/20 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground uppercase tracking-wider">Премиум</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Премиум-серверы пока готовятся. Скоро здесь появится новая курортная коллекция.
        </p>
      </motion.div>
    </div>
  );
}
