import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Camera, 
  Layers, 
  Mountain, 
  GitBranch, 
  History, 
  ShieldAlert, 
  Sparkles, 
  SearchCode, 
  FileText, 
  Database, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Sprout,
  Compass
} from 'lucide-react';

export type NavPageId = 
  | 'overview' 
  | 'explorer' 
  | 'geoimages' 
  | 'landcover' 
  | 'terrain' 
  | 'drainage' 
  | 'changedetection' 
  | 'interventions' 
  | 'insights' 
  | 'satquery' 
  | 'reports' 
  | 'datasources' 
  | 'settings' 
  | 'help';

interface SidebarProps {
  currentPage: NavPageId;
  onNavigate: (page: NavPageId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenLanding?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  onOpenLanding,
}) => {
  const navSections = [
    {
      title: 'ANALYZE',
      items: [
        { id: 'overview' as NavPageId, label: 'Overview', icon: LayoutDashboard },
        { id: 'explorer' as NavPageId, label: 'Watershed Explorer', icon: Map },
        { id: 'geoimages' as NavPageId, label: 'Geo-Coded Images', icon: Camera, badge: '6' },
        { id: 'landcover' as NavPageId, label: 'Land Cover', icon: Layers },
        { id: 'terrain' as NavPageId, label: 'Terrain', icon: Mountain },
        { id: 'drainage' as NavPageId, label: 'Drainage & Flow', icon: GitBranch },
      ]
    },
    {
      title: 'MONITOR',
      items: [
        { id: 'changedetection' as NavPageId, label: 'Change Detection', icon: History, badge: '2023-26' },
        { id: 'interventions' as NavPageId, label: 'Interventions', icon: Sprout, badge: '128' },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'insights' as NavPageId, label: 'Insights', icon: Sparkles, badge: 'AI' },
        { id: 'satquery' as NavPageId, label: 'SatQuery AI', icon: SearchCode },
        { id: 'reports' as NavPageId, label: 'Reports', icon: FileText },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'datasources' as NavPageId, label: 'Data Sources', icon: Database },
        { id: 'settings' as NavPageId, label: 'Settings', icon: Settings },
        { id: 'help' as NavPageId, label: 'Help & Docs', icon: HelpCircle },
      ]
    }
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-white/10 bg-[#090d18] transition-all duration-300 select-none z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={onOpenLanding}
          className="flex items-center gap-2.5 text-left group overflow-hidden"
          title="GeoWatershed AI — Return to Landing"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-xl">🌿</span>
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <div className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1">
                <span>GeoWatershed</span>
                <span className="text-emerald-400">AI</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide">
                Geospatial Intelligence
              </div>
            </div>
          )}
        </button>

        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors hidden md:block"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navSections.map(section => (
          <div key={section.title}>
            {!isCollapsed && (
              <div className="px-3 mb-1 text-[10px] font-bold text-slate-400 tracking-wider">
                {section.title}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`} />

                    {!isCollapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/5 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {/* Active Left Indicator Pip */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-emerald-400"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status & SIH 2026 Badge */}
      <div className="p-3 border-t border-white/10 bg-slate-950/60">
        {!isCollapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Smart India Hackathon</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                SIH 2026
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                PROTOTYPE ACTIVE
              </span>
              <span className="font-mono text-slate-400">DEMO MODE</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[9px] font-mono text-slate-400 font-bold">2026</span>
          </div>
        )}
      </div>
    </aside>
  );
};
