import React, { useState, useEffect, useRef, useMemo } from "react";
import { Globe } from "lucide-react";
import { LOCATIONS } from "../../constants";

interface MetroLine {
  id: string;
  color: string;
  stations: string[];
  width?: number;
}

interface Point {
  x: number;
  y: number;
}

const POSITIONS: Record<string, Point> = {
  macau: { x: 0, y: 60 },
  zhuhai: { x: 50, y: 60 },
  uk: { x: 100, y: 60 },
  ny: { x: 150, y: 60 },
  la: { x: 210, y: 60 },

  beijing: { x: 50, y: 0 },
  shanghai: { x: 50, y: 15 },
  wuhan: { x: 50, y: 35 },
  shenzhen: { x: 50, y: 75 },
  guangzhou: { x: 50, y: 95 },
  guilin: { x: 50, y: 115 },
  yunnan: { x: 25, y: 135 },
  chongqing: { x: 10, y: 135 },
  tibet: { x: -10, y: 135 },

  asia_elb_k: { x: 20, y: 0 },
  korea: { x: 0, y: 20 },
  japan: { x: 0, y: 40 },
  hk: { x: 0, y: 100 },
  taiwan: { x: 25, y: 100 },
  thailand: { x: 40, y: 160 },
  philippines: { x: 60, y: 160 },
  sg: { x: 80, y: 160 },
  malay: { x: 95, y: 160 },

  iceland: { x: 80, y: 10 },
  eur_elb0: { x: 100, y: 20 },
  edinburgh: { x: 100, y: 30 },
  manchester: { x: 100, y: 45 },
  cambridge: { x: 100, y: 80 },
  harrogate: { x: 100, y: 90 },
  london: { x: 100, y: 100 },
  france: { x: 100, y: 110 },
  poland: { x: 85, y: 110 },
  eur_elb_p: { x: 75, y: 110 },
  portugal: { x: 75, y: 120 },
  spain: { x: 75, y: 140 },
  italy: { x: 55, y: 130 },
  vatican: { x: 55, y: 145 },

  buffalo: { x: 170, y: 0 },
  ec_elb_b: { x: 150, y: 0 },
  ithaca: { x: 150, y: 20 },
  ny_elb: { x: 150, y: 40 },
  dc: { x: 150, y: 80 },
  philly: { x: 150, y: 100 },
  miami: { x: 150, y: 115 },
  ec_elb_h: { x: 150, y: 130 },
  hawaii: { x: 125, y: 130 },

  sf: { x: 200, y: 35 },
  usa_elb1: { x: 210, y: 45 },
  usa_elb2: { x: 210, y: 90 },
  sd: { x: 210, y: 110 },
  usa_elb3: { x: 210, y: 130 },
  vegas: { x: 210, y: 140 },
  usa_elb_v: { x: 210, y: 150 },
  slc: { x: 190, y: 160 },
  denver: { x: 170, y: 160 },
};

const METRO_LINES: MetroLine[] = [
  { id: "main", color: "#ffffff", stations: ["macau", "zhuhai", "uk", "ny", "la"], width: 3 },
  { id: "asia_north_n", color: "#aaaaaa", stations: ["zhuhai", "wuhan", "shanghai", "beijing"] },
  {
    id: "asia_north_s",
    color: "#aaaaaa",
    stations: ["zhuhai", "shenzhen", "guangzhou", "guilin", "yunnan", "chongqing", "tibet"],
  },
  {
    id: "se_asia",
    color: "#888888",
    stations: [
      "beijing",
      "asia_elb_k",
      "korea",
      "japan",
      "macau",
      "hk",
      "yunnan",
      "thailand",
      "philippines",
      "sg",
      "malay",
    ],
  },
  { id: "se_asia_tw", color: "#888888", stations: ["hk", "taiwan"] },
  {
    id: "euro",
    color: "#999999",
    stations: [
      "iceland",
      "eur_elb0",
      "edinburgh",
      "manchester",
      "uk",
      "cambridge",
      "harrogate",
      "london",
      "france",
      "poland",
      "eur_elb_p",
      "portugal",
      "spain",
    ],
  },
  { id: "euro_ext", color: "#999999", stations: ["portugal", "italy", "vatican"] },
  {
    id: "usa",
    color: "#bbbbbb",
    stations: ["sf", "usa_elb1", "la", "usa_elb2", "sd", "usa_elb3", "vegas", "usa_elb_v", "slc", "denver"],
  },
  {
    id: "east_coast",
    color: "#cccccc",
    stations: ["buffalo", "ec_elb_b", "ithaca", "ny", "dc", "philly", "miami", "ec_elb_h", "hawaii"],
  },
];

