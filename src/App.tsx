import { useState, useEffect } from 'react';
import { FilmGrain } from './components/FilmGrain';
import { ParticleField } from './components/ParticleField';
import { IntroSequence } from './components/IntroSequence';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('tanishq_portfolio_intro_seen');
    if (hasSeen === 'true') {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('tanishq_portfolio_intro_seen', 'true');
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#f8fafc] selection:bg-red-500/30 selection:text-red-200">
      {/* 3D Particle Universe Canvas (Three.js) */}
      <ParticleField />

      {/* Cinematic 35mm Film Grain Overlay */}
      <FilmGrain />

      {/* Vignette Lighting Filter */}
      <div className="fixed inset-0 vignette-overlay z-10 pointer-events-none" />

      {/* Cinematic Intro Sequence */}
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

      {/* Primary Floating Navigation */}
      <Navigation onReplayIntro={handleReplayIntro} />

      {/* Core Portfolio Sections */}
      <main className="relative z-20">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
