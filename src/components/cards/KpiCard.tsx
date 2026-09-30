import React, { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  icon: LucideIcon;
  iconColor?: string;
  borderColor?: string;
  onClick?: () => void;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  suffix = '',
  prefix = '',
  decimals = 1,
  change,
  isPositive,
  subtext,
  icon: Icon,
  iconColor = 'text-emerald-400',
  borderColor = 'border-white/10',
  onClick,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1200; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Number((value * easeOut).toFixed(decimals)));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, decimals]);

  return (
    <div
      onClick={onClick}
      className={`glass-panel p-4 rounded-2xl border ${borderColor} hover:border-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg group relative overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">{title}</span>
        <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">
          {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
        {change && (
          <span
            className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ml-1.5 ${
              isPositive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}
          >
            {change}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>{subtext || 'Orthorectified Sentinel-2'}</span>
        <span className="text-[10px] text-slate-400 uppercase font-mono px-1.5 py-0.5 rounded bg-white/5">
          DEMO DATA
        </span>
      </div>
    </div>
  );
};
