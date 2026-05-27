import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Send, History, Target, Smartphone, Globe, Users } from 'lucide-react';
import { toast } from 'sonner';

export function Notifications() {
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Push notification broadcasted successfully!');
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      <div className="space-y-6">
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-400" />
              New Campaign
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Notification Title</label>
              <Input placeholder="e.g. Weekend Flash Sale! 🚀" className="bg-zinc-950 border-zinc-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Body Content</label>
              <Textarea 
                placeholder="Get 50% off on all premium features this weekend only..." 
                className="bg-zinc-950 border-zinc-800 min-h-[100px]" 
              />
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-zinc-400">Target Audience</label>
              <div className="grid grid-cols-3 gap-2">
                <TargetButton icon={<Globe className="w-4 h-4" />} label="All Users" active />
                <TargetButton icon={<Users className="w-4 h-4" />} label="Segmented" />
                <TargetButton icon={<Smartphone className="w-4 h-4" />} label="Test Device" />
              </div>
            </div>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 mt-4" 
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Broadcast Push Now'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
             <CardTitle className="text-sm flex items-center gap-2">
              <History className="w-4 h-4 text-zinc-400" />
              Recent Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border border-zinc-800 rounded-lg bg-zinc-950/50">
              <div className="flex justify-between items-start">
                <span className="font-medium text-sm">System Update 2.0</span>
                <span className="text-[10px] text-zinc-500 uppercase">2 hours ago</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Successfully delivered to 12.4k devices (98% success rate)</p>
            </div>
            <div className="p-3 border border-zinc-800 rounded-lg bg-zinc-950/50 opacity-60">
              <div className="flex justify-between items-start">
                <span className="font-medium text-sm">Welcome Discount</span>
                <span className="text-[10px] text-zinc-500 uppercase">Yesterday</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Sent to new users in the last 24h</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative w-full max-w-[300px] aspect-[9/19] bg-zinc-950 border-[8px] border-zinc-900 rounded-[40px] shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-10" />
          
          <div className="p-6 pt-12">
            <div className="flex justify-between text-zinc-500 text-[10px] mb-8">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm border border-zinc-800" />
                <div className="w-3 h-3 rounded-sm border border-zinc-800" />
              </div>
            </div>
            
            <div className="animate-bounce mb-4">
               <Bell className="w-12 h-12 text-purple-500 mx-auto opacity-50" />
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-lg mt-12 animate-in slide-in-from-top-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center">
                  <span className="text-[8px] font-bold">M</span>
                </div>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">MobiCore</span>
                <span className="text-[8px] text-white/50 ml-auto">now</span>
              </div>
              <p className="text-xs font-bold text-white">Title Preview</p>
              <p className="text-[10px] text-white/80 mt-1">This is how your message will appear on a user's lock screen.</p>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-800 rounded-full" />
        </div>
        <p className="text-xs text-zinc-500 mt-6 text-center italic">
          Live notification preview for iOS and Android
        </p>
      </div>
    </div>
  );
}

function TargetButton({ icon, label, active }: any) {
  return (
    <button className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
      active ? 'bg-purple-500/10 border-purple-500/50 text-purple-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
    }`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}