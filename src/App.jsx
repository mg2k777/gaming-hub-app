import React, { useState, useEffect } from 'react';
import { Play, Shield, Zap, Flame, Award, Settings, Bell, Tv, Cpu, RefreshCw, CheckCircle, Crosshair } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dndEnabled, setDndEnabled] = useState(false);
  const [fpsLimit, setFpsLimit] = useState(60);
  const [overlayEnabled, setOverlayEnabled] = useState(true);
  const [ramUsage, setRamUsage] = useState(64);
  const [fpsCurrent, setFpsCurrent] = useState(58);
  const [isBoosting, setIsBoosting] = useState(false);
  const [boosted, setBoosted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFpsCurrent(Math.floor(Math.random() * 5) + (fpsLimit - 4));
    }, 2000);
    return () => clearInterval(interval);
  }, [fpsLimit]);

  const handleBoost = () => {
    setIsBoosting(true);
    setTimeout(() => {
      setIsBoosting(false);
      setBoosted(true);
      setRamUsage(42);
      setTimeout(() => setBoosted(false), 3000);
    }, 1500);
  };

  const games = [
    { id: 1, title: 'Call of Duty: Mobile', genre: 'Action / FPS', icon: '🔥', played: '12.4 hrs' },
    { id: 2, title: 'Genshin Impact', genre: 'RPG / Open World', icon: '⚔️', played: '45.1 hrs' },
    { id: 3, title: 'PUBG MOBILE', genre: 'Battle Royale', icon: '🪖', played: '28.9 hrs' },
    { id: 4, title: 'Free Fire', genre: 'Battle Royale', icon: '🎯', played: '18.2 hrs' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/30">
            G
          </div>
          <div>
            <h1 className="font-bold leading-none text-base">Gaming Hub</h1>
            <span className="text-[10px] text-emerald-400 font-medium">System Ready</span>
          </div>
        </div>

        <button 
          onClick={handleBoost}
          disabled={isBoosting}
          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
            boosted ? 'bg-emerald-500 text-slate-950' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md shadow-indigo-500/20'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${isBoosting ? 'animate-spin' : ''}`} />
          {isBoosting ? 'Optimizing...' : boosted ? 'Boosted!' : 'Booster'}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="p-4 max-w-lg mx-auto space-y-5">
        {activeTab === 'dashboard' && (
          <>
            {/* Quick Stats Grid */}
            <section className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-medium">RAM Usage</span>
                  <Cpu className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-black">{ramUsage}%</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${ramUsage}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-medium">FPS Rate</span>
                  <Crosshair className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400">{fpsCurrent} <span className="text-xs font-normal text-slate-400">/ {fpsLimit}</span></div>
                <div className="text-[10px] text-slate-400 mt-1">Overlay: {overlayEnabled ? 'Active' : 'Off'}</div>
              </div>
            </section>

            {/* Games Library */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-sm text-slate-300">Installed Games</h2>
                <span className="text-xs text-indigo-400 font-medium">{games.length} Games</span>
              </div>

              <div className="space-y-2.5">
                {games.map((game) => (
                  <div key={game.id} className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-3 flex items-center justify-between transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                        {game.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{game.title}</h3>
                        <p className="text-[11px] text-slate-400">{game.genre} • {game.played}</p>
                      </div>
                    </div>
                    <button className="w-9 h-9 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-xl flex items-center justify-center transition-all">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'settings' && (
          <section className="space-y-3">
            <h2 className="font-bold text-sm text-slate-300">Optimization Settings</h2>
            
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl divide-y divide-slate-800">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">Do Not Disturb Mode</div>
                  <div className="text-xs text-slate-400">Block incoming calls & notifications</div>
                </div>
                <button 
                  onClick={() => setDndEnabled(!dndEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${dndEnabled ? 'bg-indigo-600' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${dndEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">FPS & Performance HUD</div>
                  <div className="text-xs text-slate-400">Display floating stats overlay</div>
                </div>
                <button 
                  onClick={() => setOverlayEnabled(!overlayEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${overlayEnabled ? 'bg-indigo-600' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${overlayEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm">Target FPS Limit</div>
                  <span className="text-xs font-bold text-indigo-400">{fpsLimit} FPS</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[30, 60, 120].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setFpsLimit(rate)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        fpsLimit === rate ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {rate} FPS
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 px-6 py-2 flex justify-around max-w-lg mx-auto">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'dashboard' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Play className="w-5 h-5" />
          Games
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'settings' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </nav>
    </div>
  );
}

