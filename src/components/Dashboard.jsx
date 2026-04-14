import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Package, TrendingUp, AlertTriangle, Coffee, Beef, Zap, Users } from 'lucide-react';
import { translations } from '../utils/i18n';

export const Dashboard = () => {
  const { player, resources, updateResources, addXp, world, updatePlayerStamina } = useGameStore();

  const handleScavenge = () => {
    if (player.stamina < 5) return;

    updatePlayerStamina(-5);
    const amount = Math.floor(Math.random() * 5) + 1;
    if (player.path === 'ghoul') {
      updateResources({ meat: resources.meat + amount });
    } else {
      updateResources({ supplies: resources.supplies + amount });
    }
    addXp(10);
  };

  const handleEat = () => {
    if (resources.meat >= 1) {
      updateResources({ meat: resources.meat - 1 });

      const hpRegen = player.path === 'ghoul' ? player.maxHp * 0.07 : player.maxHp * 0.04;
      const stamRegen = player.path === 'ghoul' ? player.maxStamina * 0.02 : player.maxStamina * 0.06;

      useGameStore.setState((state) => ({
        player: {
            ...state.player,
            hunger: Math.min(100, state.player.hunger + 30),
            hp: Math.min(state.player.maxHp, state.player.hp + hpRegen),
            stamina: Math.min(state.player.maxStamina, state.player.stamina + stamRegen)
        }
      }));
    }
  };

  const handleManualRecover = () => {
      const now = Date.now();
      if (now - world.stats.lastManualStamina < 2000) return;

      updatePlayerStamina(1);
      useGameStore.setState(state => ({
          world: {
            ...state.world,
            stats: {
                ...state.world.stats,
                lastManualStamina: now,
                manualRecoveries: (state.world.stats.manualRecoveries || 0) + 1
            }
          }
      }));
  };

  const t = translations[world.language] || translations.en;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Resource Overview */}
        <div className="card space-y-4">
          <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Package className="w-4 h-4" /> {t.inventory}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 block uppercase">{t.meat}</span>
              <span className="text-lg font-mono flex items-center gap-2">
                <Beef className="w-4 h-4 text-red-800" /> {Math.floor(resources.meat)}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 block uppercase">{t.coffee}</span>
              <span className="text-lg font-mono flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-700" /> {Math.floor(resources.coffee)}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 block uppercase">{t.steel}</span>
              <span className="text-lg font-mono flex items-center gap-2 text-zinc-300">
                <Zap className="w-4 h-4" /> {Math.floor(resources.steel)}
              </span>
            </div>
          </div>
        </div>

        {/* Path Status */}
        <div className="card space-y-4 border-red-600/30 bg-red-600/5">
          <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-600" /> {t.path}: {player.path ? player.path.toUpperCase() : t.undecided}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">RC Type:</span>
              <span className="text-blue-400 font-bold uppercase tracking-tighter">{player.rcType || 'None'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">{t.kakuja}:</span>
              <span className={player.kakujaLevel > 0 ? "text-red-500" : "text-zinc-600"}>
                {player.kakujaLevel === 0 ? "N/A" : player.kakujaLevel === 1 ? "Half" : "Full"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card space-y-4">
          <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
             {t.quick_actions}
          </h3>
          <div className="space-y-2">
            <button
              onClick={handleScavenge}
              disabled={player.stamina < 5}
              className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded px-4 py-3 transition-colors text-xs disabled:opacity-50"
            >
              {t.scavenge_cost}
            </button>
            <button
              onClick={handleEat}
              className="w-full bg-red-600 text-white rounded px-4 py-3 hover:bg-red-700 transition-colors text-xs disabled:opacity-50"
              disabled={player.hunger > 90 || resources.meat < 1}
            >
              {t.eat_meat_count} ({Math.floor(resources.meat)})
            </button>

            <button
                onClick={handleManualRecover}
                disabled={Date.now() - world.stats.lastManualStamina < 2000}
                className="w-full bg-blue-600 text-white rounded px-4 py-3 hover:bg-blue-700 transition-colors text-xs disabled:opacity-50"
            >
                {t.manual_recovery}
            </button>
          </div>
        </div>
      </div>

      {/* Organizations & Reputation */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-zinc-500" />
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest">{t.influence}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {world.reputation && Object.entries(world.reputation).map(([faction, value]) => (
            <div key={faction} className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500">
                <span>{faction}</span>
                <span className={value >= 0 ? 'text-green-500' : 'text-red-500'}>{value}</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${value >= 0 ? 'bg-zinc-700' : 'bg-red-900'}`}
                  style={{ width: `${Math.min(100, Math.max(0, 50 + value / 2))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* World Status */}
      <div className="card border-zinc-800">
        <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500" /> {t.intel}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed italic">
          "The streets are quiet tonight. A scent of fresh coffee lingers in the air near the 20th Ward. CCG presence is minimal, but sightings of 'Rabbit' have been reported recently. Stay vigilant."
        </p>
      </div>
    </div>
  );
};
