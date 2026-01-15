
import React, { useEffect, useRef } from 'react';

const AchievementsApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random()
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
        
        const twinkle = Math.sin(Date.now() * 0.005 + p.x) * 0.5 + 0.5;
        ctx.globalAlpha = p.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative h-full bg-black text-white p-8 overflow-auto retro-scroll font-mono">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />
      
      <div className="relative z-10 max-w-xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[10px] tracking-[0.5em] text-gray-600 mb-2">SYSTEM_ACHIEVEMENTS</div>
          <h1 className="text-3xl font-light tracking-tighter">UNLOCKED_MILESTONES</h1>
        </div>

        <div className="space-y-8">
          <div className="group relative border border-gray-800 p-6 hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-gray-300">◆ 0x01</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">GOLD_AWARD</span>
            </div>
            <h3 className="text-lg font-light mb-2">Techstars Startup Weekend</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              1st Place Winner | Macau Division.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2022.04.12</div>
          </div>

          <div className="group relative border border-gray-800 p-6 hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-gray-300">◆ 0x02</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">HONOUR_RANK</span>
            </div>
            <h3 className="text-lg font-light mb-2">NCL+ Advanced Award</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              Recognized for exceptional leadership and strategic project management at Newcastle University.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2020.07.15</div>
          </div>

          <div className="group relative border border-gray-800 p-6 hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-gray-300">◆ 0x03</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">ELITE_TIER</span>
            </div>
            <h3 className="text-lg font-light mb-2">Robotics Innovation</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              Network Robotics Macau Division Gold Award | National League Third Prize.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2018.11.20</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsApp;
