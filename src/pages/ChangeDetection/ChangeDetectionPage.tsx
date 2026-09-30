import React, { useState } from 'react';
import { CHANGE_DETECTION_DATA } from '../../data/mockData';
import { TemporalChangeBar } from '../../components/charts/TemporalChangeBar';
import { 
  History, 
  Layers, 
  ArrowLeftRight, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export const ChangeDetectionPage: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [baselineYear, setBaselineYear] = useState<number>(2023);
  const [targetYear, setTargetYear] = useState<number>(2026);

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <History className="w-4 h-4" />
            <span>BI-TEMPORAL MULTI-SPECTRAL CHANGE DETECTION</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            Multi-Temporal Change Detection
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Understand how watershed characteristics, vegetation canopy, and water spread evolve over time.
          </p>
        </div>

        {/* Date Selectors (Section 43) */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl glass-panel border border-white/10 self-start sm:self-auto text-xs">
          <span className="text-slate-400 font-semibold px-2">Compare:</span>
          {[2023, 2024, 2025, 2026].map(yr => (
            <button
              key={yr}
              onClick={() => {
                if (yr === 2026) setTargetYear(yr);
                else setBaselineYear(yr);
              }}
              className={`px-3 py-1 rounded-lg font-mono font-bold transition-all ${
                baselineYear === yr || targetYear === yr
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Delta KPI Badges (Section 46) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {CHANGE_DETECTION_DATA.map(item => (
          <div key={item.id} className="glass-panel p-3.5 rounded-2xl border border-white/10">
            <div className="text-[11px] text-slate-400 truncate font-medium">{item.name}</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-extrabold text-white font-mono">{item.year2026} km²</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono flex items-center ${
                item.deltaKm2 >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {item.deltaKm2 >= 0 ? `+${item.deltaKm2}` : item.deltaKm2} km²
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              vs {item.year2023} km² ({baselineYear})
            </div>
          </div>
        ))}
      </div>

      {/* Before / After Synchronized Comparison Slider (Section 44) */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-2xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Interactive Split Comparison Slider ({baselineYear} vs {targetYear})
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
            Drag Slider Horizontally
          </span>
        </div>

        {/* The Split Screen Container */}
        <div className="relative aspect-[21/9] min-h-[360px] w-full rounded-xl overflow-hidden select-none border border-white/10 shadow-inner bg-slate-950">
          {/* Base Layer: Target Year (2026) - Green and Restored */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80')`
            }}
          >
            <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-300 backdrop-blur-md">
              CURRENT {targetYear} CYCLE (+6.4 km² VEGETATION)
            </div>
          </div>

          {/* Top Layer: Baseline Year (2023) - Clipped by Slider */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter saturate-75 brightness-90"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80')`
            }}
          >
            <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-slate-950/80 border border-white/20 text-xs font-bold text-slate-300 backdrop-blur-md">
              BASELINE {baselineYear} CYCLE (PRE-INTERVENTION)
            </div>
          </div>

          {/* Vertical Slider Divider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-white shadow-2xl flex items-center justify-center text-white">
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Native Slider Input Overlay */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            aria-label="Split screen comparison slider"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
          <span>← {baselineYear} Baseline State (Drier, 32.6 km² Bare Land)</span>
          <span>{targetYear} Restored State (+42 Interventions Active) →</span>
        </div>
      </div>

      {/* Temporal Bar Chart & Transition Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 glass-panel p-4 rounded-2xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Land Cover Area Shifts (km²)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">DEMO DATA</span>
          </div>
          <TemporalChangeBar />
        </div>

        <div className="lg:col-span-5 glass-panel p-4 rounded-2xl border border-white/10 shadow-xl space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Hydrological Shift Interpretations
          </h3>

          <div className="space-y-2 text-xs">
            {CHANGE_DETECTION_DATA.map(item => (
              <div key={item.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-white">{item.name}</span>
                  <span className={item.deltaKm2 >= 0 ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>
                    {item.deltaKm2 >= 0 ? `+${item.deltaKm2}` : item.deltaKm2} km²
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
