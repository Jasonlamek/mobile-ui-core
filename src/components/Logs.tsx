import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Filter, Trash2, Download } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { LogEntry } from '../types';

interface LogsProps {
  logs: LogEntry[];
}

export const Logs: React.FC<LogsProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = 0; // Newest are at top in our array logic, but let's stick to bottom for "stream" feel if we reversed it.
      }
    }
  }, [logs]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'warn': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-purple-400" />
          <h1 className="text-2xl font-bold tracking-tight">System Logs</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-red-400">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-purple-400">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-800">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/50" />
            <div className="h-3 w-3 rounded-full bg-amber-500/50" />
            <div className="h-3 w-3 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-2">stream_output.log</span>
        </div>
        
        <ScrollArea className="h-full p-4 font-mono text-xs" ref={scrollRef}>
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3 group"
                >
                  <span className="text-zinc-600 shrink-0 select-none">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
                  </span>
                  <Badge variant="outline" className={`px-1 py-0 h-4 text-[9px] uppercase border-none ${getLevelColor(log.level)}`}>
                    {log.level}
                  </Badge>
                  <span className="text-purple-400 shrink-0 font-bold">[{log.service}]</span>
                  <span className="text-zinc-300 break-all leading-relaxed">{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};