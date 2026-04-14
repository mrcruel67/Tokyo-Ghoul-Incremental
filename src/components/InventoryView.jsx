import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Package, Shield, Swords, Zap, RefreshCw } from 'lucide-react';
import { translations } from '../utils/i18n';

export const InventoryView = () => {
  const { player, world, modifyStat, spendResources, addResource } = useGameStore();
  const t = translations[world.language] || translations.en;

  const rerollStats = () => {
    if (player.money < 1000) return;
    spendResources({ money: 1000 });

    // Simple reroll logic
    const newStats = {
      strength: Math.floor(Math.random() * 10) + 1,
      agility: Math.floor(Math.random() * 10) + 1,
      endurance: Math.floor(Math.random() * 10) + 1,
      intelligence: Math.floor(Math.random() * 10) + 1,
      rcEfficiency: player.stats.rcEfficiency,
    };

    useGameStore.setState(state => ({
      player: { ...state.player, stats: newStats }
    }));
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">{t.inventory}</h2>
        <button
          onClick={rerollStats}
          disabled={player.money < 1000}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-xs font-bold transition-all disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4" /> {t.reroll} (¥1,000)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Equipment Slots */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">{t.equipment}</h3>
          <div className="grid grid-cols-1 gap-3">
             <div className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div className="p-3 bg-zinc-900 rounded"><Swords className="w-5 h-5 text-zinc-600" /></div>
                <div>
                   <p className="text-[10px] text-zinc-500 uppercase">{t.weapon}</p>
                   <p className="text-sm font-bold text-zinc-300">{player.equipment.weapon?.name || t.empty}</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div className="p-3 bg-zinc-900 rounded"><Shield className="w-5 h-5 text-zinc-600" /></div>
                <div>
                   <p className="text-[10px] text-zinc-500 uppercase">{t.armor}</p>
                   <p className="text-sm font-bold text-zinc-300">{player.equipment.armor?.name || t.empty}</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div className="p-3 bg-zinc-900 rounded"><Package className="w-5 h-5 text-zinc-600" /></div>
                <div>
                   <p className="text-[10px] text-zinc-500 uppercase">{t.mask}</p>
                   <p className="text-sm font-bold text-zinc-300">{player.equipment.mask?.name || 'Standard Mask'}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">{t.genetic_potential}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(player.stats).map(([stat, val]) => (
              <div key={stat} className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase">{stat}</p>
                <p className="text-2xl font-mono text-white">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
