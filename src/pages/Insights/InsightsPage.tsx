import React from 'react';
import { WATERSHED_INSIGHTS } from '../../data/mockData';
import { WatershedInsight } from '../../types';
import { 
  Sparkles, 
  MapPin, 
  Trees, 
  Droplet, 
  Mountain, 
  GitBranch, 
  Sprout, 
  History, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { NavPageId } from '../../components/layout/Sidebar';

interface InsightsPageProps {
  onNavigateToMapWithLayer: (layerName: string, coords?: [number, number]) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigateToMapWithLayer }) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Vegetation': return Trees;
      case 'Water': return Droplet;
      case 'Terrain': return Mountain;
      case 'Drainage': return GitBranch;
      case 'Interventions': return Sprout;
      case 'Change': return History;
      default: return Sparkles;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold text-[10px] border border-rose-500/30 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Priority Action</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold text-[10px] border border-amber-500/30">Monitoring Active</span>;
      case 'positive':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[10px] border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Positive Outcome</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold text-[10px]">Hydrological Fact</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>AI SYNTHESIZED DECISION SUPPORT INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            Watershed Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Converting high-dimensional multi-spectral and terrain data into plain-language civil directives.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>6 Actionable Spatial Findings</span>
        </div>
      </div>

      {/* 6 Insight Cards with "View on Map" triggers (Section 47) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WATERSHED_INSIGHTS.map(ins => {
          const Icon = getCategoryIcon(ins.category);
          return (
            <div
              key={ins.id}
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {ins.category}
                    </span>
                  </div>
                  {getUrgencyBadge(ins.urgency)}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {ins.title}
                  </h3>
                  <div className="text-xs font-extrabold text-emerald-400 font-mono mt-1">
                    {ins.highlight}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {ins.description}
                </p>

                {/* Civil Action Directive Box */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Recommended Action:
                  </div>
                  <div className="text-xs text-slate-200 font-medium leading-normal">
                    {ins.actionableStep}
                  </div>
                </div>
              </div>

              {/* View on Map Trigger Button */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  Layer: {ins.layerToActivate}
                </span>
                <button
                  onClick={() => onNavigateToMapWithLayer(ins.layerToActivate, ins.targetCoords)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm group-hover:shadow-emerald-500/20"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View on Map</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
