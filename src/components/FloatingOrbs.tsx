import React from 'react';

interface Orb {
  color: string;
  size: string;
  top: string;
  left: string;
  animation: string;
  duration: string;
  delay: string;
  opacity: number;
}

const orbs: Orb[] = [
  {
    color: 'rgba(244, 63, 94, 0.08)',
    size: '500px',
    top: '10%',
    left: '15%',
    animation: 'float-slow',
    duration: '25s',
    delay: '0s',
    opacity: 0.6,
  },
  {
    color: 'rgba(251, 113, 133, 0.06)',
    size: '400px',
    top: '30%',
    left: '70%',
    animation: 'float-medium',
    duration: '20s',
    delay: '-5s',
    opacity: 0.5,
  },
  {
    color: 'rgba(139, 92, 246, 0.05)',
    size: '350px',
    top: '55%',
    left: '5%',
    animation: 'float-fast',
    duration: '22s',
    delay: '-8s',
    opacity: 0.4,
  },
  {
    color: 'rgba(6, 182, 212, 0.04)',
    size: '450px',
    top: '70%',
    left: '60%',
    animation: 'float-slow',
    duration: '28s',
    delay: '-12s',
    opacity: 0.5,
  },
  {
    color: 'rgba(251, 191, 36, 0.04)',
    size: '300px',
    top: '85%',
    left: '30%',
    animation: 'float-medium',
    duration: '24s',
    delay: '-3s',
    opacity: 0.35,
  },
  {
    color: 'rgba(244, 63, 94, 0.06)',
    size: '380px',
    top: '45%',
    left: '45%',
    animation: 'float-fast',
    duration: '26s',
    delay: '-15s',
    opacity: 0.4,
  },
];

export const FloatingOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            opacity: orb.opacity,
            animation: `${orb.animation} ${orb.duration} ease-in-out infinite`,
            animationDelay: orb.delay,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};
