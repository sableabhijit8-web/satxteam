import React from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Camera,
  Layers,
  SearchCode
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const faqs = [
    {
      q: 'How does GeoWatershed AI correlate geo-coded field images with satellite data?',
      a: 'When an officer captures a ground photo, embedded EXIF metadata (GPS latitude, longitude, altitude, and compass heading) is extracted. The system matches these exact coordinates against 10m Sentinel-2 multi-spectral orthomosaics, computing the micro-watershed context: local slope gradient, vegetation density, nearest drainage line, and land-cover class.'
    },
    {
      q: 'What is the role of SatQuery AI in this platform?',
      a: 'SatQuery AI is a dedicated GIS spatial query assistant—not a generic conversational chatbot. It translates user queries into deterministic GIS spatial operations (layer activations, bounding box zoom, and metric calculations) so non-GIS officers can easily interrogate catchment data.'
    },
    {
      q: 'Which watershed is featured in this Smart India Hackathon 2026 demo?',
      a: 'The demo features the Mulshi Watershed Catchment (248.6 km²) in Pune District, Maharashtra. This area was selected for its diverse topographical elevation (320m to 1,245m), heavy orographic rainfall, high density of check dams and farm ponds, and multi-temporal change dynamics.'
    },
    {
      q: 'Are the AI land-cover classifications certified for engineering construction?',
      a: 'Classifications are generated using DeepLabV3+ and U-Net models trained on Western Ghats multi-spectral benchmarks. While achieving 91.8% mIoU in tests, all critical high-slope masonry interventions require on-site geotechnical and hydrological ground surveys.'
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <BookOpen className="w-4 h-4" />
          <span>DOCUMENTATION & OPERATIONAL MANUAL</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1">
          Help & User Documentation
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
          Everything you need to navigate, understand, and present the GeoWatershed AI platform.
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Core Workflow Diagram Box */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            The 12-Step Watershed Intelligence Workflow
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            {[
              '1. Select Watershed',
              '2. View Satellite',
              '3. Geo-Coded Photos',
              '4. Land Cover AI',
              '5. Terrain DEM',
              '6. Drainage Flow',
              '7. Interventions',
              '8. Change 2023-26',
              '9. Ask SatQuery',
              '10. View Insights',
              '11. Audit Metrics',
              '12. Export Report'
            ].map((step, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-slate-300">
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            Frequently Asked Questions (SIH 2026 Evaluation)
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5">
                <h4 className="text-xs font-bold text-emerald-300 flex items-start gap-2">
                  <span>Q{idx + 1}:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SIH Hackathon Credits */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 shadow-xl flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Smart India Hackathon 2026</span>
              <span className="text-emerald-400 font-mono">• Software Edition</span>
            </div>
            <div className="text-slate-400 mt-0.5">
              Theme: Geospatial Techniques for Watershed Development Outcomes
            </div>
          </div>
          <div className="text-right font-mono text-emerald-400 font-bold">
            Demo Version 1.0.0
          </div>
        </div>
      </div>
    </div>
  );
};
