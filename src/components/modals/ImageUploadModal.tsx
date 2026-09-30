import React, { useState } from 'react';
import { 
  UploadCloud, 
  X, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Sparkles, 
  FileCheck, 
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { GeoImage } from '../../types';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUploaded: (newImage: Partial<GeoImage>) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onImageUploaded,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<{
    imageUrl: string;
    lat: number;
    lng: number;
    date: string;
    locationName: string;
    category: string;
    accuracy: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleSimulatedUpload = (file?: File) => {
    setIsProcessing(true);
    // Simulate EXIF GPS extraction & orthoreferencing
    setTimeout(() => {
      setUploadedPreview({
        imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
        lat: 18.5285,
        lng: 73.4890,
        date: '2026-09-30 11:15 IST',
        locationName: 'Mulshi North Catchment Sector 3B',
        category: 'Check Dam Structure',
        accuracy: 1.4,
      });
      setIsProcessing(false);
    }, 1200);
  };

  const handleConfirmAdd = () => {
    if (!uploadedPreview) return;
    onImageUploaded({
      title: 'Field Survey: Loose Boulder Bund Verification',
      category: 'Check Dam Structure',
      imageUrl: uploadedPreview.imageUrl,
      lat: uploadedPreview.lat,
      lng: uploadedPreview.lng,
      date: uploadedPreview.date,
      observer: 'Field Surveyor (GPS Verified)',
      landCoverClass: 'Vegetation / Scrub Transition',
      vegetationPct: 56.4,
      elevationM: 695,
      slopeDeg: 16.2,
      nearestDrainageM: 18,
      nearestWaterBodyM: 920,
      description: 'Newly uploaded field photograph with automated EXIF geotag alignment to WGS84 coordinate grid.',
      status: 'Verified',
      accuracyM: uploadedPreview.accuracy,
      compassHeading: 165,
    });
    setUploadedPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl glass-dropdown border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Upload Geo-Coded Images</h3>
              <p className="text-[11px] text-slate-400">Extract EXIF GPS metadata & align with satellite terrain</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="p-6 space-y-5">
          {!uploadedPreview && !isProcessing ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleSimulatedUpload();
              }}
              onClick={() => handleSimulatedUpload()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]' 
                  : 'border-white/15 hover:border-emerald-500/50 hover:bg-white/5'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/20">
                <UploadCloud className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="text-sm font-semibold text-white">
                Drop geo-tagged field photos here, or <span className="text-emerald-400 underline">browse files</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Supports JPG, PNG with embedded EXIF GPS tags (ISO/IEC 19794-5)
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono">
                <span>Auto Geo-Referencing to Mulshi WGS84</span>
              </div>
            </div>
          ) : isProcessing ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto"></div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white">Reading EXIF GPS Coordinates...</div>
                <div className="text-xs text-slate-400 font-mono">Matching with 10m Sentinel-2 Orthomosaic</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> EXIF Metadata Successfully Extracted
              </div>

              <div className="flex gap-4 p-3 rounded-xl bg-slate-900/80 border border-white/10">
                <img 
                  src={uploadedPreview.imageUrl} 
                  alt="Uploaded field view" 
                  className="w-24 h-24 rounded-lg object-cover border border-white/10"
                />
                <div className="space-y-1.5 flex-1 text-xs">
                  <div className="font-bold text-white">{uploadedPreview.locationName}</div>
                  <div className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span className="font-mono text-emerald-300">{uploadedPreview.lat}° N, {uploadedPreview.lng}° E</span>
                    <span className="text-[10px] text-slate-400">(±{uploadedPreview.accuracy}m)</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sky-400" />
                    <span>{uploadedPreview.date}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                      {uploadedPreview.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-xs text-emerald-200">
                <span className="font-semibold text-emerald-300">Spatial Context Ready:</span> Location verified inside Mulshi Watershed Boundary. Ready to pin to live GIS map layer.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-slate-900/60 flex items-center justify-between">
          <button
            onClick={() => {
              setUploadedPreview(null);
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10"
          >
            Cancel
          </button>
          {uploadedPreview && (
            <button
              onClick={handleConfirmAdd}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <FileCheck className="w-4 h-4" />
              <span>Pin to Watershed Map</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
