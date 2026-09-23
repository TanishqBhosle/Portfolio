import React, { useRef, useState, useCallback } from 'react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltIntensity?: number;
  highlightColor?: string;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  glowColor = 'rgba(244, 63, 94, 0.18)',
  highlightColor = 'rgba(255, 255, 255, 0.12)',
  tiltIntensity = 14,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * tiltIntensity;
      const rotateY = (x - 0.5) * tiltIntensity;

      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) scale3d(1.025, 1.025, 1.025)`
      );
      setGlarePosition({ x: x * 100, y: y * 100 });
    },
    [tiltIntensity]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)');
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform,
        transition: isHovered
          ? 'transform 0.08s ease-out'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative group ${className}`}
    >
      {/* 3D Deep Ambient Shadow that drops when hovering */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ background: glowColor }}
      />

      {/* Cybernetic Hologram Border Beam */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 z-20 border"
        style={{
          borderColor: isHovered ? glowColor : 'rgba(255, 255, 255, 0.07)',
          boxShadow: isHovered ? `0 0 20px ${glowColor}` : 'none',
        }}
      />

      {/* Cursor-Tracking Holographic Glare */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 z-10 overflow-hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 180px at ${glarePosition.x}% ${glarePosition.y}%, ${highlightColor}, transparent 75%)`,
        }}
      />

      {/* 3D Preserved Children Container */}
      <div
        className="relative z-10 h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
};
