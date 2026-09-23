import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Type,
  Check,
  Search,
  Loader2,
  Component
} from 'lucide-react';
import { EASINGS } from '../utils/motion';

export const DesignSystemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'components' | 'foundations'>('components');

  const [btnLoading, setBtnLoading] = useState(false);
  const [switchActive, setSwitchActive] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<'day' | 'week' | 'month'>('week');
  const [inputValue, setInputValue] = useState('');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleSimulateLoad = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  const colorTokens = [
    { name: 'Canvas Dark', token: '--bg-dark', hex: '#07070a', contrast: '21:1 AAA', role: 'Main Background' },
    { name: 'Surface Glass', token: '--bg-surface', hex: '#0e0e13', contrast: '19.4:1 AAA', role: 'Card & Container Surfaces' },
    { name: 'Primary Rose', token: '--accent-rose', hex: '#f43f5e', contrast: '4.8:1 AAA', role: 'Primary CTAs & Active States' },
    { name: 'Warning Amber', token: '--accent-amber', hex: '#f59e0b', contrast: '8.2:1 AAA', role: 'Provenance & Alerts' },
    { name: 'Success Emerald', token: '--accent-emerald', hex: '#10b981', contrast: '6.4:1 AAA', role: 'Verified States & Online' },
    { name: 'Text Primary', token: '--text-primary', hex: '#f8fafc', contrast: '18:1 AAA', role: 'Headlines & Key Copy' },
  ];

  const typographyTokens = [
    { label: 'Display Hero', family: 'Outfit', weight: '900 Black', size: '56px / 1.05', sample: 'Thoughtful Design' },
    { label: 'Heading 1', family: 'Outfit', weight: '700 Bold', size: '32px / 1.15', sample: 'Interaction Architecture' },
    { label: 'Body Text', family: 'Inter', weight: '400 Regular', size: '15px / 1.6', sample: 'Bridging user ergonomics and engineering precision.' },
    { label: 'Mono Code Token', family: 'JetBrains Mono', weight: '500 Medium', size: '12px / 1.4', sample: 'SPRING_PHYSICS // 450 STIFFNESS' },
  ];

  return (
    <section id="design-system" aria-label="Design System Showcase" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mb-14 text-left">
        <div className="w-12 h-[2px] bg-rose-500 mb-6" />

        <div className="flex items-center gap-2 text-xs font-mono-code text-rose-400 tracking-widest uppercase mb-3">
          <Component className="w-3.5 h-3.5" />
          <span>UI SYSTEM & FOUNDATIONS</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASINGS.easeCinematic }}
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4"
        >
          Design System &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-amber-200">
            Component Architecture
          </span>
        </motion.h2>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
          A living demonstration of systematic UI craft. Every token, color harmony, typography scale, and micro-state is engineered for consistency and accessibility.
        </p>

        <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
          <button
            onClick={() => setActiveTab('components')}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'components'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Interactive UI Components
          </button>
          <button
            onClick={() => setActiveTab('foundations')}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'foundations'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Tokens: Color & Typography
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'components' ? (
          <motion.div
            key="components-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
          >
            <div className="p-6 rounded-2xl cinematic-card space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono-code text-rose-400 font-semibold uppercase">
                  Buttons & State Machine
                </span>
                <span className="text-[10px] font-mono-code text-neutral-500">Interactive</span>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <button className="btn-primary w-full py-2.5 text-xs font-semibold cursor-pointer">
                    Primary Button // Shimmer
                  </button>
                </div>
                <div>
                  <button className="btn-secondary w-full py-2.5 text-xs font-medium cursor-pointer">
                    Secondary Glass Button
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleSimulateLoad}
                    disabled={btnLoading}
                    className="w-full py-2.5 px-4 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.07] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {btnLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
                        <span>Simulating Action...</span>
                      </>
                    ) : (
                      <span>Click to Test Async State</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl cinematic-card space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono-code text-rose-400 font-semibold uppercase">
                  Form Input & Focus Glow
                </span>
                <span className="text-[10px] font-mono-code text-neutral-500">Accessible</span>
              </div>

              <div className="pt-2 space-y-4">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search design tokens..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500/80 focus:ring-2 focus:ring-rose-500/20 transition-all"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-500">
                  <span>Feedback: {inputValue ? `Filtering for "${inputValue}"` : 'Idle'}</span>
                  <span>{inputValue.length} chars</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl cinematic-card space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono-code text-rose-400 font-semibold uppercase">
                  Toggles & Segmented Tabs
                </span>
                <span className="text-[10px] font-mono-code text-neutral-500">Spring Physics</span>
              </div>

              <div className="space-y-5 pt-2">
                <div
                  onClick={() => setSwitchActive(!switchActive)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:border-white/10 transition-colors"
                >
                  <span className="text-xs font-medium text-neutral-300">
                    Haptic Sound Feedback
                  </span>
                  <div
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${
                      switchActive ? 'bg-rose-500' : 'bg-neutral-800'
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`w-5 h-5 rounded-full bg-white shadow-sm ${
                        switchActive ? 'ml-auto' : 'mr-auto'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex p-1 rounded-xl bg-black/40 border border-white/10">
                  {(['day', 'week', 'month'] as const).map((seg) => (
                    <button
                      key={seg}
                      onClick={() => setSelectedSegment(seg)}
                      className={`relative flex-1 py-1.5 text-xs font-mono-code uppercase text-center rounded-lg transition-colors cursor-pointer ${
                        selectedSegment === seg ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {selectedSegment === seg && (
                        <motion.div
                          layoutId="segmentedTab"
                          className="absolute inset-0 rounded-lg bg-white/10 border border-white/15"
                        />
                      )}
                      <span className="relative z-10">{seg}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl cinematic-card space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono-code text-rose-400 font-semibold uppercase">
                  Semantic Status Tags
                </span>
                <span className="text-[10px] font-mono-code text-neutral-500">Visual Signals</span>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-code bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE // 60 FPS</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-code bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <span>WARNING // COGNITIVE OVERLOAD</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-code bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  <span>RESTRICTED ACCESS</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-code bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                  <span>TOKEN: RADIUS_FULL</span>
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl cinematic-card space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono-code text-rose-400 font-semibold uppercase">
                  Continuous Parameter Slider
                </span>
                <span className="text-[10px] font-mono-code text-neutral-500">Fine Grain</span>
              </div>

              <div className="pt-2 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono-code text-neutral-400">
                  <span>Framer Motion Spring Stiffness</span>
                  <span className="text-rose-400 font-bold">420</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] font-mono-code text-neutral-500">
                  <span>MIN: 100</span>
                  <span>DEFAULT: 420</span>
                  <span>MAX: 1000</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl cinematic-card space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono-code text-rose-400 font-semibold uppercase">
                  Glassmorphism Material
                </span>
                <span className="text-[10px] font-mono-code text-neutral-500">Backdrop Blur</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                Utilizing 1px hairline border <code className="text-rose-300 font-mono-code">rgba(255,255,255,0.08)</code> and 16px Gaussian blur to create physical layered hierarchy without visual noise.
              </p>
              <div className="text-[10px] font-mono-code text-neutral-500">
                CSS: backdrop-filter: blur(16px);
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="foundations-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-12 text-left"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-400 uppercase tracking-widest mb-4">
                <Palette className="w-3.5 h-3.5 text-rose-400" />
                <span>SEMANTIC COLOR PALETTE & CONTRAST RATIOS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {colorTokens.map((color) => (
                  <div
                    key={color.token}
                    onClick={() => handleCopy(color.hex)}
                    data-cursor="CLICK"
                    className="p-4 rounded-xl cinematic-card flex items-center justify-between cursor-pointer group hover:border-rose-500/40"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg border border-white/10 shadow-md flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        {copiedHex === color.hex && (
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-rose-300 transition-colors">
                          {color.name}
                        </div>
                        <div className="text-[11px] font-mono-code text-neutral-400">
                          {color.hex} • {color.contrast}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-code text-neutral-500 group-hover:text-white transition-colors">
                      {copiedHex === color.hex ? 'COPIED!' : 'COPY'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-400 uppercase tracking-widest mb-4">
                <Type className="w-3.5 h-3.5 text-rose-400" />
                <span>TYPOGRAPHIC SPECIFICATION HIERARCHY</span>
              </div>

              <div className="space-y-3">
                {typographyTokens.map((typeSpec, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl cinematic-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-mono-code text-rose-400 mb-1">
                        {typeSpec.label} // {typeSpec.family} ({typeSpec.weight}) — {typeSpec.size}
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                        {typeSpec.sample}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
