import React, { useState } from 'react';
import { Terminal as TerminalIcon, ChevronRight, Hash, ShieldCheck, UserPlus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

export const Terminal: React.FC = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to ServerNode v1.0.4', 'Type "help" for a list of commands.']);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const newHistory = [...history, `$ ${command}`];
    
    // Simple command handling
    const cmd = command.toLowerCase().trim();
    if (cmd === 'help') {
      newHistory.push('Available commands: status, restart, logs, clear, whoami');
    } else if (cmd === 'status') {
      newHistory.push('System: ONLINE', 'Load: 24%', 'Active Services: 4');
    } else if (cmd === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    } else if (cmd === 'whoami') {
      newHistory.push('admin@servernode-primary');
    } else {
      newHistory.push(`Command not found: ${command}`);
    }

    setHistory(newHistory);
    setCommand('');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-2">
        <TerminalIcon className="h-5 w-5 text-purple-400" />
        <h1 className="text-2xl font-bold tracking-tight">Remote Terminal</h1>
      </div>

      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-2xl flex flex-col h-[300px]">
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1">
          {history.map((line, i) => (
            <div key={i} className={line.startsWith('$') ? 'text-cyan-400' : 'text-zinc-400'}>
              {line}
            </div>
          ))}
          <div className="flex items-center gap-2 text-cyan-400">
            <span>$</span>
            <form onSubmit={handleCommand} className="flex-1">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="w-full bg-transparent border-none outline-none focus:ring-0 text-white p-0"
                autoFocus
              />
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {['status', 'restart', 'logs', 'clear'].map(cmd => (
          <Button 
            key={cmd} 
            variant="outline" 
            className="border-zinc-800 bg-zinc-900/50 text-xs font-mono justify-start gap-2 hover:bg-purple-500/10 hover:text-purple-400"
            onClick={() => setCommand(cmd)}
          >
            <ChevronRight className="h-3 w-3" />
            {cmd}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Users: React.FC = () => {
  const users = [
    { name: 'Alex Rivera', role: 'Admin', email: 'alex@servernode.io', status: 'Active' },
    { name: 'Sarah Chen', role: 'DevOps', email: 'sarah@servernode.io', status: 'Idle' },
    { name: 'System Bot', role: 'Service', email: 'bot@servernode.io', status: 'Online' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-purple-400" />
          <h1 className="text-2xl font-bold tracking-tight">Access Control</h1>
        </div>
        <Button size="sm" className="rounded-full bg-purple-600 hover:bg-purple-700">
          <UserPlus className="h-4 w-4 mr-2" /> Invite
        </Button>
      </div>

      <div className="space-y-4">
        {users.map((user, i) => (
          <Card key={i} className="border-none bg-card/50 backdrop-blur-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-purple-500/20">
                  <AvatarFallback className="bg-purple-500/10 text-purple-400">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm">{user.name}</h3>
                    <Badge variant="outline" className="text-[10px] px-1 h-4 uppercase">{user.role}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-zinc-600'}`} />
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed border-zinc-800 bg-transparent">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Hash className="h-4 w-4 text-cyan-400" />
            API Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg">
            <div>
              <p className="text-xs font-bold">Production Key</p>
              <p className="text-[10px] font-mono text-zinc-500">sk_live_••••••••••••45d2</p>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-[10px]" onClick={() => toast.success('Key copied')}>Copy</Button>
          </div>
          <Button variant="ghost" className="w-full text-xs text-muted-foreground">Manage All Keys</Button>
        </CardContent>
      </Card>
    </div>
  );
};