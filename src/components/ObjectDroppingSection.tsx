import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Layers } from 'lucide-react';
import { EASINGS } from '../utils/motion';

interface DroppingToken {
  id: string;
  initialRotate: number;
  initialY: number;
  content: React.ReactNode;
}

export const ObjectDroppingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [toggleState, setToggleState] = useState(true);
  const [sliderVal, setSliderVal] = useState(85);
  const [copiedToken, setCopiedToken] = useState(false);

  const handleCopyColor = () => {
    navigator.clipboard.writeText('#f43f5e');
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const tokens: DroppingToken[] = [
    {
      id: 'color-token',
      initialRotate: -9,
      initialY: -220,
      content: (
        <div
          onClick={handleCopyColor}
          data-cursor="CLICK"
          className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl hover:border-rose-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-500 shadow-md shadow-rose-500/40 flex items-center justify-center">
              {copiedToken ? <Check className="w-4 h-4 text-white" /> : null}
            </div>
            <div>
              <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
                Primary Accent
              </div>
              <div className="text-xs font-semibold text-white group-hover:text-rose-400 transition-colors">
                #f43f5e • 4.8:1 AAA
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'toggle-component',
      initialRotate: 8,
      initialY: -260,
      content: (
        <div
          onClick={() => setToggleState(!toggleState)}
          data-cursor="CLICK"
          className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl hover:border-white/20 transition-all cursor-pointer select-none"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
                Micro-Interaction
              </div>
              <div className="text-xs font-semibold text-white">
                Spring Physics
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 ${
                toggleState ? 'bg-rose-500' : 'bg-neutral-800'
              }`}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-5 h-5 rounded-full bg-white shadow-sm ${
                  toggleState ? 'ml-auto' : 'mr-auto'
                }`}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'type-scale-token',
      initialRotate: -6,
      initialY: -210,
      content: (
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider mb-1">
            Typography Scale
          </div>
          <div className="font-display font-bold text-sm text-white tracking-tight flex items-baseline gap-2">
            <span>Display Bold</span>
            <span className="text-[10px] font-mono-code text-rose-400 font-normal">
              Outfit 700 / 1.1x
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'slider-control',
      initialRotate: 11,
      initialY: -240,
      content: (
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl min-w-[200px]">
          <div className="flex justify-between items-center text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider mb-2">
            <span>Damping Ratio</span>
            <span className="text-rose-400 font-semibold">{sliderVal}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            data-cursor="SCRUB"
            aria-label="Damping Ratio Slider"
            className="w-full accent-rose-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
          />
        </div>
      ),
    },
    {
      id: 'status-pill',
      initialRotate: -12,
      initialY: -280,
      content: (
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
              System Audit
            </div>
            <div className="text-xs font-semibold text-emerald-300">
              Zero Layout Shift • 60 FPS
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="drop-section"
      ref={containerRef}
      aria-label="Design System Motion Physics"
      className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/[0.05] text-rose-400 text-xs font-mono-code uppercase tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Physical UI Motion System</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-3">
          Design System Components in Motion
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
          Every token, state transition, and feedback layer is tuned with physical spring dynamics and intentional deceleration.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center max-w-4xl mx-auto">
        {tokens.map((token, index) => (
          <motion.div
            key={token.id}
            initial={{
              opacity: 0,
              y: token.initialY,
              rotate: token.initialRotate,
              scale: 0.88,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 17,
              mass: 0.9,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -4,
              scale: 1.02,
              transition: { duration: 0.2, ease: EASINGS.easeOutQuart },
            }}
            className="w-full"
          >
            {token.content}
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex items-center justify-center">
        <div className="h-12 w-[1px] bg-gradient-to-b from-rose-500/60 to-transparent" />
      </div>
    </section>
  );
};
