import { useState, useEffect } from 'react';

export interface ScrollProgress {
  scrollY: number;
  progress: number; // 0 to 1
  direction: 'up' | 'down' | 'none';
  velocity: number;
}

export function useScrollProgress(): ScrollProgress {
  const [scrollState, setScrollState] = useState<ScrollProgress>({
    scrollY: 0,
    progress: 0,
    direction: 'none',
    velocity: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const maxScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
          );
          const progress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);
          const now = performance.now();
          const dt = Math.max(now - lastTime, 1);
          const deltaY = currentScrollY - lastScrollY;
          const velocity = Math.abs(deltaY / dt);

          const direction: 'up' | 'down' | 'none' =
            deltaY > 1 ? 'down' : deltaY < -1 ? 'up' : 'none';

          setScrollState({
            scrollY: currentScrollY,
            progress,
            direction,
            velocity,
          });

          lastScrollY = currentScrollY;
          lastTime = now;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
}
