import { 
  Watershed, 
  GeoImage, 
  Intervention, 
  LandCoverClass, 
  TerrainMetrics, 
  DrainageMetrics, 
  ChangeDetectionCategory,
  WatershedInsight,
  NotificationItem,
  SatQueryResult
} from '../types';

export const PRIMARY_WATERSHED: Watershed = {
  id: 'ws-mulshi-01',
  name: 'Mulshi Watershed Catchment',
  subBasin: 'Upper Bhima - Mula River Sub-Basin',
  district: 'Pune District',
  state: 'Maharashtra',
  areaKm2: 248.6,
  center: [18.5085, 73.4925],
  zoom: 12,
  vegetationPct: 42.7,
  agriculturePct: 31.2,
  waterPct: 7.4,
  builtUpPct: 9.2,
  bareLandPct: 9.5,
  avgElevationM: 684,
  avgSlopeDeg: 14.8,
  drainageLengthKm: 412.6,
  interventionCount: 128,
  streamCount: 1284,
  lastUpdated: 'Sept 2026 (Sentinel-2 & Field Survey Cycle 4)',
  dataQuality: '99.4% Orthorectified (Geo-Referenced to WGS84)',
};

export const ALTERNATE_WATERSHEDS = [
  { id: 'ws-mulshi-01', name: 'Mulshi Watershed (Pune, MH)', area: '248.6 km²', status: 'Active Ready' },
  { id: 'ws-purandar-02', name: 'Purandar Sub-Watershed (Pune, MH)', area: '184.2 km²', status: 'Demo Loaded' },
  { id: 'ws-baramati-03', name: 'Baramati Micro-Catchment (MH)', area: '132.8 km²', status: 'Archived' },
  { id: 'ws-khed-04', name: 'Khed Watershed (Western Ghats)', area: '298.0 km²', status: 'Demo Loaded' },
];

// Realistic polygon around Mulshi catchment
export const WATERSHED_BOUNDARY_COORDS: [number, number][] = [
  [18.572, 73.425],
  [18.585, 73.465],
  [18.568, 73.515],
  [18.542, 73.558],
  [18.505, 73.575],
  [18.465, 73.560],
  [18.435, 73.525],
  [18.428, 73.475],
  [18.445, 73.435],
  [18.485, 73.415],
  [18.535, 73.412],
  [18.572, 73.425],
];

// Mulshi Lake water body polygon
export const WATER_BODY_POLYGONS: [number, number][][] = [
  // Main Mulshi Reservoir
  [
    [18.525, 73.485],
    [18.538, 73.498],
    [18.528, 73.518],
    [18.508, 73.528],
    [18.488, 73.515],
    [18.482, 73.498],
    [18.495, 73.478],
    [18.512, 73.475],
    [18.525, 73.485],
  ],
  // Upstream feeder pond
  [
    [18.552, 73.448],
    [18.558, 73.456],
    [18.550, 73.462],
    [18.544, 73.452],
    [18.552, 73.448],
  ],
  // South retention wetland
  [
    [18.455, 73.502],
    [18.462, 73.512],
    [18.452, 73.518],
    [18.448, 73.508],
    [18.455, 73.502],
  ]
];

// Drainage network stream polylines (flow towards lake/outlet)
export const DRAINAGE_STREAMS: { id: string; name: string; order: number; coords: [number, number][] }[] = [
  {
    id: 'stream-mula-main',
    name: 'Mula River Primary Channel',
    order: 4,
    coords: [
      [18.570, 73.430],
      [18.555, 73.452],
      [18.542, 73.472],
      [18.525, 73.485],
      [18.508, 73.528],
      [18.495, 73.555],
      [18.485, 73.578], // Outlet
    ]
  },
  {
    id: 'stream-west-trib1',
    name: 'Tamhini Crest Feeder',
    order: 2,
    coords: [
      [18.490, 73.420],
      [18.498, 73.445],
      [18.505, 73.475],
    ]
  },
  {
    id: 'stream-north-trib2',
    name: 'Dhangarwadi Stream',
    order: 2,
    coords: [
      [18.575, 73.480],
      [18.555, 73.488],
      [18.538, 73.498],
    ]
  },
  {
    id: 'stream-south-trib3',
    name: 'Valane Hill Stream',
    order: 3,
    coords: [
      [18.435, 73.485],
      [18.455, 73.495],
      [18.482, 73.498],
    ]
  },
  {
    id: 'stream-east-trib4',
    name: 'Paud Valley Drainage',
    order: 2,
    coords: [
      [18.535, 73.565],
      [18.518, 73.548],
      [18.508, 73.528],
    ]
  }
];

