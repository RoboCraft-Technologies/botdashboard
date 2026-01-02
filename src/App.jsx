import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  Users, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  LogOut,
  PlusCircle,
  TrendingUp,
  Activity,
  History,
  ExternalLink
} from 'lucide-react';

/**
 * TICKET BUDDY ANALYTICS
 * Integrated with Supabase Auth & Discord
 */

// --- Supabase Config ---
const supabaseUrl = "https://fqcsfolzaevktqojyrcr.supabase.co"; 
const supabaseAnonKey = "sb_publishable_Y3lTBJO80W9xpUTP5w7UCw_lZ_pTDat"; 

// Placeholder for supabase client
let supabase = null;

// --- Mock Data ---
const MOCK_SERVERS = [
  { id: '1', name: 'Gaming Hub', icon: '🎮', members: 1240, active: true },
  { id: '2', name: 'Dev Community', icon: '💻', members: 540, active: true },
  { id: '3', name: 'Support Squad', icon: '🛡️', members: 3200, active: false },
  { id: '4', name: 'Art Corner', icon: '🎨', members: 120, active: false },
];

const MOCK_COMMANDS = [
  { name: '/ticket open', description: 'Creates a new support ticket.', usage: 450, category: 'General' },
  { name: '/ticket close', description: 'Closes an active ticket.', usage: 410, category: 'Admin' },
  { name: '/setup', description: 'Initializes the bot configuration.', usage: 12, category: 'Setup' },
  { name: '/stats', description: 'View server ticket statistics.', usage: 89, category: 'Utility' },
  { name: '/transcript', description: 'Generates a PDF of the chat.', usage: 215, category: 'Admin' },
];

const MOCK_STATS = [
  { label: 'Total Tickets', value: '1,284', change: '+12%', icon: MessageSquare, color: 'text-blue-500' },
  { label: 'Avg Close Time', value: '14m', change: '-2m', icon: Clock, color: 'text-green-500' },
  { label: 'Active Support', value: '24', change: '+2', icon: Users, color: 'text-purple-500' },
  { label: 'Growth', value: '24%', change: '+5%', icon: TrendingUp, color: 'text-orange-500' },
];

// --- Components ---

