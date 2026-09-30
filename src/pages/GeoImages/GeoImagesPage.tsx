import React, { useState } from 'react';
import { GEO_CODED_IMAGES } from '../../data/mockData';
import { GeoImage, GeoImageCategory } from '../../types';
import { GISMap } from '../../components/map/GISMap';
import { 
  Camera, 
  Upload, 
  MapPin, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  Filter, 
  Layers, 
  Eye, 
  Sparkles,
  Mountain,
  Compass,
  Droplet
} from 'lucide-react';

interface GeoImagesPageProps {
  onSelectGeoImage: (image: GeoImage) => void;
  onOpenUpload: () => void;
}

export const GeoImagesPage: React.FC<GeoImagesPageProps> = ({
  onSelectGeoImage,
  onOpenUpload,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = [
    'All',
    'Check Dam Structure',
    'Farm Pond Reservoir',
    'Contour Trench Line',
    'Riparian Plantation',
    'Soil Erosion Gully',
    'Vegetation Canopy',
  ];

  const filteredImages = GEO_CODED_IMAGES.filter(img => {
    const matchesCategory = selectedCategory === 'All' || img.category === selectedCategory;
    const matchesSearch = img.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          img.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          img.observer.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
            <Camera className="w-4 h-4" />
            <span>GROUND TRUTH FIELD RECONNAISSANCE</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            Geo-Coded Images
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Synchronize field-level photographs with exact satellite geographic context.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Geo-Coded Images</span>
        </button>
      </div>

      {/* Category Pills & Filter Bar */}
      <div className="glass-panel p-3 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-500/25 text-indigo-300 font-bold border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredImages.length} of {GEO_CODED_IMAGES.length} Field Records
        </div>
      </div>

      {/* Split View: Top Map + Bottom Image Gallery */}
      <div className="rounded-2xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl h-[340px] relative">
        <div className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-semibold text-indigo-300 backdrop-blur-md flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
          <span>Field Observation Map Pins (Click to Inspect)</span>
        </div>
        <GISMap
          activeLayers={['Watershed Boundary', 'Geo-Coded Images', 'Water Bodies', 'Drainage']}
          onSelectGeoImage={onSelectGeoImage}
        />
      </div>

      {/* Grid of Geo-Coded Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredImages.map(img => (
          <div
            key={img.id}
            onClick={() => onSelectGeoImage(img)}
            className="group glass-panel rounded-2xl border border-white/10 overflow-hidden hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 shadow-xl cursor-pointer flex flex-col"
          >
            {/* Image Preview with Dual Badge */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-indigo-300">
                {img.category}
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-[10px] font-semibold text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {img.status}
              </div>

              {/* Bottom Lat/Lng Ribbon */}
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                <span>{img.lat.toFixed(4)}°N, {img.lng.toFixed(4)}°E</span>
                <span className="text-emerald-400 font-bold">{img.elevationM}m MSL</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {img.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {img.description}
                </p>
              </div>

              {/* Spatial Metrics Tag Row */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-300">
                <div className="p-1 rounded bg-white/5 text-center">
                  <div className="text-slate-400 text-[9px]">Slope</div>
                  <div className="font-bold text-amber-400">{img.slopeDeg}°</div>
                </div>
                <div className="p-1 rounded bg-white/5 text-center">
                  <div className="text-slate-400 text-[9px]">Drainage</div>
                  <div className="font-bold text-sky-400">{img.nearestDrainageM}m</div>
                </div>
                <div className="p-1 rounded bg-white/5 text-center">
                  <div className="text-slate-400 text-[9px]">Veg Density</div>
                  <div className="font-bold text-emerald-400">{img.vegetationPct}%</div>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-[120px]">{img.observer.split(' ')[0]}</span>
                </span>
                <span className="font-semibold text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Inspect Dual View →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
