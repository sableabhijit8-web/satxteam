import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ElevationProfileChartProps {
  className?: string;
}

export const ElevationProfileChart: React.FC<ElevationProfileChartProps> = ({ className = '' }) => {
  // Transect points from West ridge to East outlet
  const transectData = [
    { distanceKm: 0, elevation: 1245, point: 'Tamhini Crest Peak' },
    { distanceKm: 2.5, elevation: 980, point: 'Upper Escarpment' },
    { distanceKm: 5.0, elevation: 840, point: 'CCT Plantation Zone' },
    { distanceKm: 8.0, elevation: 742, point: 'Gabion Check Dam' },
    { distanceKm: 11.5, elevation: 684, point: 'Watershed Mean MSL' },
    { distanceKm: 14.0, elevation: 625, point: 'Mulshi Lake Shore' },
    { distanceKm: 17.5, elevation: 595, point: 'Alluvial Valley Paddy' },
    { distanceKm: 21.0, elevation: 510, point: 'Paud Gorge' },
    { distanceKm: 24.8, elevation: 320, point: 'Mula Downstream Outlet' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="glass-dropdown p-2.5 rounded-xl border border-white/10 shadow-2xl text-xs space-y-1">
          <div className="font-bold text-amber-400">{d.point}</div>
          <div className="text-slate-300 font-mono">
            Elevation: <span className="text-white font-bold">{d.elevation} m</span> MSL
          </div>
          <div className="text-slate-400 text-[10px]">
            Transect: {d.distanceKm} km along flow path
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={transectData}
          margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="elevationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis 
            dataKey="distanceKm" 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            unit=" km"
          />
          <YAxis 
            domain={[200, 1300]}
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            unit=" m"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="elevation" 
            stroke="#f59e0b" 
            strokeWidth={2.5}
            fillOpacity={1} 
            fill="url(#elevationGradient)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
