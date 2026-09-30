import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  MapPin, 
  Layers, 
  Sliders, 
  HelpCircle, 
  Compass, 
  PlayCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ALTERNATE_WATERSHEDS } from '../../data/mockData';

interface NavbarProps {
  currentWatershed: string;
  onSelectWatershed: (name: string) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  onStartDemoTour?: () => void;
  onOpenLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentWatershed,
  onSelectWatershed,
  onOpenSearch,
  onOpenNotifications,
  unreadNotificationsCount,
  onStartDemoTour,
  onOpenLanding,
}) => {
  const [isWatershedDropdownOpen, setIsWatershedDropdownOpen] = useState(false);

  return (
    <header className="h-16 border-b border-white/10 bg-[#0a0f1d]/90 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Left: Watershed Selector & Quick Landing Link */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setIsWatershedDropdownOpen(!isWatershedDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border border-white/10 hover:border-emerald-500/40 text-left transition-all group"
            aria-label="Select Watershed"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Active Watershed</div>
              <div className="text-xs font-bold text-slate-100 flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                <span>{currentWatershed}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </button>

          {isWatershedDropdownOpen && (
            <div className="absolute top-12 left-0 w-72 glass-dropdown border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2.5 py-1.5 text-[10px] uppercase font-semibold text-slate-400 tracking-wider border-b border-white/5">
                Select Catchment Basin
              </div>
              <div className="mt-1 space-y-1">
                {ALTERNATE_WATERSHEDS.map(ws => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      onSelectWatershed(ws.name);
                      setIsWatershedDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      currentWatershed.includes(ws.name.split(' ')[0])
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div>{ws.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{ws.area}</div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-mono">
                      {ws.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIH Hackathon Demo Walkthrough Button */}
        {onStartDemoTour && (
          <button
            onClick={onStartDemoTour}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:border-emerald-400 hover:bg-emerald-500/30 transition-all shadow-sm"
          >
            <PlayCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Judge Demo Walkthrough</span>
          </button>
        )}
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 text-xs text-slate-400 transition-colors shadow-inner group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <span>Search coordinates, check dam, village, or layer...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-400 border border-white/10">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Data Date, Status, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 lg:hidden"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Data Date Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl glass-panel border border-white/5 text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold text-white font-mono">Cycle 2026</span>
        </div>

        {/* System Data Status Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="hidden sm:inline">Data Ready</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center animate-bounce">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* View Landing Portal Button */}
        {onOpenLanding && (
          <button
            onClick={onOpenLanding}
            title="Return to Public Landing Presentation"
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <span>Landing</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        )}

        {/* Profile Avatar / SIH Badge */}
        <div className="flex items-center gap-2 pl-1 border-l border-white/10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20">
            SIH
          </div>
        </div>
      </div>
    </header>
  );
};