// Geo-coded field images with real photographic references & spatial metrics
export const GEO_CODED_IMAGES: GeoImage[] = [
  {
    id: 'geo-img-001',
    title: 'Gullied Slopes Gabion Check Dam #4',
    category: 'Check Dam Structure',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
    satelliteContextUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=900&q=80',
    lat: 18.5380,
    lng: 73.4680,
    date: '2026-08-14 09:42 IST',
    observer: 'Dr. Ramesh Shinde (Senior Hydrologist)',
    landCoverClass: 'Vegetation / Scrub Transition',
    vegetationPct: 61.4,
    elevationM: 742,
    slopeDeg: 19.4,
    nearestDrainageM: 14,
    nearestWaterBodyM: 1420,
    description: 'Dry stone masonry check dam constructed to attenuate high peak monsoon velocity. Silt trap upstream shows 1.2m sediment arrest. Structural integrity optimal.',
    status: 'Verified',
    accuracyM: 1.8,
    compassHeading: 135,
  },
  {
    id: 'geo-img-002',
    title: 'Community Farm Pond - Kolvan Cluster',
    category: 'Farm Pond Reservoir',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
    satelliteContextUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    lat: 18.5140,
    lng: 73.5420,
    date: '2026-08-19 14:15 IST',
    observer: 'Pooja Kadam (GIS Field Engineer)',
    landCoverClass: 'Agriculture (Paddy/Millets)',
    vegetationPct: 34.2,
    elevationM: 618,
    slopeDeg: 6.2,
    nearestDrainageM: 85,
    nearestWaterBodyM: 310,
    description: 'Polythene-lined 2500m³ farm pond filled to 88% capacity. Provides critical supplementary irrigation for 14 marginal farmers during post-monsoon dry spells.',
    status: 'Verified',
    accuracyM: 2.1,
    compassHeading: 270,
  },
  {
    id: 'geo-img-003',
    title: 'Continuous Contour Trenches (CCT) Hillside',
    category: 'Contour Trench Line',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    satelliteContextUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
    lat: 18.5620,
    lng: 73.4420,
    date: '2026-07-28 11:30 IST',
    observer: 'Anand Patil (Soil Conservation Officer)',
    landCoverClass: 'Bare Hillside / Dense Forest Margin',
    vegetationPct: 48.0,
    elevationM: 885,
    slopeDeg: 24.8,
    nearestDrainageM: 110,
    nearestWaterBodyM: 2400,
    description: 'CCT line along 0.5m vertical interval on steep Western Ghats flank. Infiltration rate boosted by estimated 34% with native vetiver grass planted along berms.',
    status: 'Verified',
    accuracyM: 1.4,
    compassHeading: 85,
  },
  {
    id: 'geo-img-004',
    title: 'Riparian Buffer Native Plantation Zone',
    category: 'Riparian Plantation',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
    satelliteContextUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80',
    lat: 18.4780,
    lng: 73.5180,
    date: '2026-09-02 16:50 IST',
    observer: 'Dr. Ramesh Shinde',
    landCoverClass: 'Vegetation / Wetland Zone',
    vegetationPct: 78.5,
    elevationM: 642,
    slopeDeg: 8.1,
    nearestDrainageM: 8,
    nearestWaterBodyM: 45,
    description: '3-tier bamboo, neem, and jamun tree plantation along feeder canal banks. Canopy density increased 18% since 2024 planting cycle, preventing bank erosion.',
    status: 'Verified',
    accuracyM: 2.4,
    compassHeading: 180,
  },
  {
    id: 'geo-img-005',
    title: 'Deep Gully Headcut Remediation Plug',
    category: 'Soil Erosion Gully',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80',
    satelliteContextUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    lat: 18.4980,
    lng: 73.4450,
    date: '2026-09-12 10:18 IST',
    observer: 'Sunil Deshmukh (Watershed Assistant)',
    landCoverClass: 'Bare Land / Eroded Soil',
    vegetationPct: 18.2,
    elevationM: 710,
    slopeDeg: 21.0,
    nearestDrainageM: 0,
    nearestWaterBodyM: 1890,
    description: 'Earthen loose-boulder plug to stall active headward gully retreat encroaching on village pastureland. 2.4 ton sediment retained after August flash shower.',
    status: 'Pending Review',
    accuracyM: 3.0,
    compassHeading: 45,
  },
  {
    id: 'geo-img-006',
    title: 'Terraced Paddy Infiltration Basin',
    category: 'Vegetation Canopy',
    imageUrl: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=900&q=80',
    satelliteContextUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
    lat: 18.5280,
    lng: 73.5550,
    date: '2026-09-20 08:30 IST',
    observer: 'Pooja Kadam',
    landCoverClass: 'Agriculture (Intensive Wet Cropping)',
    vegetationPct: 71.8,
    elevationM: 595,
    slopeDeg: 5.4,
    nearestDrainageM: 42,
    nearestWaterBodyM: 820,
    description: 'Level terracing with stone riser bunds sustaining moisture. Yield survey indicates 22% higher biomass output than non-treated adjacent valley slopes.',
    status: 'Verified',
    accuracyM: 1.6,
    compassHeading: 310,
  }
];

