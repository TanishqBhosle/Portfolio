import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { ScrollContext } from '../hooks/useScrollContext';

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollData = useScrollProgress();

  return (
    <ScrollContext.Provider value={scrollData}>
      {children}
    </ScrollContext.Provider>
  );
};
