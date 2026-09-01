export const NO_DATA = '—';

export function formatPing(ms: number | undefined | null): string {
  return ms == null ? NO_DATA : `${Math.round(ms)} ms`;
}

export function formatSpeed(mbps: number | undefined | null): string {
  return mbps == null ? NO_DATA : `${mbps.toFixed(mbps >= 100 ? 0 : 1)} Mbps`;
}

export function formatBytes(bytes: number | undefined | null): string {
  if (bytes == null) return NO_DATA;
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[i]}`;
}

export function formatDuration(seconds: number | undefined | null): string {
  if (seconds == null) return NO_DATA;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}м`;
  return `${h}ч ${m}м`;
}
