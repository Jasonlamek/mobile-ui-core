import { useState, useEffect } from 'react';

export interface AnalyticPoint {
  time: string;
  requests: number;
  errors: number;
  users: number;
}

export interface User {
  id: string;
  email: string;
  provider: 'google' | 'apple' | 'email';
  lastLogin: string;
  status: 'active' | 'banned';
}

export interface Document {
  id: string;
  collection: string;
  data: any;
  updatedAt: string;
}

export interface EdgeFunction {
  id: string;
  name: string;
  status: 'active' | 'deploying' | 'failed';
  invocations: number;
}

export function useMobiData() {
  const [analytics, setAnalytics] = useState<AnalyticPoint[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [functions, setFunctions] = useState<EdgeFunction[]>([]);

  useEffect(() => {
    // Mock Analytics
    const points: AnalyticPoint[] = Array.from({ length: 12 }, (_, i) => ({
      time: `${i * 2}:00`,
      requests: Math.floor(Math.random() * 500) + 100,
      errors: Math.floor(Math.random() * 50),
      users: Math.floor(Math.random() * 1000) + 500,
    }));
    setAnalytics(points);

    // Mock Users
    setUsers([
      { id: '1', email: 'alex@example.com', provider: 'google', lastLogin: '2 mins ago', status: 'active' },
      { id: '2', email: 'sara.w@cloud.com', provider: 'email', lastLogin: '10 mins ago', status: 'active' },
      { id: '3', email: 'jason_dev@apple.com', provider: 'apple', lastLogin: '1 hour ago', status: 'active' },
      { id: '4', email: 'bot_99@spam.me', provider: 'email', lastLogin: '2 days ago', status: 'banned' },
    ]);

    // Mock Database
    setDocuments([
      { id: 'doc_1', collection: 'profiles', data: { name: 'Alex', bio: 'Dev' }, updatedAt: '2023-10-27' },
      { id: 'doc_2', collection: 'profiles', data: { name: 'Sara', bio: 'Designer' }, updatedAt: '2023-10-26' },
      { id: 'doc_3', collection: 'posts', data: { title: 'Hello World', views: 42 }, updatedAt: '2023-10-25' },
    ]);

    // Mock Functions
    setFunctions([
      { id: 'fn_1', name: 'processImage', status: 'active', invocations: 12402 },
      { id: 'fn_2', name: 'sendWelcomeEmail', status: 'active', invocations: 852 },
      { id: 'fn_3', name: 'stripeWebhook', status: 'deploying', invocations: 0 },
    ]);
  }, []);

  return { analytics, users, documents, functions };
}