const drawSchematicPath = (ctx: CanvasRenderingContext2D, points: Point[], stations: string[], radius: number) => {
  if (points.length < 2) return;
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const p0 = points[i - 1],
      p = points[i],
      p2 = points[i + 1];
    const isElb = stations[i].includes("elb");
    const isHub = METRO_LINES.filter((l) => l.stations.includes(stations[i])).length > 1;

    if (isElb || isHub) {
      const v1 = { x: p0.x - p.x, y: p0.y - p.y },
        v2 = { x: p2.x - p.x, y: p2.y - p.y };
      const l1 = Math.sqrt(v1.x ** 2 + v1.y ** 2),
        l2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
      const r = Math.min(radius, l1 / 2.2, l2 / 2.2);
      ctx.lineTo(p.x + (v1.x / l1) * r, p.y + (v1.y / l1) * r);
      ctx.quadraticCurveTo(p.x, p.y, p.x + (v2.x / l2) * r, p.y + (v2.y / l2) * r);
    } else {
      ctx.lineTo(p.x, p.y);
    }
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
};

const GoOutApp: React.FC<{ onHoverLocation?: (id: string | null) => void }> = ({ onHoverLocation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLoc, setHoveredLoc] = useState<string | null>(null);
  const hoveredLocRef = useRef<string | null>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    onHoverLocation?.(hoveredLoc);
  }, [hoveredLoc, onHoverLocation]);

  const bounds = useMemo(() => {
    const coords = Object.values(POSITIONS);
    const minX = Math.min(...coords.map((p) => p.x));
    const maxX = Math.max(...coords.map((p) => p.x));
    const minY = Math.min(...coords.map((p) => p.y));
    const maxY = Math.max(...coords.map((p) => p.y));
    return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const currentHover = hoveredLocRef.current;
      const scale = Math.min(width / (bounds.width || 1), height / (bounds.height || 1)) * 0.7;
      const offsetX = (width - bounds.width * scale) / 2 - bounds.minX * scale;
      const offsetY = (height - bounds.height * scale) / 2 - bounds.minY * scale;

      const toCanvas = (p: Point) => ({ x: p.x * scale + offsetX, y: p.y * scale + offsetY });

      // Draw Lines
      METRO_LINES.forEach((line) => {
        const points = line.stations
          .map((s) => POSITIONS[s])
          .filter(Boolean)
          .map(toCanvas);
        if (points.length < 2) return;
        const isHoveredLine = currentHover && line.stations.includes(currentHover);

        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = ((line.width || 2) * scale) / 5;

        if (currentHover && !isHoveredLine) {
          ctx.globalAlpha = 0.1;
        } else {
          ctx.globalAlpha = isHoveredLine ? 1.0 : 0.8;
        }

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        drawSchematicPath(ctx, points, line.stations, (10 * scale) / 5);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Draw moving indicator
        if (!currentHover || isHoveredLine) {
          const progress = Math.abs(((elapsed * 0.15) % 2) - 1);
          const idx = Math.floor(progress * (points.length - 1));
          const lt = (progress * (points.length - 1)) % 1;
          if (idx < points.length - 1) {
            const p1 = points[idx],
              p2 = points[idx + 1];
            const tx = p1.x + (p2.x - p1.x) * lt,
              ty = p1.y + (p2.y - p1.y) * lt;
            ctx.save();
            ctx.translate(tx, ty);
            ctx.rotate(Math.atan2(p2.y - p1.y, p2.x - p1.x));
            ctx.fillStyle = "#fff";
            ctx.fillRect((-6 * scale) / 5, (-1.5 * scale) / 5, (12 * scale) / 5, (3 * scale) / 5);
            ctx.restore();
          }
        }
      });

      // Draw Locations
      LOCATIONS.forEach((loc) => {
        const pos = POSITIONS[loc.id];
        if (!pos) return;
        const cp = toCanvas(pos);
        const isHovered = loc.id === currentHover;
        const isHub = METRO_LINES.filter((l) => l.stations.includes(loc.id)).length > 1 || loc.line === "main";

        ctx.globalAlpha = 1;

        if (isHub) {
          // Hub Marker
          ctx.fillStyle = "#fff";
          ctx.shadowBlur = isHovered ? 10 : 2;
          ctx.shadowColor = "#fff";
          ctx.fillRect(cp.x - (5 * scale) / 5, cp.y - (5 * scale) / 5, (10 * scale) / 5, (10 * scale) / 5);
          ctx.shadowBlur = 0;

          // Hub Border
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 1;
          ctx.strokeRect(cp.x - (5 * scale) / 5, cp.y - (5 * scale) / 5, (10 * scale) / 5, (10 * scale) / 5);
        } else {
          // Station Marker
          ctx.beginPath();
          ctx.arc(cp.x, cp.y, (4 * scale) / 5, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? "#fff" : "#000";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Labels
        if (isHub || isHovered) {
          const fontSize = Math.max(11, (13 * scale) / 5);
          ctx.save();
          ctx.translate(cp.x, cp.y);
          ctx.rotate(-Math.PI / 4);

          ctx.font = `${isHovered ? "700" : "400"} ${fontSize}px "Space Mono", monospace`;
          ctx.textAlign = "left";

          // Label Background for contrast
          const text = loc.name.toUpperCase();
          const metrics = ctx.measureText(text);
          ctx.fillStyle = "rgba(0,0,0,0.8)";
          ctx.fillRect((12 * scale) / 5 - 2, -fontSize / 2 - 2, metrics.width + 4, fontSize + 4);

          ctx.fillStyle = "#fff";
          ctx.textBaseline = "middle";
          ctx.fillText(text, (12 * scale) / 5, 0);
          ctx.restore();
        }
      });

      animationRef.current = requestAnimationFrame(render);
    };
    render();
    return () => animationRef.current && cancelAnimationFrame(animationRef.current);
  }, [bounds]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left,
      my = e.clientY - rect.top;
    const scale = Math.min(canvas.width / (bounds.width || 1), canvas.height / (bounds.height || 1)) * 0.7;
    const ox = (canvas.width - bounds.width * scale) / 2 - bounds.minX * scale;
    const oy = (canvas.height - bounds.height * scale) / 2 - bounds.minY * scale;

    let found = null;
    const validStationIds = LOCATIONS.map((l) => l.id);
    for (const [id, p] of Object.entries(POSITIONS)) {
      if (!validStationIds.includes(id) && id !== "macau") continue;

      const isHub = METRO_LINES.filter((l) => l.stations.includes(id)).length > 1 || id === "macau" || id === "ny";
      const hitRadius = (isHub ? 50 : 35) * (scale / 5);
      const dist = Math.sqrt((mx - (p.x * scale + ox)) ** 2 + (my - (p.y * scale + oy)) ** 2);
      if (dist < Math.max(isHub ? 45 : 30, hitRadius)) {
        found = id;
        break;
      }
    }

    if (found !== hoveredLoc) {
      setHoveredLoc(found);
      hoveredLocRef.current = found;
    }
  };

  const hoveredLocation = hoveredLoc ? LOCATIONS.find((l) => l.id === hoveredLoc) : null;

  return (
    <div className="h-full w-full bg-black flex flex-col select-none overflow-hidden relative" ref={containerRef}>
      <header className="px-5 py-4 bg-black border-b border-gray-800 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="p-1 bg-white">
            <Globe size={14} className="text-black" />
          </div>
          <h2 className="text-sm font-mono tracking-[0.2em] text-white uppercase font-bold">Travel_Flow_v4.2</h2>
        </div>
        <div className="text-[10px] font-mono text-gray-400 tracking-wider uppercase hidden md:block">
          {LOCATIONS.length} Active Nodes
        </div>
      </header>

      <div className="flex-1 relative cursor-crosshair overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setHoveredLoc(null);
            hoveredLocRef.current = null;
          }}
          className="h-full w-full"
        />
      </div>

      {/* Mobile-only Location Tab */}
      <div
        className={`md:hidden bg-black border-t border-gray-800 transition-all duration-200 overflow-hidden ${
          hoveredLocation ? "max-h-40" : "max-h-0"
        }`}>
        {hoveredLocation && (
          <div className="p-4">
            <h1 className="text-lg font-light text-white mb-2 tracking-wide">{hoveredLocation.name}</h1>
            <div className="flex gap-2 mb-3">
              <span className="text-[8px] font-mono tracking-[0.1em] text-black bg-white px-2 py-0.5 uppercase">
                {hoveredLocation.label}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-light leading-relaxed">{hoveredLocation.description}</p>
          </div>
        )}
      </div>

      <footer className="h-10 bg-black border-t border-gray-800 px-5 flex items-center justify-between text-[10px] font-mono text-gray-500 tracking-widest uppercase flex-shrink-0">
        <div className="flex gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white" /> MAIN_HUB
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 border border-white" /> NODE
          </span>
        </div>
        <span className={`hidden md:inline ${hoveredLoc ? "text-white" : ""}`}>
          {hoveredLoc ? `STATUS_CONNECTED: ${hoveredLoc.toUpperCase()}` : "IDLE: WAITING FOR UPLINK"}
        </span>
        <span className={`md:hidden ${hoveredLoc ? "text-white" : ""}`}>
          {hoveredLoc ? "CONNECTED" : "IDLE"}
        </span>
      </footer>
    </div>
  );
};

export default GoOutApp;