// Watershed Interventions list
export const WATERSHED_INTERVENTIONS: Intervention[] = [
  {
    id: 'int-cd-01',
    type: 'Check Dam',
    title: 'Tamhini Tributary Check Dam #1',
    lat: 18.5380,
    lng: 73.4680,
    status: 'Completed',
    year: 2024,
    capacityM3: 4500,
    impactAreaHa: 34.5,
    costInr: '₹ 8,40,000',
    geoImageId: 'geo-img-001',
    nearbyLandCover: 'Vegetation / Scrub',
    nearbyDrainageDistanceM: 0,
    elevationM: 742,
    slopeDeg: 19.4,
    beneficiariesCount: 48,
    notes: 'Stone masonry structure. Arrests peak storm discharge and recharges shallow aquifers.'
  },
  {
    id: 'int-fp-02',
    type: 'Farm Pond',
    title: 'Kolvan Jal-Vikas Community Pond',
    lat: 18.5140,
    lng: 73.5420,
    status: 'Completed',
    year: 2025,
    capacityM3: 2500,
    impactAreaHa: 18.2,
    costInr: '₹ 3,20,000',
    geoImageId: 'geo-img-002',
    nearbyLandCover: 'Agriculture (Paddy)',
    nearbyDrainageDistanceM: 85,
    elevationM: 618,
    slopeDeg: 6.2,
    beneficiariesCount: 14,
    notes: 'HDPE lined farm pond holding secondary monsoon runoff for winter rabi crop support.'
  },
  {
    id: 'int-ct-03',
    type: 'Contour Trench',
    title: 'Dhangar Hill Continuous Contour Trenches',
    lat: 18.5620,
    lng: 73.4420,
    status: 'Completed',
    year: 2023,
    capacityM3: 1800,
    impactAreaHa: 52.0,
    costInr: '₹ 4,80,000',
    geoImageId: 'geo-img-003',
    nearbyLandCover: 'Bare Hillside',
    nearbyDrainageDistanceM: 110,
    elevationM: 885,
    slopeDeg: 24.8,
    beneficiariesCount: 65,
    notes: '3.2 km continuous staggered contour trenching across steep slopes to arrest soil runoff.'
  },
  {
    id: 'int-pl-04',
    type: 'Plantation',
    title: 'Mulshi Riparian Afforestation Belt',
    lat: 18.4780,
    lng: 73.5180,
    status: 'Completed',
    year: 2024,
    capacityM3: 0,
    impactAreaHa: 42.8,
    costInr: '₹ 5,60,000',
    geoImageId: 'geo-img-004',
    nearbyLandCover: 'Vegetation / Forest',
    nearbyDrainageDistanceM: 8,
    elevationM: 642,
    slopeDeg: 8.1,
    beneficiariesCount: 110,
    notes: '8,400 indigenous saplings planted along riparian corridor with 89% survival audit.'
  },
  {
    id: 'int-sc-05',
    type: 'Soil Conservation',
    title: 'Valane Gully Control & Boulder Bunding',
    lat: 18.4980,
    lng: 73.4450,
    status: 'Under Construction',
    year: 2026,
    capacityM3: 1200,
    impactAreaHa: 22.4,
    costInr: '₹ 2,90,000',
    geoImageId: 'geo-img-005',
    nearbyLandCover: 'Eroded Scrubland',
    nearbyDrainageDistanceM: 0,
    elevationM: 710,
    slopeDeg: 21.0,
    beneficiariesCount: 32,
    notes: 'Loose boulder pitching and vegetative bunding to arrest rapid headcut expansion.'
  },
  {
    id: 'int-wc-06',
    type: 'Water Conservation Structure',
    title: 'Nive Subsurface Dyke & Recharge Shaft',
    lat: 18.5280,
    lng: 73.5050,
    status: 'Completed',
    year: 2025,
    capacityM3: 6200,
    impactAreaHa: 68.0,
    costInr: '₹ 11,20,000',
    nearbyLandCover: 'Alluvial Riverbed',
    nearbyDrainageDistanceM: 0,
    elevationM: 630,
    slopeDeg: 3.8,
    beneficiariesCount: 180,
    notes: 'Subsurface clay membrane dyke across sandy riverbed to maintain high water table.'
  },
  {
    id: 'int-cd-07',
    type: 'Check Dam',
    title: 'Paud Stream Gabion Series #2',
    lat: 18.5210,
    lng: 73.5580,
    status: 'Proposed',
    year: 2026,
    capacityM3: 3800,
    impactAreaHa: 28.0,
    costInr: '₹ 6,50,000',
    nearbyLandCover: 'Agriculture / Silt Zone',
    nearbyDrainageDistanceM: 5,
    elevationM: 605,
    slopeDeg: 7.2,
    beneficiariesCount: 40,
    notes: 'Proposed under PMKSY watershed sanction cycle 2026-2027 to recharge tube wells.'
  }
];

