import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { LAND_COVER_CLASSES } from '../../data/mockData';

interface LandCoverDonutProps {
  onSelectClass?: (classId: string) => void;
  selectedClassId?: string;
  className?: string;
}

export const LandCoverDonut: React.FC<LandCoverDonutProps> = ({
  onSelectClass,
  selectedClassId,
  className = '',
}) => {
  const data = LAND_COVER_CLASSES.map(c => ({
    id: c.id,
    name: c.name,
    value: c.percentage,
    areaKm2: c.areaKm2,
    color: c.color,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="glass-dropdown p-2.5 rounded-xl border border-white/10 shadow-2xl text-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
            <span className="font-bold text-slate-100">{d.name}</span>
          </div>
          <div className="text-slate-300 font-mono">
            {d.value}% <span className="text-slate-400">({d.areaKm2} km²)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={4}
            dataKey="value"
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((entry) => (
              <Cell 
                key={`cell-${entry.id}`} 
                fill={entry.color} 
                stroke="#0d131f"
                strokeWidth={2}
                opacity={selectedClassId && selectedClassId !== entry.id ? 0.4 : 1}
                className="cursor-pointer transition-opacity"
                onClick={() => onSelectClass && onSelectClass(entry.id)}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
