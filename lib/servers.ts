import type { Server } from '@/lib/types';

/**
 * Server catalogue. Ping and load are intentionally absent: they must come
 * from a real measurement/backend, never from hard-coded values.
 */
export const servers: Server[] = [
  { id: 'nl-ams', country: 'Netherlands', city: 'Амстердам', flagUrl: 'https://flagcdn.com/w80/nl.png', premium: false },
  { id: 'de-fra', country: 'Germany', city: 'Франкфурт', flagUrl: 'https://flagcdn.com/w80/de.png', premium: false },
  { id: 'fi-hel', country: 'Finland', city: 'Хельсинки', flagUrl: 'https://flagcdn.com/w80/fi.png', premium: false },
  { id: 'us-nyc', country: 'USA', city: 'Нью-Йорк', flagUrl: 'https://flagcdn.com/w80/us.png', premium: true },
  { id: 'jp-tyo', country: 'Japan', city: 'Токио', flagUrl: 'https://flagcdn.com/w80/jp.png', premium: true },
  { id: 'sg-sin', country: 'Singapore', city: 'Сингапур', flagUrl: 'https://flagcdn.com/w80/sg.png', premium: true },
];
