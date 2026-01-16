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
  cambridge: { x: 100, y: 73 },
  harrogate: { x: 100, y: 85 },
  london: { x: 100, y: 113 },
  france: { x: 100, y: 125 },
  poland: { x: 85, y: 125 },
  eur_elb_p: { x: 75, y: 125 },
  portugal: { x: 75, y: 125 },
  spain: { x: 75, y: 145 },
  italy: { x: 55, y: 135 },
  vatican: { x: 55, y: 150 },

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
  { id: "main", color: "#ffffff", stations: ["macau", "zhuhai", "uk", "ny", "la"], width: 5 },
  { id: "asia_north_n", color: "#8ecae6", stations: ["zhuhai", "wuhan", "shanghai", "beijing"], width: 3 },
  {
    id: "asia_north_s",
    color: "#8ecae6",
    stations: ["zhuhai", "shenzhen", "guangzhou", "guilin", "yunnan", "chongqing", "tibet"],
    width: 3,
  },
  {
    id: "se_asia",
    color: "#a78bfa",
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
    width: 3,
  },
  { id: "se_asia_tw", color: "#a78bfa", stations: ["hk", "taiwan"], width: 3 },
  {
    id: "euro",
    color: "#fbbf24",
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
    width: 3,
  },
  { id: "euro_ext", color: "#fbbf24", stations: ["portugal", "italy", "vatican"], width: 3 },
  {
    id: "usa",
    color: "#f472b6",
    stations: ["sf", "usa_elb1", "la", "usa_elb2", "sd", "usa_elb3", "vegas", "usa_elb_v", "slc", "denver"],
    width: 3,
  },
  {
    id: "east_coast",
    color: "#34d399",
    stations: ["buffalo", "ec_elb_b", "ithaca", "ny", "dc", "philly", "miami", "ec_elb_h", "hawaii"],
    width: 3,
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

  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const panOffsetRef = useRef({ x: 0, y: 0 });

  // Drag state
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

  // Pinch zoom state
  const lastPinchDistRef = useRef<number | null>(null);
  const pinchCenterRef = useRef<{ x: number; y: number } | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);
  useEffect(() => {
    panOffsetRef.current = panOffset;
  }, [panOffset]);

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
      const currentZoom = zoomRef.current;
      const currentPan = panOffsetRef.current;

      // Base scale, then apply user zoom
      const baseScale = Math.min(width / (bounds.width || 1), height / (bounds.height || 1)) * 0.7;
      const scale = baseScale * currentZoom;

      // Center offset + user pan
      const baseOffsetX = (width - bounds.width * baseScale) / 2 - bounds.minX * baseScale;
      const baseOffsetY = (height - bounds.height * baseScale) / 2 - bounds.minY * baseScale;

      // Apply zoom around center
      const centerX = width / 2;
      const centerY = height / 2;
      const offsetX = centerX + (baseOffsetX - centerX) * currentZoom + currentPan.x;
      const offsetY = centerY + (baseOffsetY - centerY) * currentZoom + currentPan.y;

      const toCanvas = (p: Point) => ({ x: p.x * scale + offsetX, y: p.y * scale + offsetY });

      // Draw Lines - Thicker, techy style
      METRO_LINES.forEach((line) => {
        const points = line.stations
          .map((s) => POSITIONS[s])
          .filter(Boolean)
          .map(toCanvas);
        if (points.length < 2) return;
        const isHoveredLine = currentHover && line.stations.includes(currentHover);

        // Base line width - much thicker
        const baseWidth = Math.max(3, ((line.width || 2) * scale) / 2.5);

        // Glow effect for hovered lines
        if (isHoveredLine) {
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = line.color;
          ctx.lineWidth = baseWidth + 6;
          ctx.globalAlpha = 0.3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          drawSchematicPath(ctx, points, line.stations, (15 * scale) / 5);
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = baseWidth;

        if (currentHover && !isHoveredLine) {
          ctx.globalAlpha = 0.15;
        } else {
          ctx.globalAlpha = isHoveredLine ? 1.0 : 0.7;
        }

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        drawSchematicPath(ctx, points, line.stations, (15 * scale) / 5);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Draw moving indicator - larger, glowing
        if (!currentHover || isHoveredLine) {
          const progress = Math.abs(((elapsed * 0.12) % 2) - 1);
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

            // Glow
            ctx.shadowColor = "#fff";
            ctx.shadowBlur = 8;
            ctx.fillStyle = "#fff";
            const indicatorW = Math.max(12, (16 * scale) / 5);
            const indicatorH = Math.max(4, (5 * scale) / 5);
            ctx.fillRect(-indicatorW / 2, -indicatorH / 2, indicatorW, indicatorH);
            ctx.shadowBlur = 0;
            ctx.restore();
          }
        }
      });

      // Helper to draw a location marker and optional label
      const drawLocation = (loc: (typeof LOCATIONS)[0], drawLabel: boolean) => {
        const pos = POSITIONS[loc.id];
        if (!pos) return;
        const cp = toCanvas(pos);
        const isHovered = loc.id === currentHover;
        const isHub = METRO_LINES.filter((l) => l.stations.includes(loc.id)).length > 1 || loc.line === "main";

        ctx.globalAlpha = 1;

        // Size scaling
        const hubSize = Math.max(10, (14 * scale) / 5);
        const nodeRadius = Math.max(6, (8 * scale) / 5);

        if (isHub) {
          // Hub Marker - Larger square with techy glow
          ctx.save();

          // Outer glow
          ctx.shadowColor = isHovered ? "#fff" : "rgba(255,255,255,0.5)";
          ctx.shadowBlur = isHovered ? 20 : 8;

          // Main square
          ctx.fillStyle = "#fff";
          ctx.fillRect(cp.x - hubSize / 2, cp.y - hubSize / 2, hubSize, hubSize);

          // Inner detail (tech look)
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#000";
          const innerSize = hubSize * 0.4;
          ctx.fillRect(cp.x - innerSize / 2, cp.y - innerSize / 2, innerSize, innerSize);

          // Border
          ctx.strokeStyle = isHovered ? "#fff" : "rgba(255,255,255,0.8)";
          ctx.lineWidth = isHovered ? 2 : 1;
          ctx.strokeRect(cp.x - hubSize / 2, cp.y - hubSize / 2, hubSize, hubSize);

          ctx.restore();
        } else {
          // Station Marker - Larger circles with glow
          ctx.save();

          // Outer glow
          if (isHovered) {
            ctx.shadowColor = "#fff";
            ctx.shadowBlur = 15;
          }

          // Outer ring
          ctx.beginPath();
          ctx.arc(cp.x, cp.y, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? "#fff" : "#111";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = isHovered ? 3 : 2;
          ctx.stroke();

          // Inner dot for techy look
          if (!isHovered) {
            ctx.beginPath();
            ctx.arc(cp.x, cp.y, nodeRadius * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
          }

          ctx.shadowBlur = 0;
          ctx.restore();
        }

        // Labels - Larger font
        if (drawLabel && (isHub || isHovered)) {
          const fontSize = Math.max(12, (16 * scale) / 5);
          ctx.save();
          ctx.translate(cp.x, cp.y);
          ctx.rotate(-Math.PI / 4);

          ctx.font = `${isHovered ? "700" : "500"} ${fontSize}px "Space Mono", monospace`;
          ctx.textAlign = "left";

          // Label Background for contrast
          const text = loc.name.toUpperCase();
          const metrics = ctx.measureText(text);
          const labelOffset = hubSize / 2 + 8;

          ctx.fillStyle = "rgba(0,0,0,0.9)";
          ctx.fillRect(labelOffset - 4, -fontSize / 2 - 3, metrics.width + 8, fontSize + 6);

          // Border on label
          ctx.strokeStyle = isHovered ? "#fff" : "rgba(255,255,255,0.3)";
          ctx.lineWidth = 1;
          ctx.strokeRect(labelOffset - 4, -fontSize / 2 - 3, metrics.width + 8, fontSize + 6);

          ctx.fillStyle = "#fff";
          ctx.textBaseline = "middle";
          ctx.fillText(text, labelOffset, 0);
          ctx.restore();
        }
      };

      // Draw Locations in two passes: non-hovered first, then hovered on top
      // Pass 1: Draw all non-hovered locations with labels
      LOCATIONS.forEach((loc) => {
        if (loc.id !== currentHover) {
          drawLocation(loc, true);
        }
      });

      // Pass 2: Draw hovered location last (on top)
      if (currentHover) {
        const hoveredLoc = LOCATIONS.find((loc) => loc.id === currentHover);
        if (hoveredLoc) {
          drawLocation(hoveredLoc, true);
        }
      }

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

  // Get canvas coordinates from client coordinates
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    // Scale from CSS pixels to canvas pixels
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Detect location at pointer position - simple closest point algorithm
  const detectLocation = (clientX: number, clientY: number): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const coords = getCanvasCoords(clientX, clientY);
    if (!coords) return null;

    const { x: mx, y: my } = coords;
    const { width, height } = canvas;

    // Use same scale/offset calculation as render (with zoom and pan)
    const currentZoom = zoomRef.current;
    const currentPan = panOffsetRef.current;

    const baseScale = Math.min(width / (bounds.width || 1), height / (bounds.height || 1)) * 0.7;
    const scale = baseScale * currentZoom;

    const baseOffsetX = (width - bounds.width * baseScale) / 2 - bounds.minX * baseScale;
    const baseOffsetY = (height - bounds.height * baseScale) / 2 - bounds.minY * baseScale;

    const centerX = width / 2;
    const centerY = height / 2;
    const offsetX = centerX + (baseOffsetX - centerX) * currentZoom + currentPan.x;
    const offsetY = centerY + (baseOffsetY - centerY) * currentZoom + currentPan.y;

    // Fixed hit radius in canvas pixels (generous for touch, matches larger visuals)
    const hitRadius = Math.max(25, scale * 4);

    let closestId: string | null = null;
    let closestDist = Infinity;

    // Check all valid locations
    for (const loc of LOCATIONS) {
      const pos = POSITIONS[loc.id];
      if (!pos) continue;

      // Convert to canvas coordinates (same as render)
      const cx = pos.x * scale + offsetX;
      const cy = pos.y * scale + offsetY;

      // Simple distance
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);

      if (dist < closestDist) {
        closestDist = dist;
        closestId = loc.id;
      }
    }

    // Return closest if within hit radius
    return closestDist <= hitRadius ? closestId : null;
  };

  // Unified handler for pointer/touch hover detection
  const handleHoverDetection = (clientX: number, clientY: number) => {
    const found = detectLocation(clientX, clientY);
    hoveredLocRef.current = found;
    setHoveredLoc(found);
  };

  const clearHover = () => {
    hoveredLocRef.current = null;
    setHoveredLoc(null);
  };

  // Get distance between two touch points
  const getPinchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Get center point between two touches
  const getPinchCenter = (touches: React.TouchList) => {
    if (touches.length < 2) return { x: touches[0].clientX, y: touches[0].clientY };
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  // Mouse wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Zoom factor
    const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.5, Math.min(5, zoomRef.current * zoomDelta));

    // Zoom towards mouse position
    const zoomChange = newZoom / zoomRef.current;
    const newPanX = mouseX - (mouseX - panOffsetRef.current.x) * zoomChange;
    const newPanY = mouseY - (mouseY - panOffsetRef.current.y) * zoomChange;

    setZoom(newZoom);
    setPanOffset({ x: newPanX, y: newPanY });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current && lastPointerRef.current) {
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    } else {
      handleHoverDetection(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    lastPointerRef.current = null;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    lastPointerRef.current = null;
    clearHover();
  };

  // Touch handlers with pinch-to-zoom and drag support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      lastPinchDistRef.current = getPinchDistance(e.touches);
      pinchCenterRef.current = getPinchCenter(e.touches);
      isDraggingRef.current = false;
    } else if (e.touches.length === 1) {
      // Single touch - start drag
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      handleHoverDetection(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 2 && lastPinchDistRef.current !== null) {
      // Pinch zoom
      const newDist = getPinchDistance(e.touches);
      const center = getPinchCenter(e.touches);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const centerX = center.x - rect.left;
      const centerY = center.y - rect.top;

      // Calculate zoom
      const zoomDelta = newDist / lastPinchDistRef.current;
      const newZoom = Math.max(0.5, Math.min(5, zoomRef.current * zoomDelta));

      // Zoom towards pinch center
      const zoomChange = newZoom / zoomRef.current;
      const newPanX = centerX - (centerX - panOffsetRef.current.x) * zoomChange;
      const newPanY = centerY - (centerY - panOffsetRef.current.y) * zoomChange;

      // Also pan if pinch center moved
      if (pinchCenterRef.current) {
        const panDx = center.x - pinchCenterRef.current.x;
        const panDy = center.y - pinchCenterRef.current.y;
        setPanOffset({ x: newPanX + panDx, y: newPanY + panDy });
      } else {
        setPanOffset({ x: newPanX, y: newPanY });
      }

      setZoom(newZoom);
      lastPinchDistRef.current = newDist;
      pinchCenterRef.current = center;
    } else if (e.touches.length === 1 && isDraggingRef.current && lastPointerRef.current) {
      // Single touch drag
      const touch = e.touches[0];
      const dx = touch.clientX - lastPointerRef.current.x;
      const dy = touch.clientY - lastPointerRef.current.y;
      setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPointerRef.current = { x: touch.clientX, y: touch.clientY };
      handleHoverDetection(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      isDraggingRef.current = false;
      lastPointerRef.current = null;
      lastPinchDistRef.current = null;
      pinchCenterRef.current = null;
    } else if (e.touches.length === 1) {
      // Switched from pinch to single touch
      lastPinchDistRef.current = null;
      pinchCenterRef.current = null;
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchCancel = () => {
    isDraggingRef.current = false;
    lastPointerRef.current = null;
    lastPinchDistRef.current = null;
    pinchCenterRef.current = null;
    clearHover();
  };

  // Reset zoom and pan
  const handleDoubleClick = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
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
        <div className="flex items-center gap-4">
          {zoom !== 1 && (
            <button
              onClick={handleDoubleClick}
              className="text-[10px] font-mono text-gray-500 hover:text-white tracking-wider uppercase transition-colors">
              Reset View
            </button>
          )}
          <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase hidden md:block">
            {zoom !== 1 ? `${Math.round(zoom * 100)}% · ` : ""}
            {LOCATIONS.length} Nodes
          </span>
        </div>
      </header>

      <div className="flex-1 relative cursor-grab overflow-hidden">
        <canvas
          ref={canvasRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          onDoubleClick={handleDoubleClick}
          className="h-full w-full"
          style={{ touchAction: "none", cursor: isDraggingRef.current ? "grabbing" : "grab" }}
        />

        {/* Mobile-only Location Tab - Overlay */}
        <div
          className={`md:hidden absolute bottom-10 left-0 right-0 bg-black border-t border-gray-800 transition-all duration-200 overflow-hidden z-50 ${
            hoveredLocation ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-full"
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
      </div>

      <footer className="h-12 bg-black border-t border-gray-800 px-5 flex items-center justify-between text-[10px] font-mono text-gray-500 tracking-widest uppercase flex-shrink-0">
        <div className="flex gap-5">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" /> HUB
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-white bg-black" /> NODE
          </span>
        </div>
        <span className={`hidden md:inline ${hoveredLoc ? "text-white" : ""}`}>
          {hoveredLoc ? `CONNECTED: ${hoveredLoc.toUpperCase()}` : "IDLE: AWAITING INPUT"}
        </span>
        <span className={`md:hidden ${hoveredLoc ? "text-white" : ""}`}>{hoveredLoc ? "●" : "○"}</span>
      </footer>
    </div>
  );
};

export default GoOutApp;
