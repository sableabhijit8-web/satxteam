import React, { useState } from 'react';
import { PRIMARY_WATERSHED, GEO_CODED_IMAGES, WATERSHED_INTERVENTIONS } from '../../data/mockData';
import { GISMap } from '../../components/map/GISMap';
import { GeoImage, Intervention } from '../../types';
import { 
  Map, 
  Layers, 
  Eye, 
  Maximize2, 
  Crosshair, 
  Compass, 
  Sliders, 
  Sparkles,
  Info
} from 'lucide-react';

interface WatershedExplorerPageProps {
  onSelectGeoImage: (img: GeoImage) => void;
  onSelectIntervention: (intervention: Intervention) => void;
}

export const WatershedExplorerPage: React.FC<WatershedExplorerPageProps> = ({
  onSelectGeoImage,
  onSelectIntervention,
}) => {
  const [activeLayers, setActiveLayers] = useState<string[]>([
    'Watershed Boundary',
    'Water Bodies',
    'Drainage',
    'Geo-Coded Images',
    'Interventions',
    'Land Cover'
  ]);

  const handleToggle = (layer: string) => {
    setActiveLayers(prev => 
      prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]
    );
  };

  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-4 overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Map className="w-4 h-4" />
            <span>FULL MULTI-LAYER SPATIAL WORKBENCH</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight mt-0.5">
            Watershed Explorer
          </h1>
          <p className="text-xs text-slate-300">
            Full-screen GIS inspection console with synchronized orthomosaic overlays.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            {activeLayers.length} Layers Visible • WGS84
          </span>
        </div>
      </div>

      {/* Main Full-Height GIS Canvas */}
      <div className="flex-1 rounded-2xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl relative min-h-[560px]">
        <GISMap
          activeLayers={activeLayers}
          onLayerToggle={handleToggle}
          onSelectGeoImage={onSelectGeoImage}
          onSelectIntervention={onSelectIntervention}
          height="100%"
        />
      </div>
    </div>
  );
};
