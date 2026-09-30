import React from 'react';
import { Layers, ShieldCheck, MapPin, Eye, Sparkles } from 'lucide-react';

interface DynamicLegendProps {
  activeLayers: string[];
  onToggleLayer?: (layer: string) => void;
  className?: string;
}

export const DynamicLegend: React.FC<DynamicLegendProps> = ({ 
  activeLayers, 
  onToggleLayer,
  className = '' 
}) => {
  return (
    <div className={`glass-dropdown rounded-xl p-3 text-xs border border-white/10 shadow-2xl backdrop-blur-md max-w-[260px] text-slate-200 ${className}`}>
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 font-semibold text-slate-100">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Legend</span>
        </div>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
          {activeLayers.length} Layers
        </span>
      </div>

      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
        {/* Watershed Boundary */}
        {activeLayers.includes('Watershed Boundary') && (
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2">
              <span className="w-4 h-2.5 rounded-sm border-2 border-emerald-400 bg-emerald-500/20"></span>
              <span className="text-[11px] font-medium text-slate-300">Watershed Boundary</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">248.6 km²</span>
          </div>
        )}

        {/* Land Cover Classes */}
        {(activeLayers.includes('Land Cover') || activeLayers.includes('Vegetation') || activeLayers.includes('Agriculture')) && (
          <div className="pt-1 border-t border-white/5 space-y-1.5">
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Land Cover Classes</div>
            {(activeLayers.includes('Land Cover') || activeLayers.includes('Vegetation')) && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
                  <span className="text-[11px] text-slate-300">Vegetation / Forest</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">42.7%</span>
              </div>
            )}
            {(activeLayers.includes('Land Cover') || activeLayers.includes('Agriculture')) && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50"></span>
                  <span className="text-[11px] text-slate-300">Agriculture / Crops</span>
                </div>
                <span className="text-[10px] text-yellow-400 font-mono">31.2%</span>
              </div>
            )}
            {activeLayers.includes('Land Cover') && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"></span>
                    <span className="text-[11px] text-slate-300">Water Bodies</span>
                  </div>
                  <span className="text-[10px] text-sky-400 font-mono">7.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
                    <span className="text-[11px] text-slate-300">Built-up / Roads</span>
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono">9.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-400 shadow-sm shadow-slate-400/50"></span>
                    <span className="text-[11px] text-slate-300">Bare Land / Rock</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">9.5%</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Water Bodies & Drainage */}
        {(activeLayers.includes('Water Bodies') || activeLayers.includes('Drainage')) && (
          <div className="pt-1 border-t border-white/5 space-y-1.5">
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Hydrology</div>
            {activeLayers.includes('Water Bodies') && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-2.5 rounded-sm bg-sky-500/60 border border-sky-400"></span>
                  <span className="text-[11px] text-slate-300">Mulshi Lake & Ponds</span>
                </div>
                <span className="text-[10px] text-sky-300 font-mono">18.4 km²</span>
              </div>
            )}
            {activeLayers.includes('Drainage') && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-sky-400 inline-block"></span>
                  <span className="text-[11px] text-slate-300">Drainage Channels</span>
                </div>
                <span className="text-[10px] text-sky-300 font-mono">412.6 km</span>
              </div>
            )}
          </div>
        )}

        {/* Slope & Elevation */}
        {(activeLayers.includes('Elevation') || activeLayers.includes('Slope')) && (
          <div className="pt-1 border-t border-white/5 space-y-1.5">
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Terrain Incline</div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 flex-1 rounded-sm bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500"></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-mono">
              <span>0° (Gentle)</span>
              <span>15°</span>
              <span>&gt; 25° (Critical)</span>
            </div>
          </div>
        )}

        {/* Interventions */}
        {activeLayers.includes('Interventions') && (
          <div className="pt-1 border-t border-white/5 space-y-1.5">
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Interventions (128)</div>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-300">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Check Dam
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Farm Pond
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Plantation
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span> Soil Trench
              </span>
            </div>
          </div>
        )}

        {/* Geo-Coded Images */}
        {activeLayers.includes('Geo-Coded Images') && (
          <div className="pt-1 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-indigo-400/40 animate-pulse"></span>
              <span className="text-[11px]">Geo-Coded Photos</span>
            </div>
            <span className="text-[10px] font-mono text-indigo-400">6 Verified</span>
          </div>
        )}
      </div>

      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
        <span>Datum: WGS84</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Ready
        </span>
      </div>
    </div>
  );
};
