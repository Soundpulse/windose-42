import React, { useEffect, useRef } from "react";

const AchievementsApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
          opacity: Math.random(),
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      particles.forEach((p) => {
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

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
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
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">STARTUP GRANT</span>
            </div>
            <h3 className="text-lg font-light mb-2">Cartesia Startup Grant</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              Accepted into the Cartesia startup program.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2025.10.20</div>
          </div>

          <div className="group relative border border-gray-800 p-6 hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-gray-300">◆ 0x02</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">STARTUP PROGRAM</span>
            </div>
            <h3 className="text-lg font-light mb-2">Deepgram Startup Program</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              Accepted into the Deepgram startup program.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2025.10.20</div>
          </div>

          <div className="group relative border border-gray-800 p-6 hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-gray-300">◆ 0x03</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">STARTUP GRANT</span>
            </div>
            <h3 className="text-lg font-light mb-2">Eleven Labs Grant</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              Accepted into the Eleven Labs startup program.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2025.10.28</div>
          </div>

          <div className="group relative border border-gray-800 p-6 hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-gray-300">◆ 0x04</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">MEDIA FEATURE</span>
            </div>
            <h3 className="text-lg font-light mb-2">MYEIC Magazine Feature</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              Featured in 《創孵世代》Issue 41 | Macau Youth Entrepreneurship Incubation Center.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2023.06.21</div>
          </div>

          <div className="group relative border border-gray-800 p-6 hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-gray-300">◆ 0x05</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">STARTUP AWARD</span>
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
              <span className="text-[10px] text-gray-300">◆ 0x06</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">STUDENT REP</span>
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
              <span className="text-[10px] text-gray-300">◆ 0x07</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">ROBOTICS</span>
            </div>
            <h3 className="text-lg font-light mb-2">Robotics Innovation</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              Network Robotics Macau Division Gold Award | National League Third Prize.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2018.11.20</div>
          </div>

          <div className="group relative border border-gray-800 p-6 hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-gray-300">◆ 0x08</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">GREGGED</span>
            </div>
            <h3 className="text-lg font-light mb-2">GregTech: New Horizons Stargate Completion (MP)</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              Achieved an "almost impossible" mission by focusing on industrial engineering, quantum mechanics, computer
              science, civil engineering, physics, chemistry, biochemical engineering, astronomy, and a bit of dark
              magic.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2025.07.01</div>
          </div>

          <div className="group relative border border-gray-800 p-6 hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-gray-300">◆ 0x09</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-600 text-white">CLICKING CIRCLES</span>
            </div>
            <h3 className="text-lg font-light mb-2">Osu! #1 Macau</h3>
            <p className="text-xs text-white leading-relaxed uppercase tracking-tight">
              Achieved #1 ranking in Macau for Osu! rhythm game with mouse only.
            </p>
            <div className="mt-4 text-[9px] text-gray-600">TIMESTAMP: 2017 - 2021</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsApp;
