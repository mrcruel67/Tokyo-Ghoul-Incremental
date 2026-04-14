import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Intro } from './components/Intro';
import { MapView } from './components/MapView';
import { CombatView } from './components/CombatView';
import { BaseView } from './components/BaseView';
import { ResearchView } from './components/ResearchView';
import { MissionView } from './components/MissionView';
import { SettingsView } from './components/SettingsView';
import { StoryView } from './components/StoryView';
import { InventoryView } from './components/InventoryView';
import { useGameStore } from './store/gameStore';
import { BUILDINGS } from './data/buildings';

const ProfileView = () => {
  const { player } = useGameStore();
  return (
    <div className="p-8">
      <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Subject Profile: {player.name}</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="card space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">Genetic Status</h3>
          <div className="grid grid-cols-2 gap-4">
             {Object.entries(player.stats).map(([stat, val]) => (
               <div key={stat} className="space-y-1">
                 <span className="text-[10px] text-zinc-600 block uppercase">{stat}</span>
                 <span className="text-xl font-mono text-zinc-300">{val}</span>
               </div>
             ))}
          </div>
        </div>
        <div className="card border-ghoul-red/30 bg-ghoul-red/5">
           <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">Traits & Talents</h3>
           <p className="text-sm text-zinc-400 italic mt-4">No special talents awakened yet...</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { player, tick } = useGameStore();
  const [currentView, setView] = useState('dashboard');

  // Game Loop
  useEffect(() => {
    const interval = setInterval(() => {
      tick(BUILDINGS);
    }, 1000); // 1 tick per second
    return () => clearInterval(interval);
  }, [tick]);

  if (!player.path) {
    return <Intro />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'map': return <MapView />;
      case 'combat': return <CombatView />;
      case 'research': return <ResearchView />;
      case 'base': return <BaseView />;
      case 'missions': return <MissionView />;
      case 'profile': return <InventoryView />;
      case 'settings': return <SettingsView />;
      case 'story': return <StoryView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-ghoul-red selection:text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} setView={setView} />
        <main className="flex-1 overflow-y-auto bg-black/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto h-full">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Immersive Overlay */}
      <div className="fixed inset-0 pointer-events-none border-[10px] border-black/5 mix-blend-overlay z-0" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/10 z-0" />
    </div>
  );
}

export default App;
