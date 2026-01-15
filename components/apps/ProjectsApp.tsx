import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, Play, Pause, Loader2 } from "lucide-react";
import { PROJECTS } from "../../constants";
import { ProjectMedia } from "../../types";

interface MediaGalleryProps {
  media: ProjectMedia[];
  title: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const currentMedia = media[currentIndex];
  const isVideo = currentMedia?.type === "video";
  const hasMultiple = media.length > 1;

  const next = () => {
    setIsLoading(true);
    setCurrentIndex((i) => (i + 1) % media.length);
  };
  const prev = () => {
    setIsLoading(true);
    setCurrentIndex((i) => (i - 1 + media.length) % media.length);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Auto-scroll for galleries with multiple items
  useEffect(() => {
    if (hasMultiple && !isPaused && !isLoading) {
      autoScrollRef.current = setInterval(() => {
        setIsLoading(true);
        setCurrentIndex((i) => (i + 1) % media.length);
      }, 4000);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [hasMultiple, isPaused, isLoading, media.length]);

  // Handle video playback on index change
  useEffect(() => {
    if (videoRef.current && isVideo) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentIndex, isVideo]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleLoad = () => setIsLoading(false);

  if (!media || media.length === 0) return null;

  return (
    <div
      className="relative w-full h-36 bg-black overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <Loader2 size={20} className="text-gray-500 animate-spin" />
        </div>
      )}

      {isVideo ? (
        <video
          ref={videoRef}
          src={currentMedia.src}
          className={`w-full h-full object-contain transition-opacity ${isLoading ? "opacity-0" : "opacity-100"}`}
          loop
          muted
          playsInline
          autoPlay
          onLoadedData={handleLoad}
        />
      ) : (
        <img
          src={currentMedia.src}
          alt={title}
          className={`w-full h-full object-contain transition-opacity ${isLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={handleLoad}
        />
      )}

      {/* Video controls */}
      {isVideo && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute bottom-2 left-2 p-1 bg-black/70 hover:bg-black text-white transition-colors">
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>
      )}

      {/* Navigation arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-1 top-1/2 -translate-y-1/2 p-1 bg-black/70 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-black/70 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight size={14} />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {hasMultiple && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Media type badge */}
      <div className="absolute top-1.5 right-1.5 text-[7px] font-mono bg-black/70 text-gray-300 px-1.5 py-0.5 tracking-wider">
        {isVideo ? "VIDEO" : "IMG"} {currentIndex + 1}/{media.length}
      </div>
    </div>
  );
};

interface ProjectsAppProps {
  onOpenProject?: (projectId: string) => void;
}

const ProjectsApp: React.FC<ProjectsAppProps> = ({ onOpenProject }) => {
  return (
    <div className="p-4 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-3">
        <div>
          <h2 className="text-base font-light text-white tracking-wide mb-1">Projects</h2>
          <p className="text-[9px] font-mono text-gray-600 tracking-wider">/root/projects/</p>
        </div>
        <div className="text-[8px] font-mono bg-white text-black px-2 py-0.5 tracking-wider">
          {PROJECTS.length} ITEMS
        </div>
      </div>

      {/* Project Grid - 2 per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map((project, index) => {
          const hasLink = project.link && project.link.length > 0;

          return (
            <article
              key={project.id}
              onClick={() => onOpenProject?.(project.id)}
              className="border border-gray-800 bg-black hover:border-gray-600 transition-all flex flex-col cursor-pointer group">
              {/* Media Gallery */}
              {project.media && project.media.length > 0 && (
                <MediaGallery media={project.media} title={project.title} />
              )}

              {/* Content */}
              <div className="p-3 flex flex-col flex-1">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-gray-600">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="text-sm font-light text-white tracking-wide group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  {hasLink && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-600 hover:text-white transition-colors p-1">
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                {/* Tech Tags */}
                <div className="flex gap-1 flex-wrap mb-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[7px] font-mono bg-gray-900 text-gray-400 px-1.5 py-0.5 border border-gray-800 tracking-wider">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[7px] font-mono text-gray-600">+{project.tech.length - 4}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-[10px] text-gray-500 leading-relaxed flex-1">{project.description}</p>

                {/* Click hint */}
                <div className="mt-2 text-[8px] font-mono text-gray-700 group-hover:text-gray-500 transition-colors">
                  [ CLICK TO EXPAND ]
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-3 border-t border-gray-800 text-center">
        <p className="text-[8px] font-mono text-gray-600 tracking-wider">END OF PROJECT LIST</p>
        <p className="text-[8px] font-mono text-gray-700 tracking-wider mt-2">
          For private projects, limited information available on request.
        </p>
      </div>
    </div>
  );
};

export default ProjectsApp;
