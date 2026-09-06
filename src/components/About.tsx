import React from 'react';
import { motion } from 'framer-motion';
import { CinematicVideo } from './CinematicVideo';

export const About: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'FULL-STACK ENGINEERING',
      subtitle: 'Scalable Systems & Dynamic Interfaces',
      desc: 'Building responsive, type-safe web ecosystems using React 19, Next.js, and TypeScript. Designing fluid, interaction-rich frontends engineered to communicate seamlessly with distributed backend microservices.',
    },
    {
      num: '02',
      title: 'BACKEND & SYSTEM ARCHITECTURE',
      subtitle: 'High-Throughput Services & Distributed Data',
      desc: 'Architecting robust APIs, real-time telemetry streaming over MQTT, and decentralized verification protocols. Specializing in Python FastAPI, Node/Express, PostgreSQL, and blockchain smart contracts.',
    },
    {
      num: '03',
      title: 'AI & AUTONOMOUS AGENTS',
      subtitle: 'Multimodal Safety & Cognitive Pipelines',
      desc: 'Engineering low-latency LLM applications with Gemini 1.5, LLaMA 3.3 via Groq, autonomous multi-agent task swarms, and explainable ML ensembles (XGBoost, SHAP) tuned for sub-second inference.',
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Background Section Watermark */}
      <div className="absolute -top-10 -right-10 select-none pointer-events-none opacity-[0.02] text-white font-display font-black text-[14rem] sm:text-[22rem] leading-none">
        01
      </div>

      {/* Atmospheric Line */}
      <div className="w-12 h-[2px] bg-red-500/80 mb-8" />

      {/* Section Identifier */}
      <div className="flex items-center gap-3 text-xs font-mono-code text-neutral-400 tracking-[0.3em] uppercase mb-4">
        <span>[01] // PHILOSOPHY & PROFILE</span>
      </div>

      {/* Section Monumental Statement */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-[0.95] max-w-4xl mb-16"
      >
        Engineering at the convergence of{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
          autonomous AI
        </span>{' '}
        and production-grade software.
      </motion.h2>

      {/* Editorial Narrative Split with Video Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-20 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 font-light text-neutral-300 text-base sm:text-lg leading-relaxed space-y-6 flex flex-col justify-between"
        >
          <p>
            I am a Software Engineer and AI/ML Specialist pursuing my B.Tech in Computer Science & Engineering (AI/ML) at{' '}
            <span className="text-white font-medium">Polaris School of Technology</span> in Bengaluru, India.
          </p>
          <p>
            I treat code as cinema: every architecture has a storyline, every microsecond of latency matters, and every interface should feel intentional, cinematic, and alive.
          </p>
        </motion.div>

        {/* Video Editorial Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40 min-h-[260px]"
        >
          <CinematicVideo
            src="/videos/walking-character.mp4"
            aspectRatio="fill"
            opacity={0.68}
            className="w-full h-full object-cover"
            badge="PROFILE // 24FPS"
            showControls={false}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="lg:col-span-4 flex flex-col justify-between border-l border-white/[0.08] pl-6 sm:pl-8 space-y-6"
        >
          <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
            From deploying multimodal AI safety nets that inspect high-volume user content to orchestrating blockchain-verified supply chains and autonomous agent consensus swarms, my focus is delivering resilient, audit-grade systems.
          </p>
          <div className="flex flex-wrap gap-6 pt-4 font-mono-code text-xs text-neutral-400">
            <div>
              <span className="text-white font-bold text-lg block">36+</span>
              <span className="text-[11px] tracking-wider uppercase text-neutral-500">GitHub Repos</span>
            </div>
            <div>
              <span className="text-red-400 font-bold text-lg block">8</span>
              <span className="text-[11px] tracking-wider uppercase text-neutral-500">Core Systems</span>
            </div>
            <div>
              <span className="text-emerald-400 font-bold text-lg block">&lt;50ms</span>
              <span className="text-[11px] tracking-wider uppercase text-neutral-500">Inference Speed</span>
            </div>
            <div>
              <span className="text-amber-400 font-bold text-lg block">150+</span>
              <span className="text-[11px] tracking-wider uppercase text-neutral-500">DSA Solved</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Three Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/[0.06]">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={pillar.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:border-red-500/40 transition-all duration-500"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono-code text-xs font-bold text-red-500/80 tracking-widest">
                  [{pillar.num}]
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-red-500 transition-colors" />
              </div>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white uppercase tracking-tight mb-2">
                {pillar.title}
              </h3>
              <p className="font-mono-code text-[11px] text-neutral-400 uppercase tracking-wider mb-4">
                {pillar.subtitle}
              </p>
              <p className="font-light text-sm text-neutral-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
