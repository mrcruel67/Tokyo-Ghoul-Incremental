import React from 'react';
import { HelpCircle, Coffee, Zap, Swords, Home, Target } from 'lucide-react';

export const GuideView = () => {
  return (
    <div className="p-8 space-y-8 animate-in zoom-in duration-500 text-white max-w-4xl">
      <div className="flex items-center gap-4">
        <HelpCircle className="w-10 h-10 text-blue-500" />
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">Tokyo Survival Guide</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card space-y-4">
          <div className="flex items-center gap-2 text-amber-600">
             <Coffee className="w-5 h-5" />
             <h3 className="font-bold uppercase tracking-widest text-sm">Resources: Coffee</h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Essential for Ghouls. Consuming coffee helps maintain sanity and masks your RC scent. Without it, your sanity will drop when hunger is high, leading to insanity.
          </p>
        </div>

        <div className="card space-y-4">
          <div className="flex items-center gap-2 text-zinc-300">
             <Zap className="w-5 h-5" />
             <h3 className="font-bold uppercase tracking-widest text-sm">Resources: Steel</h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The backbone of construction. Used to build hideout structures like Meat Lockers and Research Labs. CCG Investigators also use it to upgrade Quinques.
          </p>
        </div>

        <div className="card space-y-4">
          <div className="flex items-center gap-2 text-red-600">
             <Swords className="w-5 h-5" />
             <h3 className="font-bold uppercase tracking-widest text-sm">Combat & Finishing</h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Defeating enemies opens strategic choices: Eat (HP/Meat), Finish (Reputation), or Recruit (Ally). Be careful with your RC Type compatibility!
          </p>
        </div>

        <div className="card space-y-4">
          <div className="flex items-center gap-2 text-blue-500">
             <Target className="w-5 h-5" />
             <h3 className="font-bold uppercase tracking-widest text-sm">Progression</h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Follow the Story Mode to unlock advanced buildings and new districts. Higher reputation with factions unlocks specialized gear and missions.
          </p>
        </div>
      </div>
    </div>
  );
};
