import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  PRIMARY_WATERSHED,
  WATERSHED_BOUNDARY_COORDS,
  WATER_BODY_POLYGONS,
  DRAINAGE_STREAMS,
  GEO_CODED_IMAGES,
  WATERSHED_INTERVENTIONS,
  LAND_COVER_CLASSES
} from '../../data/mockData';
import { BaseMapType, GeoImage, Intervention } from '../../types';
import { MapControls } from './MapControls';
import { DynamicLegend } from './DynamicLegend';
import { Layers, Map as MapIcon, X, Check, Compass, Eye, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

interface GISMapProps {
  activeLayers?: string[];
  onLayerToggle?: (layer: string) => void;
  baseMap?: BaseMapType;
  onBaseMapChange?: (baseMap: BaseMapType) => void;
  onSelectGeoImage?: (image: GeoImage) => void;
  onSelectIntervention?: (intervention: Intervention) => void;
  selectedGeoImageId?: string;
  selectedInterventionId?: string;
  focusCoords?: [number, number];
  focusZoom?: number;
  interactive?: boolean;
  className?: string;
  height?: string;
  showAllControls?: boolean;
}

const BASE_MAP_URLS: Record<BaseMapType, { url: string; attribution: string; subdomains?: string[] }> = {
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Sentinel-2 & ISRO Bhuvan Orthorectified',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
    subdomains: ['a', 'b', 'c', 'd']
  },
  terrain: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap, SRTM | Map style: &copy; OpenTopoMap',
    subdomains: ['a', 'b', 'c']
  },
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  }
};

const ALL_ANALYSIS_LAYERS = [
  { id: 'Watershed Boundary', category: 'Analysis', default: true },
  { id: 'Water Bodies', category: 'Analysis', default: true },
  { id: 'Drainage', category: 'Analysis', default: true },
  { id: 'Land Cover', category: 'Analysis', default: false },
  { id: 'Vegetation', category: 'Analysis', default: false },
  { id: 'Agriculture', category: 'Analysis', default: false },
  { id: 'Built-up', category: 'Analysis', default: false },
  { id: 'Elevation', category: 'Analysis', default: false },
  { id: 'Slope', category: 'Analysis', default: false },
  { id: 'Geo-Coded Images', category: 'Field Data', default: true },
  { id: 'Interventions', category: 'Field Data', default: true },
];

