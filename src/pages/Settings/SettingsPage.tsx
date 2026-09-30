import React, { useState } from 'react';
import { 
  Settings, 
  Map, 
  Layers, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  Sliders, 
  SlidersHorizontal,
  Moon,
  Sun,
  Globe
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [coordFormat, setCoordFormat] = useState('decimal');
  const [defaultBaseMap, setDefaultBaseMap] = useState('satellite');
  const [cacheStatus, setCacheStatus] = useState('Cleared (0 KB)');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleClearCache = () => {
    setCacheStatus('Cleaned & Re-indexed');
    showToast('Local Map Tile & GIS Cache Reset Successfully');
  };

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Settings className="w-4 h-4 text-emerald-400" />
          <span>GIS WORKSTATION CONFIGURATION</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
          Configure coordinate system projections, default map tile servers, and telemetry thresholds.
        </p>
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium animate-in fade-in text-center">
          {toast}
        </div>
      )}

      <div className="max-w-4xl space-y-6">
        {/* Spatial Coordinate System */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            Coordinate System & Spatial Datum
          </h3>
          <p className="text-xs text-slate-400">
            Select the default notation used when displaying latitude and longitude across map overlays and GPS EXIF field photos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { id: 'decimal', label: 'Decimal Degrees (DD)', ex: '18.5085° N, 73.4925° E' },
              { id: 'dms', label: 'Degrees Minutes Seconds', ex: `18°30'30.6" N, 73°29'33.0" E` },
              { id: 'utm', label: 'UTM Zone 43N (Metric)', ex: 'Zone 43N 340620m E, 2047320m N' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCoordFormat(item.id);
                  showToast(`Coordinate format updated to ${item.label}`);
                }}
                className={`p-3 rounded-xl text-left border transition-all ${
                  coordFormat === item.id
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold text-slate-200">{item.label}</div>
                <div className="text-[10px] font-mono mt-1 text-slate-400 truncate">{item.ex}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Default Base Map */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Map className="w-4 h-4 text-sky-400" />
            Default Satellite Tile Service
          </h3>
          <p className="text-xs text-slate-400">
            Tile layer provider loaded by default upon opening the overview workstation.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {['satellite', 'terrain', 'dark', 'street'].map(bm => (
              <button
                key={bm}
                onClick={() => {
                  setDefaultBaseMap(bm);
                  showToast(`Default Base Map set to ${bm.toUpperCase()}`);
                }}
                className={`p-3 rounded-xl text-left border capitalize transition-all ${
                  defaultBaseMap === bm
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold text-white">{bm}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">High Performance</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cache & Maintenance */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">Local GIS Tile Cache</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cached satellite tiles and GeoJSON feature collections stored locally for offline presentation.
            </p>
          </div>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 rounded-xl glass-panel border border-white/10 hover:border-emerald-500/40 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Clear Cache</span>
          </button>
        </div>
      </div>
    </div>
  );
};
