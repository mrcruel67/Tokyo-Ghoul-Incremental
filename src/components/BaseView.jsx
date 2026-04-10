import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Home, Battery } from 'lucide-react';
import { BUILDINGS } from '../data/buildings';

export const BaseView = () => {
  const { player, resources, ownedBuildings, buyBuilding } = useGameStore();

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 text-white">
      <div className="flex items-center gap-3">
        <Home className="w-8 h-8 text-red-600" />
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">Hideout Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Available Structures</h3>
          {BUILDINGS.map((b) => (
            <div key={b.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg flex gap-4 items-center group hover:border-red-600/50 transition-colors">
              <div className="p-4 bg-zinc-900 rounded-lg group-hover:bg-red-600/10">
                <b.icon className="w-6 h-6 text-zinc-400 group-hover:text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                    <h4 className="font-bold text-sm">{b.name}</h4>
                    <span className="text-[10px] font-mono text-zinc-500">Owned: {ownedBuildings[b.id] || 0}</span>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">{b.description}</p>
                <div className="flex gap-4 mt-2">
                   {Object.entries(b.cost).map(([res, val]) => (
                     <span key={res} className="text-[9px] font-mono text-zinc-400 uppercase">
                       {res}: <span className={(resources[res] || player[res] || 0) >= val ? "text-green-500" : "text-red-500"}>{val}</span>
                     </span>
                   ))}
                </div>
              </div>
              <button
                onClick={() => buyBuilding(b.id, b.cost)}
                className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition-colors text-[10px]"
                disabled={Object.entries(b.cost).some(([res, val]) => (resources[res] || player[res] || 0) < val)}
              >
                Construct
              </button>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-lg space-y-6">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">Active Production</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-black/40 rounded border border-zinc-800">
               <div className="flex items-center gap-3">
                 <Battery className="w-4 h-4 text-green-500" />
                 <span className="text-xs font-bold">Passive Energy Grid</span>
               </div>
               <span className="text-[10px] font-mono text-zinc-400">+0.0 RC/s</span>
            </div>
            <p className="text-[10px] text-zinc-600 text-center italic">
              "A safe place is hard to find in Tokyo. Upgrade your hideout to survive the long nights."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
