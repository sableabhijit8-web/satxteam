import React, { useState } from 'react';
import { TERRAIN_METRICS } from '../../data/mockData';
import { GISMap } from '../../components/map/GISMap';
import { ElevationProfileChart } from '../../components/charts/ElevationProfileChart';
import { 
  Mountain, 
  Compass, 
  AlertTriangle, 
  Sun, 
  Layers, 
  ShieldAlert, 
  ArrowUpRight,
  TrendingDown,
  Info
} from 'lucide-react';

export const TerrainPage: React.FC = () => {
  const [terrainTab, setTerrainTab] = useState<'elevation' | 'slope' | 'aspect' | 'hillshade'>('elevation');

  const getMapLayers = () => {
    if (terrainTab === 'slope') return ['Watershed Boundary', 'Slope'];
    if (terrainTab === 'elevation') return ['Watershed Boundary', 'Elevation'];
    return ['Watershed Boundary'];
  };

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Mountain className="w-4 h-4" />
            <span>DIGITAL ELEVATION MODEL (DEM) & SLOPE DYNAMICS</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            Terrain Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Evaluate topography, slope incline, aspect orientation, and water runoff velocities.
          </p>
        </div>

        {/* Terrain Tabs */}
        <div className="flex items-center p-1 rounded-xl glass-panel border border-white/10 self-start sm:self-auto">
          {[
            { id: 'elevation', label: 'Elevation (DEM)' },
            { id: 'slope', label: 'Slope Incline' },
            { id: 'aspect', label: 'Aspect Angle' },
            { id: 'hillshade', label: 'Hillshade Relief' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setTerrainTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                terrainTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 uppercase font-semibold">Elevation Range</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {TERRAIN_METRICS.minElevationM}–{TERRAIN_METRICS.maxElevationM} m
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Tamhini Ridge Crest to Mula Outlet</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 uppercase font-semibold">Average Elevation</div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
            {TERRAIN_METRICS.avgElevationM} m MSL
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Catchment Mean Topography</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 uppercase font-semibold">Average Slope</div>
          <div className="text-2xl font-bold text-sky-400 font-mono mt-1">
            {TERRAIN_METRICS.avgSlopeDeg}° Incline
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Moderate to High Western Ghats Gradient</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-rose-500/30 bg-rose-500/5">
          <div className="text-xs text-rose-300 uppercase font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            High-Slope Critical Area
          </div>
          <div className="text-2xl font-bold text-rose-400 font-mono mt-1">
            {TERRAIN_METRICS.highSlopeAreaKm2} km²
          </div>
          <div className="text-[11px] text-rose-300/80 mt-1">&gt; 25° incline (Severe Soil Erosion Risk)</div>
        </div>
      </div>

      {/* Main Grid: Terrain Map + Elevation Profile Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Terrain Map */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl h-[480px] relative">
          <div className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-semibold text-amber-300 backdrop-blur-md flex items-center gap-2">
            <Mountain className="w-3.5 h-3.5 text-amber-400" />
            <span>Active Layer: {terrainTab.toUpperCase()}</span>
          </div>
          <GISMap
            activeLayers={getMapLayers()}
            baseMap={terrainTab === 'elevation' || terrainTab === 'hillshade' ? 'terrain' : 'satellite'}
          />
        </div>

        {/* Right Column: Slope Distribution & Transect Profile */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Elevation Transect Profile */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-amber-400" />
                West-to-East Topographic Transect
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">24.8 km Profile</span>
            </div>
            <ElevationProfileChart />
          </div>

          {/* Slope Zones Breakdown */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-xl space-y-2.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Slope Gradient Classification
            </h3>
            <div className="space-y-2">
              {TERRAIN_METRICS.slopeZones.map(zone => (
                <div key={zone.range} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: zone.color }}></span>
                    <div>
                      <span className="font-bold text-white font-mono">{zone.range}</span>
                      <span className="text-slate-400 text-[11px] ml-2">{zone.description}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-white font-bold">{zone.areaKm2} km²</span>
                    <span className="text-[10px] text-slate-400 ml-1">({zone.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Disclaimer (Section 36) */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 flex items-start gap-3 text-xs text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-300">Hydrological Field Evaluation Requirement</h4>
          <p className="mt-0.5 text-slate-300 leading-relaxed">
            Terrain indicators provide macro-scale catchment geometry derived from SRTM/Copernicus 30m DEM. Critical high-slope zones (&gt;25°) <strong className="text-amber-300">require further hydrological and on-site engineering field evaluation</strong> before constructing masonry check dams or deep reservoirs.
          </p>
        </div>
      </div>
    </div>
  );
};
