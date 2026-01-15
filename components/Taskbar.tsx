
import React, { useState, useEffect } from 'react';
import { Wifi } from 'lucide-react';
import { WindowState } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  isStartOpen: boolean;
  onToggleStart: () => void;
  onAppClick: (id: any) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, isStartOpen, onToggleStart, onAppClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-gray-800 flex items-center px-0 z-[1000] select-none">
      {/* Start Button */}
      <button 
        onClick={onToggleStart}
        className={`h-full px-5 flex items-center gap-2 border-r border-gray-800 transition-all duration-150 font-mono ${
          isStartOpen 
            ? 'bg-white text-black' 
            : 'bg-transparent hover:bg-gray-900 text-gray-400 hover:text-white'
        }`}
      >
        <span className="text-[10px] tracking-[0.15em] uppercase font-medium">
          {isStartOpen ? '✕' : 'Start'}
        </span>
      </button>

      {/* Open Windows */}
      <div className="h-full flex items-center gap-0 mx-0 overflow-x-auto flex-1 scrollbar-hide">
        {windows.filter(w => w.isOpen).map(win => (
          <button
            key={win.id}
            onClick={() => onAppClick(win.id)}
            className={`h-full px-4 flex items-center gap-2 border-r border-gray-900 text-[10px] font-mono min-w-[40px] max-w-[160px] truncate transition-colors ${
              !win.isMinimized 
                ? 'bg-[#111] text-white border-b-2 border-b-white' 
                : 'bg-transparent text-gray-600 hover:text-gray-400'
            }`}
          >
            <span className="text-gray-500 w-4 h-4 flex-shrink-0 flex items-center justify-center">{win.icon}</span>
            <span className="hidden md:inline truncate tracking-wider uppercase">{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4 px-4 font-mono text-[10px] border-l border-gray-800 bg-black/50 h-full">
        <div className="flex items-center gap-3">
          {/* Status indicator (PC only) */}
          <div className="hidden md:flex items-center gap-1.5">
            <Wifi size={12} className="text-gray-600" />
            <span className="text-gray-600 hidden lg:inline tracking-wider">ONLINE</span>
          </div>
          
          {/* Time */}
          <span className="text-white tracking-wider font-medium">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {/* Date */}
        <div className="hidden lg:block text-gray-700 tracking-wider">
          {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
