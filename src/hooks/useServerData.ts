import { useState, useEffect } from 'react';
import type { ServerStats, Service, LogEntry } from '../types';

export function useServerData() {
  const [stats, setStats] = useState<ServerStats>({
    cpu: 12,
    memory: 45,
    storage: 68,
    uptime: '12d 4h 32m',
    requests: 1240,
    status: 'online',
  });

  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'API Gateway', status: 'running', cpu: 2.4, memory: 128, port: 8080 },
    { id: '2', name: 'Auth Service', status: 'running', cpu: 1.2, memory: 256, port: 8081 },
    { id: '3', name: 'Payment Processor', status: 'running', cpu: 0.8, memory: 512, port: 8082 },
    { id: '4', name: 'Media Resizer', status: 'stopped', cpu: 0, memory: 0, port: 8083 },
    { id: '5', name: 'Database Proxy', status: 'running', cpu: 4.5, memory: 1024, port: 5432 },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([]);

  const [history, setHistory] = useState<{ time: string; load: number; traffic: number }[]>([]);

  useEffect(() => {
    // Generate initial history
    const initialHistory = Array.from({ length: 20 }, (_, i) => ({
      time: `${i}:00`,
      load: Math.floor(Math.random() * 40) + 10,
      traffic: Math.floor(Math.random() * 500) + 200,
    }));
    setHistory(initialHistory);

    const interval = setInterval(() => {
      // Simulate stats changing
      setStats(prev => ({
        ...prev,
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() * 10 - 5))),
        memory: Math.max(40, Math.min(90, prev.memory + (Math.random() * 4 - 2))),
        requests: prev.requests + Math.floor(Math.random() * 20),
      }));

      // Update history
      setHistory(prev => {
        const next = [...prev.slice(1), {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          load: Math.floor(Math.random() * 40) + 20,
          traffic: Math.floor(Math.random() * 600) + 300,
        }];
        return next;
      });

      // Add a random log
      if (Math.random() > 0.7) {
        const levels: ('info' | 'warn' | 'error')[] = ['info', 'warn', 'error'];
        const level = levels[Math.floor(Math.random() * levels.length)];
        const serviceList = ['API Gateway', 'Auth Service', 'Database Proxy'];
        const service = serviceList[Math.floor(Math.random() * serviceList.length)];
        const messages = [
          'Request processed successfully',
          'Database connection slow',
          'User authenticated',
          'Payment callback received',
          'Failed to fetch resource',
          'Cache miss for key: user_123',
        ];
        const newLog: LogEntry = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
          level,
          message: messages[Math.floor(Math.random() * messages.length)],
          service,
        };
        setLogs(prev => [newLog, ...prev].slice(0, 50));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleService = (id: string) => {
    setServices(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'running' ? 'stopped' : 'running',
          cpu: s.status === 'running' ? 0 : Math.random() * 5,
          memory: s.status === 'running' ? 0 : Math.random() * 512,
        };
      }
      return s;
    }));
  };

  return { stats, services, logs, history, toggleService };
}