import React, { useState } from 'react';
import { LAND_COVER_CLASSES } from '../../data/mockData';
import { GISMap } from '../../components/map/GISMap';
import { ModelCard } from '../../components/cards/ModelCard';
import { LandCoverDonut } from '../../components/charts/LandCoverDonut';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  Eye, 
  Sliders, 
  HelpCircle,
  ArrowRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const LandCoverPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'original' | 'segmentation' | 'overlay'>('overlay');
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(undefined);

  // Active map layers mapped from tabs
  const getMapLayers = () => {
    if (activeTab === 'original') return ['Watershed Boundary'];
    if (activeTab === 'segmentation') return ['Watershed Boundary', 'Land Cover', 'Water Bodies'];
    return ['Watershed Boundary', 'Land Cover', 'Vegetation', 'Agriculture', 'Water Bodies'];
  };

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Layers className="w-4 h-4" />
            <span>DEEP LEARNING MULTI-SPECTRAL SEGMENTATION</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            AI Land Cover Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Transform geo-coded imagery and satellite pixels into structured land-cover classes.
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center p-1 rounded-xl glass-panel border border-white/10 self-start sm:self-auto">
          {[
            { id: 'original', label: 'Original Satellite' },
            { id: 'segmentation', label: 'AI Segmentation' },
            { id: 'overlay', label: 'Overlay View' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map with Segmentation vs Recharts Donut & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl h-[460px] relative">
            <div className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-semibold text-emerald-300 backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Active Render Mode: {activeTab.toUpperCase()}</span>
            </div>
            <GISMap
              activeLayers={getMapLayers()}
              baseMap={activeTab === 'segmentation' ? 'dark' : 'satellite'}
            />
          </div>

          {/* Model Card */}
          <ModelCard />
        </div>

        {/* Right Column: Statistics & Donut Chart */}
        <div className="lg:col-span-4 space-y-4">
          {/* Donut Chart Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Distribution Breakdown
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Total 248.6 km²</span>
            </div>

            <LandCoverDonut
              onSelectClass={(id) => setSelectedClassId(id === selectedClassId ? undefined : id)}
              selectedClassId={selectedClassId}
            />

            <div className="text-center text-[11px] text-slate-400">
              Click a pie segment to isolate the corresponding class
            </div>
          </div>

          {/* Class Breakdown List Cards */}
          <div className="space-y-2">
            {LAND_COVER_CLASSES.map(cls => (
              <div
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id === selectedClassId ? undefined : cls.id)}
                className={`p-3 rounded-xl glass-panel border transition-all cursor-pointer flex items-center justify-between ${
                  selectedClassId === cls.id 
                    ? 'border-emerald-400 bg-emerald-500/10 shadow-md' 
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3.5 h-3.5 rounded-md ${cls.tailwindBg} shadow-sm shrink-0`} />
                  <div>
                    <div className="text-xs font-bold text-white">{cls.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{cls.areaKm2} km²</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-white font-mono">{cls.percentage}%</div>
                  <div className={`text-[10px] font-mono flex items-center justify-end gap-0.5 ${
                    cls.changeKm2 >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {cls.changeKm2 >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{cls.changeKm2 >= 0 ? `+${cls.changeKm2}` : cls.changeKm2} km²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