// Land Cover classes and distributions
export const LAND_COVER_CLASSES: LandCoverClass[] = [
  {
    id: 'lc-veg',
    name: 'Vegetation / Forest',
    color: '#10b981', // emerald-500
    tailwindBg: 'bg-emerald-500',
    tailwindText: 'text-emerald-400',
    areaKm2: 106.2,
    percentage: 42.7,
    changeKm2: 6.4,
    description: 'Deciduous forest, riparian woodland, plantation belts, and dense scrub canopy along ridges.'
  },
  {
    id: 'lc-agri',
    name: 'Agriculture / Cropland',
    color: '#eab308', // yellow-500
    tailwindBg: 'bg-yellow-500',
    tailwindText: 'text-yellow-400',
    areaKm2: 77.5,
    percentage: 31.2,
    changeKm2: 3.2,
    description: 'Terraced paddy, millets, pulses, horticulture plots, and double-cropped valley floor.'
  },
  {
    id: 'lc-water',
    name: 'Water Bodies',
    color: '#0ea5e9', // sky-500
    tailwindBg: 'bg-sky-500',
    tailwindText: 'text-sky-400',
    areaKm2: 18.4,
    percentage: 7.4,
    changeKm2: -1.8,
    description: 'Mulshi Lake storage, farm ponds, retention basins, and perennial river sections.'
  },
  {
    id: 'lc-built',
    name: 'Built-up / Infrastructure',
    color: '#f43f5e', // rose-500
    tailwindBg: 'bg-rose-500',
    tailwindText: 'text-rose-400',
    areaKm2: 22.8,
    percentage: 9.2,
    changeKm2: 1.1,
    description: 'Settlements, rural homesteads, paved roadways, pumping substations, and tourist resorts.'
  },
  {
    id: 'lc-bare',
    name: 'Bare Land / Rocky Outcrops',
    color: '#94a3b8', // slate-400
    tailwindBg: 'bg-slate-400',
    tailwindText: 'text-slate-300',
    areaKm2: 23.7,
    percentage: 9.5,
    changeKm2: -8.9,
    description: 'Exposed basalt plateaus, eroded gullies, degraded fallow, and open terrain.'
  }
];