export const GISMap: React.FC<GISMapProps> = ({
  activeLayers: controlledActiveLayers,
  onLayerToggle,
  baseMap: controlledBaseMap = 'satellite',
  onBaseMapChange,
  onSelectGeoImage,
  onSelectIntervention,
  selectedGeoImageId,
  selectedInterventionId,
  focusCoords,
  focusZoom,
  interactive = true,
  className = '',
  height = '100%',
  showAllControls = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const layerGroupsRef = useRef<{ [key: string]: L.LayerGroup }>({});

  const [localActiveLayers, setLocalActiveLayers] = useState<string[]>([
    'Watershed Boundary',
    'Water Bodies',
    'Drainage',
    'Geo-Coded Images',
    'Interventions'
  ]);
  const [localBaseMap, setLocalBaseMap] = useState<BaseMapType>(controlledBaseMap);
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);
  const [isBaseMapMenuOpen, setIsBaseMapMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measureToast, setMeasureToast] = useState<string | null>(null);

  const activeLayers = controlledActiveLayers || localActiveLayers;
  const currentBaseMap = controlledBaseMap || localBaseMap;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: PRIMARY_WATERSHED.center,
      zoom: PRIMARY_WATERSHED.zoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: interactive,
      dragging: interactive,
      doubleClickZoom: interactive,
    });

    mapInstanceRef.current = map;

    // Add base tile layer
    const baseConfig = BASE_MAP_URLS[currentBaseMap];
    tileLayerRef.current = L.tileLayer(baseConfig.url, {
      attribution: baseConfig.attribution,
      subdomains: baseConfig.subdomains || 'abc',
      maxZoom: 18,
    }).addTo(map);

    // Create Layer Groups
    ALL_ANALYSIS_LAYERS.forEach(l => {
      const lg = L.layerGroup();
      layerGroupsRef.current[l.id] = lg;
      if (activeLayers.includes(l.id)) {
        lg.addTo(map);
      }
    });

    // Populate layers with mock vector shapes
    populateLayers(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update base map tile
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const baseConfig = BASE_MAP_URLS[currentBaseMap];
    tileLayerRef.current.setUrl(baseConfig.url);
  }, [currentBaseMap]);

  // Sync active layers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    Object.entries(layerGroupsRef.current).forEach(([layerName, group]) => {
      if (activeLayers.includes(layerName)) {
        if (!map.hasLayer(group)) {
          group.addTo(map);
        }
      } else {
        if (map.hasLayer(group)) {
          group.removeFrom(map);
        }
      }
    });
  }, [activeLayers]);

  // Focus on coordinates if changed
  useEffect(() => {
    if (!mapInstanceRef.current || !focusCoords) return;
    mapInstanceRef.current.flyTo(focusCoords, focusZoom || 14, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  }, [focusCoords, focusZoom]);

  const populateLayers = (map: L.Map) => {
    // 1. Watershed Boundary
    const boundaryLg = layerGroupsRef.current['Watershed Boundary'];
    if (boundaryLg) {
      boundaryLg.clearLayers();
      const boundaryPolygon = L.polygon(WATERSHED_BOUNDARY_COORDS, {
        color: '#10b981', // forest emerald
        weight: 3,
        dashArray: '6, 6',
        fillColor: '#059669',
        fillOpacity: 0.12,
      });
      boundaryPolygon.bindTooltip(
        `<div class="text-xs font-semibold text-emerald-400">Mulshi Watershed Perimeter</div><div class="text-[10px] text-slate-300">Area: 248.6 km² | Basin: Mula River</div>`,
        { sticky: true }
      );
      boundaryLg.addLayer(boundaryPolygon);
    }

    // 2. Water Bodies
    const waterLg = layerGroupsRef.current['Water Bodies'];
    if (waterLg) {
      waterLg.clearLayers();
      WATER_BODY_POLYGONS.forEach((polyCoords, index) => {
        const poly = L.polygon(polyCoords, {
          color: '#38bdf8',
          weight: 2,
          fillColor: '#0284c7',
          fillOpacity: 0.55,
        });
        const name = index === 0 ? 'Mulshi Lake Reservoir' : index === 1 ? 'Tamhini Feeder Storage' : 'Valane Retention Wetland';
        poly.bindTooltip(
          `<div class="text-xs font-semibold text-sky-400">${name}</div><div class="text-[10px] text-slate-300">Surface Area: 18.4 km² total</div>`,
          { sticky: true }
        );
        waterLg.addLayer(poly);
      });
    }

    // 3. Drainage Streams
    const drainageLg = layerGroupsRef.current['Drainage'];
    if (drainageLg) {
      drainageLg.clearLayers();
      DRAINAGE_STREAMS.forEach(stream => {
        const line = L.polyline(stream.coords, {
          color: '#38bdf8',
          weight: stream.order === 4 ? 4 : stream.order === 3 ? 3 : 2,
          opacity: 0.85,
          className: 'animated-flow',
        });
        line.bindTooltip(
          `<div class="text-xs font-semibold text-sky-300">${stream.name}</div><div class="text-[10px] text-slate-400">Order: ${stream.order} | Flow → Mulshi Outlet</div>`,
          { sticky: true }
        );
        drainageLg.addLayer(line);
      });

      // Outlet marker
      const outletMarker = L.circleMarker([18.485, 73.578], {
        radius: 8,
        fillColor: '#0ea5e9',
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.9,
      });
      outletMarker.bindTooltip(
        `<div class="text-xs font-bold text-sky-400">Watershed Hydrological Outlet</div><div class="text-[10px] text-slate-300">Mula River Downstream Exit (Lat: 18.485, Lng: 73.578)</div>`
      );
      drainageLg.addLayer(outletMarker);
    }

    // 4. Land Cover (Synthesized spatial polygons)
    const landCoverLg = layerGroupsRef.current['Land Cover'];
    if (landCoverLg) {
      landCoverLg.clearLayers();
      // Vegetation zones (hills)
      const vegPoly1 = L.polygon([
        [18.555, 73.435],
        [18.575, 73.465],
        [18.545, 73.475],
        [18.535, 73.445],
      ], { color: '#10b981', weight: 1, fillColor: '#10b981', fillOpacity: 0.45 });
      vegPoly1.bindTooltip('<div class="text-xs font-semibold text-emerald-400">Dense Moist Deciduous Forest (42.7%)</div>');
      landCoverLg.addLayer(vegPoly1);

      // Agriculture zones (valleys)
      const agriPoly = L.polygon([
        [18.505, 73.535],
        [18.535, 73.565],
        [18.515, 73.570],
        [18.490, 73.540],
      ], { color: '#eab308', weight: 1, fillColor: '#eab308', fillOpacity: 0.45 });
      agriPoly.bindTooltip('<div class="text-xs font-semibold text-yellow-400">Terraced Paddy & Agriculture (31.2%)</div>');
      landCoverLg.addLayer(agriPoly);

      // Bare/Rock zones
      const barePoly = L.polygon([
        [18.475, 73.435],
        [18.495, 73.445],
        [18.485, 73.460],
        [18.465, 73.450],
      ], { color: '#94a3b8', weight: 1, fillColor: '#94a3b8', fillOpacity: 0.45 });
      barePoly.bindTooltip('<div class="text-xs font-semibold text-slate-300">Basalt Plateau & Scrub (9.5%)</div>');
      landCoverLg.addLayer(barePoly);
    }

    // 5. Vegetation Specific Layer
    const vegLg = layerGroupsRef.current['Vegetation'];
    if (vegLg) {
      vegLg.clearLayers();
      const vegPoly = L.polygon([
        [18.545, 73.430],
        [18.580, 73.460],
        [18.560, 73.485],
        [18.520, 73.460],
      ], { color: '#10b981', weight: 1.5, fillColor: '#059669', fillOpacity: 0.5 });
      vegPoly.bindTooltip('<div class="text-xs font-bold text-emerald-300">NDVI Canopy Mask (> 0.65)</div><div class="text-[10px] text-slate-200">106.2 km² Total Canopy</div>');
      vegLg.addLayer(vegPoly);
    }

    // 6. Agriculture Specific Layer
    const agriLg = layerGroupsRef.current['Agriculture'];
    if (agriLg) {
      agriLg.clearLayers();
      const agriPoly = L.polygon([
        [18.500, 73.530],
        [18.540, 73.565],
        [18.515, 73.570],
        [18.485, 73.540],
      ], { color: '#f59e0b', weight: 1.5, fillColor: '#eab308', fillOpacity: 0.5 });
      agriPoly.bindTooltip('<div class="text-xs font-bold text-yellow-300">Agricultural Cropping Layer</div><div class="text-[10px] text-slate-200">77.5 km² Active Area</div>');
      agriLg.addLayer(agriPoly);
    }

    // 7. Slope & Elevation Layers
    const slopeLg = layerGroupsRef.current['Slope'];
    if (slopeLg) {
      slopeLg.clearLayers();
      // High slope zone polygon
      const steepSlopePoly = L.polygon([
        [18.550, 73.435],
        [18.570, 73.448],
        [18.558, 73.460],
        [18.538, 73.445],
      ], { color: '#ef4444', weight: 2, fillColor: '#ef4444', fillOpacity: 0.45 });
      steepSlopePoly.bindTooltip('<div class="text-xs font-bold text-rose-400">Critical Slope Zone (&gt; 25°)</div><div class="text-[10px] text-slate-200">High Runoff & Gully Risk Area: 23.6 km²</div>');
      slopeLg.addLayer(steepSlopePoly);
    }

    // 8. Geo-Coded Images Markers
    const geoImgLg = layerGroupsRef.current['Geo-Coded Images'];
    if (geoImgLg) {
      geoImgLg.clearLayers();
      GEO_CODED_IMAGES.forEach(img => {
        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="absolute -inset-1 rounded-full bg-indigo-500/40 animate-ping"></div>
            <div class="relative w-8 h-8 rounded-full bg-slate-900 border-2 border-indigo-400 shadow-xl flex items-center justify-center text-white transition-transform transform group-hover:scale-125">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
            </div>
          </div>
        `;
        const customIcon = L.divIcon({
          className: 'custom-geo-icon',
          html: iconHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([img.lat, img.lng], { icon: customIcon });
        marker.on('click', () => {
          if (onSelectGeoImage) onSelectGeoImage(img);
        });
        marker.bindTooltip(
          `<div class="text-xs font-bold text-indigo-300">${img.title}</div><div class="text-[10px] text-slate-300">${img.category} • ${img.date}</div><div class="text-[10px] text-emerald-400 font-semibold mt-0.5">Click to view Field + Satellite Context</div>`,
          { sticky: true }
        );
        geoImgLg.addLayer(marker);
      });
    }

    // 9. Interventions Markers
    const interventionsLg = layerGroupsRef.current['Interventions'];
    if (interventionsLg) {
      interventionsLg.clearLayers();
      WATERSHED_INTERVENTIONS.forEach(item => {
        let colorClass = 'bg-amber-500 border-amber-300';
        let svgPath = '<circle cx="12" cy="12" r="6"/>'; // default

        if (item.type === 'Check Dam') {
          colorClass = 'bg-amber-500 border-amber-300 text-amber-950';
          svgPath = '<path d="M4 14h16M4 18h16M6 10h12M9 6h6"/>';
        } else if (item.type === 'Farm Pond') {
          colorClass = 'bg-sky-500 border-sky-300 text-sky-950';
          svgPath = '<path d="M12 2a6 6 0 0 0-6 6c0 3 6 8 6 8s6-5 6-8a6 6 0 0 0-6-6z"/>';
        } else if (item.type === 'Contour Trench') {
          colorClass = 'bg-orange-500 border-orange-300 text-orange-950';
          svgPath = '<path d="M3 17h4l3-6 4 8 3-4h4"/>';
        } else if (item.type === 'Plantation') {
          colorClass = 'bg-emerald-500 border-emerald-300 text-emerald-950';
          svgPath = '<path d="M12 3v18M8 8a4 4 0 0 1 8 0c0 3-4 6-4 6s-4-3-4-6z"/>';
        } else {
          colorClass = 'bg-purple-500 border-purple-300 text-purple-950';
          svgPath = '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>';
        }

        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="w-7 h-7 rounded-lg ${colorClass} border-2 shadow-lg flex items-center justify-center transition-transform transform group-hover:scale-125">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                ${svgPath}
              </svg>
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-intervention-icon',
          html: iconHtml,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([item.lat, item.lng], { icon: customIcon });
        marker.on('click', () => {
          if (onSelectIntervention) onSelectIntervention(item);
        });
        marker.bindTooltip(
          `<div class="text-xs font-bold text-slate-100">${item.title}</div><div class="text-[10px] text-amber-400 font-semibold">${item.type} • Status: ${item.status}</div><div class="text-[10px] text-slate-300">Impact Area: ${item.impactAreaHa} ha | Cost: ${item.costInr}</div>`,
          { sticky: true }
        );
        interventionsLg.addLayer(marker);
      });
    }
  };

  const handleLayerToggle = (layerId: string) => {
    if (onLayerToggle) {
      onLayerToggle(layerId);
    } else {
      setLocalActiveLayers(prev => 
        prev.includes(layerId) ? prev.filter(l => l !== layerId) : [...prev, layerId]
      );
    }
  };

  const handleBaseMapSelect = (type: BaseMapType) => {
    if (onBaseMapChange) {
      onBaseMapChange(type);
    } else {
      setLocalBaseMap(type);
    }
    setIsBaseMapMenuOpen(false);
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(PRIMARY_WATERSHED.center, PRIMARY_WATERSHED.zoom, {
        duration: 0.8
      });
    }
  };

  const handleLocate = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(PRIMARY_WATERSHED.center, 13, { duration: 1.0 });
    }
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleToggleMeasure = () => {
    setIsMeasuring(!isMeasuring);
    if (!isMeasuring) {
      setMeasureToast('GIS Measure Tool Active: Click two points on the map to calculate geodesic distance & slope.');
      setTimeout(() => setMeasureToast(null), 4000);
    } else {
      setMeasureToast(null);
    }
  };

  return (
    <div className={`relative w-full overflow-hidden select-none ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950' : ''} ${className}`} style={{ height: isFullscreen ? '100vh' : height }}>
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Status / North Arrow Compass */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-3">
        <div className="glass-dropdown px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 shadow-xl backdrop-blur-md pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-200">Mulshi Watershed</span>
          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            WGS84 18.51°N, 73.49°E
          </span>
        </div>
      </div>

      {/* Floating GIS Map Controls */}
      {showAllControls && (
        <MapControls
          className="absolute top-4 right-4 z-20"
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
          onLocate={handleLocate}
          onToggleFullscreen={handleToggleFullscreen}
          isFullscreen={isFullscreen}
          onToggleLayerMenu={() => {
            setIsLayerMenuOpen(!isLayerMenuOpen);
            setIsBaseMapMenuOpen(false);
          }}
          isLayerMenuOpen={isLayerMenuOpen}
          onToggleBaseMapMenu={() => {
            setIsBaseMapMenuOpen(!isBaseMapMenuOpen);
            setIsLayerMenuOpen(false);
          }}
          isBaseMapMenuOpen={isBaseMapMenuOpen}
          isMeasuring={isMeasuring}
          onToggleMeasure={handleToggleMeasure}
        />
      )}

      {/* Dynamic Reactive Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20">
        <DynamicLegend activeLayers={activeLayers} onToggleLayer={handleLayerToggle} />
      </div>

      {/* Measurement Tool Notification Banner */}
      {measureToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 glass-dropdown border border-amber-500/30 text-amber-200 text-xs px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{measureToast}</span>
          <button onClick={() => setMeasureToast(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Layers Panel Modal / Drawer */}
      {isLayerMenuOpen && (
        <div className="absolute top-4 right-16 z-30 w-72 glass-dropdown border border-white/10 rounded-2xl shadow-2xl p-4 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-100">Map Layers</h3>
            </div>
            <button
              onClick={() => setIsLayerMenuOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Close layers menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-4 max-h-80 overflow-y-auto pr-1">
            {/* Analysis Layers */}
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Watershed Analysis
              </div>
              <div className="space-y-1.5">
                {ALL_ANALYSIS_LAYERS.filter(l => l.category === 'Analysis').map(layer => {
                  const isActive = activeLayers.includes(layer.id);
                  return (
                    <button
                      key={layer.id}
                      onClick={() => handleLayerToggle(layer.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive ? 'bg-emerald-500/20 text-emerald-300 font-medium' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                          isActive ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
                        }`}>
                          {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>{layer.id}</span>
                      </span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field Data Layers */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Field Data & Ground Truth
              </div>
              <div className="space-y-1.5">
                {ALL_ANALYSIS_LAYERS.filter(l => l.category === 'Field Data').map(layer => {
                  const isActive = activeLayers.includes(layer.id);
                  return (
                    <button
                      key={layer.id}
                      onClick={() => handleLayerToggle(layer.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive ? 'bg-indigo-500/20 text-indigo-300 font-medium' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                          isActive ? 'bg-indigo-500 border-indigo-400 text-white' : 'border-slate-600'
                        }`}>
                          {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>{layer.id}</span>
                      </span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Base Map Switcher Popover */}
      {isBaseMapMenuOpen && (
        <div className="absolute top-16 right-16 z-30 w-52 glass-dropdown border border-white/10 rounded-2xl shadow-2xl p-3 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
              <MapIcon className="w-3.5 h-3.5 text-sky-400" />
              Base Map Style
            </span>
            <button
              onClick={() => setIsBaseMapMenuOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {[
              { id: 'satellite', label: 'Satellite (Sentinel/Esri)', desc: 'High-res multispectral imagery' },
              { id: 'terrain', label: 'Terrain (Topographic)', desc: 'Contour and elevation relief' },
              { id: 'dark', label: 'Dark Carto Matter', desc: 'Minimalist GIS workstation' },
              { id: 'street', label: 'OpenStreetMap', desc: 'Settlements & road grid' }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => handleBaseMapSelect(b.id as BaseMapType)}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                  currentBaseMap === b.id ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div>
                  <div>{b.label}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{b.desc}</div>
                </div>
                {currentBaseMap === b.id && <Check className="w-3.5 h-3.5 text-sky-400" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Map Scale Bar Indicator (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none flex flex-col items-end gap-1">
        <div className="glass-panel px-2.5 py-1 rounded text-[10px] text-slate-400 font-mono border border-white/10 flex items-center gap-2">
          <span>Scale: 1:25,000</span>
          <span className="w-12 h-1 bg-slate-400/50 inline-block border-x border-slate-300"></span>
          <span>1 km</span>
        </div>
      </div>
    </div>
  );
};
