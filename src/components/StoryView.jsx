import React from 'react';
import { useGameStore } from '../store/gameStore';
import { BookOpen, UserCheck, Shield, ChevronRight } from 'lucide-react';
import { translations } from '../utils/i18n';

const CHAPTERS = [
  {
    id: 1,
    title: "Chapter 1: The Tragedy",
    description: "An encounter with Rize Kamishiro changes your life forever. Survive the surgery and your first hunger pangs.",
    requirement: { level: 1 },
    rewards: { xp: 500, money: 200 }
  },
  {
    id: 2,
    title: "Chapter 2: Anteiku",
    description: "Learn to blend into human society under the guidance of Yoshimura and Touka.",
    requirement: { level: 5, explorations: 10 },
    rewards: { xp: 1000, reputation: { anteiku: 20 } }
  },
  {
    id: 3,
    title: "Chapter 3: The Gourmet",
    description: "Shu Tsukiyama has invited you to a special dinner. Can you escape his predatory obsession?",
    requirement: { level: 10 },
    rewards: { xp: 2000, money: 5000 }
  }
];

export const StoryView = () => {
  const { player, world, addXp, addResource, addReputation, acceptMission, completeStoryChapter, storyChapter } = useGameStore();
  const t = (world && translations[world.language]) || translations.en;

  const handleStartChapter = (chap) => {
    if (storyChapter >= chap.id) return;
    completeStoryChapter(chap.id);
    addXp(chap.rewards.xp);
    if (chap.rewards.reputation) {
        Object.entries(chap.rewards.reputation).forEach(([f, a]) => addReputation(f, a));
    }
  };

  const isUnlocked = (req) => {
    if (req.level && player.level < req.level) return false;
    if (req.explorations && (world.stats.explorations || 0) < req.explorations) return false;
    return true;
  };

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom duration-500 text-white">
      <div className="flex items-center gap-4">
        <BookOpen className="w-10 h-10 text-red-600" />
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">{t.story}</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Follow the path of Tokyo's destiny</p>
        </div>
      </div>

      <div className="space-y-4 max-w-4xl">
        {CHAPTERS.map((chap) => {
          const unlocked = isUnlocked(chap.requirement);
          return (
            <div
              key={chap.id}
              className={`p-6 border rounded-xl transition-all ${unlocked ? 'bg-zinc-950 border-zinc-800 hover:border-red-600/50' : 'bg-zinc-900/50 border-zinc-900 opacity-50 grayscale'} ${storyChapter >= chap.id ? 'border-green-600/50 bg-green-950/5' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">CHAPTER {chap.id}</span>
                    <h3 className="text-xl font-bold">{chap.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 max-w-2xl">{chap.description}</p>
                </div>
                {unlocked && storyChapter < chap.id && (
                   <button
                    onClick={() => handleStartChapter(chap)}
                    className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                   >
                     <ChevronRight className="w-6 h-6" />
                   </button>
                )}
                {storyChapter >= chap.id && (
                   <div className="p-2 text-green-500 font-black text-[10px] uppercase tracking-widest border border-green-500/20 rounded">
                      Completed
                   </div>
                )}
              </div>

              {!unlocked && (
                <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center gap-2 text-[10px] text-red-900 font-bold uppercase">
                   Requirement: {chap.requirement.level ? `Level ${chap.requirement.level}` : ''} {chap.requirement.explorations ? `& ${chap.requirement.explorations} Explorations` : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
