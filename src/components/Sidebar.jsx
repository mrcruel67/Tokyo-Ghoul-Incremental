import React from 'react';
import { LayoutDashboard, Map, Swords, Microscope, Home, Settings, User, Target, Book } from 'lucide-react';
import { cn } from '../utils/cn';
import { translations } from '../utils/i18n';

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
      active
        ? "bg-red-600/10 text-red-600"
        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-red-600" : "text-zinc-500 group-hover:text-zinc-200")} />
    <span className="text-sm font-medium">{label}</span>
    {active && <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-red-600 rounded-l-full" />}
  </button>
);

export const Sidebar = ({ currentView, setView }) => {
  const { world } = useGameStore();
  const t = translations[world.language] || translations.en;

  return (
    <aside className="w-64 border-r border-zinc-800 bg-black/30 h-[calc(100vh-64px)] p-4 flex flex-col justify-between">
      <div className="space-y-2">
        <NavItem
          icon={LayoutDashboard}
          label={t.dashboard}
          active={currentView === 'dashboard'}
          onClick={() => setView('dashboard')}
        />
        <NavItem
          icon={Book}
          label={t.story}
          active={currentView === 'story'}
          onClick={() => setView('story')}
        />
        <NavItem
          icon={Map}
          label={t.map}
          active={currentView === 'map'}
          onClick={() => setView('map')}
        />
        <NavItem
          icon={Swords}
          label={t.combat}
          active={currentView === 'combat'}
          onClick={() => setView('combat')}
        />
        <NavItem
          icon={Target}
          label={t.missions}
          active={currentView === 'missions'}
          onClick={() => setView('missions')}
        />
        <NavItem
          icon={Microscope}
          label={t.research}
          active={currentView === 'research'}
          onClick={() => setView('research')}
        />
        <NavItem
          icon={Home}
          label={t.base}
          active={currentView === 'base'}
          onClick={() => setView('base')}
        />
      </div>

      <div className="space-y-2 pt-4 border-t border-zinc-800">
        <NavItem
          icon={User}
          label={t.profile}
          active={currentView === 'profile'}
          onClick={() => setView('profile')}
        />
        <NavItem
          icon={Settings}
          label={t.settings}
          active={currentView === 'settings'}
          onClick={() => setView('settings')}
        />
      </div>
    </aside>
  );
};
