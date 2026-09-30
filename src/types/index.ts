export type BaseMapType = 'satellite' | 'terrain' | 'street' | 'dark';

export interface Watershed {
  id: string;
  name: string;
  subBasin: string;
  district: string;
  state: string;
  areaKm2: number;
  center: [number, number]; // [lat, lng]
  zoom: number;
  boundaryGeoJson?: any;
  vegetationPct: number;
  agriculturePct: number;
  waterPct: number;
  builtUpPct: number;
  bareLandPct: number;
  avgElevationM: number;
  avgSlopeDeg: number;
  drainageLengthKm: number;
  interventionCount: number;
  streamCount: number;
  lastUpdated: string;
  dataQuality: string;
}

export type GeoImageCategory = 
  | 'Check Dam Structure' 
  | 'Farm Pond Reservoir' 
  | 'Contour Trench Line' 
  | 'Riparian Plantation' 
  | 'Soil Erosion Gully' 
  | 'Vegetation Canopy';

export interface GeoImage {
  id: string;
  title: string;
  category: GeoImageCategory;
  imageUrl: string;
  satelliteContextUrl: string;
  lat: number;
  lng: number;
  date: string;
  observer: string;
  landCoverClass: string;
  vegetationPct: number;
  elevationM: number;
  slopeDeg: number;
  nearestDrainageM: number;
  nearestWaterBodyM: number;
  description: string;
  status: 'Verified' | 'Pending Review' | 'Flagged';
  accuracyM: number;
  compassHeading: number;
}

export type InterventionType = 
  | 'Check Dam' 
  | 'Farm Pond' 
  | 'Contour Trench' 
  | 'Plantation' 
  | 'Soil Conservation'
  | 'Water Conservation Structure';

export interface Intervention {
  id: string;
  type: InterventionType;
  title: string;
  lat: number;
  lng: number;
  status: 'Completed' | 'Under Construction' | 'Proposed' | 'Needs Maintenance';
  year: number;
  capacityM3?: number;
  impactAreaHa: number;
  costInr: string;
  geoImageId?: string;
  nearbyLandCover: string;
  nearbyDrainageDistanceM: number;
  elevationM: number;
  slopeDeg: number;
  beneficiariesCount: number;
  notes: string;
}

export interface LandCoverClass {
  id: string;
  name: string;
  color: string;
  tailwindBg: string;
  tailwindText: string;
  areaKm2: number;
  percentage: number;
  changeKm2: number; // vs baseline
  description: string;
}

export interface TerrainMetrics {
  minElevationM: number;
  maxElevationM: number;
  avgElevationM: number;
  avgSlopeDeg: number;
  highSlopeAreaKm2: number;
  moderateSlopeAreaKm2: number;
  gentleSlopeAreaKm2: number;
  dominantAspect: string;
  slopeZones: {
    range: string;
    description: string;
    areaKm2: number;
    pct: number;
    color: string;
  }[];
}

export interface DrainageMetrics {
  totalLengthKm: number;
  streamCount: number;
  drainageDensityKmPerKm2: number;
  waterBodiesCount: number;
  waterBodyAreaKm2: number;
  mainRiver: string;
  outletCoords: [number, number];
  streams: {
    order: number;
    count: number;
    lengthKm: number;
  }[];
}

export interface ChangeDetectionCategory {
  id: string;
  name: string;
  color: string;
  year2023: number;
  year2026: number;
  deltaKm2: number;
  deltaPct: number;
  trend: 'increase' | 'decrease' | 'stable';
  note: string;
}

export interface SatQueryResult {
  query: string;
  timestamp: string;
  understanding: string;
  layersActivated: string[];
  targetZoom?: number;
  targetCenter?: [number, number];
  statistics: { label: string; value: string | number; change?: string }[];
  summary: string;
  recommendations?: string[];
}

export interface WatershedInsight {
  id: string;
  title: string;
  category: 'Vegetation' | 'Water' | 'Terrain' | 'Drainage' | 'Interventions' | 'Change';
  highlight: string;
  description: string;
  urgency: 'high' | 'medium' | 'info' | 'positive';
  actionableStep: string;
  layerToActivate: string;
  targetCoords?: [number, number];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  linkPage?: string;
}
