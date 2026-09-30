import React, { useState } from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  Camera, 
  Droplet, 
  Sprout, 
  Layers, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';
import { GEO_CODED_IMAGES, WATERSHED_INTERVENTIONS, ALTERNATE_WATERSHEDS } from '../../data/mockData';
import { NavPageId } from './Sidebar';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavPageId) => void;
  onSelectGeoImage?: (id: string) => void;
  onSelectIntervention?: (id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectGeoImage,
  onSelectIntervention,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredGeoImages = GEO_CODED_IMAGES.filter(img => 
    img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.observer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInterventions = WATERSHED_INTERVENTIONS.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const defaultSuggestions = [
    { label: 'Mulshi Lake Reservoir', category: 'Water Body', page: 'drainage' as NavPageId },
    { label: 'Check Dam Structure #4', category: 'Intervention', page: 'interventions' as NavPageId },
    { label: 'Kolvan Village Cluster', category: 'Settlement', page: 'explorer' as NavPageId },
    { label: 'Dhangar Hill CCT Trenches', category: 'Terrain & Soil', page: 'terrain' as NavPageId },
    { label: 'Multi-Temporal Change 2023-2026', category: 'Analysis', page: 'changedetection' as NavPageId },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl glass-dropdown border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search watershed, coordinates (18.51, 73.49), check dams, village..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="p-1 rounded hover:bg-white/10 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-white/5 rounded-lg border border-white/10"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!searchTerm ? (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Suggested Spatial Entities & Pages
              </div>
              <div className="space-y-1">
                {defaultSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigate(sug.page);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-medium text-slate-200 group-hover:text-emerald-300">{sug.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{sug.category}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Interventions Matching */}
              {filteredInterventions.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sprout className="w-3.5 h-3.5" /> Watershed Interventions ({filteredInterventions.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredInterventions.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate('interventions');
                          if (onSelectIntervention) onSelectIntervention(item.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl glass-panel border border-white/5 hover:border-amber-500/40 flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300">{item.title}</div>
                          <div className="text-[10px] text-slate-400">{item.type} • {item.status} • {item.costInr}</div>
                        </div>
                        <span className="text-xs text-amber-400 flex items-center gap-1 font-mono">
                          View <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Geo-Coded Images Matching */}
              {filteredGeoImages.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" /> Geo-Coded Field Photos ({filteredGeoImages.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredGeoImages.map(img => (
                      <button
                        key={img.id}
                        onClick={() => {
                          onNavigate('geoimages');
                          if (onSelectGeoImage) onSelectGeoImage(img.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl glass-panel border border-white/5 hover:border-indigo-500/40 flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={img.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                          <div>
                            <div className="text-xs font-bold text-slate-100 group-hover:text-indigo-300">{img.title}</div>
                            <div className="text-[10px] text-slate-400">{img.category} • {img.observer}</div>
                          </div>
                        </div>
                        <span className="text-xs text-indigo-400 flex items-center gap-1 font-mono">
                          Inspect <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredInterventions.length === 0 && filteredGeoImages.length === 0 && (
                <div className="py-8 text-center text-slate-400 space-y-2">
                  <p className="text-sm">No direct spatial entities matching "{searchTerm}"</p>
                  <p className="text-xs text-slate-400">Try searching "Check Dam", "Pond", "Slope", or "Mulshi"</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
