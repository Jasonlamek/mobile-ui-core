export interface ServerStats {
  cpu: number;
  memory: number;
  storage: number;
  uptime: string;
  requests: number;
  status: 'online' | 'degraded' | 'offline';
}

export interface Service {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  cpu: number;
  memory: number;
  port: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  service: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
  avatar?: string;
}