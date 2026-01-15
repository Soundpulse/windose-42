import React, { useState, useRef, useEffect, useCallback } from "react";
import { Minus, Square, X } from "lucide-react";
import { AppID } from "../types";

interface WindowProps {
  id: AppID;
  title: string;
  children: React.ReactNode;
  zIndex: number;
  isMinimized: boolean;
  isMobile: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  icon: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  zIndex,
  isMinimized,
  isMobile,
  onClose,
  onFocus,
  onMinimize,
  icon,
}) => {
  const getInitialWidth = () => {
    switch (id) {
      case "stats":
        return 380;
      case "terminal":
        return 600;
      case "chat":
        return 700;
      case "stream":
        return 1000;
      default:
        return 800;
    }
  };

  const getInitialHeight = () => {
    switch (id) {
      case "stream":
        return 650;
      default:
        return 500;
    }
  };

  const [size, setSize] = useState({ width: getInitialWidth(), height: getInitialHeight() });
  const [pos, setPos] = useState(() => {
    const w = getInitialWidth();
    const h = getInitialHeight();
    if (id === "stats") {
      return { x: window.innerWidth - w - 40, y: 60 };
    }
    // Randomish central-ish position but contained
    const x = Math.max(20, Math.min(window.innerWidth - w - 20, 80 + (zIndex % 10) * 20));
    const y = Math.max(60, Math.min(window.innerHeight - h - 60, 60 + (zIndex % 10) * 20));
    return { x, y };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ w: 0, h: 0, mx: 0, my: 0 });

  const isStatsWindow = id === "stats";

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const toggleMaximize = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isMobile) return;

      if (isStatsWindow) {
        triggerShake();
        const newCount = buttonClickCount + 1;
        setButtonClickCount(newCount);
        if (newCount >= 20) {
          onClose();
        }
        return;
      }

      setIsMaximized(!isMaximized);
      onFocus();
    },
    [isMaximized, isMobile, onFocus, isStatsWindow, buttonClickCount, onClose]
  );

  const handleDragStart = (e: React.MouseEvent) => {
    if (isMobile || isMaximized) return;
    if (isStatsWindow) {
      triggerShake();
      return;
    }
    onFocus();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.stopPropagation();
    e.preventDefault();

    if (isStatsWindow) {
      triggerShake();
      return;
    }

    onFocus();
    setIsResizing(true);
    resizeStart.current = {
      w: size.width,
      h: size.height,
      mx: e.clientX,
      my: e.clientY,
    };
  };

  const handleGlobalMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;

        // Containment: keep title bar visible and window mostly on screen
        const minX = -size.width + 50;
        const maxX = window.innerWidth - 50;
        const minY = 48; // Taskbar height
        const maxY = window.innerHeight - 50;

        setPos({
          x: Math.max(minX, Math.min(maxX, newX)),
          y: Math.max(minY, Math.min(maxY, newY)),
        });
      }

      if (isResizing) {
        const dx = e.clientX - resizeStart.current.mx;
        const dy = e.clientY - resizeStart.current.my;

        const newWidth = Math.max(300, resizeStart.current.w + dx);
        const newHeight = Math.max(200, resizeStart.current.h + dy);

        // Also contain resizing
        const maxWidth = window.innerWidth - pos.x - 20;
        const maxHeight = window.innerHeight - pos.y - 20;

        setSize({
          width: Math.min(newWidth, maxWidth),
          height: Math.min(newHeight, maxHeight),
        });
      }
    },
    [isDragging, isResizing, pos.x, pos.y, size.width]
  );

  const handleGlobalMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, isResizing, handleGlobalMouseMove, handleGlobalMouseUp]);

  if (isMinimized) return null;

  const getStyles = (): React.CSSProperties => {
    const isActive = isDragging || isResizing;

    if (isMobile || isMaximized) {
      return {
        top: "48px",
        left: 0,
        width: "100%",
        height: "calc(100% - 48px)",
        zIndex: zIndex,
        transition: isMaximized && !isActive ? "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
      };
    }

    return {
      left: pos.x,
      top: pos.y,
      zIndex,
      width: size.width,
      height: size.height,
      transition: isActive ? "none" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  const handleWindowClick = () => {
    if (isStatsWindow) {
      triggerShake();
      return;
    }
    onFocus();
    setIsFocused(true);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isStatsWindow) {
      triggerShake();
      const newCount = buttonClickCount + 1;
      setButtonClickCount(newCount);
      if (newCount >= 20) {
        onClose();
      }
      return;
    }
    onMinimize();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isStatsWindow) {
      triggerShake();
      const newCount = buttonClickCount + 1;
      setButtonClickCount(newCount);
      if (newCount >= 20) {
        onClose();
      }
      return;
    }
    onClose();
  };

  const windowStyles = getStyles();
  if (isShaking) {
    windowStyles.animation = "shake 0.5s";
  }

  return (
    <div
      className={`absolute flex flex-col bg-[#0a0a0a]/95 backdrop-blur-sm shadow-2xl ${
        isFocused ? "border border-white ring-1 ring-white/20" : "border border-gray-800"
      } ${isMobile || isMaximized ? "border-none" : ""}`}
      style={windowStyles}
      onClick={handleWindowClick}
      onBlur={() => setIsFocused(false)}>
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between px-3 py-2 bg-[#111]/90 border-b border-gray-800 select-none ${
          !isMobile && !isMaximized && !isStatsWindow ? "cursor-move" : ""
        }`}
        onMouseDown={handleDragStart}
        onDoubleClick={toggleMaximize}>
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-gray-600">{icon}</span>
          <span className="text-[10px] font-mono text-gray-400 truncate tracking-wider uppercase">{title}</span>
        </div>

        {/* Window buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-800 transition-colors rounded-sm"
            title="Minimize">
            <Minus size={12} />
          </button>
          {!isMobile && (
            <button
              onClick={toggleMaximize}
              className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-800 transition-colors rounded-sm"
              title={isMaximized ? "Restore" : "Maximize"}>
              {isMaximized ? (
                <div className="relative">
                  <Square size={8} className="absolute -top-1 -right-1 opacity-50" />
                  <Square size={8} className="relative z-10" />
                </div>
              ) : (
                <Square size={10} />
              )}
            </button>
          )}
          <button
            onClick={handleClose}
            className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-white hover:bg-red-600 transition-colors rounded-sm"
            title="Close">
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[#0a0a0a] relative retro-scroll">{children}</div>

      {/* Resize Handle */}
      {!isMobile && !isMaximized && !isStatsWindow && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-[100] group"
          onMouseDown={handleResizeStart}>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-r border-b border-gray-700 pointer-events-none group-hover:border-white" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-r border-b border-gray-800 pointer-events-none group-hover:border-gray-400" />
        </div>
      )}
    </div>
  );
};

export default Window;