export const TERRAIN_METRICS: TerrainMetrics = {
  minElevationM: 320,
  maxElevationM: 1245,
  avgElevationM: 684,
  avgSlopeDeg: 14.8,
  highSlopeAreaKm2: 23.6,
  moderateSlopeAreaKm2: 112.4,
  gentleSlopeAreaKm2: 112.6,
  dominantAspect: 'South-West (Moisture Bearing Ghats)',
  slopeZones: [
    { range: '0° – 5°', description: 'Gentle Valley Floor / Wet Agriculture', areaKm2: 54.2, pct: 21.8, color: '#22c55e' },
    { range: '5° – 15°', description: 'Moderate Undulating Slopes / Terraces', areaKm2: 112.4, pct: 45.2, color: '#eab308' },
    { range: '15° – 25°', description: 'Steep Slopes / CCT & Afforestation Zones', areaKm2: 58.4, pct: 23.5, color: '#f97316' },
    { range: '> 25°', description: 'Escarpment / High Runoff & Soil Loss Risk', areaKm2: 23.6, pct: 9.5, color: '#ef4444' },
  ]
};

export const DRAINAGE_METRICS: DrainageMetrics = {
  totalLengthKm: 412.6,
  streamCount: 1284,
  drainageDensityKmPerKm2: 1.66,
  waterBodiesCount: 24,
  waterBodyAreaKm2: 18.4,
  mainRiver: 'Mula River (Tributary of Bhima / Krishna Basin)',
  outletCoords: [18.485, 73.578],
  streams: [
    { order: 1, count: 842, lengthKm: 218.4 },
    { order: 2, count: 284, lengthKm: 104.2 },
    { order: 3, count: 128, lengthKm: 62.8 },
    { order: 4, count: 30, lengthKm: 27.2 },
  ]
};

export const CHANGE_DETECTION_DATA: ChangeDetectionCategory[] = [
  {
    id: 'ch-veg',
    name: 'Vegetation Coverage',
    color: '#10b981',
    year2023: 99.8,
    year2026: 106.2,
    deltaKm2: 6.4,
    deltaPct: 6.4,
    trend: 'increase',
    note: 'Afforestation, CCT moisture retention and plantation drives yielded +6.4 km² canopy recovery.'
  },
  {
    id: 'ch-water',
    name: 'Water Body Surface',
    color: '#0ea5e9',
    year2023: 20.2,
    year2026: 18.4,
    deltaKm2: -1.8,
    deltaPct: -8.9,
    trend: 'decrease',
    note: 'Reflects drier late monsoon cycle in 2026; partially buffered by 128 micro-interventions.'
  },
  {
    id: 'ch-agri',
    name: 'Agricultural Land',
    color: '#eab308',
    year2023: 74.3,
    year2026: 77.5,
    deltaKm2: 3.2,
    deltaPct: 4.3,
    trend: 'increase',
    note: 'Fallow land converted to double-cropping enabled by check dams and farm ponds.'
  },
  {
    id: 'ch-built',
    name: 'Built-up Area',
    color: '#f43f5e',
    year2023: 21.7,
    year2026: 22.8,
    deltaKm2: 1.1,
    deltaPct: 5.1,
    trend: 'increase',
    note: 'Gradual expansion of road networks, homesteads and ecotourism infrastructure.'
  },
  {
    id: 'ch-bare',
    name: 'Bare & Degraded Land',
    color: '#94a3b8',
    year2023: 32.6,
    year2026: 23.7,
    deltaKm2: -8.9,
    deltaPct: -27.3,
    trend: 'decrease',
    note: 'Desirable reduction: 8.9 km² of degraded scrub transitioned into vegetative & farming cover.'
  }
];

