import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar, NavPageId } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { DemoTourGuide } from './components/layout/DemoTourGuide';
import { FieldImageDrawer } from './components/modals/FieldImageDrawer';
import { ImageUploadModal } from './components/modals/ImageUploadModal';
import { ReportModal } from './components/modals/ReportModal';

// Pages
import { LandingPage } from './pages/Landing/LandingPage';
import { OverviewPage } from './pages/Overview/OverviewPage';
import { WatershedExplorerPage } from './pages/Explorer/WatershedExplorerPage';
import { GeoImagesPage } from './pages/GeoImages/GeoImagesPage';
import { LandCoverPage } from './pages/LandCover/LandCoverPage';
import { TerrainPage } from './pages/Terrain/TerrainPage';
import { DrainagePage } from './pages/Drainage/DrainagePage';
import { InterventionsPage } from './pages/Interventions/InterventionsPage';
import { ChangeDetectionPage } from './pages/ChangeDetection/ChangeDetectionPage';
import { InsightsPage } from './pages/Insights/InsightsPage';
import { SatQueryPage } from './pages/SatQuery/SatQueryPage';
import { ReportsPage } from './pages/Reports/ReportsPage';
import { DataSourcesPage } from './pages/DataSources/DataSourcesPage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { HelpPage } from './pages/Help/HelpPage';

import { 
  PRIMARY_WATERSHED, 
  GEO_CODED_IMAGES, 
  WATERSHED_INTERVENTIONS, 
  DEMO_NOTIFICATIONS 
} from './data/mockData';
import { GeoImage, Intervention, NotificationItem } from './types';
import { 
  LayoutDashboard, 
  Map, 
  Layers, 
  SearchCode, 
  MoreHorizontal 
} from 'lucide-react';

export function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [currentPage, setCurrentPage] = useState<NavPageId>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentWatershed, setCurrentWatershed] = useState<string>('Mulshi Watershed (Pune, MH)');

  // Modal / Drawer States
  const [selectedGeoImage, setSelectedGeoImage] = useState<GeoImage | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setSelectedGeoImage(null);
        setIsUploadModalOpen(false);
        setIsReportModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleImageUploaded = (newImg: Partial<GeoImage>) => {
    const fullImg: GeoImage = {
      id: `geo-img-${Date.now()}`,
      title: newImg.title || 'Field Observation Survey',
      category: newImg.category || 'Check Dam Structure',
      imageUrl: newImg.imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
      satelliteContextUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=900&q=80',
      lat: newImg.lat || 18.525,
      lng: newImg.lng || 73.495,
      date: newImg.date || '2026-09-30 11:30 IST',
      observer: newImg.observer || 'Current User (Field Tech)',
      landCoverClass: newImg.landCoverClass || 'Vegetation / Scrub Transition',
      vegetationPct: newImg.vegetationPct || 55,
      elevationM: newImg.elevationM || 680,
      slopeDeg: newImg.slopeDeg || 14,
      nearestDrainageM: newImg.nearestDrainageM || 20,
      nearestWaterBodyM: newImg.nearestWaterBodyM || 850,
      description: newImg.description || 'Uploaded field photo with extracted GPS metadata.',
      status: 'Verified',
      accuracyM: 1.5,
      compassHeading: 135,
    };
    setSelectedGeoImage(fullImg);
    setCurrentPage('geoimages');
  };

  const handleNavigateToMapWithLayer = (layerName: string, coords?: [number, number]) => {
    setCurrentPage('overview');
  };

  // Render Page Content
  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <OverviewPage
            onNavigate={(p) => setCurrentPage(p)}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onOpenReport={() => setIsReportModalOpen(true)}
            onSelectGeoImage={(img) => setSelectedGeoImage(img)}
            onSelectIntervention={(item) => setCurrentPage('interventions')}
          />
        );
      case 'explorer':
        return (
          <WatershedExplorerPage
            onSelectGeoImage={(img) => setSelectedGeoImage(img)}
            onSelectIntervention={(item) => setCurrentPage('interventions')}
          />
        );
      case 'geoimages':
        return (
          <GeoImagesPage
            onSelectGeoImage={(img) => setSelectedGeoImage(img)}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        );
      case 'landcover':
        return <LandCoverPage />;
      case 'terrain':
        return <TerrainPage />;
      case 'drainage':
        return <DrainagePage />;
      case 'interventions':
        return (
          <InterventionsPage
            onSelectGeoImage={(img) => setSelectedGeoImage(img)}
          />
        );
      case 'changedetection':
        return <ChangeDetectionPage />;
      case 'insights':
        return (
          <InsightsPage
            onNavigateToMapWithLayer={handleNavigateToMapWithLayer}
          />
        );
      case 'satquery':
        return <SatQueryPage />;
      case 'reports':
        return (
          <ReportsPage
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        );
      case 'datasources':
        return <DataSourcesPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      default:
        return (
          <OverviewPage
            onNavigate={(p) => setCurrentPage(p)}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onOpenReport={() => setIsReportModalOpen(true)}
            onSelectGeoImage={(img) => setSelectedGeoImage(img)}
            onSelectIntervention={(item) => setCurrentPage('interventions')}
          />
        );
    }
  };

  // If in landing page presentation mode
  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onExplore={() => setViewMode('dashboard')}
          onStartDemoTour={() => {
            setViewMode('dashboard');
            setIsDemoTourOpen(true);
          }}
        />
        <DemoTourGuide
          isOpen={isDemoTourOpen}
          onClose={() => setIsDemoTourOpen(false)}
          onNavigate={(p) => setCurrentPage(p)}
        />
      </>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080c14] text-slate-100 font-sans">
      {/* Sidebar (Desktop / Tablet) */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(p) => setCurrentPage(p)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenLanding={() => setViewMode('landing')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navbar */}
        <Navbar
          currentWatershed={currentWatershed}
          onSelectWatershed={(name) => setCurrentWatershed(name)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadNotificationsCount={unreadCount}
          onStartDemoTour={() => setIsDemoTourOpen(true)}
          onOpenLanding={() => setViewMode('landing')}
        />

        {/* Dynamic Page Views with Framer Motion Transition (Rule #70) */}
        <main className="flex-1 overflow-y-auto flex flex-col pb-16 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex-1 flex flex-col"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile Bottom Navigation (Rule #61) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass-dropdown border-t border-white/10 px-2 flex items-center justify-around z-40 bg-[#090d18]/95 backdrop-blur-xl">
          {[
            { id: 'overview' as NavPageId, label: 'Overview', icon: LayoutDashboard },
            { id: 'explorer' as NavPageId, label: 'Map', icon: Map },
            { id: 'landcover' as NavPageId, label: 'Analysis', icon: Layers },
            { id: 'satquery' as NavPageId, label: 'Query', icon: SearchCode },
            { id: 'reports' as NavPageId, label: 'Report', icon: MoreHorizontal }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = currentPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentPage(tab.id)}
                className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(p) => setCurrentPage(p)}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllRead}
        onNavigate={(p) => setCurrentPage(p)}
      />

      <FieldImageDrawer
        image={selectedGeoImage}
        onClose={() => setSelectedGeoImage(null)}
        onViewOnMap={(img) => {
          setSelectedGeoImage(null);
          setCurrentPage('overview');
        }}
      />

      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onImageUploaded={handleImageUploaded}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <DemoTourGuide
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onNavigate={(p) => setCurrentPage(p)}
      />
    </div>
  );
}
export default App;
