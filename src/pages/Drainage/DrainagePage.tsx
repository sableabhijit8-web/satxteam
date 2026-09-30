import React from 'react';
import { DRAINAGE_METRICS } from '../../data/mockData';
import { GISMap } from '../../components/map/GISMap';
import { 
  GitBranch, 
  Droplets, 
  Waves, 
  Compass, 
  ArrowDownRight, 
  Layers, 
  Info,
  CheckCircle2,
  Sparkles,
  MapPin
} from 'lucide-react';

export const DrainagePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
            <GitBranch className="w-4 h-4" />
            <span>HYDROLOGICAL NETWORK & RUNOFF VECTORS</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            Drainage & Water Flow
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Trace Strahler stream orders, flow accumulation vectors, and natural catchment discharge paths.
          </p>
        </div>

        {/* Animated Flow Indicator Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold self-start sm:self-auto">
          <Waves className="w-4 h-4 text-sky-400 animate-pulse" />
          <span>Active Flow Vectors: Ridge → Outlet</span>
        </div>
      </div>

      {/* KPI Cards (Section 38) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 uppercase font-semibold">Total Drainage Length</div>
          <div className="text-2xl font-bold text-sky-400 font-mono mt-1">
            {DRAINAGE_METRICS.totalLengthKm} km
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Stream network mapped</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 uppercase font-semibold">Mapped Streams</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {DRAINAGE_METRICS.streamCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">1st to 4th order tributaries</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 uppercase font-semibold">Drainage Density</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {DRAINAGE_METRICS.drainageDensityKmPerKm2} km/km²
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Moderate to High permeability</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 uppercase font-semibold">Water Bodies</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">
            {DRAINAGE_METRICS.waterBodiesCount} Units
          </div>
          <div className="text-[11px] text-slate-400 mt-1">18.4 km² total surface spread</div>
        </div>
      </div>

      {/* Main Grid: Interactive Map with Flow Animations + Stream Orders Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl h-[500px] relative">
          <div className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-semibold text-sky-300 backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span>Drainage Network Overlay (Animated Flow Active)</span>
          </div>

          <div className="absolute bottom-16 right-4 z-20 glass-panel p-2.5 rounded-xl border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Outlet: Mula River (18.485°N, 73.578°E)</span>
          </div>

          <GISMap
            activeLayers={['Watershed Boundary', 'Drainage', 'Water Bodies', 'Interventions']}
            baseMap="dark"
          />
        </div>

        {/* Right Column: Strahler Stream Orders & Flow Dynamics */}
        <div className="lg:col-span-4 space-y-4">
          {/* Strahler Orders Card */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Strahler Stream Orders</span>
              <span className="text-[10px] text-sky-400 font-mono">Bifurcation Ratio: 3.8</span>
            </h3>

            <div className="space-y-2 text-xs">
              {DRAINAGE_METRICS.streams.map(str => (
                <div key={str.order} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                      #{str.order}
                    </span>
                    <div>
                      <div className="font-bold text-white">Order {str.order} Streams</div>
                      <div className="text-[10px] text-slate-400">{str.count} channel segments</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-sky-300">
                    {str.lengthKm} km
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flow Direction & Conservation Logic Card */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-xl space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              Hydrological Infiltration Strategy
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Order 1 and 2 headwater streams on slopes &gt;15° exhibit high velocity. Locating Continuous Contour Trenches (CCT) and vegetative boulder plugs in these upper catchments reduces silt load in Mulshi reservoir by an estimated 28%.
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
              <span>128 Interventions Aligned to Streams</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
