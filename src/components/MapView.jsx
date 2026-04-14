import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { DISTRICTS, SECTOR_TYPES } from '../data/districts';
import { generateSectors } from '../utils/mapGenerator';
import { MapPin, ShieldAlert, CheckCircle2, Search, Coffee, Info } from 'lucide-react';
import { translations } from '../utils/i18n';

export const MapView = () => {
  const { world, player, addResource, addXp, updatePlayerStamina } = useGameStore();
  const t = translations[world.language] || translations.en;

  const handleExplore = (sector) => {
    if (player.stamina < 10) return;

    updatePlayerStamina(-10);
    const loot = sector.loot[Math.floor(Math.random() * sector.loot.length)];
    addResource(loot, 1);
    addXp(10);

    // Track stats
    useGameStore.setState(state => ({
      world: {
        ...state.world,
        stats: { ...state.world.stats, explorations: state.world.stats.explorations + 1 }
      }
    }));
  };

  const getSectorIcon = (type) => {
    if (type === 'cafe') return Coffee;
    return Search;
  };
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newSectors = generateSectors(world.currentDistrict);
    setSectors(newSectors);
    setLoading(false);
  }, [world.currentDistrict]);

  const currentDistrictInfo = DISTRICTS[world.currentDistrict];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter text-zinc-100 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-red-600" /> {currentDistrictInfo.name}
          </h2>
          <p className="text-zinc-500 mt-1">Threat Level: <span className="text-red-600 font-bold">{currentDistrictInfo.threat}</span></p>
        </div>
        <div className="flex gap-2">
          {player.unlockedDistricts.map(dId => (
            <button key={dId} className="px-3 py-1 bg-zinc-800 rounded text-[10px] border border-zinc-700 text-zinc-400">
              DISTRICT {dId}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((sector) => {
          const Icon = getSectorIcon(sector.type);
          return (
            <div key={sector.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg hover:border-zinc-700 transition-colors group relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-zinc-900 rounded group-hover:bg-red-600/20 transition-colors">
                  <Icon className="w-5 h-5 text-zinc-500 group-hover:text-red-600" />
                </div>
                {sector.danger > 0.5 && <ShieldAlert className="w-4 h-4 text-orange-500" />}
              </div>

              <h4 className="font-bold text-zinc-200">{sector.name}</h4>
              <p className="text-[10px] text-zinc-500 mb-2">{SECTOR_TYPES[sector.type].name}</p>
              <p className="text-[9px] text-zinc-600 mb-4 line-clamp-2 italic">
                 Potential loot: {sector.loot.join(', ')}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleExplore(sector)}
                  disabled={player.stamina < 10}
                  className="flex-1 bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition-colors text-xs disabled:opacity-50"
                >
                  {t.explore} (-10)
                </button>
                <button className="px-3 bg-zinc-800 border border-zinc-700 rounded hover:bg-zinc-700 transition-colors">
                   <CheckCircle2 className="w-4 h-4 text-zinc-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
