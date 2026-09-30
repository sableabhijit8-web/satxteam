import React from 'react';
import { 
  ArrowRight, 
  PlayCircle, 
  MapPin, 
  Layers, 
  Mountain, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  GitBranch, 
  Sprout, 
  Droplet,
  Compass,
  CheckCircle2,
  Cpu,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { NavPageId } from '../../components/layout/Sidebar';

interface LandingPageProps {
  onExplore: () => void;
  onStartDemoTour: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExplore,
  onStartDemoTour,
}) => {
  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Subtle Gradient & Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Navbar */}
      <nav className="h-20 border-b border-white/10 px-6 lg:px-12 flex items-center justify-between z-30 relative backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
            <span className="text-xl">🌿</span>
          </div>
          <div>
            <div className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
              <span>GeoWatershed</span>
              <span className="text-emerald-400">AI</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Smart India Hackathon 2026</div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onStartDemoTour}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:border-emerald-400 transition-colors"
          >
            <PlayCircle className="w-4 h-4 text-emerald-400" />
            <span>Judge Demo Walkthrough</span>
          </button>
          <button
            onClick={onExplore}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 transition-all group"
          >
            <span>Explore Watershed</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-12 pb-16 z-20 flex-1 max-w-7xl mx-auto w-full">
        {/* SIH 2026 Problem Statement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SIH 2026 Geospatial Problem Statement Prototype</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              From Geo-Coded Imagery to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Actionable Watershed Intelligence.</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-slate-300">
              Visualize. Analyze. Monitor. Understand.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              An AI-powered geospatial platform for visualizing, interpreting and analysing watershed regions using geo-coded imagery, satellite data, terrain information and spatial intelligence.
            </p>

            {/* Official SIH Problem Statement Quote Box */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 text-xs text-slate-300 space-y-1 bg-slate-900/50">
              <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Mandated Challenge Statement
              </div>
              <p className="italic text-slate-300">
                “Application of Geospatial Techniques for visualization and analysis to interpret Geo-Coded Images to enhance Watershed Development Outcomes.”
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Watershed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onStartDemoTour}
                className="px-6 py-3.5 rounded-xl glass-panel border border-white/15 hover:border-emerald-500/40 text-white font-semibold text-sm flex items-center gap-2 transition-all hover:bg-white/5"
              >
                <PlayCircle className="w-4 h-4 text-emerald-400" />
                <span>View Demo Presentation</span>
              </button>
            </div>

            <div className="pt-3 flex items-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> WGS84 Orthorectified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> 10m Multi-Spectral
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> GPS EXIF Synchronized
              </span>
            </div>
          </div>

          {/* Hero Right Visual: High-Tech Geospatial Canvas Simulation */}
          <div className="lg:col-span-6 relative">
            {/* Visual Container */}
            <div className="relative rounded-3xl overflow-hidden glass-dropdown border border-white/15 shadow-2xl p-2 bg-[#0a0f1d]/90">
              {/* Interactive Geospatial Graphic */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#090d16] border border-white/10 flex items-center justify-center">
                {/* Satellite Tile Map Mock Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80')`
                  }}
                />

                {/* Radar Sweep Effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-[500px] h-[500px] rounded-full border border-emerald-500/30 flex items-center justify-center">
                    <div className="w-[360px] h-[360px] rounded-full border border-emerald-500/20 flex items-center justify-center">
                      <div className="w-[200px] h-[200px] rounded-full border border-emerald-500/15"></div>
                    </div>
                  </div>
                  <div className="absolute w-[500px] h-[500px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.25)_60deg,transparent_60deg)] animate-radar-sweep pointer-events-none"></div>
                </div>

                {/* Vector Overlay: SVG Drainage & Watershed Boundary */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 375">
                  {/* Watershed boundary polygon */}
                  <polygon
                    points="70,60 180,40 320,65 420,120 440,240 380,330 250,350 120,320 60,210 70,60"
                    fill="rgba(16, 185, 129, 0.12)"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeDasharray="6, 6"
                  />
                  {/* Water body reservoir polygon */}
                  <polygon
                    points="200,160 280,140 340,190 310,250 230,260 190,210"
                    fill="rgba(2, 132, 199, 0.55)"
                    stroke="#38bdf8"
                    strokeWidth="2"
                  />
                  {/* Drainage main river channel */}
                  <path
                    d="M 120,70 Q 180,120 220,170 T 320,240 T 440,290"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    className="animated-flow"
                  />
                  {/* Tributary branches */}
                  <path d="M 280,60 Q 250,110 240,160" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 140,280 Q 200,260 220,240" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 380,180 Q 340,210 320,240" fill="none" stroke="#38bdf8" strokeWidth="2" />
                </svg>

                {/* Floating Interactive Geospatial Labels */}
                <div className="absolute top-12 left-16 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                  LAND COVER (42.7% VEG)
                </div>
                <div className="absolute top-20 right-16 px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold border border-sky-500/30">
                  DRAINAGE (412.6 KM)
                </div>
                <div className="absolute bottom-24 left-14 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                  CHECK DAMS & TRENCHES
                </div>
                <div className="absolute bottom-12 right-20 px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                  MULSHI RESERVOIR OUTLET
                </div>

                {/* Simulated Geo-Coded Pin */}
                <div className="absolute top-[48%] left-[45%] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/30 animate-ping absolute"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-400 text-indigo-300 flex items-center justify-center shadow-lg">
                    <Camera className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* 4 Floating Analytical KPI Cards around hero */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2.5">
                <div className="glass-panel p-2.5 rounded-xl border border-white/10 text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">VEGETATION</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono mt-0.5">42.7%</div>
                  <div className="text-[9px] text-slate-300 font-mono">+6.4 km²</div>
                </div>

                <div className="glass-panel p-2.5 rounded-xl border border-white/10 text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">WATER</div>
                  <div className="text-base sm:text-lg font-bold text-sky-400 font-mono mt-0.5">7.4%</div>
                  <div className="text-[9px] text-slate-300 font-mono">18.4 km²</div>
                </div>

                <div className="glass-panel p-2.5 rounded-xl border border-white/10 text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">INTERVENTIONS</div>
                  <div className="text-base sm:text-lg font-bold text-amber-400 font-mono mt-0.5">128</div>
                  <div className="text-[9px] text-slate-300 font-mono">Structures</div>
                </div>

                <div className="glass-panel p-2.5 rounded-xl border border-white/10 text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">DRAINAGE</div>
                  <div className="text-base sm:text-lg font-bold text-teal-400 font-mono mt-0.5">412.6 km</div>
                  <div className="text-[9px] text-slate-300 font-mono">1,284 Streams</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: 4 Core Product Pillars */}
      <section className="relative px-6 lg:px-12 py-16 bg-slate-950/60 border-t border-white/10 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Core Platform Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              End-to-End Geospatial Watershed Pipeline
            </h2>
            <p className="text-sm text-slate-400">
              Harmonizing field camera photography, multi-spectral satellite imagery, and hydrological modeling into one unified intelligence system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Geo-Coded Imagery */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-indigo-500/40 hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Geo-Coded Imagery</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                “Visualize field-level images with their exact geographic context.”
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-indigo-400 font-medium">
                EXIF GPS Extraction • Ground Truth Verification
              </div>
            </div>

            {/* Pillar 2: AI Land Cover */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI Land Cover</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                “Interpret satellite imagery into meaningful land-cover classes.”
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-medium">
                DeepLabV3+ & U-Net • 6 Physical Classes
              </div>
            </div>

            {/* Pillar 3: Terrain & Drainage */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-amber-500/40 hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 mb-4 group-hover:scale-110 transition-transform">
                <Mountain className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Terrain & Drainage</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                “Understand elevation, slope, drainage and water-flow patterns.”
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-amber-400 font-medium">
                DEM Elevation • Strahler Stream Orders
              </div>
            </div>

            {/* Pillar 4: Watershed Intelligence */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-sky-500/40 hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Watershed Intelligence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                “Combine spatial information into actionable watershed insights.”
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-sky-400 font-medium">
                Decision Support • Multi-Temporal Tracking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Strip */}
      <footer className="py-6 px-6 lg:px-12 border-t border-white/10 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4 bg-slate-950">
        <div className="flex items-center gap-2">
          <span>🌿 GeoWatershed AI</span>
          <span className="text-slate-400">•</span>
          <span>Smart India Hackathon 2026 Prototype</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onExplore} className="text-emerald-400 hover:underline">
            Launch Workstation
          </button>
          <button onClick={onStartDemoTour} className="text-slate-300 hover:text-white">
            Demo Guide
          </button>
        </div>
      </footer>
    </div>
  );
};
