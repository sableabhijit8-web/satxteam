import React from 'react';
import { 
  Plus, 
  Minus, 
  Layers, 
  Map as MapIcon, 
  Maximize2, 
  Minimize2, 
  Ruler, 
  Crosshair, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { BaseMapType } from '../../types';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onLocate: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onToggleLayerMenu: () => void;
  isLayerMenuOpen: boolean;
  onToggleBaseMapMenu: () => void;
  isBaseMapMenuOpen: boolean;
  isMeasuring: boolean;
  onToggleMeasure: () => void;
  className?: string;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onLocate,
  onToggleFullscreen,
  isFullscreen,
  onToggleLayerMenu,
  isLayerMenuOpen,
  onToggleBaseMapMenu,
  isBaseMapMenuOpen,
  isMeasuring,
  onToggleMeasure,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Zoom Controls */}
      <div className="flex flex-col rounded-xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl backdrop-blur-md">
        <button
          onClick={onZoomIn}
          title="Zoom In (+)"
          className="p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors border-b border-white/10 flex items-center justify-center"
          aria-label="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onZoomOut}
          title="Zoom Out (-)"
          className="p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
          aria-label="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Layer and BaseMap controls */}
      <div className="flex flex-col rounded-xl overflow-hidden glass-dropdown border border-white/10 shadow-2xl backdrop-blur-md">
        <button
          onClick={onToggleLayerMenu}
          title="GIS Analysis Layers"
          className={`p-2 transition-colors border-b border-white/10 flex items-center justify-center ${
            isLayerMenuOpen ? 'text-emerald-400 bg-emerald-500/20' : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Toggle Layers Menu"
        >
          <Layers className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleBaseMapMenu}
          title="Switch Base Map Tile Provider"
          className={`p-2 transition-colors border-b border-white/10 flex items-center justify-center ${
            isBaseMapMenuOpen ? 'text-sky-400 bg-sky-500/20' : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Toggle Base Map"
        >
          <MapIcon className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleMeasure}
          title="Spatial Distance / Area Measure Tool"
          className={`p-2 transition-colors border-b border-white/10 flex items-center justify-center ${
            isMeasuring ? 'text-amber-400 bg-amber-500/20' : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Spatial Measure Tool"
        >
          <Ruler className="w-4 h-4" />
        </button>
        <button
          onClick={onLocate}
          title="Center on Watershed Core"
          className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-white/10 transition-colors border-b border-white/10 flex items-center justify-center"
          aria-label="Center on Watershed"
        >
          <Crosshair className="w-4 h-4" />
        </button>
        <button
          onClick={onResetView}
          title="Reset Zoom & Pan"
          className="p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors border-b border-white/10 flex items-center justify-center"
          aria-label="Reset Map View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen GIS Workstation'}
          className="p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
