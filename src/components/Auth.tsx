import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Mail, Key, ShieldCheck, UserPlus, Ban, MoreVertical, Zap } from 'lucide-react';
import type { User } from '../hooks/useMobiData';

export function Auth({ data }: { data: User[] }) {
  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input 
              placeholder="Search by email or ID..." 
              className="pl-10 bg-zinc-900/50 border-zinc-800"
            />
          </div>
          <Button variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-400">
            Export CSV
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
           <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200">
            Auth Settings
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 flex-1 md:flex-none">
            <UserPlus className="w-4 h-4 mr-2" /> Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.map((user) => (
          <Card key={user.id} className="bg-zinc-900/50 border-zinc-800 group hover:border-purple-500/50 transition-colors">
            <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <Avatar className="h-10 w-10 border border-zinc-800">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                  <AvatarFallback className="bg-zinc-800">{user.email[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{user.email}</span>
                    <Badge className={user.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.provider}</span>
                    <span className="flex items-center gap-1"><Key className="w-3 h-3" /> ID: {user.id}</span>
                    <span>Last login: {user.lastLogin}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-red-400">
                  <Ban className="w-4 h-4 mr-2" /> {user.status === 'active' ? 'Ban' : 'Unban'}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-zinc-800">
        <AuthSettingsCard 
          icon={<ShieldCheck className="w-5 h-5 text-purple-400" />}
          title="Password Policy"
          desc="Require special characters, length, etc."
        />
        <AuthSettingsCard 
          icon={<Mail className="w-5 h-5 text-cyan-400" />}
          title="Email Verification"
          desc="Send verification link on signup."
        />
        <AuthSettingsCard 
          icon={<Zap className="w-5 h-5 text-pink-400" />}
          title="Third Party Auth"
          desc="Manage Google, Apple, and GitHub."
        />
      </div>
    </div>
  );
}

function AuthSettingsCard({ icon, title, desc }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="text-sm font-semibold text-zinc-200">{title}</h4>
        <p className="text-xs text-zinc-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}