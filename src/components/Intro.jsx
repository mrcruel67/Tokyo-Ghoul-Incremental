import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Skull, Shield, Zap, Target, Info } from 'lucide-react';
import { translations } from '../utils/i18n';

export const Intro = () => {
  const { setPath, setRcType, player, world } = useGameStore();
  const t = translations[world?.language || 'en'] || translations.en;
  const [step, setStep] = useState(1);
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedRc, setSelectedRc] = useState(null);

  const paths = [
    {
      id: 'ghoul',
      name: 'Ghoul',
      icon: Skull,
      color: 'text-red-500',
      description: 'Survival of the fittest. Consume human flesh to grow stronger, develop a Kagune, and avoid the CCG.',
      features: ['Kagune Transformation', 'Regeneration', 'RC-based Progression']
    },
    {
      id: 'human',
      name: 'CCG Investigator',
      icon: Shield,
      color: 'text-blue-500',
      description: 'The shield of Tokyo. Use technology, Quinques, and strategic training to hunt down ghouls.',
      features: ['Quinque Weaponry', 'CCG Resources', 'Tactical Equipment']
    }
  ];

  const rcTypes = [
    { id: 'ukaku', name: 'Ukaku', description: 'Feather-like. High speed, long-range, but low endurance.' },
    { id: 'koukaku', name: 'Koukaku', description: 'Shell-like. High defense, heavy hits, but slow.' },
    { id: 'rinkaku', name: 'Rinkaku', description: 'Scale-like. High regeneration and power, but fragile.' },
    { id: 'bikaku', name: 'Bikaku', description: 'Tail-like. Balanced in all aspects. No major weakness.' },
  ];

  const handleStart = () => {
    setPath(selectedPath);
    if (selectedPath === 'ghoul') setRcType(selectedRc);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-zinc-950/80 border border-zinc-800 rounded-xl backdrop-blur-xl p-10 space-y-8">

        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-black text-red-600 tracking-tighter italic">{t.choose_fate}</h1>
              <p className="text-zinc-500">{t.fate_desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paths.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPath(p.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left space-y-4 group ${
                    selectedPath === p.id ? 'border-red-600 bg-red-600/5' : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900/50'
                  }`}
                >
                  <p.icon className={`w-12 h-12 ${p.color} transition-transform group-hover:scale-110`} />
                  <div>
                    <h3 className="text-xl font-bold text-white">{p.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{p.description}</p>
                  </div>
                  <ul className="space-y-1">
                    {p.features.map(f => (
                      <li key={f} className="text-[10px] flex items-center gap-2 text-zinc-400">
                        <div className="w-1 h-1 bg-red-600 rounded-full" /> {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => setStep(selectedPath === 'ghoul' ? 2 : 3)}
                disabled={!selectedPath}
                className="bg-red-600 text-white rounded px-12 py-3 hover:bg-red-700 transition-colors text-sm font-bold uppercase tracking-widest disabled:opacity-20"
              >
                {t.continue}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-blue-400 tracking-tighter italic">RC TYPE SELECTION</h2>
              <p className="text-zinc-500">Every ghoul is born with a unique predatory organ.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rcTypes.map((rc) => (
                <button
                  key={rc.id}
                  onClick={() => setSelectedRc(rc.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedRc === rc.id ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/30'
                  }`}
                >
                  <h4 className="font-bold text-sm text-blue-300 mb-2 uppercase">{rc.name}</h4>
                  <p className="text-[10px] text-zinc-500 leading-tight">{rc.description}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-white text-xs">Back</button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedRc}
                className="bg-red-600 text-white rounded px-12 py-3 hover:bg-red-700 transition-colors text-sm font-bold uppercase tracking-widest disabled:opacity-20"
              >
                {t.finalize}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in zoom-in duration-500 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center animate-pulse ${selectedPath === 'ghoul' ? 'border-red-600' : 'border-blue-600'}`}>
                   <Target className={`w-10 h-10 ${selectedPath === 'ghoul' ? 'text-red-600' : 'text-blue-600'}`} />
                </div>
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">
                {selectedPath === 'ghoul' ? 'The Ravenous One' : 'The Steel Guardian'}
              </h2>
              <p className="text-zinc-500 max-w-md mx-auto">
                {selectedPath === 'ghoul'
                  ? '"In this world, the weak are consumed by the strong. Whether you are the predator or the prey depends on your will to survive."'
                  : '"The peace of this city is bought with blood. We are the line between humanity and the monsters in the dark."'
                }
              </p>
            </div>

            <div className="pt-8 flex flex-col items-center gap-4">
              <button
                onClick={handleStart}
                className="bg-red-600 text-white rounded px-20 py-4 hover:bg-red-700 transition-colors text-lg font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(139,0,0,0.3)]"
              >
                {t.awaken}
              </button>
              <p className="text-[10px] text-zinc-600 flex items-center gap-2">
                <Info className="w-3 h-3" /> All choices are permanent for this run.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
