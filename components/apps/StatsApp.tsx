import React, { useState, useEffect, useRef } from 'react';

const StatsApp: React.FC = () => {
  const [cpu, setCpu] = useState(15);
  const [ram, setRam] = useState(45);
  const [disk, setDisk] = useState(12);
  const [stress, setStress] = useState(30);
  const [seconds, setSeconds] = useState(0);

  const cpuHistory = useRef<number[]>(Array(20).fill(15));
  const ramHistory = useRef<number[]>(Array(20).fill(45));

  useEffect(() => {
    const updateStats = () => {
      setSeconds(Math.floor(performance.now() / 1000));
      
      setCpu(prev => {
        const next = Math.max(5, Math.min(95, prev + (Math.random() - 0.5) * 15));
        cpuHistory.current = [...cpuHistory.current.slice(1), next];
        return next;
      });
      
      setRam(prev => {
        const next = Math.max(20, Math.min(90, prev + (Math.random() - 0.5) * 6));
        ramHistory.current = [...ramHistory.current.slice(1), next];
        return next;
      });
      
      setDisk(prev => Math.max(2, Math.min(60, prev + (Math.random() - 0.5) * 8)));
      setStress(prev => Math.max(10, Math.min(95, prev + (Math.random() - 0.5) * 10)));
    };
    
    updateStats();
    const mainTimer = setInterval(updateStats, 1000);
    return () => clearInterval(mainTimer);
  }, []);

  const formatTime = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const MiniGraph = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <div className="flex items-end gap-[1px] h-6">
        {data.map((val, i) => (
          <div 
            key={i}
            className="w-[3px] bg-white opacity-60"
            style={{ height: `${((val - min) / range) * 100}%`, minHeight: '2px' }}
          />
        ))}
      </div>
    );
  };

  const Meter = ({ label, value, critical }: { label: string; value: number; critical?: boolean }) => (
    <div className="mb-4">
      <div className="flex justify-between text-[10px] font-mono mb-1.5">
        <span className="text-gray-500 tracking-wider uppercase">{label}</span>
        <span className={critical && value > 80 ? 'text-red-400' : 'text-white'}>
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-1 bg-gray-900 border border-gray-800 overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${critical && value > 80 ? 'bg-red-500' : 'bg-white'}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="p-5 h-full bg-[#0a0a0a] text-white font-mono select-none flex flex-col">
      {/* Session Time */}
      <div className="text-center mb-6 pb-4 border-b border-gray-800">
        <div className="text-[9px] text-gray-600 tracking-[0.2em] mb-2">SESSION</div>
        <div className="text-3xl font-light tracking-wider text-white">
          {formatTime(seconds)}
        </div>
      </div>

      {/* Stress Meter - Featured */}
      <div className="mb-6 p-4 border border-gray-800 bg-black">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-gray-500 tracking-widest">SYSTEM STRESS</span>
          <span className={`text-xs ${stress > 70 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {stress > 70 ? '⚠' : '◆'} {Math.round(stress)}%
          </span>
        </div>
        <div className="h-2 bg-gray-900 border border-gray-800 overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${stress > 70 ? 'bg-red-500' : stress > 50 ? 'bg-gray-400' : 'bg-white'}`}
            style={{ width: `${stress}%` }}
          />
        </div>
      </div>

      {/* System Meters */}
      <div className="flex-1">
        <Meter label="CPU" value={cpu} />
        <Meter label="Memory" value={ram} />
        <Meter label="Disk I/O" value={disk} />
      </div>

      {/* Mini Graphs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 border border-gray-800 bg-black">
          <div className="text-[8px] text-gray-600 mb-2 tracking-wider">CPU HISTORY</div>
          <MiniGraph data={cpuHistory.current} />
        </div>
        <div className="p-3 border border-gray-800 bg-black">
          <div className="text-[8px] text-gray-600 mb-2 tracking-wider">MEM HISTORY</div>
          <MiniGraph data={ramHistory.current} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-3 border-t border-gray-900">
        <div className="text-[8px] text-gray-700 tracking-widest">
          WINDOSE_42 / SYS_MONITOR
        </div>
      </div>
    </div>
  );
};

export default StatsApp;
