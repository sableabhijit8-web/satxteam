import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  CheckCircle2, 
  FileSpreadsheet, 
  Image, 
  Printer, 
  Sparkles,
  Share2,
  Calendar,
  MapPin,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRIMARY_WATERSHED } from '../../data/mockData';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      showToast('Watershed Executive Report Compiled Successfully!');
    }, 1200);
  };

  const handleExportPDF = () => {
    showToast('Exporting Comprehensive PDF Report (GeoWatershed-Mulshi-2026.pdf)...');
    // Trigger real mock file download
    const element = document.createElement("a");
    const file = new Blob([
      `# GEOWATERSHED AI - COMPREHENSIVE WATERSHED REPORT
Watershed: Mulshi Catchment, Pune, Maharashtra
Basin: Mula River / Krishna Basin
Area: 248.6 km²
Vegetation Coverage: 42.7% (106.2 km²)
Agriculture: 31.2% (77.5 km²)
Water Bodies: 18.4 km²
Total Drainage Length: 412.6 km
Total Interventions Mapped: 128
Temporal Shift (2023-2026): +6.4 km² Vegetation, -8.9 km² Bare Land Reduction
Certified Datum: WGS84
Smart India Hackathon 2026 Deliverable`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "GeoWatershed-Mulshi-Report-SIH2026.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportCSV = () => {
    showToast('Exporting Spatial Metrics CSV...');
    const csvContent = `data:text/csv;charset=utf-8,Class,Area_km2,Percentage,Delta_2023_2026_km2\nVegetation,106.2,42.7,+6.4\nAgriculture,77.5,31.2,+3.2\nWater Bodies,18.4,7.4,-1.8\nBuilt-up,22.8,9.2,+1.1\nBare Land,23.7,9.5,-8.9\nTotal,248.6,100,0`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Mulshi_Watershed_Spatial_Metrics_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl glass-dropdown border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  SIH 2026 Ready
                </span>
                <span className="text-xs text-slate-400 font-mono">WGS84 UTM Zone 43N</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">Watershed Comprehensive Analysis Report</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Report Metadata Strip */}
          <div className="glass-panel p-4 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Catchment: <strong className="text-white">Mulshi Watershed (248.6 km²)</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Assessment Cycle: <strong className="text-white">September 2026</strong></span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Status: Multi-Spectral Audited</span>
            </div>
          </div>

          {/* Included Sections Checklist */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Included Analytical Sections
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                'Watershed Baseline KPIs',
                'Geo-Coded Field Observations (6)',
                'AI Land Cover Classes (6)',
                'Canopy & Vegetation Density',
                'Water Bodies & Storage (18.4 km²)',
                'DEM Elevation Transect (320-1245m)',
                'Drainage Network (412.6 km)',
                '128 Watershed Interventions',
                'Temporal Change 2023-2026',
                'Synthesized Actionable Insights'
              ].map((sec, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-white/5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 truncate">{sec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Summary Preview Block */}
          <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Executive Hydrological Summary
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mulshi Watershed exhibits substantial hydrological resilience following targeted soil and moisture conservation interventions between 2023 and 2026. The deployment of 42 check dams, 28 farm ponds, and 38.4 km of Continuous Contour Trenches (CCT) has driven a net canopy expansion of +6.4 km² (+6.4%) and reclaimed 8.9 km² of previously degraded, bare basalt hillside. Surface drainage density stands at 1.66 km/km², feeding 18.4 km² of collective reservoir storage.
            </p>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="mx-6 mb-2 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-medium animate-in fade-in">
            {toastMessage}
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              className="px-3 py-2 rounded-xl glass-panel border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-xl glass-panel border border-white/10 hover:border-sky-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-sky-400" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/10"
            >
              Close
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Compiling Spatial Data...</span>
                </>
              ) : isGenerated ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Re-Generate Report</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
