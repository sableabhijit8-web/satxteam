import React from 'react';
import { GeoImage } from '../../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  UserCheck, 
  Compass, 
  Layers, 
  Trees, 
  Mountain, 
  Droplet, 
  CheckCircle2, 
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface FieldImageDrawerProps {
  image: GeoImage | null;
  onClose: () => void;
  onViewOnMap?: (image: GeoImage) => void;
}

export const FieldImageDrawer: React.FC<FieldImageDrawerProps> = ({
  image,
  onClose,
  onViewOnMap,
}) => {
  if (!image) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl glass-dropdown border-l border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                {image.category}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold flex items-center gap-1 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> {image.status}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">{image.title}</h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Core Problem Statement Highlight: Dual View Field Image + Satellite Context */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Geo-Coded Ground Truth vs Satellite Context
            </span>
            <span className="text-[11px] text-slate-400 font-mono">1:1 Geographic Alignment</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LEFT: Field Ground Photograph */}
            <div className="group relative rounded-xl overflow-hidden border border-white/10 bg-slate-900/80 shadow-lg">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img 
                  src={image.imageUrl} 
                  alt={image.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-indigo-300">
                FIELD GROUND CAMERA
              </div>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Azimuth: {image.compassHeading}° SE</span>
                <span className="text-emerald-400 font-mono">±{image.accuracyM}m GPS</span>
              </div>
            </div>

            {/* RIGHT: Satellite Remote Sensing Context */}
            <div className="group relative rounded-xl overflow-hidden border border-white/10 bg-slate-900/80 shadow-lg">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img 
                  src={image.satelliteContextUrl} 
                  alt={`Satellite context for ${image.title}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-emerald-300">
                SATELLITE 10M ORTHOMOSAIC
              </div>
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Band 8 NIR / False Color</span>
                <span className="text-sky-400 font-mono">Sentinel-2 MSI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spatial Context Cards */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            Computed Spatial & Environmental Context
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="glass-panel p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Layers className="w-3 h-3 text-yellow-400" /> Land Cover
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1 truncate" title={image.landCoverClass}>
                {image.landCoverClass}
              </div>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Trees className="w-3 h-3 text-emerald-400" /> Vegetation Density
              </div>
              <div className="text-sm font-bold text-emerald-400 mt-1 font-mono">
                {image.vegetationPct}%
              </div>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Mountain className="w-3 h-3 text-amber-400" /> Elevation
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1 font-mono">
                {image.elevationM} m MSL
              </div>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Compass className="w-3 h-3 text-purple-400" /> Slope Gradient
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1 font-mono">
                {image.slopeDeg}° Incline
              </div>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Droplet className="w-3 h-3 text-sky-400" /> Nearest Drainage
              </div>
              <div className="text-sm font-bold text-sky-400 mt-1 font-mono">
                {image.nearestDrainageM} m
              </div>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Droplet className="w-3 h-3 text-cyan-400" /> Nearest Water Body
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1 font-mono">
                {image.nearestWaterBodyM} m
              </div>
            </div>
          </div>
        </div>

        {/* Observation Description */}
        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Field Officer Hydrological Observation
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {image.description}
          </p>
        </div>

        {/* Metadata & Audit Trail */}
        <div className="glass-panel-subtle p-4 rounded-xl border border-white/5 space-y-3 text-xs text-slate-300">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" /> Survey Timestamp
            </span>
            <span className="font-mono text-slate-200">{image.date}</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="flex items-center gap-1.5 text-slate-400">
              <UserCheck className="w-3.5 h-3.5 text-slate-500" /> Certified Observer
            </span>
            <span className="text-slate-200">{image.observer}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> Geo-Coordinates
            </span>
            <span className="font-mono text-emerald-400 font-medium">
              {image.lat.toFixed(4)}° N, {image.lng.toFixed(4)}° E
            </span>
          </div>
        </div>
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-4 border-t border-white/10 bg-slate-900/80 flex items-center justify-between gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          Close Drawer
        </button>
        {onViewOnMap && (
          <button
            onClick={() => {
              onViewOnMap(image);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <MapPin className="w-3.5 h-3.5" /> View on Map
          </button>
        )}
      </div>
    </div>
  );
};
