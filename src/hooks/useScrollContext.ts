import { createContext, useContext } from 'react';
import type { ScrollProgress } from './useScrollProgress';

export const ScrollContext = createContext<ScrollProgress>({
  scrollY: 0,
  progress: 0,
  direction: 'none',
  velocity: 0,
});

export const useScrollContext = () => useContext(ScrollContext);
