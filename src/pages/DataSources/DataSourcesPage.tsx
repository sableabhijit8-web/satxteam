import React from 'react';
import { 
  Database, 
  Satellite, 
  Camera, 
  Mountain, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  GitCommit,
  RefreshCw
} from 'lucide-react';

export const DataSourcesPage: React.FC = () => {
  const dataSources = [
    {
      title: 'SRISHTI-DRISHTI',
      subtitle: 'ISRO Satellite Telemetry',
      status: 'Ready / Demo',
      specs: 'Sentinel-2 MSI & Landsat 9 (10m Resolution)',
      datum: 'WGS 84 / UTM Zone 43N',
      icon: Satellite,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      title: 'Geo-Coded Images',
      subtitle: 'Field Ground Observations',
      status: 'Ready',
      specs: 'GPS EXIF Tagged Field Photographs (6 Records)',
      datum: 'WGS84 Lat/Lng Geo-Tagged',
      icon: Camera,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
    },
    {
      title: 'Digital Elevation Model (DEM)',
      subtitle: 'Copernicus & SRTM 30m',
      status: 'Ready',
      specs: '320m to 1,245m Elevation Transect',
      datum: 'Orthometric Height (EGM96)',
      icon: Mountain,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      title: 'Watershed Boundary',
      subtitle: 'Survey of India GIS Layer',
      status: 'Ready',
      specs: 'Vector Boundary (248.6 km² Area)',
      datum: 'Mula River Sub-Basin Catchment',
      icon: Layers,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
    },
    {
      title: 'AI Model',
      subtitle: 'DeepLabV3+ & U-Net',
      status: 'Ready',
      specs: '6 Classes Land Cover Segmentation',
      datum: 'Trained on Western Ghats Benchmarks',
      icon: Cpu,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
  ];

  const pipelineStages = [
    'Geo-Coded Images',
    'Satellite Data',
    'Geo-Referencing',
    'Preprocessing',
    'AI Interpretation',
    'GIS Analysis',
    'Watershed Insights'
  ];

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Database className="w-4 h-4" />
            <span>REMOTE SENSING & GROUND TELEMETRY INGESTION</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            Data Sources & Processing Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Overview of multi-source spatial layers and the automated orthorectification pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold self-start sm:self-auto font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>All 5 Data Streams Synced</span>
        </div>
      </div>

      {/* Horizontal Processing Pipeline (Section 54) */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Automated Spatial Processing Pipeline
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Continuous Stream Flow</span>
        </div>

        {/* Horizontal Stepper with animated connector lines */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative pt-2">
          {pipelineStages.map((stage, idx) => (
            <div key={stage} className="relative flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shadow-lg shadow-emerald-500/10 group-hover:border-emerald-400 group-hover:scale-110 transition-all z-10">
                0{idx + 1}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-2 truncate w-full" title={stage}>
                {stage}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Verified</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 Data Source Cards (Section 53) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dataSources.map(ds => {
          const Icon = ds.icon;
          return (
            <div
              key={ds.title}
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${ds.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {ds.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{ds.title}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">{ds.subtitle}</div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Specifications:</span>
                    <span className="font-mono text-white text-right">{ds.specs}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Reference:</span>
                    <span className="font-mono text-emerald-400 text-right">{ds.datum}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Ingestion: Active</span>
                <span className="text-emerald-400">Latency: &lt; 80ms</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
