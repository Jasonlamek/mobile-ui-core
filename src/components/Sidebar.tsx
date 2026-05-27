import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Database, Shield, Code, Bell, Settings, 
  Layers, ChevronDown, Rocket, ExternalLink 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'auth', label: 'Authentication', icon: Shield },
    { id: 'functions', label: 'Edge Functions', icon: Code },
    { id: 'notifications', label: 'Push Center', icon: Bell },
  ];

  return (
    <div className="w-64 h-full bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-900 flex flex-col z-20 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Layers className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              MobiCore
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">MBaaS Platform</p>
          </div>
        </div>

        <button className="w-full flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors mb-8">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] shrink-0">P</div>
            <span className="truncate">Production App</span>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        </button>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all relative group ${
                activeTab === item.id 
                  ? 'text-white' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
              }`}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeNav" 
                  className="absolute inset-0 bg-purple-500/10 border-l-2 border-purple-500 rounded-lg" 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-purple-400' : 'group-hover:text-zinc-400'}`} />
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Plan Usage</span>
            <span className="text-[10px] font-bold text-purple-400">84%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[84%]" />
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">10k / 12k monthly requests</p>
        </div>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition-colors text-sm">
          <Settings className="w-5 h-5" />
          Project Settings
        </button>

        <div className="pt-4 border-t border-zinc-900">
           <a href="#" className="flex items-center justify-between text-xs text-zinc-500 hover:text-purple-400 transition-colors px-2">
            <span>Documentation</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}