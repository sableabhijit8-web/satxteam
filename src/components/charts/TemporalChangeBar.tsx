import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { CHANGE_DETECTION_DATA } from '../../data/mockData';

interface TemporalChangeBarProps {
  className?: string;
}

export const TemporalChangeBar: React.FC<TemporalChangeBarProps> = ({ className = '' }) => {
  const data = CHANGE_DETECTION_DATA.map(item => ({
    name: item.name.replace(' Coverage', '').replace(' Land', '').replace(' Surface', ''),
    '2023 Baseline': item.year2023,
    '2026 Current': item.year2026,
    delta: item.deltaKm2,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-dropdown p-3 rounded-xl border border-white/10 shadow-2xl text-xs space-y-1">
          <div className="font-bold text-slate-100">{label} Area Comparison</div>
          <div className="text-slate-400 flex items-center justify-between gap-4">
            <span>2023 Baseline:</span>
            <span className="font-mono text-slate-200">{payload[0].value} km²</span>
          </div>
          <div className="text-emerald-400 flex items-center justify-between gap-4 font-semibold">
            <span>2026 Current:</span>
            <span className="font-mono">{payload[1].value} km²</span>
          </div>
          <div className="pt-1 border-t border-white/10 text-[10px] text-slate-300">
            Net Change: <span className={payload[1].payload.delta >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {payload[1].payload.delta >= 0 ? `+${payload[1].payload.delta}` : payload[1].payload.delta} km²
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full h-72 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -15, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
            axisLine={{ stroke: '#334155' }}
            unit=" km²"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '8px', fontSize: '12px' }}
            formatter={(val) => <span className="text-slate-300 text-xs mr-2">{val}</span>}
          />
          <Bar dataKey="2023 Baseline" fill="#64748b" radius={[4, 4, 0, 0]} animationDuration={1000} />
          <Bar dataKey="2026 Current" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={1200} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
