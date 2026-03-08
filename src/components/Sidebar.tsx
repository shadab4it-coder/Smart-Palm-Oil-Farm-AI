import React from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  Droplets, 
  TrendingUp, 
  Plane,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'disease', label: 'Disease Detection', icon: Sprout },
  { id: 'fertilizer', label: 'Fertilizer Optimizer', icon: Droplets },
  { id: 'harvest', label: 'Harvest Prediction', icon: TrendingUp },
  { id: 'drone', label: 'Drone Monitoring', icon: Plane },
];

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-emerald-950 text-emerald-50 transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">PalmAI</span>
          </div>
          <button 
            className="lg:hidden text-emerald-200 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-emerald-800 text-white shadow-md" 
                    : "text-emerald-200 hover:bg-emerald-900/50 hover:text-white"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-emerald-400" : "text-emerald-400/70")} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-emerald-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-700">
              <span className="font-bold text-sm">AH</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Ahmad Hassan</p>
              <p className="text-xs text-emerald-400">Farm Manager</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
