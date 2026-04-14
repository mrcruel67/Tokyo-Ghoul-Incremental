import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Swords, Skull } from 'lucide-react';
import { calculateDamage } from '../utils/combatEngine';
import { translations } from '../utils/i18n';

export const CombatView = () => {
  const { player, addXp, addResource, updatePlayerHealth, world, addReputation, updatePlayerStamina } = useGameStore();
  const t = translations[world.language] || translations.en;
  const [battleLog, setBattleLog] = useState(["A wild investigator appears!"]);
  const [enemy, setEnemy] = useState(null);
  const [victory, setVictory] = useState(false);

  const generateEnemy = () => {
      const types = ['ukaku', 'koukaku', 'rinkaku', 'bikaku'];
      return {
        name: `CCG ${['Rank 3', 'Rank 2', 'Rank 1'][Math.floor(Math.random() * 3)]} Investigator`,
        hp: 50 + (player.level * 20),
        maxHp: 50 + (player.level * 20),
        stats: { strength: 3 + player.level },
        rcType: types[Math.floor(Math.random() * types.length)],
      };
  };

  useEffect(() => {
    if (!enemy) setEnemy(generateEnemy());
  }, []);

  const handleAttack = () => {
    if (!enemy) return;

    const pDmg = calculateDamage(player, enemy);
    const eDmg = calculateDamage({ ...enemy, path: 'human' }, player);

    const newEnemyHp = Math.max(0, enemy.hp - pDmg);

    updatePlayerHealth(-eDmg);
    setEnemy(prev => ({ ...prev, hp: newEnemyHp }));

    setBattleLog(prev => [
      `You dealt ${pDmg} damage!`,
      `${enemy.name} dealt ${eDmg} damage!`,
      ...prev
    ]);

    if (newEnemyHp === 0) {
      setBattleLog(prev => [`TARGET NEUTRALIZED. Choose your action.`, ...prev]);
      setVictory(true);

      // Track stats
      useGameStore.setState(state => ({
        world: {
          ...state.world,
          stats: { ...state.world.stats, enemiesDefeated: state.world.stats.enemiesDefeated + 1 }
        }
      }));
    }
  };

  const handleFinishAction = (action) => {
    const xpGain = 20 * player.level;
    addXp(xpGain);

    if (action === 'eat') {
        addResource('meat', 2);
        updatePlayerHealth(player.maxHp * 0.1);
        useGameStore.setState(state => ({
            world: { ...state.world, stats: { ...state.world.stats, corpsesConsumed: state.world.stats.corpsesConsumed + 1 } }
        }));
        setBattleLog(prev => [`Consumed the target. Gained extra meat and HP.`, ...prev]);
    } else if (action === 'finish') {
        addResource('meat', 1);
        addReputation(player.path === 'ghoul' ? 'aogiri' : 'ccg', 10);
        setBattleLog(prev => [`Confirmed the kill. Reputation increased.`, ...prev]);
    } else if (action === 'recruit') {
        if (Math.random() < 0.05) {
            useGameStore.setState(state => ({
                world: { ...state.world, stats: { ...state.world.stats, alliesCount: state.world.stats.alliesCount + 1 } }
            }));
            setBattleLog(prev => [`SUCCESS! The target has joined your cause.`, ...prev]);
        } else {
            setBattleLog(prev => [`Recruitment failed. The target escaped.`, ...prev]);
        }
    }

    setVictory(false);
    setEnemy(null);
  };

  const nextBattle = () => {
    setVictory(false);
    setEnemy(generateEnemy());
    setBattleLog(["Another investigator approaches..."]);
  };

  if (!enemy) return <div className="p-8 text-white">Searching for enemies...</div>;

  return (
    <div className="p-8 h-full flex flex-col gap-8 animate-in slide-in-from-right duration-500 text-white">
      <div className="flex items-center gap-3">
        <Swords className="w-8 h-8 text-red-600" />
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">Battlefront</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
        {/* Enemy Side */}
        <div className="bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center p-12 relative overflow-hidden rounded-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900">
            <div className="h-full bg-red-600 transition-all" style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }} />
          </div>
          <Skull className="w-24 h-24 text-zinc-800 mb-6" />
          <h3 className="text-xl font-bold">{enemy.name}</h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2">HP: {enemy.hp} / {enemy.maxHp}</p>
          <p className="text-[10px] text-blue-400 font-mono mt-1">RC TYPE: {enemy.rcType}</p>
        </div>

        {/* Battle Log */}
        <div className="lg:col-span-2 bg-black/40 border border-zinc-800 flex flex-col p-6 rounded-xl h-[500px]">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Tactical Log</h4>
          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[10px] pr-2 custom-scrollbar">
            {battleLog.map((log, i) => (
              <div key={i} className={`p-2 border-l-2 ${log.includes('damage') ? 'border-zinc-700' : 'border-red-600 bg-red-600/5'}`}>
                {log}
              </div>
            ))}
          </div>
          <div className="pt-4 mt-auto grid grid-cols-2 md:grid-cols-3 gap-4">
            {enemy.hp > 0 ? (
                <>
                  <button
                    onClick={handleAttack}
                    className="bg-red-600 text-white rounded px-4 py-4 hover:bg-red-700 transition-colors text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/20 active:scale-95 transform"
                  >
                    {t.strike}
                  </button>
                  <button
                    className="bg-zinc-800 text-zinc-400 rounded px-4 py-4 cursor-not-allowed text-xs font-black uppercase tracking-widest"
                  >
                    Skill (Locked)
                  </button>
                </>
            ) : victory ? (
                <>
                   <button
                    onClick={() => handleFinishAction('eat')}
                    className="bg-orange-800 text-white rounded px-2 py-4 hover:bg-orange-700 transition-colors text-[10px] font-black uppercase tracking-widest"
                  >
                    {t.eat}
                  </button>
                  <button
                    onClick={() => handleFinishAction('finish')}
                    className="bg-red-950 text-white rounded px-2 py-4 hover:bg-red-900 transition-colors text-[10px] font-black uppercase tracking-widest"
                  >
                    {t.finish}
                  </button>
                  <button
                    onClick={() => handleFinishAction('recruit')}
                    className="bg-blue-900 text-white rounded px-2 py-4 hover:bg-blue-800 transition-colors text-[10px] font-black uppercase tracking-widest"
                  >
                    {t.recruit}
                  </button>
                </>
            ) : (
                <button
                  onClick={nextBattle}
                  className="col-span-full bg-zinc-800 text-white rounded px-4 py-4 hover:bg-zinc-700 transition-colors text-sm font-black uppercase tracking-widest"
                >
                  {t.next_target}
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
