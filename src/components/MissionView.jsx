import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Target, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';
import { MISSION_POOL } from '../data/missions';

export const MissionView = () => {
  const { player, world, activeMissions, completedMissions, resources, acceptMission, completeMission } = useGameStore();

  const availableMissions = MISSION_POOL.filter(m =>
    m.path === player.path &&
    !activeMissions.find(am => am.id === m.id) &&
    !completedMissions.includes(m.id)
  );

  const checkCompletion = (mission) => {
    if (mission.goal.resource) {
      return (resources[mission.goal.resource] || 0) >= mission.goal.amount;
    }
    if (mission.goal.type === 'explore') {
      return (world.stats.explorations || 0) >= mission.goal.amount;
    }
    if (mission.goal.type === 'combat') {
      return (world.stats.enemiesDefeated || 0) >= mission.goal.amount;
    }
    return false;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Target className="text-red-600 w-8 h-8" />
        <h2 className="text-2xl font-black italic tracking-tighter">MISSION OPERATIONS</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active & Available */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Active Objectives</h3>
          {activeMissions.length === 0 && (
            <div className="p-8 border-2 border-dashed border-zinc-800 rounded-xl text-center text-zinc-600">
              No active missions. Seek out targets in Tokyo.
            </div>
          )}
          <div className="space-y-4">
            {activeMissions.map(m => (
              <div key={m.id} className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-lg">{m.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{m.description}</p>
                  </div>
                  <Trophy className="text-yellow-500 w-5 h-5" />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="text-[10px] text-zinc-500">
                    Reward: {Object.entries(m.reward).map(([k,v]) => `${v} ${k}`).join(', ')}
                  </div>
                  <button
                    disabled={!checkCompletion(m)}
                    onClick={() => completeMission(m.id)}
                    className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                      checkCompletion(m)
                        ? 'bg-green-600 hover:bg-green-500 text-white'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {checkCompletion(m) ? 'Complete' : 'In Progress'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest pt-4">Available Tasks</h3>
          <div className="space-y-3">
            {availableMissions.map(m => (
              <button
                key={m.id}
                onClick={() => acceptMission(m)}
                className="w-full p-4 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-lg flex items-center justify-between group transition-all"
              >
                <div className="text-left">
                  <span className="text-xs font-bold text-white group-hover:text-red-500 transition-colors">{m.title}</span>
                  <p className="text-[10px] text-zinc-500">{m.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-red-500 transition-all transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Completed Log */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Archive</h3>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 min-h-[400px]">
            {completedMissions.length === 0 && (
              <p className="text-[10px] text-zinc-600 text-center mt-20 italic underline underline-offset-4 decoration-zinc-800">No mission history recorded.</p>
            )}
            <div className="space-y-2">
              {completedMissions.map(id => {
                const m = MISSION_POOL.find(x => x.id === id);
                return (
                  <div key={id} className="flex items-center gap-3 p-2 bg-black/30 rounded border border-zinc-900">
                    <CheckCircle2 className="text-green-500 w-4 h-4 shrink-0" />
                    <span className="text-xs text-zinc-400 line-through decoration-zinc-700">{m?.title || 'Classified Mission'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
