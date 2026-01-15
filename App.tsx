import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  User,
  Folder,
  Terminal,
  Activity,
  MessageCircle,
  Map,
  Github,
  Linkedin,
  Power,
  Trophy,
  Layers,
} from "lucide-react";
import { INITIAL_WINDOWS, LOCATIONS } from "./constants";
import { AppID, WindowState } from "./types";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import DesktopIcon from "./components/DesktopIcon";
import AboutApp from "./components/apps/AboutApp";
import ProjectsApp from "./components/apps/ProjectsApp";
import TerminalApp from "./components/apps/TerminalApp";
import StatsApp from "./components/apps/StatsApp";
import ChatApp from "./components/apps/ChatApp";
import GoOutApp from "./components/apps/GoOutApp";
import AchievementsApp from "./components/apps/AchievementsApp";
import StackApp from "./components/apps/StackApp";
import StreamApp from "./components/apps/StreamApp";
import ExternalLinkModal from "./components/ExternalLinkModal";

const RICKROLL_URL = "https://www.youtube.com/watch?v=siM9g9dpkZg&list=RDsiM9g9dpkZg&start_radio=1";

// Perspective Highway Rhythm Game Background
const RhythmBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    // Notes falling down the highway
    interface Note {
      lane: number;
      z: number; // depth (0 = at horizon, 1 = at judgment line)
      speed: number;
      width: number;
      hit: boolean;
      hitTime: number;
    }

    let notes: Note[] = [];
    let hitEffects: { lane: number; time: number; intensity: number }[] = [];
    const lanes = 5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn notes periodically (max 1 per lane)
    const spawnNote = () => {
      if (notes.length < lanes && Math.random() < 0.03) {
        const candidateLane = Math.floor(Math.random() * lanes);
        const laneOccupied = notes.some((n) => n.lane === candidateLane && n.z < 0.95);

        if (!laneOccupied) {
          notes.push({
            lane: candidateLane,
            z: 0,
            speed: 0.004, // Uniform speed for all notes
            width: 1.0, // Full lane width
            hit: false,
            hitTime: 0,
          });
        }
      }
    };

    let time = 0;
    const render = () => {
      time += 16;

      // Clear with slight fade for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const horizonY = canvas.height * 0.35;
      const bottomY = canvas.height * 0.95;
      const judgmentY = canvas.height * 0.88;

      // Perspective parameters (max-w not cropped)
      const vanishX = cx;
      const bottomWidth = Math.min(canvas.width * 0.8, 1000); // Fixed max-w
      const topWidth = Math.min(canvas.width * 0.05, 80);
      const highwayX = cx; // Center highway

      // Draw highway lanes (perspective)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;

      for (let i = 0; i <= lanes; i++) {
        const topX = vanishX + (i - lanes / 2) * (topWidth / lanes);
        const bottomX = cx + (i - lanes / 2) * (bottomWidth / lanes);

        ctx.beginPath();
        ctx.moveTo(topX, horizonY);
        ctx.lineTo(bottomX, bottomY);
        ctx.stroke();
      }

      // Draw judgment line (Full screen width)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, judgmentY);
      ctx.lineTo(canvas.width, judgmentY);
      ctx.stroke();

      // Spawn new notes
      spawnNote();

      // Update and draw notes
      notes = notes.filter((note) => {
        note.z += note.speed;

        // Check if note hit the judgment line
        if (!note.hit && note.z >= 0.85 && note.z <= 0.92) {
          note.hit = true;
          note.hitTime = time;
          hitEffects.push({ lane: note.lane, time: time, intensity: 1 });
        }

        // Remove notes that are past the bottom
        if (note.z > 1.1) return false;

        // Calculate perspective position
        const t = note.z;
        const y = horizonY + (bottomY - horizonY) * t;
        const currentWidth = topWidth + (bottomWidth - topWidth) * t;
        const laneWidth = currentWidth / lanes;
        const leftEdge = cx - currentWidth / 2;
        const noteX = leftEdge + (note.lane + 0.5) * laneWidth;
        const noteWidth = laneWidth * note.width;
        const noteHeight = 3 + t * 4;

        // Draw note
        const alpha = Math.min(1, t * 2) * (note.hit ? Math.max(0, 1 - (time - note.hitTime) / 200) : 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
        ctx.fillRect(noteX - noteWidth / 2, y - noteHeight / 2, noteWidth, noteHeight);

        return true;
      });

      // Draw hit effects
      hitEffects = hitEffects.filter((effect) => {
        const age = time - effect.time;
        if (age > 300) return false;

        const t = 0.88;
        const currentWidth = topWidth + (bottomWidth - topWidth) * t;
        const laneWidth = currentWidth / lanes;
        const leftEdge = cx - currentWidth / 2;
        const effectX = leftEdge + (effect.lane + 0.5) * laneWidth;

        const alpha = 1 - age / 300;
        const radius = 10 + age * 0.15;

        // Flash effect
        ctx.beginPath();
        ctx.arc(effectX, judgmentY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
        ctx.fill();

        // Expanding ring
        ctx.beginPath();
        ctx.arc(effectX, judgmentY, radius * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.2})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        return true;
      });

      // Occasional glitch
      if (Math.random() < 0.01) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        const glitchY = Math.random() * canvas.height;
        ctx.fillRect(0, glitchY, canvas.width, 2 + Math.random() * 4);
      }

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />;
};

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [maxZ, setMaxZ] = useState(200);
  const [booted, setBooted] = useState(false);
  const [bootPhase, setBootPhase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
  const [confirmingLink, setConfirmingLink] = useState<string | null>(null);

  const hoveredLocation = LOCATIONS.find((l) => l.id === hoveredLocationId);

  const handleOpenLink = (url: string) => {
    setConfirmingLink(url);
  };

  const confirmExternalLink = () => {
    if (confirmingLink) {
      window.open(confirmingLink, "_blank");
      setConfirmingLink(null);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const phases = [
      setTimeout(() => setBootPhase(1), 300),
      setTimeout(() => setBootPhase(2), 800),
      setTimeout(() => setBootPhase(3), 1500),
      setTimeout(() => setBooted(true), 2200),
    ];

    return () => {
      window.removeEventListener("resize", checkMobile);
      phases.forEach(clearTimeout);
    };
  }, []);

  const openApp = useCallback(
    (id: AppID) => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id === id) {
            return { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 };
          }
          return w;
        })
      );
      setMaxZ((prev) => prev + 1);
      setIsStartMenuOpen(false);
    },
    [maxZ]
  );

  const closeApp = useCallback((id: AppID) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  }, []);

  const focusApp = useCallback(
    (id: AppID) => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id === id) {
            return { ...w, zIndex: maxZ + 1, isMinimized: false };
          }
          return w;
        })
      );
      setMaxZ((prev) => prev + 1);
    },
    [maxZ]
  );

  const minimizeApp = useCallback((id: AppID) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  // Boot Screen
  if (!booted) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000]">
        <div className="relative z-10 text-center">
          <div
            className={`mb-8 transition-all duration-500 ${
              bootPhase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
            <div className="text-white font-mono text-3xl font-bold tracking-[0.3em] text-glitch">
              WINDOSE<span className="text-gray-600">_</span>42
            </div>
            <div className="text-gray-600 font-mono text-[10px] tracking-[0.2em] mt-2">Toby's Personal Hub</div>
          </div>

          <div className={`transition-all duration-500 ${bootPhase >= 2 ? "opacity-100" : "opacity-0"}`}>
            <div className="w-64 h-[2px] bg-gray-900 border border-gray-800 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-1000 ease-out"
                style={{ width: bootPhase >= 3 ? "100%" : "0%" }}
              />
            </div>
            <div className="text-gray-700 font-mono text-[9px] tracking-[0.15em] mt-4 uppercase">
              {bootPhase >= 3 ? "READY" : "LOADING..."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black selection:bg-white selection:text-black">
      {/* Glitchy Rhythm Background */}
      <RhythmBackground />

      {/* Vignette */}
      <div className="vignette" />

      {/* Scanlines */}
      <div className="scanlines" />

      {/* Desktop Icons */}
      <div className="pt-16 p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-flow-col md:grid-rows-6 gap-4 w-fit h-fit relative z-[5]">
        <DesktopIcon icon={<User size={20} />} label="About" onClick={() => openApp("about")} />
        <DesktopIcon icon={<Folder size={20} />} label="Projects" onClick={() => openApp("projects")} />
        <DesktopIcon icon={<Trophy size={20} />} label="Achievements" onClick={() => openApp("achievements")} />
        <DesktopIcon icon={<Layers size={20} />} label="Core Matrix" onClick={() => openApp("stack")} />
        <DesktopIcon icon={<Terminal size={20} />} label="Terminal" onClick={() => openApp("terminal")} />
        <DesktopIcon icon={<MessageCircle size={20} />} label="Messages" onClick={() => openApp("chat")} />
        <DesktopIcon icon={<Map size={20} />} label="Travel Log" onClick={() => openApp("go_out")} />
        <DesktopIcon
          icon={<Github size={20} />}
          label="GitHub"
          onClick={() => handleOpenLink("https://github.com/soundpulse")}
        />
        <DesktopIcon
          icon={<Linkedin size={20} />}
          label="LinkedIn"
          onClick={() => handleOpenLink("https://www.linkedin.com/in/toby-io/")}
        />
      </div>

      {/* Start Stream Icon - Top Right Corner (hidden behind status) */}
      <div className="fixed top-16 right-8 z-[10]">
        <DesktopIcon
          icon={<img src="/sad-cat.webp" alt="Start Stream" className="w-12 h-12 object-cover" />}
          label="start stream"
          onClick={() => openApp("stream")}
          noBorder={true}
        />
      </div>

      {/* App Windows */}
      {windows.map((win) => {
        if (!win.isOpen) return null;

        let content;
        switch (win.id) {
          case "about":
            content = <AboutApp />;
            break;
          case "projects":
            content = <ProjectsApp />;
            break;
          case "terminal":
            content = <TerminalApp onClose={() => closeApp("terminal")} onOpenLink={handleOpenLink} />;
            break;
          case "stats":
            content = <StatsApp />;
            break;
          case "chat":
            content = <ChatApp />;
            break;
          case "achievements":
            content = <AchievementsApp />;
            break;
          case "stack":
            content = <StackApp />;
            break;
          case "go_out":
            content = <GoOutApp onHoverLocation={setHoveredLocationId} />;
            break;
          case "stream":
            content = <StreamApp />;
            break;
          default:
            content = <div className="p-4">Empty</div>;
        }

        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            zIndex={win.zIndex}
            isMinimized={win.isMinimized}
            isMobile={isMobile}
            onClose={() => closeApp(win.id)}
            onFocus={() => focusApp(win.id)}
            onMinimize={() => minimizeApp(win.id)}
            icon={win.icon}>
            {content}
          </Window>
        );
      })}

      {/* Start Menu */}
      {isStartMenuOpen && (
        <div className="fixed inset-0 z-[999]" onClick={() => setIsStartMenuOpen(false)}>
          <div
            className="absolute top-12 left-0 w-72 bg-black border border-gray-800 p-4"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-900 pb-4">
              <div className="w-10 h-10 bg-white flex items-center justify-center text-black font-mono font-bold text-sm">
                42
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold text-white tracking-[0.1em]">WINDOSE_42</div>
                <div className="text-[9px] font-mono text-gray-600">USER: GUEST</div>
              </div>
            </div>

            <div className="space-y-1">
              {windows
                .filter((win) => win.id !== "stats")
                .map((win) => (
                  <button
                    key={win.id}
                    onClick={() => openApp(win.id)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-900 text-xs text-gray-400 hover:text-white transition-colors group">
                    <span className="text-gray-600 group-hover:text-white">{win.icon}</span>
                    <span className="font-mono text-[10px] tracking-wider uppercase">{win.title}</span>
                  </button>
                ))}
            </div>

            <div className="border-t border-gray-900 mt-4 pt-4">
              <button
                className="w-full flex items-center gap-3 p-2 hover:bg-white hover:text-black text-[9px] text-gray-400 transition-colors font-mono tracking-wider uppercase"
                onClick={() => handleOpenLink("https://github.com/soundpulse")}>
                <Github size={14} /> GitHub
              </button>
              <button
                className="w-full flex items-center gap-3 p-2 hover:bg-white hover:text-black text-[9px] text-gray-400 transition-colors font-mono tracking-wider uppercase"
                onClick={() => handleOpenLink("https://www.linkedin.com/in/toby-io/")}>
                <Linkedin size={14} /> LinkedIn
              </button>
            </div>

            <div className="border-t border-gray-900 mt-2 pt-2">
              <button
                className="w-full flex items-center gap-3 p-2 hover:bg-white hover:text-black text-xs text-gray-600 transition-colors font-mono tracking-wider uppercase"
                onClick={() => window.open(RICKROLL_URL, "_blank")}>
                <Power size={14} /> Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <Taskbar
        windows={windows}
        isStartOpen={isStartMenuOpen}
        onToggleStart={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onAppClick={(id) => {
          const win = windows.find((w) => w.id === id);
          if (win?.isMinimized || !win?.isOpen) {
            openApp(id);
          } else {
            focusApp(id);
          }
        }}
      />

      {/* Location Inspector */}
      <div
        className={`fixed right-6 bottom-20 w-80 transition-all duration-200 pointer-events-none z-[100] ${
          hoveredLocation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
        <div className="bg-black border border-gray-800 p-6 text-right">
          <h1 className="text-xl font-light text-white mb-1 tracking-wide">{hoveredLocation?.name}</h1>
          <div className="flex justify-end gap-2 mb-3">
            <span className="text-[8px] font-mono tracking-[0.1em] text-black bg-white px-2 py-0.5 uppercase">
              {hoveredLocation?.label}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-light leading-relaxed">{hoveredLocation?.description}</p>
        </div>
      </div>

      <ExternalLinkModal
        url={confirmingLink}
        onConfirm={confirmExternalLink}
        onCancel={() => setConfirmingLink(null)}
      />
    </div>
  );
};

export default App;
