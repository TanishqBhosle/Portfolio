import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Sparkles } from 'lucide-react';

interface CyberneticLandingPageProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const CyberneticLandingPage: React.FC<CyberneticLandingPageProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle postMessage communication from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return;

      if (event.data.type === 'CLOSE_EXPERIENCE') {
        onClose();
      } else if (event.data.type === 'NAVIGATE' && event.data.section) {
        onClose();
        if (onNavigate) {
          setTimeout(() => {
            onNavigate(event.data.section);
          }, 300);
        } else {
          setTimeout(() => {
            const el = document.getElementById(event.data.section);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose, onNavigate]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Neural Nexus 3D Experience"
        >
          {/* Subtle Outer Frame Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none bg-radial from-rose-500/10 via-transparent to-transparent opacity-60" />

          {/* Top Quick Control Bar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-rose-400" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-white transition-all cursor-pointer backdrop-blur-md shadow-lg shadow-rose-950/40"
              title="Close Experience (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none bg-[#07070a]">
              <div className="relative flex items-center justify-center mb-4">
                <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-rose-500/40" />
                <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
              </div>
              <p className="font-mono text-xs tracking-widest text-neutral-400 uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                Initializing Neural Nexus WebGL Environment...
              </p>
            </div>
          )}

          {/* Sandboxed Fullscreen 3D Document Iframe */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative overflow-hidden"
          >
            <iframe
              ref={iframeRef}
              src="/landing-pages/neural-nexus.html"
              title="Neural Nexus 3D Architecture"
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; accelerometer; gyroscope"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
              onLoad={() => setIsLoading(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
