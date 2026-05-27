import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Database, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { AnalyticPoint } from '../hooks/useMobiData';

export function Dashboard({ data }: { data: AnalyticPoint[] }) {
  const totalRequests = data.reduce((acc, p) => acc + p.requests, 0);
  const totalUsers = data[data.length - 1]?.users || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Requests" 
          value={totalRequests.toLocaleString()} 
          change="+12.5%" 
          trend="up"
          icon={<Zap className="w-5 h-5 text-purple-400" />}
        />
        <StatCard 
          title="Active Users" 
          value={totalUsers.toLocaleString()} 
          change="+4.2%" 
          trend="up"
          icon={<Users className="w-5 h-5 text-cyan-400" />}
        />
        <StatCard 
          title="Avg. Latency" 
          value="42ms" 
          change="-8%" 
          trend="down"
          icon={<Activity className="w-5 h-5 text-green-400" />}
        />
        <StatCard 
          title="Database Size" 
          value="1.2 GB" 
          change="+240MB" 
          trend="up"
          icon={<Database className="w-5 h-5 text-pink-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Traffic (24h)</CardTitle>
            <Badge variant="outline" className="text-purple-400 border-purple-400/20 bg-purple-400/5">Live</Badge>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#a855f7' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#a855f7" fillOpacity={1} fill="url(#colorReq)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                   itemStyle={{ color: '#ef4444' }}
                />
                <Bar dataKey="errors" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon }: any) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-xs font-medium text-zinc-400">{title}</p>
          {icon}
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white">{value}</h2>
          <div className="flex items-center mt-1">
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" /> : <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />}
            <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{change}</span>
            <span className="text-xs text-zinc-500 ml-2">from last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}