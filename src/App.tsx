import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { IntroSequence } from './components/IntroSequence';
import { SmoothScrollProvider } from './components/SmoothScroll';
import { FloatingOrbs } from './components/FloatingOrbs';
import { SectionDivider } from './components/SectionDivider';

export function App() {
  const [replayCount, setReplayCount] = useState(0);
  const [showIntro, setShowIntro] = useState(() => {
    // Check if intro has already been shown in this session
    try {
      return !sessionStorage.getItem('intro_shown');
    } catch {
      return true;
    }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('intro_shown', 'true');
    } catch {
      // Ignore storage errors in private browsing
    }
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReplayCount((c) => c + 1);
    setShowIntro(true);
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#07070a] text-[#f8fafc] selection:bg-rose-500/30 selection:text-white">
        {/* Minimal Luxury Top Scroll Progress */}
        <ScrollProgress />

        {/* 1.4s Sleek Name Reveal (Once per session or on replay) */}
        {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

        {/* Contextual Custom Spring Cursor (Disabled on mobile/touch) */}
        <CustomCursor />

        {/* Floating Atmospheric Background Orbs */}
        <FloatingOrbs />

        {/* Studio Atmospheric Vignette & Subtle Background Grid */}
        <div className="fixed inset-0 vignette-overlay z-10 pointer-events-none opacity-80" />
        <div className="fixed inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none z-0 opacity-40" />

        {/* Noise texture overlay for film-grain depth */}
        <div className="fixed inset-0 pointer-events-none z-[5] noise-overlay" />

        {/* Floating Glass Navigation */}
        <Navigation onReplayIntro={handleReplayIntro} />

        {/* Main UI/UX Storytelling Flow */}
        <main className="relative z-20">
          <Hero replayKey={replayCount} />
          <SectionDivider className="my-4" />
          <About />
          <SectionDivider className="my-4" />
          <Projects />
          <SectionDivider className="my-4" />
          <Skills />
          <SectionDivider className="my-4" />
          <Timeline />
          <SectionDivider className="my-4" />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
