import { 
  PRIMARY_WATERSHED,
  ALTERNATE_WATERSHEDS,
  GEO_CODED_IMAGES,
  WATERSHED_INTERVENTIONS,
  LAND_COVER_CLASSES,
  TERRAIN_METRICS,
  DRAINAGE_METRICS,
  CHANGE_DETECTION_DATA,
  WATERSHED_INSIGHTS,
  SATQUERY_PRESETS,
  DEMO_NOTIFICATIONS
} from '../data/mockData';
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

export class WatershedService {
  // 1. Watershed Metadata
  static async getWatershedData(id?: string): Promise<Watershed> {
    await this.delay(120);
    return { ...PRIMARY_WATERSHED };
  }

  static async getAvailableWatersheds() {
    await this.delay(80);
    return ALTERNATE_WATERSHEDS;
  }

  // 2. Geo-Coded Field Images
  static async getGeoTaggedImages(): Promise<GeoImage[]> {
    await this.delay(150);
    return [...GEO_CODED_IMAGES];
  }

  static async getGeoImageById(id: string): Promise<GeoImage | undefined> {
    await this.delay(80);
    return GEO_CODED_IMAGES.find(img => img.id === id);
  }

  static async uploadGeoTaggedImage(newImage: Partial<GeoImage>): Promise<GeoImage> {
    await this.delay(600);
    const created: GeoImage = {
      id: `geo-img-${Date.now()}`,
      title: newImage.title || 'New Field Observation Survey',
      category: newImage.category || 'Vegetation Canopy',
      imageUrl: newImage.imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
      satelliteContextUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=900&q=80',
      lat: newImage.lat || 18.525,
      lng: newImage.lng || 73.495,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST',
      observer: newImage.observer || 'Current User (Field Survey Tech)',
      landCoverClass: newImage.landCoverClass || 'Vegetation / Scrub Transition',
      vegetationPct: newImage.vegetationPct || 54.0,
      elevationM: newImage.elevationM || 680,
      slopeDeg: newImage.slopeDeg || 12.5,
      nearestDrainageM: newImage.nearestDrainageM || 25,
      nearestWaterBodyM: newImage.nearestWaterBodyM || 850,
      description: newImage.description || 'Uploaded geo-coded field photography with GPS coordinates extracted.',
      status: 'Verified',
      accuracyM: 1.5,
      compassHeading: 120,
    };
    return created;
  }

  // 3. Satellite Data
  static async getSatelliteData() {
    await this.delay(100);
    return {
      sensor: 'Sentinel-2 MSI & Landsat 9 OLI',
      resolution: '10m Multi-spectral',
      bands: ['B2 (Blue)', 'B3 (Green)', 'B4 (Red)', 'B8 (NIR)', 'B11 (SWIR)'],
      acquisitionDate: '2026-09-18',
      cloudCoverage: '< 1.2%',
      sunAzimuth: 142.6,
      sunElevation: 61.2,
      orthorectified: true,
      datum: 'WGS 84 / UTM Zone 43N',
    };
  }

  // 4. AI Land Cover
  static async getLandCoverData(): Promise<{ classes: LandCoverClass[]; model: any }> {
    await this.delay(150);
    return {
      classes: [...LAND_COVER_CLASSES],
      model: {
        architecture: 'DeepLabV3+ with ResNet-101 & U-Net Ensemble',
        trainingDataset: 'ISRO Bhuvan & Sentinel-2 Benchmark (Western Ghats Watersheds)',
        validationAccuracy: '91.8% mIoU',
        inferenceResolution: '10m / pixel',
        status: '🟢 Demo Model Ready',
        classesCount: 6,
        lastTrained: 'June 2026',
      }
    };
  }

  // 5. Terrain & DEM
  static async getTerrainData(): Promise<TerrainMetrics> {
    await this.delay(120);
    return { ...TERRAIN_METRICS };
  }

  // 6. Drainage & Hydrology
  static async getDrainageData(): Promise<DrainageMetrics> {
    await this.delay(120);
    return { ...DRAINAGE_METRICS };
  }

  // 7. Interventions
  static async getInterventions(): Promise<Intervention[]> {
    await this.delay(150);
    return [...WATERSHED_INTERVENTIONS];
  }

  // 8. Multi-Temporal Change Detection
  static async getChangeDetection(): Promise<ChangeDetectionCategory[]> {
    await this.delay(180);
    return [...CHANGE_DETECTION_DATA];
  }

  // 9. Watershed Insights
  static async getInsights(): Promise<WatershedInsight[]> {
    await this.delay(100);
    return [...WATERSHED_INSIGHTS];
  }

  // 10. SatQuery Spatial Assistant
  static async runSatQuery(userQuery: string): Promise<SatQueryResult> {
    await this.delay(450);
    const q = userQuery.toLowerCase();
    
    if (q.includes('water') || q.includes('pond') || q.includes('lake') || q.includes('reservoir')) {
      return SATQUERY_PRESETS['water'];
    }
    if (q.includes('intervention') || q.includes('check dam') || q.includes('trench') || q.includes('structure')) {
      return SATQUERY_PRESETS['interventions'];
    }
    if (q.includes('veg') || q.includes('forest') || q.includes('green') || q.includes('canopy')) {
      return SATQUERY_PRESETS['vegetation'];
    }
    if (q.includes('slope') || q.includes('elevation') || q.includes('steep') || q.includes('contour')) {
      return SATQUERY_PRESETS['slope'];
    }
    if (q.includes('agri') || q.includes('farm') || q.includes('crop') || q.includes('channel')) {
      return SATQUERY_PRESETS['agriculture_drainage'];
    }
    if (q.includes('change') || q.includes('compare') || q.includes('temporal') || q.includes('2023')) {
      return SATQUERY_PRESETS['change'];
    }

    // Default intelligent fallback
    return {
      query: userQuery,
      timestamp: 'Real-time GIS Spatial Filter',
      understanding: `Processed spatial query: "${userQuery}". Correlating GIS multi-spectral raster and vector layers across Mulshi Watershed.`,
      layersActivated: ['Watershed Boundary', 'Land Cover', 'Drainage'],
      targetZoom: 12,
      targetCenter: [18.5085, 73.4925],
      statistics: [
        { label: 'Total Watershed Area', value: '248.6 km²' },
        { label: 'Active Interventions', value: '128 units' },
        { label: 'Vegetation Fraction', value: '42.7%' },
        { label: 'Drainage Density', value: '1.66 km/km²' }
      ],
      summary: `Spatial query resolved across 5 multi-spectral raster bands and 4 vector asset tiers in Mulshi Catchment. Relevant boundaries and hydro corridors are highlighted on the active map.`,
      recommendations: [
        'Explore the dedicated Land Cover or Drainage pages for class-by-class cross tabs.',
        'Download the comprehensive PDF watershed analysis report.'
      ]
    };
  }

  // 11. Notifications
  static async getNotifications(): Promise<NotificationItem[]> {
    await this.delay(80);
    return [...DEMO_NOTIFICATIONS];
  }

  // 12. Report Generation
  static async generateReport(params?: any) {
    await this.delay(700);
    return {
      reportId: `REP-MULSHI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      generatedAt: new Date().toISOString(),
      watershedName: PRIMARY_WATERSHED.name,
      district: PRIMARY_WATERSHED.district,
      state: PRIMARY_WATERSHED.state,
      fileSize: '4.2 MB',
      sectionsIncluded: 10,
      downloadUrl: '#demo-download',
    };
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