export const WATERSHED_INSIGHTS: WatershedInsight[] = [
  {
    id: 'ins-1',
    title: 'Vegetation Recovery & Canopy Densification',
    category: 'Vegetation',
    highlight: '42.7% Total Coverage (+6.4 km² since 2023)',
    description: 'Continuous contour trenching and protected community plantations on Tamhini slopes have expanded active forest and scrub cover across 106.2 km².',
    urgency: 'positive',
    actionableStep: 'Prioritize gap plantation on remaining 8.4 km² of degraded ridge slopes.',
    layerToActivate: 'Vegetation',
    targetCoords: [18.5380, 73.4680],
  },
  {
    id: 'ins-2',
    title: 'Water Retention & Storage Resilience',
    category: 'Water',
    highlight: '18.4 km² Water Spread across 24 Storage Units',
    description: 'Despite an 8.9% post-monsoon surface water dip compared to high-rainfall 2023, decentralized farm ponds and check dams maintain groundwater within 4.2m bgl.',
    urgency: 'info',
    actionableStep: 'De-silt 4 check dams prior to next pre-monsoon cycle to regain 6,000m³ storage.',
    layerToActivate: 'Water Bodies',
    targetCoords: [18.5140, 73.5420],
  },
  {
    id: 'ins-3',
    title: 'Critical High-Slope Erosion Vulnerability',
    category: 'Terrain',
    highlight: '23.6 km² Area Exceeding 25° Critical Incline',
    description: 'Upper ridge catchments exhibit acute runoff energy exceeding 3.4 m/s in heavy precipitation, risking sediment load into reservoir intake channels.',
    urgency: 'high',
    actionableStep: 'Deploy additional loose boulder plugs and vetiver bio-fencing on Dhangarwadi hill face.',
    layerToActivate: 'Slope',
    targetCoords: [18.5620, 73.4420],
  },
  {
    id: 'ins-4',
    title: 'Drainage Concentration & Confluence Points',
    category: 'Drainage',
    highlight: '1.66 km/km² High Drainage Density',
    description: '1,284 mapped first and second-order streams convey surface runoff rapidly into Mulshi Reservoir. 4 major confluence zones show high erosion potential.',
    urgency: 'medium',
    actionableStep: 'Install stream bank gabion revetments at stream-mula-main kilometer marker 14.',
    layerToActivate: 'Drainage',
    targetCoords: [18.525, 73.485],
  },
  {
    id: 'ins-5',
    title: 'Intervention Performance & Impact Correlation',
    category: 'Interventions',
    highlight: '128 Geo-Coded Interventions Audited',
    description: 'Spatial overlay confirms agricultural fields within 200m of check dams maintained healthy NDVI (0.64) during peak dry spells compared to 0.38 in non-treated zones.',
    urgency: 'positive',
    actionableStep: 'Scale up 14 additional farm ponds in the eastern Kolvan agrarian cluster.',
    layerToActivate: 'Interventions',
    targetCoords: [18.5140, 73.5420],
  },
  {
    id: 'ins-6',
    title: 'Multi-Temporal Land Use Transition',
    category: 'Change',
    highlight: '-8.9 km² Desirable Degraded Land Reduction',
    description: '27.3% decline in bare rocky tracts demonstrates significant watershed stabilization through systematic soil and water conservation.',
    urgency: 'positive',
    actionableStep: 'Incorporate 2026 multi-spectral orthomosaic into district annual development plan.',
    layerToActivate: 'Land Cover',
    targetCoords: [18.5085, 73.4925],
  }
];

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Geo-Coded Field Survey Synced',
    message: 'Field observer Pooja Kadam submitted 3 verified field photographs with GPS EXIF metadata in Kolvan cluster.',
    timestamp: '10 mins ago',
    type: 'success',
    read: false,
    linkPage: 'Geo-Coded Images'
  },
  {
    id: 'notif-2',
    title: 'Sentinel-2 Land Cover Segmentation Ready',
    message: 'AI U-Net model completed 10m semantic classification for Cycle 4 over Mulshi Watershed boundary.',
    timestamp: '1 hour ago',
    type: 'info',
    read: false,
    linkPage: 'Land Cover'
  },
  {
    id: 'notif-3',
    title: 'Erosion Warning: High Slope Zone',
    message: 'Precipitation radar forecasts 85mm rainfall on 24.8° slope at Tamhini ridge; gully check dam monitoring recommended.',
    timestamp: '3 hours ago',
    type: 'warning',
    read: true,
    linkPage: 'Terrain'
  },
  {
    id: 'notif-4',
    title: 'Watershed Comprehensive Report Generated',
    message: 'Automated executive summary and spatial statistics for SIH 2026 review compiled and available for PDF export.',
    timestamp: 'Yesterday',
    type: 'info',
    read: true,
    linkPage: 'Reports'
  }
];

