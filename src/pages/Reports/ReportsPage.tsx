import React, { useState } from 'react';
import { PRIMARY_WATERSHED, CHANGE_DETECTION_DATA } from '../../data/mockData';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  Image, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Share2,
  Printer,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReportsPageProps {
  onOpenReportModal: () => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onOpenReportModal }) => {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExportPDF = () => {
    confetti({ particleCount: 50, spread: 60 });
    showToast('Report generated successfully — demo export (GeoWatershed-Mulshi-2026.pdf)');
    const element = document.createElement("a");
    const file = new Blob([
      `# GEOWATERSHED AI - SIH 2026 OFFICIAL WATERSHED REPORT
Catchment: Mulshi Watershed Catchment, Pune District, Maharashtra
Basin: Mula River / Upper Bhima Sub-Basin
Total Area: 248.6 km²
Vegetation Density: 42.7% (106.2 km²)
Agriculture: 31.2% (77.5 km²)
Water Surface: 18.4 km²
Drainage Network: 412.6 km across 1,284 streams
Interventions Mapped: 128 (42 Check Dams, 28 Farm Ponds, 38.4km CCT)
Temporal Change (2023-2026): +6.4 km² Vegetation, -8.9 km² Degraded Bare Land Reduction
Accuracy: WGS84 Orthorectified with GPS EXIF Ground Truth
Status: Approved for SIH 2026 Review`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "GeoWatershed-Mulshi-Report-SIH2026.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportCSV = () => {
    showToast('Downloading Spatial Ledger CSV...');
    const csvContent = `data:text/csv;charset=utf-8,Category,2023_Area_km2,2026_Area_km2,Delta_km2,Trend\nVegetation,99.8,106.2,+6.4,Increase\nWater,20.2,18.4,-1.8,Decrease\nAgriculture,74.3,77.5,+3.2,Increase\nBuilt-up,21.7,22.8,+1.1,Increase\nBare Land,32.6,23.7,-8.9,Decrease`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Mulshi_Watershed_Data_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadMap = () => {
    showToast('Exporting Orthomosaic High-Res Map snapshot (PNG)...');
  };

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <FileText className="w-4 h-4" />
            <span>OFFICIAL WATERSHED COMPILATION & DELIVERABLES</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
            Watershed Analysis Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Compile multi-spectral telemetry, field photo ground truth, and intervention audit logs into one dossier.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 rounded-xl glass-panel border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl glass-panel border border-white/10 hover:border-sky-500/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-sky-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleDownloadMap}
            className="px-3.5 py-2 rounded-xl glass-panel border border-white/10 hover:border-amber-500/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Image className="w-3.5 h-3.5 text-amber-400" />
            <span>Download Map</span>
          </button>
          <button
            onClick={onOpenReportModal}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-medium animate-in fade-in">
          {toast}
        </div>
      )}

      {/* Comprehensive Report Preview Sheet */}
      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-white/10 shadow-2xl max-w-5xl mx-auto w-full space-y-8 bg-slate-950/70">
        {/* Document Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <span className="text-base font-extrabold text-white tracking-tight">GeoWatershed AI</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                SIH 2026 OFFICIAL DOSSIER
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2">
              Comprehensive Watershed Development & Multi-Spectral Audit Report
            </h2>
            <div className="text-xs text-slate-400 flex items-center gap-4 mt-1 font-mono">
              <span>Catchment: Mulshi Watershed (248.6 km²)</span>
              <span>•</span>
              <span>District: Pune, Maharashtra</span>
              <span>•</span>
              <span>Datum: WGS84 UTM 43N</span>
            </div>
          </div>

          <div className="text-right sm:self-center">
            <div className="text-[11px] text-slate-400 font-mono">Report ID: REP-MULSHI-2026-8492</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">🟢 Verified Telemetry Ready</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <span>1. Executive Summary & Hydrological Status</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The Mulshi Watershed comprises 248.6 km² across the rugged crest of the Western Ghats, draining into the Mula river system. Over the 2023–2026 monitoring window, integrated geospatial telemetry—combining Sentinel-2 10m multi-spectral indices with 6 certified GPS ground truth camera observations—confirms a notable <strong>+6.4 km² (+6.4%) expansion in healthy vegetative canopy</strong> alongside an <strong>8.9 km² reduction in degraded bare land</strong>.
          </p>
        </div>

        {/* Section 2: Spatial Baseline Matrix */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            2. Land Cover & Drainage Spatial Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="text-slate-400 text-[10px]">Vegetation / Forest</div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">106.2 km²</div>
              <div className="text-[10px] text-slate-400">42.7% of catchment</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="text-slate-400 text-[10px]">Agriculture / Crops</div>
              <div className="text-base font-bold text-yellow-400 font-mono mt-0.5">77.5 km²</div>
              <div className="text-[10px] text-slate-400">31.2% of catchment</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="text-slate-400 text-[10px]">Surface Water Spread</div>
              <div className="text-base font-bold text-sky-400 font-mono mt-0.5">18.4 km²</div>
              <div className="text-[10px] text-slate-400">24 mapped units</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="text-slate-400 text-[10px]">Drainage Channels</div>
              <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">412.6 km</div>
              <div className="text-[10px] text-slate-400">1,284 total streams</div>
            </div>
          </div>
        </div>

        {/* Section 3: Ground Truth Interventions Audit */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            3. Watershed Interventions Audit (128 Structures)
          </h3>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 space-y-2">
            <p>
              A total of 128 physical soil and moisture conservation interventions were verified through orthorectified GPS surveys. This includes 42 dry stone/gabion check dams, 28 poly-lined community farm ponds, 38.4 km of Continuous Contour Trenches (CCT), and 42.8 hectares of riparian tree buffers.
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Overall Intervention Survival Rate: 91.2%</span>
              <span className="text-emerald-400 font-bold">Audit Status: PASS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
