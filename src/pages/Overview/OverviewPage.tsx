import React, { useState } from 'react';
import { 
  PRIMARY_WATERSHED, 
  GEO_CODED_IMAGES, 
  WATERSHED_INTERVENTIONS 
} from '../../data/mockData';
import { KpiCard } from '../../components/cards/KpiCard';
import { GISMap } from '../../components/map/GISMap';
import { GeoImage, Intervention } from '../../types';
import { 
  MapPin, 
  Trees, 
  Sprout, 
  Droplet, 
  Mountain, 
  Compass, 
  Layers, 
  Upload, 
  FileText, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { NavPageId } from '../../components/layout/Sidebar';

interface OverviewPageProps {
  onNavigate: (page: NavPageId) => void;
  onOpenUpload: () => void;
  onOpenReport: () => void;
  onSelectGeoImage: (img: GeoImage) => void;
  onSelectIntervention: (intervention: Intervention) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onNavigate,
  onOpenUpload,
  onOpenReport,
  onSelectGeoImage,
  onSelectIntervention,
}) => {
  const [activeLayers, setActiveLayers] = useState<string[]>([
    'Watershed Boundary',
    'Water Bodies',
    'Drainage',
    'Geo-Coded Images',
    'Interventions'
  ]);

  const handleToggleLayer = (layerName: string) => {
    setActiveLayers(prev => 
      prev.includes(layerName) ? prev.filter(l => l !== layerName) : [...prev, layerName]
    );
  };

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SIH 2026 GEOSPATIAL INTELLIGENCE PLATFORM</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            Watershed Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            A unified view of land, water, terrain and watershed interventions.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenUpload}
            className="px-3.5 py-2 rounded-xl glass-panel border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Upload Geo-Image</span>
          </button>
          <button
            onClick={onOpenReport}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row (6 Cards as defined in Rule #22) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <KpiCard
          title="Watershed Area"
          value={PRIMARY_WATERSHED.areaKm2}
          suffix=" km²"
          decimals={1}
          icon={MapPin}
          iconColor="text-emerald-400"
          subtext="WGS84 Catchment"
          onClick={() => onNavigate('explorer')}
        />
        <KpiCard
          title="Vegetation"
          value={PRIMARY_WATERSHED.vegetationPct}
          suffix="%"
          decimals={1}
          change="+6.4%"
          isPositive={true}
          icon={Trees}
          iconColor="text-emerald-400"
          subtext="106.2 km² canopy"
          onClick={() => onNavigate('landcover')}
        />
        <KpiCard
          title="Agriculture"
          value={PRIMARY_WATERSHED.agriculturePct}
          suffix="%"
          decimals={1}
          change="+3.2%"
          isPositive={true}
          icon={Sprout}
          iconColor="text-yellow-400"
          subtext="77.5 km² cropland"
          onClick={() => onNavigate('landcover')}
        />
        <KpiCard
          title="Water Bodies"
          value={18.4}
          suffix=" km²"
          decimals={1}
          change="-1.8 km²"
          isPositive={false}
          icon={Droplet}
          iconColor="text-sky-400"
          subtext="24 water units"
          onClick={() => onNavigate('drainage')}
        />
        <KpiCard
          title="Avg Elevation"
          value={PRIMARY_WATERSHED.avgElevationM}
          suffix=" m"
          decimals={0}
          icon={Mountain}
          iconColor="text-amber-400"
          subtext="Range 320–1245m"
          onClick={() => onNavigate('terrain')}
        />
        <KpiCard
          title="Average Slope"
          value={PRIMARY_WATERSHED.avgSlopeDeg}
          suffix="°"
          decimals={1}
          icon={Compass}
          iconColor="text-purple-400"
          subtext="23.6 km² > 25°"
          onClick={() => onNavigate('terrain')}
        />
      </div>

      {/* Main Hero Visual Area: 65% Interactive Leaflet GIS Map + Side Spatial Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[580px]">
        {/* Main Map Box (Hero - ~65% width) */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl relative flex flex-col">
          {/* Map Top Bar */}
          <div className="px-4 py-2.5 bg-slate-900/80 border-b border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mulshi Interactive Geospatial Workstation</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono px-1.5 py-0.2 rounded bg-white/5">
                Sentinel-2 10m
              </span>
            </div>

            {/* Quick Layer Switchers */}
            <div className="hidden sm:flex items-center gap-1.5">
              {['Land Cover', 'Vegetation', 'Slope', 'Interventions'].map(layer => {
                const isActive = activeLayers.includes(layer);
                return (
                  <button
                    key={layer}
                    onClick={() => handleToggleLayer(layer)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-colors ${
                      isActive 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'text-slate-400 hover:text-slate-200 bg-white/5'
                    }`}
                  >
                    {layer}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actual Leaflet Map Canvas */}
          <div className="flex-1 relative min-h-[480px]">
            <GISMap
              activeLayers={activeLayers}
              onLayerToggle={handleToggleLayer}
              onSelectGeoImage={onSelectGeoImage}
              onSelectIntervention={onSelectIntervention}
            />
          </div>
        </div>

        {/* Side Panel: Ground Truth & Recent Watershed Intel (~35% width) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Geo-Coded Images Mini-Feed */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-xl flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Geo-Coded Ground Photos
                </h3>
              </div>
              <button
                onClick={() => onNavigate('geoimages')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                <span>View all 6</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="mt-3 space-y-2.5 flex-1 overflow-y-auto max-h-60 pr-1">
              {GEO_CODED_IMAGES.slice(0, 3).map(img => (
                <div
                  key={img.id}
                  onClick={() => onSelectGeoImage(img)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/40 cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-12 h-12 rounded-lg object-cover border border-white/10 group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div className="min-w-0 flex-1 text-xs">
                    <div className="font-bold text-slate-100 truncate group-hover:text-indigo-300">
                      {img.title}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{img.category}</span>
                      <span>•</span>
                      <span className="font-mono text-emerald-400">{img.elevationM}m MSL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Interventions Summary Box */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-amber-400" />
                Interventions Status (128)
              </h3>
              <button
                onClick={() => onNavigate('interventions')}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <span>Manage</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400">Check Dams</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">42 Units</div>
                <div className="text-[9px] text-slate-300">Runoff attenuation</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400">Farm Ponds</div>
                <div className="text-base font-bold text-sky-400 font-mono mt-0.5">28 Units</div>
                <div className="text-[9px] text-slate-300">42,500 m³ storage</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400">Contour Trenches</div>
                <div className="text-base font-bold text-orange-400 font-mono mt-0.5">38.4 km</div>
                <div className="text-[9px] text-slate-300">Infiltration boost</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400">Riparian Plantation</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">42.8 ha</div>
                <div className="text-[9px] text-slate-300">89% sapling survival</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center justify-between">
              <span>Audited under PMKSY & SIH Cycle</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