// Pre-packaged SatQuery demo queries and spatial responses
export const SATQUERY_PRESETS: { [key: string]: SatQueryResult } = {
  'water': {
    query: 'Show all water bodies and retention reservoirs',
    timestamp: 'Real-time GIS Spatial Filter',
    understanding: 'Identified request for hydrological features: surface water bodies, farm ponds, and reservoirs within Mulshi Watershed boundary.',
    layersActivated: ['Water Bodies', 'Interventions'],
    targetZoom: 13,
    targetCenter: [18.5140, 73.5020],
    statistics: [
      { label: 'Total Water Surface Area', value: '18.4 km²', change: '-1.8 km² vs 2023' },
      { label: 'Mapped Water Bodies', value: '24 units' },
      { label: 'Farm Ponds Mapped', value: '18 structures' },
      { label: 'Storage Retention Estimate', value: '42.8 MCM' }
    ],
    summary: 'Mulshi Lake represents 88% of open surface storage. Peripheral micro-water bodies like Kolvan farm pond support peripheral agricultural moisture retention.',
    recommendations: [
      'Focus de-silting on southern inlet arms where sediment delta has advanced 45m.',
      'Maintain subsurface dyke levels along tributary confluences.'
    ]
  },
  'interventions': {
    query: 'Show all watershed interventions and structures',
    timestamp: 'Real-time GIS Spatial Filter',
    understanding: 'Parsed query for spatial distribution of physical watershed interventions: check dams, farm ponds, contour trenches, and plantations.',
    layersActivated: ['Interventions', 'Watershed Boundary'],
    targetZoom: 12,
    targetCenter: [18.5085, 73.4925],
    statistics: [
      { label: 'Total Interventions', value: '128 structures' },
      { label: 'Check Dams Completed', value: '42 units' },
      { label: 'Farm Ponds Active', value: '28 units' },
      { label: 'Contour Trenches (CCT)', value: '38.4 km' },
      { label: 'Plantation Belt', value: '14 sites (42.8 ha)' }
    ],
    summary: 'Interventions are clustered strategically along 2nd and 3rd order tributaries to optimize retention before runoff enters the deep lake basin.',
    recommendations: [
      'Schedule quarterly GPS photo audits for the 6 check dams in western Tamhini sector.',
      'Verify siltation depths prior to pre-monsoon rains.'
    ]
  },
  'vegetation': {
    query: 'What is the vegetation coverage and health status?',
    timestamp: 'Real-time GIS Spatial Filter',
    understanding: 'Queried multi-spectral NDVI layer and AI land-cover segmentation for vegetative canopy statistics.',
    layersActivated: ['Vegetation', 'Land Cover'],
    targetZoom: 12,
    targetCenter: [18.5200, 73.4700],
    statistics: [
      { label: 'Vegetation Coverage', value: '42.7%', change: '+6.4 km² (+6.4%)' },
      { label: 'Total Green Canopy', value: '106.2 km²' },
      { label: 'Average NDVI Index', value: '0.68 (Healthy)' },
      { label: 'Riparian Buffer Forest', value: '18.2 km²' }
    ],
    summary: 'Vegetation has demonstrated substantial resilience, recording net positive gain on mid-slope terrains due to CCT moisture traps and assisted regeneration.',
    recommendations: [
      'Target northern degraded scrub areas for 2027 social forestry drives.',
      'Protect natural riparian corridors against resort clearance.'
    ]
  },
  'slope': {
    query: 'Show high-slope erosion prone areas',
    timestamp: 'Real-time GIS Spatial Filter',
    understanding: 'Calculated DEM slope gradient exceeding 25° critical threshold for topsoil shear risk.',
    layersActivated: ['Slope', 'Elevation'],
    targetZoom: 13,
    targetCenter: [18.5620, 73.4420],
    statistics: [
      { label: 'High Slope Area (>25°)', value: '23.6 km²', change: '9.5% of watershed' },
      { label: 'Max Watershed Slope', value: '38.2° (Tamhini Ridge)' },
      { label: 'Average Watershed Slope', value: '14.8°' },
      { label: 'High Soil Loss Risk Zone', value: '14.8 km²' }
    ],
    summary: 'Steep slopes coincide with heavy orographic precipitation along the western escarpment. Mechanical interventions like loose boulder bunds are vital.',
    recommendations: [
      'Prohibit mechanical tilling on slopes steeper than 15°.',
      'Enforce dense vetiver and bamboo planting on gullied escarpments.'
    ]
  },
  'agriculture_drainage': {
    query: 'Show agricultural areas near drainage channels',
    timestamp: 'Real-time GIS Spatial Filter',
    understanding: 'Performed spatial intersection between Agriculture land-cover polygons and 100m stream buffer corridors.',
    layersActivated: ['Agriculture', 'Drainage', 'Interventions'],
    targetZoom: 13,
    targetCenter: [18.5180, 73.5450],
    statistics: [
      { label: 'Agri Area within 100m Stream', value: '38.4 km²' },
      { label: 'Active Check Dams in Buffer', value: '28 units' },
      { label: 'Double Cropping Adoption', value: '64.5%' },
      { label: 'Estimated Runoff Capture', value: '72%' }
    ],
    summary: 'Agriculture along drainage channels benefits from high alluvial moisture and check-dam pondage, enabling 2-crop cycles per year.',
    recommendations: [
      'Deploy subsurface dykes to prevent sand riverbed desiccation in summer.',
      'Construct farm ponds on adjacent gentle slopes to trap stream overflow.'
    ]
  },
  'change': {
    query: 'Compare vegetation and water between 2023 and 2026',
    timestamp: 'Real-time GIS Spatial Filter',
    understanding: 'Calculated bi-temporal delta matrices between baseline 2023 and current 2026 orthomosaics.',
    layersActivated: ['Land Cover', 'Vegetation', 'Water Bodies'],
    targetZoom: 12,
    targetCenter: [18.5085, 73.4925],
    statistics: [
      { label: 'Net Vegetation Shift', value: '+6.4 km²', change: '+6.4% gain' },
      { label: 'Net Water Surface Shift', value: '-1.8 km²', change: '-8.9% variation' },
      { label: 'Bare Land Reclamation', value: '-8.9 km²', change: 'Converted to green' },
      { label: 'Cropland Expansion', value: '+3.2 km²', change: '+4.3%' }
    ],
    summary: 'Overall watershed health index rose from 68/100 (2023) to 79/100 (2026), driven primarily by degraded land conversion and enhanced vegetative density.',
    recommendations: [
      'Maintain long-term hydrological gauges at stream outlet to confirm baseflow increase.'
    ]
  }
};
