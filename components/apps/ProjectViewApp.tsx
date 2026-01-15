import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, Play, Pause, Loader2 } from "lucide-react";
import { Project, ProjectMedia } from "../../types";

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
      className="relative w-full h-72 bg-black overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <Loader2 size={24} className="text-gray-500 animate-spin" />
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
          onClick={togglePlay}
          className="absolute bottom-3 left-3 p-1.5 bg-black/70 hover:bg-black text-white transition-colors">
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}

      {/* Navigation arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/70 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/70 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsLoading(true);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Media type badge */}
      <div className="absolute top-2 right-2 text-[9px] font-mono bg-black/70 text-gray-300 px-2 py-0.5 tracking-wider">
        {isVideo ? "VIDEO" : "IMG"} {currentIndex + 1}/{media.length}
      </div>
    </div>
  );
};

interface ProjectViewAppProps {
  project: Project | null;
}

const ProjectViewApp: React.FC<ProjectViewAppProps> = ({ project }) => {
  if (!project) {
    return (
      <div className="h-full flex items-center justify-center text-gray-600 font-mono text-sm">
        No project selected
      </div>
    );
  }

  const hasLink = project.link && project.link.length > 0;

  return (
    <div className="h-full overflow-y-auto">
      {/* Media Gallery */}
      {project.media && project.media.length > 0 && (
        <MediaGallery media={project.media} title={project.title} />
      )}

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h1 className="text-xl font-light text-white tracking-wide mb-4">{project.title}</h1>

        {/* Tech Tags */}
        <div className="flex gap-2 flex-wrap mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono bg-gray-900 text-gray-400 px-2 py-1 border border-gray-800 tracking-wider">
              {t}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{project.description}</p>

        {/* Long Description */}
        {project.longDescription && (
          <p className="text-sm text-gray-500 leading-relaxed mb-6 border-l-2 border-gray-800 pl-4">
            {project.longDescription}
          </p>
        )}

        {/* Link Button */}
        {hasLink && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-mono tracking-wider hover:bg-gray-200 transition-colors">
            <ExternalLink size={14} />
            VISIT SITE
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectViewApp;
