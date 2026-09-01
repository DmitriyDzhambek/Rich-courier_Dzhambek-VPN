export interface Server {
  id: string;
  country: string;
  city: string;
  flagUrl: string;
  premium: boolean;
  /** Measured latency in ms. Undefined until measured by a real client. */
  pingMs?: number;
  /** Load in percent (0–100). Undefined until reported by the backend. */
  loadPercent?: number;
}

/** Live connection stats. Null when there is no active tunnel or no data source. */
export interface ConnectionStats {
  pingMs: number;
  speedMbps: number;
  trafficBytes: number;
}

/** Aggregated usage for the cabinet. Null until the backend provides it. */
export interface UsageStats {
  connectedSeconds: number;
  trafficBytes: number;
}

export interface ConnectionHistoryItem {
  id: string;
  serverId: string;
  startedAt: string;
  endedAt: string | null;
  trafficBytes: number;
}

export interface ReferralStats {
  code: string;
  invitedCount: number;
  bonusDays: number;
}

export type Plan = 'free' | 'premium';

export interface UserProfile {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  plan: Plan;
}

export interface AuthStatusResponse {
  /** False when Yandex OAuth env vars are missing — login must be shown as unavailable. */
  configured: boolean;
  user: UserProfile | null;
}
