import React from 'react';
import { useGameStore } from '../store/gameStore';
import { TECH_TREE } from '../data/techTree';
import { Microscope, Beaker, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '../utils/cn';
import { translations } from '../utils/i18n';

export const ResearchView = () => {
  const { player, resources, completedResearch, unlockResearch, world } = useGameStore();
  const t = translations[world.language] || translations.en;
  const availableTech = TECH_TREE[player.path] || [];

  const isAffordable = (cost) => {
    return Object.entries(cost).every(([res, val]) => {
        if (res === 'money') return player.money >= val;
        if (res === 'xp') return player.xp >= val;
        if (res === 'rcCells') return player.rcCells >= val;
        return resources[res] >= val;
    });
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 text-white">
      <div className="flex items-center gap-3">
        <Microscope className="w-8 h-8 text-blue-500" />
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">{t.research}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableTech.map((tech) => {
          const isCompleted = completedResearch.includes(tech.id);
          const affordable = isAffordable(tech.cost);

          return (
            <div
              key={tech.id}
              className={cn(
                "card border-zinc-800 transition-all group",
                isCompleted ? "border-green-900/50 bg-green-950/5" : "hover:border-blue-500/50"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                    "p-3 rounded-lg bg-zinc-900",
                    isCompleted ? "text-green-500" : "text-zinc-500 group-hover:text-blue-400"
                )}>
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Beaker className="w-6 h-6" />}
                </div>
                {isCompleted && <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Completed</span>}
              </div>

              <h4 className="font-bold text-lg mb-1">{tech.name}</h4>
              <p className="text-xs text-zinc-500 mb-4 leading-relaxed">{tech.description}</p>

              {!isCompleted && (
                <div className="space-y-4">
                  <div className="flex gap-4 flex-wrap">
                    {Object.entries(tech.cost).map(([res, val]) => (
                      <span key={res} className="text-[10px] font-mono uppercase">
                        {res}: <span className={ (resources[res] || player[res] || 0) >= val ? "text-blue-400" : "text-red-500"}>{val}</span>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => unlockResearch(tech.id, tech.cost, tech.effect)}
                    disabled={!affordable}
                    className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition-colors text-xs font-bold uppercase disabled:opacity-30"
                  >
                    Initiate Research
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {availableTech.length === 0 && (
           <div className="col-span-full card border-dashed border-zinc-800 flex flex-col items-center justify-center py-20 text-zinc-600">
             <Lock className="w-12 h-12 mb-4 opacity-20" />
             <p className="italic">No specialized research paths available for your current status.</p>
           </div>
        )}
      </div>
    </div>
  );
};
