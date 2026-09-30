import React, { useState } from 'react';
import { WatershedService } from '../../services/watershedService';
import { SatQueryResult } from '../../types';
import { GISMap } from '../../components/map/GISMap';
import { 
  SearchCode, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Compass, 
  ArrowRight,
  HelpCircle,
  Clock,
  MapPin,
  Bot
} from 'lucide-react';

export const SatQueryPage: React.FC = () => {
  const [queryInput, setQueryInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [result, setResult] = useState<SatQueryResult | null>(null);
  const [activeLayers, setActiveLayers] = useState<string[]>([
    'Watershed Boundary', 
    'Water Bodies', 
    'Drainage'
  ]);
  const [focusCoords, setFocusCoords] = useState<[number, number] | undefined>(undefined);
  const [focusZoom, setFocusZoom] = useState<number | undefined>(undefined);

  const suggestions = [
    'Show water bodies',
    'Show all interventions',
    'What is the vegetation coverage?',
    'Show high-slope areas',
    'Compare vegetation between 2023 and 2026',
    'Show agricultural areas near drainage',
  ];

  const handleRunQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsProcessing(true);
    setPipelineStep(1); // Understanding Query

    setTimeout(() => {
      setPipelineStep(2); // Selecting Layers
    }, 400);

    setTimeout(() => {
      setPipelineStep(3); // Running Spatial Analysis
    }, 800);

    setTimeout(async () => {
      setPipelineStep(4); // Generating Map
      const res = await WatershedService.runSatQuery(queryText);
      setResult(res);
      setActiveLayers(['Watershed Boundary', ...res.layersActivated]);
      if (res.targetCenter) setFocusCoords(res.targetCenter);
      if (res.targetZoom) setFocusZoom(res.targetZoom);
      setIsProcessing(false);
      setPipelineStep(0);
    }, 1300);
  };

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <SearchCode className="w-4 h-4" />
            <span>GIS SPATIAL QUERY ASSISTANT</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            SatQuery AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Ask natural language questions about your watershed data, layers, and terrain.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel border border-white/10 text-xs text-slate-300 self-start sm:self-auto font-mono">
          <Bot className="w-4 h-4 text-emerald-400" />
          <span>Spatial NL-to-GIS Engine</span>
        </div>
      </div>

      {/* Query Search Input Box (Section 49) */}
      <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 shadow-2xl space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunQuery(queryInput);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Ask something about this watershed... (e.g. 'Show water bodies', 'Show high-slope areas')"
            className="w-full pl-5 pr-28 py-3.5 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 shadow-inner"
          />
          <button
            type="submit"
            disabled={isProcessing || !queryInput.trim()}
            className="absolute right-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
          >
            <span>Run Query</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Suggestion Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            Quick Queries:
          </span>
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQueryInput(sug);
                handleRunQuery(sug);
              }}
              className="px-2.5 py-1 rounded-lg text-[11px] glass-panel border border-white/5 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-colors"
            >
              "{sug}"
            </button>
          ))}
        </div>
      </div>

      {/* Animated Spatial Processing Pipeline (Section 51) */}
      {isProcessing && (
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 shadow-xl animate-in fade-in space-y-3">
          <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <span>Processing Spatial Query Pipeline...</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-xs font-mono">
            {[
              { step: 1, label: 'Understanding Query' },
              { step: 2, label: 'Selecting Layers' },
              { step: 3, label: 'Running Spatial Analysis' },
              { step: 4, label: 'Generating Map View' }
            ].map(item => {
              const isPast = pipelineStep > item.step;
              const isCurrent = pipelineStep === item.step;
              return (
                <div
                  key={item.step}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 font-bold scale-[1.02]'
                      : isPast
                      ? 'bg-slate-900/60 border-white/10 text-slate-400'
                      : 'bg-white/5 border-transparent text-slate-400'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">Phase 0{item.step}</div>
                  <div className="text-[11px] mt-0.5 truncate">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Result Card & Map Synchronization (Section 50) */}
      {result && !isProcessing && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
          {/* Spatial Result Summary */}
          <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-emerald-500/30 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Spatial Resolution Complete
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{result.timestamp}</span>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 font-semibold">User Query:</div>
                <div className="text-sm font-bold text-white italic">"{result.query}"</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 leading-relaxed">
                {result.summary}
              </div>

              {/* Statistics Grid */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Computed Spatial Metrics
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {result.statistics.map((st, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                      <div className="text-[10px] text-slate-400">{st.label}</div>
                      <div className="text-sm font-extrabold text-white font-mono mt-0.5">{st.value}</div>
                      {st.change && (
                        <div className="text-[9px] text-emerald-400 font-mono">{st.change}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Activated Layers Tag */}
              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1.5">
                  Map Layers Activated:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.layersActivated.map(l => (
                    <span key={l} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold border border-emerald-500/30">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-2 border-t border-white/5">
              <span>Map automatically re-centered</span>
              <span className="text-emerald-400 font-mono font-bold">100% Deterministic</span>
            </div>
          </div>

          {/* Synchronized GIS Map Display */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl h-[480px] relative">
            <div className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-semibold text-emerald-300 backdrop-blur-md flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>SatQuery Synchronized GIS Canvas</span>
            </div>
            <GISMap
              activeLayers={activeLayers}
              focusCoords={focusCoords}
              focusZoom={focusZoom}
            />
          </div>
        </div>
      )}
    </div>
  );
};
