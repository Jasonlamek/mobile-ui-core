import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Code, Rocket, Clock, ShieldAlert, Cpu, Activity, RotateCw } from 'lucide-react';
import type { EdgeFunction } from '../hooks/useMobiData';

export function Functions({ data }: { data: EdgeFunction[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-500">
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            Edge Functions
          </h2>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Code className="w-4 h-4 mr-2" /> New Function
          </Button>
        </div>
        
        {data.map((fn) => (
          <Card key={fn.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors">{fn.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={
                      fn.status === 'active' ? 'bg-green-500/10 text-green-400' : 
                      fn.status === 'deploying' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'
                    }>
                      {fn.status}
                    </Badge>
                    <span className="text-xs text-zinc-500">{fn.invocations.toLocaleString()} calls</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500">
                    <Play className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500">
                    <RotateCw className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-gradient-to-br from-purple-900/20 to-zinc-900 border-zinc-800 p-6 mt-6">
          <Rocket className="w-10 h-10 text-purple-400 mb-4" />
          <h3 className="text-lg font-bold">Deploy Globally</h3>
          <p className="text-sm text-zinc-400 mt-2">
            Functions run on the edge, meaning minimal latency for your users worldwide.
          </p>
          <Button variant="outline" className="w-full mt-4 border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
            Read Docs
          </Button>
        </Card>
      </div>

      <Card className="lg:col-span-2 bg-zinc-950 border-zinc-800 overflow-hidden flex flex-col min-h-[600px]">
        <div className="bg-zinc-900/50 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs font-mono text-zinc-400 ml-4">processImage.ts</span>
          </div>
          <div className="flex items-center gap-2">
             <Badge variant="outline" className="text-[10px] text-zinc-500 border-zinc-800">TypeScript</Badge>
             <Button size="sm" className="h-7 bg-green-600 hover:bg-green-700 text-xs">Save & Deploy</Button>
          </div>
        </div>
        <CardContent className="flex-1 p-0 font-mono text-sm overflow-auto">
          <div className="flex h-full">
            <div className="w-12 bg-zinc-950 text-right pr-4 py-4 text-zinc-700 border-r border-zinc-900 select-none">
              {Array.from({ length: 20 }, (_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <pre className="p-4 text-zinc-300 leading-relaxed">
              <code>{`import { Context } from "@mobicore/edge";

export default async function(ctx: Context) {
  const { imageUrl } = ctx.body;
  
  // 1. Fetch the image
  const res = await fetch(imageUrl);
  const buffer = await res.arrayBuffer();
  
  // 2. Process with AI
  const result = await ctx.ai.vision.describe(buffer);
  
  // 3. Store in DB
  await ctx.db.collection("metadata").insert({
    url: imageUrl,
    description: result.text,
    processedAt: new Date()
  });

  return { success: true };
}`}</code>
            </pre>
          </div>
        </CardContent>
        <div className="bg-zinc-900/50 border-t border-zinc-800 p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Clock className="w-3 h-3" /> Execution: 12ms
            </div>
             <div className="flex items-center gap-2 text-xs text-green-400">
              <Activity className="w-3 h-3" /> Last success: Just now
            </div>
             <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldAlert className="w-3 h-3" /> Memory: 128MB
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}