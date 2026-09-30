import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Play, 
  Sparkles, 
  MapPin, 
  Camera, 
  Layers, 
  Mountain, 
  GitBranch, 
  Sprout, 
  History, 
  SearchCode, 
  FileText 
} from 'lucide-react';
import { NavPageId } from './Sidebar';

interface DemoStep {
  step: number;
  title: string;
  actionDesc: string;
  page: NavPageId;
  highlightNote: string;
}

const DEMO_STEPS: DemoStep[] = [
  {
    step: 1,
    title: 'Platform Entrance & Positioning',
    actionDesc: 'Launch GeoWatershed AI portal, framing the SIH 2026 problem statement.',
    page: 'overview',
    highlightNote: 'Focus on Geo-Coded Imagery + Satellite Data + AI Watershed Intelligence.'
  },
  {
    step: 2,
    title: 'Watershed Selection',
    actionDesc: 'Active catchment: Mulshi Watershed, Western Ghats, Maharashtra (248.6 km²).',
    page: 'overview',
    highlightNote: 'High orographic rainfall, steep terrain, check dams, and agricultural valleys.'
  },
  {
    step: 3,
    title: 'Satellite Workstation Overview',
    actionDesc: 'High-resolution Sentinel-2 10m multispectral satellite mosaic with live KPI cards.',
    page: 'overview',
    highlightNote: 'Vegetation 42.7%, Agriculture 31.2%, Water Bodies 18.4 km².'
  },
  {
    step: 4,
    title: 'Enable Geo-Coded Images Layer',
    actionDesc: 'Ground truth field observations with calibrated GPS coordinates.',
    page: 'geoimages',
    highlightNote: 'Exif metadata extraction and precision field location mapping.'
  },
  {
    step: 5,
    title: 'Dual-View Field vs Satellite Context',
    actionDesc: 'Side-by-side geographic alignment of field camera vs 10m satellite orthomosaic.',
    page: 'geoimages',
    highlightNote: 'Computed spatial context: land cover, vegetation %, elevation, slope, and nearest drainage.'
  },
  {
    step: 6,
    title: 'AI Land Cover Segmentation',
    actionDesc: 'DeepLabV3+ / U-Net semantic classification into 6 hydrological classes.',
    page: 'landcover',
    highlightNote: 'Vegetation (106.2 km²), Cropland (77.5 km²), Water (18.4 km²).'
  },
  {
    step: 7,
    title: 'Terrain & Slope Analysis',
    actionDesc: 'Digital Elevation Model (DEM) transect from 320m to 1,245m.',
    page: 'terrain',
    highlightNote: '23.6 km² critical high-slope area (>25°) flagged for erosion risk.'
  },
  {
    step: 8,
    title: 'Drainage & Water Flow Network',
    actionDesc: '1,284 mapped streams, 412.6 km total drainage length, flow vectors to outlet.',
    page: 'drainage',
    highlightNote: 'Flow animation from Tamhini crest to Mula river hydrological outlet.'
  },
  {
    step: 9,
    title: 'Watershed Interventions Monitoring',
    actionDesc: '128 geo-tagged structures: Check Dams, Farm Ponds, Continuous Contour Trenches.',
    page: 'interventions',
    highlightNote: 'Correlate physical structures with farmer beneficiaries and moisture impact.'
  },
  {
    step: 10,
    title: 'Multi-Temporal Change Detection',
    actionDesc: 'Interactive 2023 vs 2026 bi-temporal comparison slider.',
    page: 'changedetection',
    highlightNote: '+6.4 km² vegetation gain, -8.9 km² degraded bare land reduction.'
  },
  {
    step: 11,
    title: 'SatQuery AI Spatial Assistant',
    actionDesc: 'Natural language spatial query: "Show agricultural areas near drainage channels".',
    page: 'satquery',
    highlightNote: 'Visualizes 4-step AI spatial pipeline + activates map layers automatically.'
  },
  {
    step: 12,
    title: 'Watershed Actionable Insights',
    actionDesc: 'Synthesis of complex spatial tensors into plain-language civil directives.',
    page: 'insights',
    highlightNote: 'Every insight card features a "View on Map" spatial zoom trigger.'
  },
  {
    step: 13,
    title: 'Generate Comprehensive Report',
    actionDesc: 'Compile executive PDF report, CSV spatial ledger, and GeoTIFF map bundle.',
    page: 'reports',
    highlightNote: 'SIH 2026 judging deliverable complete in 1 click.'
  }
];

interface DemoTourGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavPageId) => void;
}

export const DemoTourGuide: React.FC<DemoTourGuideProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      onNavigate(DEMO_STEPS[nextIdx].page);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      onNavigate(DEMO_STEPS[prevIdx].page);
    }
  };

  const handleJumpTo = (idx: number) => {
    setCurrentStepIdx(idx);
    onNavigate(DEMO_STEPS[idx].page);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl glass-dropdown border border-emerald-500/40 rounded-2xl shadow-2xl p-4 backdrop-blur-2xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-white tracking-wide uppercase">
            SIH 2026 Judge Presentation Flow
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
            Step {currentStep.step} / {DEMO_STEPS.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-emerald-300">{currentStep.title}</h4>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{currentStep.actionDesc}</p>
          <div className="mt-2 text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg inline-block">
            💡 {currentStep.highlightNote}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-center">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="p-2 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIdx === DEMO_STEPS.length - 1}
            className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-lg shadow-emerald-500/20 disabled:opacity-40"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1">
        {DEMO_STEPS.map((s, idx) => (
          <button
            key={s.step}
            onClick={() => handleJumpTo(idx)}
            title={`Step ${s.step}: ${s.title}`}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              idx === currentStepIdx
                ? 'bg-emerald-400 shadow-sm shadow-emerald-400'
                : idx < currentStepIdx
                ? 'bg-emerald-500/50'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
