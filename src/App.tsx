import { useState } from 'react';
import { FilmGrain } from './components/FilmGrain';
import { ParticleField } from './components/ParticleField';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SmoothScrollProvider } from './components/SmoothScroll';

export function App() {
  const [replayCount, setReplayCount] = useState(0);

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReplayCount((c) => c + 1);
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#050507] text-[#f1f5f9] selection:bg-red-500/30 selection:text-white">
        {/* Interactive Custom Spring Cursor */}
        <CustomCursor />

        {/* 3D Celestial Particle Universe (Three.js) */}
        <ParticleField />

        {/* 35mm Analog Film Grain Filter */}
        <FilmGrain />

        {/* Vignette Lighting Filter */}
        <div className="fixed inset-0 vignette-overlay z-10 pointer-events-none" />

        {/* Floating Navigation Bar (always clean & accessible at top) */}
        <Navigation onReplayIntro={handleReplayIntro} />

        {/* Scene Flow: Hero (clean video + 4.5s I AM TANISHQ reveal) -> Downstream scroll sections */}
        <main className="relative z-20">
          <Hero replayKey={replayCount} />
          <About />
          <Projects />
          <Skills />
          <Timeline />
          <Contact />
        </main>

        {/* Footer Finale */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
