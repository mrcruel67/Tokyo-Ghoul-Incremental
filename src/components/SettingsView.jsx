import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Globe, User, Save, Clock, Palette, Image } from 'lucide-react';
import { translations } from '../utils/i18n';

export const SettingsView = () => {
  const { player, world, setLanguage, changePlayerName, setTheme } = useGameStore();
  const [newName, setNewName] = useState(player.name);
  const t = translations[world.language] || translations.en;

  const handleNameChange = () => {
    changePlayerName(newName);
  };

  const cooldownRemaining = () => {
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;
    const diff = now - player.lastNameChange;
    if (diff >= cooldown) return null;
    const remaining = cooldown - diff;
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 text-white">
      <h2 className="text-3xl font-black italic tracking-tighter uppercase">{t.settings}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Language */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Globe className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-widest">{t.language}</h3>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2 rounded border transition-all ${world.language === 'en' ? 'border-red-600 bg-red-600/10 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('pt')}
              className={`flex-1 py-2 rounded border transition-all ${world.language === 'pt' ? 'border-red-600 bg-red-600/10 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
            >
              Português
            </button>
          </div>
        </div>

        {/* Profile / Name Change */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <User className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-widest">{t.change_name}</h3>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-colors"
              placeholder="Enter new name..."
            />
            {cooldownRemaining() ? (
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 italic">
                <Clock className="w-3 h-3" />
                {t.name_cooldown} ({cooldownRemaining()} left)
              </div>
            ) : (
              <button
                onClick={handleNameChange}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" /> {t.save}
              </button>
            )}
          </div>
        </div>

        {/* Theme & Appearance */}
        <div className="card space-y-6 md:col-span-2">
            <div className="flex items-center gap-2 text-zinc-400">
                <Palette className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Aesthetics & Environment</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <p className="text-[10px] text-zinc-600 uppercase font-bold">Theme Color</p>
                    <div className="flex gap-2">
                        {['red', 'blue', 'purple', 'emerald'].map(c => (
                            <button
                                key={c}
                                onClick={() => setTheme({ themeColor: c })}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${world.themeColor === c ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                style={{ backgroundColor: c === 'emerald' ? '#10b981' : c }}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-[10px] text-zinc-600 uppercase font-bold">World Background</p>
                    <div className="flex flex-wrap gap-2">
                        {['default', 'anteiku', 'ccg', 'city'].map(bg => (
                            <button
                                key={bg}
                                onClick={() => setTheme({ background: bg })}
                                className={`px-3 py-1 rounded text-[10px] border transition-all uppercase font-black ${world.background === bg ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-500'}`}
                            >
                                {bg}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-900">
                <p className="text-[10px] text-zinc-600 uppercase font-bold flex items-center gap-2">
                   <Image className="w-3 h-3" /> Custom Background URL
                </p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={world.customBg || ''}
                        onChange={(e) => setTheme({ customBg: e.target.value })}
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-[10px] focus:outline-none focus:border-red-600"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
