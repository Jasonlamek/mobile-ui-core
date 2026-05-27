import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, RotateCcw, Cpu, Database, Network } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Service } from '../types';

interface ServicesProps {
  services: Service[];
  onToggle: (id: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onToggle }) => {
  const handleAction = (id: string, name: string, action: string) => {
    onToggle(id);
    toast.success(`${name} ${action} successfully`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Active Services</h1>
        <Badge variant="outline" className="border-purple-500/30 text-purple-400">
          {services.filter(s => s.status === 'running').length} / {services.length} Online
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-none bg-card/50 backdrop-blur-md">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${service.status === 'running' ? 'bg-purple-500/10 text-purple-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        {service.id === '5' ? <Database className="h-6 w-6" /> : service.id === '1' ? <Network className="h-6 w-6" /> : <Cpu className="h-6 w-6" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{service.name}</h3>
                          <Badge 
                            variant="secondary" 
                            className={service.status === 'running' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-zinc-800 text-zinc-500'}
                          >
                            {service.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-mono">Port: {service.port}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground bg-zinc-900/50 p-2 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <Cpu className="h-3 w-3" /> {service.cpu.toFixed(1)}%
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Database className="h-3 w-3" /> {service.memory}MB
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-9 w-9 rounded-full ${service.status === 'running' ? 'border-amber-500/30 text-amber-500 hover:bg-amber-500/10' : 'border-green-500/30 text-green-500 hover:bg-green-500/10'}`}
                        onClick={() => handleAction(service.id, service.name, service.status === 'running' ? 'stopped' : 'started')}
                      >
                        {service.status === 'running' ? <Square className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-full border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
                        onClick={() => toast.info(`Restarting ${service.name}...`)}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};