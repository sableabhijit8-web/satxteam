import React from 'react';
import { Cpu, CheckCircle2, ShieldAlert, Sparkles, Layers, RefreshCw } from 'lucide-react';

interface ModelCardProps {
  className?: string;
}

export const ModelCard: React.FC<ModelCardProps> = ({ className = '' }) => {
  return (
    <div className={`glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              U-Net Semantic Segmentation
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                v2.4-MH
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Multi-Spectral Geospatial Feature Extraction</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Demo Model Ready
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Classes</div>
          <div className="text-base font-bold text-slate-100 font-mono mt-0.5">6 Classes</div>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Resolution</div>
          <div className="text-base font-bold text-sky-400 font-mono mt-0.5">10m / px</div>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Backbone</div>
          <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">ResNet-101</div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl flex items-start gap-2 text-amber-200">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300">Hackathon Prototype Notice:</span> Segmentations represent simulated inferences based on Western Ghats Sentinel-2 training sets. Verification against ground truth recommended before civil deployment.
        </div>
      </div>
    </div>
  );
};
