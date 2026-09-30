import React from 'react';
import { X, Check, Bell, Info, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { NotificationItem } from '../../types';
import { NavPageId } from './Sidebar';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNavigate: (page: NavPageId) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md glass-dropdown border-l border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-white">Geospatial Notifications</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.map(item => {
          let Icon = Info;
          let iconColor = 'text-sky-400 bg-sky-500/10 border-sky-500/20';

          if (item.type === 'warning' || item.type === 'alert') {
            Icon = AlertTriangle;
            iconColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
          } else if (item.type === 'success') {
            Icon = CheckCircle;
            iconColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
          }

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl glass-panel border transition-all ${
                item.read ? 'border-white/5 opacity-75' : 'border-emerald-500/30 bg-emerald-500/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg border ${iconColor} shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white truncate">{item.title}</h3>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{item.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{item.message}</p>
                  {item.linkPage && (
                    <button
                      onClick={() => {
                        const target = item.linkPage?.toLowerCase().replace(/\s+/g, '') as NavPageId;
                        onNavigate(target || 'overview');
                        onClose();
                      }}
                      className="mt-2 text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                    >
                      <span>Open {item.linkPage}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
