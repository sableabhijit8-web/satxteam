import React, { useState } from 'react';
import { WATERSHED_INTERVENTIONS, GEO_CODED_IMAGES } from '../../data/mockData';
import { Intervention, InterventionType, GeoImage } from '../../types';
import { GISMap } from '../../components/map/GISMap';
import { 
  Sprout, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Droplet, 
  Mountain, 
  Compass, 
  Layers, 
  Camera, 
  ArrowRight,
  Sparkles,
  Filter
} from 'lucide-react';

interface InterventionsPageProps {
  onSelectGeoImage: (img: GeoImage) => void;
}

export const InterventionsPage: React.FC<InterventionsPageProps> = ({ onSelectGeoImage }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention>(WATERSHED_INTERVENTIONS[0]);
  const [activeTimelineYear, setActiveTimelineYear] = useState<number>(2026);

  const types = [
    'All',
    'Check Dam',
    'Farm Pond',
    'Contour Trench',
    'Plantation',
    'Soil Conservation',
    'Water Conservation Structure'
  ];

  const filteredInterventions = WATERSHED_INTERVENTIONS.filter(item => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesType;
  });

  const timelineYears = [
    { year: 2023, phase: 'Catchment Survey & Planning', desc: 'Baseline drone surveys, contour mapping & PMKSY budget sanction.' },
    { year: 2024, phase: 'Phase 1 Construction & Masonry', desc: '42 Check dams built, 3.2km CCT completed on Tamhini slopes.' },
    { year: 2025, phase: 'Field Monitoring & Riparian Planting', desc: '14 Farm ponds dug, 8,400 saplings planted along stream buffers.' },
    { year: 2026, phase: 'AI Audit & Satellite Evaluation', desc: 'Multi-spectral change detection confirms +6.4 km² canopy recovery.' },
  ];

  // Matched geo-image if any
  const matchedGeoImage = selectedIntervention.geoImageId 
    ? GEO_CODED_IMAGES.find(img => img.id === selectedIntervention.geoImageId)
    : undefined;

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Sprout className="w-4 h-4" />
            <span>WATERSHED CIVIL & BIOLOGICAL TREATMENTS</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            Watershed Interventions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Monitor 128 geo-referenced structures: Check dams, farm ponds, contour trenches, and plantations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-xl glass-panel border border-white/10 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>128 Verified Ground Structures</span>
        </div>
      </div>

      {/* Interactive Timeline 2023 - 2026 (Section 42) */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Intervention Execution & Monitoring Timeline (2023 – 2026)
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Select Year to Filter</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {timelineYears.map(item => {
            const isSelected = activeTimelineYear === item.year;
            return (
              <div
                key={item.year}
                onClick={() => setActiveTimelineYear(item.year)}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${
                  isSelected 
                    ? 'bg-amber-500/20 border-amber-500/40 shadow-lg shadow-amber-500/10' 
                    : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-base font-extrabold font-mono ${
                    isSelected ? 'text-amber-400' : 'text-white'
                  }`}>
                    {item.year}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    item.year <= 2025 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {item.year === 2026 ? 'Current Status' : 'Completed'}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200 mt-1">{item.phase}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs by Category */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedType === t
                ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white glass-panel border border-white/5'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map + Selected Intervention Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl h-[480px] relative">
          <div className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-semibold text-amber-300 backdrop-blur-md flex items-center gap-2">
            <Sprout className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Intervention Markers</span>
          </div>
          <GISMap
            activeLayers={['Watershed Boundary', 'Interventions', 'Drainage', 'Water Bodies']}
            onSelectIntervention={(item) => setSelectedIntervention(item)}
            focusCoords={[selectedIntervention.lat, selectedIntervention.lng]}
            focusZoom={14}
          />
        </div>

        {/* Right Column: Selected Intervention Detail Card */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-white/10 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {selectedIntervention.type}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                  {selectedIntervention.status}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">Year: {selectedIntervention.year}</span>
            </div>

            <h2 className="text-base font-extrabold text-white mt-3">
              {selectedIntervention.title}
            </h2>

            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {selectedIntervention.notes}
            </p>

            {/* Spatial Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs">
              <div className="glass-panel p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400">Nearby Land Cover</div>
                <div className="font-bold text-white mt-0.5">{selectedIntervention.nearbyLandCover}</div>
              </div>

              <div className="glass-panel p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400">Stream Proximity</div>
                <div className="font-bold text-sky-400 font-mono mt-0.5">{selectedIntervention.nearbyDrainageDistanceM} m</div>
              </div>

              <div className="glass-panel p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400">Elevation / Slope</div>
                <div className="font-bold text-amber-400 font-mono mt-0.5">{selectedIntervention.elevationM}m / {selectedIntervention.slopeDeg}°</div>
              </div>

              <div className="glass-panel p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400">Beneficiaries / Budget</div>
                <div className="font-bold text-emerald-400 mt-0.5">{selectedIntervention.beneficiariesCount} Families ({selectedIntervention.costInr})</div>
              </div>
            </div>

            {/* Associated Geo-Coded Photo Preview if matched */}
            {matchedGeoImage && (
              <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-indigo-400" />
                    Verified Ground Photo Attached
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{matchedGeoImage.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={matchedGeoImage.imageUrl}
                    alt={matchedGeoImage.title}
                    className="w-16 h-12 rounded-lg object-cover border border-white/10"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="text-white truncate font-medium">{matchedGeoImage.title}</div>
                    <button
                      onClick={() => onSelectGeoImage(matchedGeoImage)}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 mt-0.5"
                    >
                      <span>Open Field + Satellite Dual Context</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Coordinates: {selectedIntervention.lat.toFixed(4)}°N, {selectedIntervention.lng.toFixed(4)}°E</span>
            <span className="font-mono text-emerald-400 font-bold">WGS84 GPS Validated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
