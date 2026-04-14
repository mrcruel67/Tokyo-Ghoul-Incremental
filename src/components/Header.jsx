import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart, Activity, Skull, Zap } from 'lucide-react';
import { cn } from '../utils/cn';
import { translations } from '../utils/i18n';

export const Header = () => {
  const { player, world } = useGameStore();
  const t = (world && translations[world.language]) || translations.en;

  const getRankColor = (rank) => {
    switch (rank) {
      case 'C': return 'text-gray-400';
      case 'B': return 'text-green-400';
      case 'A': return 'text-blue-400';
      case 'S': return 'text-purple-400';
      case 'SS': return 'text-orange-400';
      case 'SSS': return 'text-red-500 font-bold';
      default: return 'text-white';
    }
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-black/50 backdrop-blur-md flex items-center px-6 justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter text-red-600 leading-none">TOKYO GHOUL</h1>
          <span className="text-[8px] font-bold text-zinc-600 tracking-[0.3em] uppercase ml-1">Rebirth / v1.0.0</span>
        </div>
        <div className="h-4 w-px bg-zinc-800" />
        <span className={cn("text-sm font-bold tracking-widest", getRankColor(player.rank))}>
          {t.rank} {player.rank}
        </span>
      </div>

      <div className="flex items-center gap-8">
        {/* Stamina */}
        <div className="flex items-center gap-2 group">
          <Zap className="w-4 h-4 text-yellow-400" />
          <div className="w-24 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${(player.stamina / player.maxStamina) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono">{Math.floor(player.stamina)}</span>
        </div>

        {/* HP */}
        <div className="flex items-center gap-2 group">
          <Heart className="w-4 h-4 text-red-500" />
          <div className="w-32 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-red-600 transition-all duration-500"
              style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono">{Math.floor(player.hp)}/{player.maxHp}</span>
        </div>

        {/* RC Cells */}
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          <div className="w-32 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${(player.rcCells / player.maxRcCells) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono">{Math.floor(player.rcCells)}/{player.maxRcCells}</span>
        </div>

        {/* Hunger */}
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-orange-400" />
          <div className="w-32 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{ width: `${player.hunger}%` }}
            />
          </div>
          <span className="text-[10px] font-mono">{Math.floor(player.hunger)}%</span>
        </div>

        {/* Sanity */}
        <div className="flex items-center gap-2">
          <Skull className="w-4 h-4 text-purple-400" />
          <div className="w-32 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: `${player.sanity}%` }}
            />
          </div>
          <span className="text-[10px] font-mono">{Math.floor(player.sanity)}%</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-zinc-500">LV.{player.level}</span>
        <span className="text-sm font-bold text-yellow-500">¥{player.money.toLocaleString()}</span>
      </div>
    </header>
  );
};
