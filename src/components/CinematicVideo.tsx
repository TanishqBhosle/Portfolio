import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CinematicVideoProps {
  src: string;
  poster?: string;
  aspectRatio?: '16:9' | '9:16' | 'fill' | 'auto';
  opacity?: number;
  className?: string;
  badge?: string;
  blendMode?: 'normal' | 'screen' | 'lighten' | 'overlay' | 'luminosity';
  showControls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
}

export const CinematicVideo: React.FC<CinematicVideoProps> = ({
  src,
  poster,
  aspectRatio = '16:9',
  opacity = 0.4,
  className = '',
  badge,
  blendMode = 'normal',
  showControls = false,
  autoPlay = true,
  loop = true,
  muted = true,
  onTimeUpdate,
  onEnded,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to pause video when offscreen (saves GPU/CPU)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !autoPlay) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
              setIsPlaying(true);
            } else {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  if (hasError) {
    return null;
  }

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-video'
      : aspectRatio === '9:16'
      ? 'aspect-[9/16]'
      : aspectRatio === 'fill'
      ? 'w-full h-full'
      : '';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${aspectClass} ${className}`}
    >
      <motion.video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        preload="metadata"
        poster={poster}
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        onTimeUpdate={() => {
          if (videoRef.current && onTimeUpdate) {
            onTimeUpdate(videoRef.current.currentTime, videoRef.current.duration || 0);
          }
        }}
        onEnded={onEnded}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? opacity : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ mixBlendMode: blendMode }}
        className="w-full h-full object-cover object-center pointer-events-none"
      >
        <source src={src} type="video/mp4" />
      </motion.video>

      {/* Cinematic Vignette & Edge Shadow Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#050507]/20 to-[#050507] pointer-events-none" />

      {/* Fine Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* Optional Interactive Controls & Badge */}
      {(badge || showControls) && isLoaded && (
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 pointer-events-auto">
          {badge && (
            <span className="font-mono-code text-[9px] uppercase tracking-widest text-neutral-400/80 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {badge}
            </span>
          )}

          {showControls && (
            <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md rounded border border-white/10 p-0.5">
              <button
                onClick={togglePlay}
                data-cursor="PLAY/PAUSE"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="px-2 py-0.5 text-[10px] font-mono-code text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </button>
              <button
                onClick={toggleMute}
                data-cursor="AUDIO"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                className="px-2 py-0.5 text-[10px] font-mono-code text-neutral-400 hover:text-red-400 transition-colors border-l border-white/10 cursor-pointer"
              >
                {isMuted ? 'MUTED' : 'LIVE'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
