import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobiData } from './hooks/useMobiData';
import { Dashboard } from './components/Dashboard';
import { Database } from './components/Database';
import { Auth } from './components/Auth';
import { Functions } from './components/Functions';
import { Notifications } from './components/Notifications';
import { Sidebar } from './components/Sidebar';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  User, 
  Zap, 
  ChevronRight,
  Monitor,
  Smartphone,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { analytics, users, documents, functions } = useMobiData();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard data={analytics} />;
      case 'database': return <Database data={documents} />;
      case 'auth': return <Auth data={users} />;
      case 'functions': return <Functions data={functions} />;
      case 'notifications': return <Notifications />;
      default: return <Dashboard data={analytics} />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <Toaster position="top-right" theme="dark" />
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] z-50 lg:hidden"
            >
              <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsMobileMenuOpen(false);
              }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navigation */}
        <header className="h-16 border-b border-zinc-900 bg-black/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 z-10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-zinc-400"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <span className="capitalize">{activeTab}</span>
              <ChevronRight className="w-4 h-4 text-zinc-700" />
              <span className="text-zinc-100">Overview</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-1.5 mr-4">
               <div className="flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">Web</span>
               </div>
               <div className="w-[1px] h-3 bg-zinc-800" />
               <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[10px] font-bold text-zinc-100 uppercase">App</span>
               </div>
            </div>

            <Button variant="ghost" size="icon" className="relative text-zinc-400">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-black" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Search className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border border-white/10" />
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-zinc-950/50 scrollbar-hide">
          {/* Hero Banner (Only on Dashboard) */}
          {activeTab === 'dashboard' && (
            <div className="relative h-48 md:h-64 overflow-hidden mb-8 border-b border-zinc-900">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8c3686d4-7ae1-4f70-b474-521cc3bb1222/dashboard-hero-bg-317a371a-1779923207102.webp"
                alt="Banner"
                className="w-full h-full object-cover opacity-40 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-3 py-1 text-purple-400 text-xs font-bold mb-4">
                    <Zap className="w-3.5 h-3.5" />
                    Pro Plan Active
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">Welcome Back, Alex.</h2>
                  <p className="text-zinc-400 text-sm md:text-base max-w-xl">
                    Your app is performing at 99.9% uptime. Traffic is up 12% compared to last week.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className={`max-w-7xl mx-auto p-4 lg:p-8 ${activeTab !== 'dashboard' ? 'mt-4' : ''}`}>
            {/* Tab Navigation (Optional secondary) */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight capitalize">{activeTab}</h1>
                <p className="text-sm text-zinc-500">Manage your application's {activeTab} environment.</p>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm" className="bg-zinc-950 border-zinc-800 text-zinc-400">
                   <Info className="w-4 h-4 mr-2" /> Help
                 </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;