const Navbar = ({ user, onLogout }) => (
  <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-1.5 rounded-lg">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">Ticket Buddy</span>
      </div>
      
      {user && (
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">
            <img 
              src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`} 
              className="w-6 h-6 rounded-full" 
              alt="avatar" 
            />
            <span className="text-sm font-medium text-zinc-300">{user.user_metadata?.full_name || user.email}</span>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  </nav>
);

const LandingPage = ({ onLogin, loading }) => (
  <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 text-center">
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
    
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
      <Zap className="w-4 h-4" />
      Trusted by over 10,000 servers
    </div>
    
    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
      Manage Support <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
        Like a Professional.
      </span>
    </h1>
    
    <p className="text-zinc-400 text-lg max-w-2xl mb-10">
      The ultimate ticket management bot for Discord. Scalable, fast, and feature-rich analytics to keep your community happy.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button 
        onClick={onLogin}
        disabled={loading}
        className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20"
      >
        <PlusCircle className="w-5 h-5" />
        {loading ? 'Initializing...' : 'Login with Discord'}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <a 
        href="https://discord.com/oauth2/authorize?client_id=1453297422712180796&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Ffqcsfolzaevktqojyrcr.supabase.co%2Fauth%2Fv1%2Fcallback&integration_type=0&scope=applications.commands+email+identify+bot"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-900 transition-all"
      >
        Invite Bot <ExternalLink className="w-4 h-4" />
      </a>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl">
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-left">
        <ShieldCheck className="w-8 h-8 text-indigo-500 mb-4" />
        <h3 className="font-bold text-lg mb-2">Secure Logging</h3>
        <p className="text-zinc-500 text-sm">Automated backups and full transcript retention for all server events.</p>
      </div>
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-left">
        <Activity className="w-8 h-8 text-purple-500 mb-4" />
        <h3 className="font-bold text-lg mb-2">Real-time Analytics</h3>
        <p className="text-zinc-500 text-sm">Deep dive into staff performance and ticket frequency charts.</p>
      </div>
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-left">
        <Users className="w-8 h-8 text-blue-500 mb-4" />
        <h3 className="font-bold text-lg mb-2">Multi-Agent Support</h3>
        <p className="text-zinc-500 text-sm">Assign tickets to specific roles and manage permissions with ease.</p>
      </div>
    </div>
  </div>
);

const ServerSelection = ({ onSelect }) => (
  <div className="max-w-4xl mx-auto py-12 px-6">
    <div className="mb-10">
      <h2 className="text-3xl font-bold mb-2">Select a Server</h2>
      <p className="text-zinc-500">Choose the server you want to manage or view analytics for.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {MOCK_SERVERS.map(server => (
        <button
          key={server.id}
          onClick={() => onSelect(server)}
          className="group flex items-center justify-between p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/50 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {server.icon}
            </div>
            <div>
              <h4 className="font-bold text-zinc-100">{server.name}</h4>
              <p className="text-sm text-zinc-500">{server.members.toLocaleString()} members</p>
            </div>
          </div>
          {server.active ? (
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
              Manage <ChevronRight className="w-4 h-4" />
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider">
              Setup Bot
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

const Dashboard = ({ server, onBack }) => (
  <div className="max-w-7xl mx-auto py-8 px-6">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400">
          <History className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{server.icon}</span>
            <h2 className="text-2xl font-bold">{server.name} Analytics</h2>
          </div>
          <p className="text-zinc-500 text-sm">Performance overview for the last 30 days</p>
        </div>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors">
        <Settings className="w-4 h-4" />
        Settings
      </button>
    </div>

    {/* Stat Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {MOCK_STATS.map((stat, i) => (
        <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-zinc-950 border border-zinc-800 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-zinc-500 text-sm font-medium">{stat.label}</h3>
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              Ticket Volume
            </h3>
            <select className="bg-zinc-950 border border-zinc-800 text-xs rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-2 px-2">
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-600/20 rounded-t-lg relative group transition-all hover:bg-indigo-600/40" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {h + 20} Tickets
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] text-zinc-500 font-medium uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-purple-500" />
            Command Usage
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-zinc-500 uppercase tracking-wider">
                <tr>
                  <th className="pb-4 font-medium">Command</th>
                  <th className="pb-4 font-medium text-right">Uses</th>
                  <th className="pb-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm border-t border-zinc-800">
                {MOCK_COMMANDS.map((cmd, i) => (
                  <tr key={i} className="group hover:bg-zinc-950 transition-colors">
                    <td className="py-4">
                      <div className="font-mono text-indigo-400">{cmd.name}</div>
                      <div className="text-xs text-zinc-500">{cmd.description}</div>
                    </td>
                    <td className="py-4 text-right font-bold">{cmd.usage}</td>
                    <td className="py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Online
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-600/20 text-white">
          <h3 className="font-bold text-lg mb-2">Go Premium</h3>
          <p className="text-indigo-100 text-sm mb-6">Unlock deep insights, custom branding, and unlimited transcripts for your team.</p>
          <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-colors">
            Upgrade Now
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h3 className="font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-zinc-500" />
                </div>
                <div>
                  <p className="text-xs font-medium">Ticket #0{i*12} closed by Mod</p>
                  <p className="text-[10px] text-zinc-500">{i * 5} minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Controller ---

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [view, setView] = useState('landing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSupabase = async () => {
      try {
        const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.39.7');
        
        if (supabaseUrl && supabaseAnonKey) {
          supabase = createClient(supabaseUrl, supabaseAnonKey);
          
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setUser(session.user);
            setView('selection');
          }

          supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
              setUser(session.user);
              setView('selection');
            } else {
              setUser(null);
              setView('landing');
            }
          });
        }
      } catch (err) {
        console.error("Failed to load Supabase:", err);
      } finally {
        setLoading(false);
      }
    };

    initSupabase();
  }, []);

  const handleLogin = async () => {
    if (!supabase) return;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        scopes: 'identify email guilds',
        redirectTo: window.location.origin
      }
    });
    if (error) console.error("Login Error:", error.message);
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setView('landing');
    setSelectedServer(null);
  };

  const selectServer = (server) => {
    setSelectedServer(server);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="animate-in fade-in slide-in-from-bottom-2 duration-700">
        {view === 'landing' && <LandingPage onLogin={handleLogin} loading={loading} />}
        
        {view === 'selection' && (
          <ServerSelection onSelect={selectServer} />
        )}
        
        {view === 'dashboard' && selectedServer && (
          <Dashboard 
            server={selectedServer} 
            onBack={() => setView('selection')} 
          />
        )}
      </main>

      <footer className="py-12 border-t border-zinc-900 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">© 2024 Ticket Buddy Bot. All rights reserved.</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-300">Privacy</a>
            <a href="#" className="hover:text-zinc-300">Terms</a>
            <a href="#" className="hover:text-zinc-300">Support</a>
            <a href="#" className="hover:text-zinc-300">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
