import React from 'react';
import { LayoutDashboard, Map, Swords, Microscope, Home, Settings, User, Target } from 'lucide-react';
import { cn } from '../utils/cn';

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
  return (
    <aside className="w-64 border-r border-zinc-800 bg-black/30 h-[calc(100vh-64px)] p-4 flex flex-col justify-between">
      <div className="space-y-2">
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          active={currentView === 'dashboard'}
          onClick={() => setView('dashboard')}
        />
        <NavItem
          icon={Map}
          label="Tokyo Map"
          active={currentView === 'map'}
          onClick={() => setView('map')}
        />
        <NavItem
          icon={Swords}
          label="Combat"
          active={currentView === 'combat'}
          onClick={() => setView('combat')}
        />
        <NavItem
          icon={Target}
          label="Missions"
          active={currentView === 'missions'}
          onClick={() => setView('missions')}
        />
        <NavItem
          icon={Microscope}
          label="Research"
          active={currentView === 'research'}
          onClick={() => setView('research')}
        />
        <NavItem
          icon={Home}
          label="Hideout / Base"
          active={currentView === 'base'}
          onClick={() => setView('base')}
        />
      </div>

      <div className="space-y-2 pt-4 border-t border-zinc-800">
        <NavItem
          icon={User}
          label="Profile"
          active={currentView === 'profile'}
          onClick={() => setView('profile')}
        />
        <NavItem
          icon={Settings}
          label="Settings"
          active={currentView === 'settings'}
          onClick={() => setView('settings')}
        />
      </div>
    </aside>
  );
};
