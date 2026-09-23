import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CinematicVideo } from './CinematicVideo';
import { TiltCard } from './TiltCard';
import { Cpu, Globe, Server } from 'lucide-react';

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 2000, suffix: string = '') {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
        setDone(true);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return { count, done, ref, suffix };
}

const AnimatedStat: React.FC<{
  target: number;
  suffix: string;
  label: string;
  color?: string;
  prefix?: string;
}> = ({ target, suffix, label, color = 'text-white', prefix = '' }) => {
  const { count, done, ref } = useAnimatedCounter(target, 2000);

  return (
    <div ref={ref}>
      <span
        className={`${color} font-bold text-xl sm:text-2xl font-mono-code block transition-all ${done ? 'animate-[counter-flash_0.6s_ease-out]' : ''}`}
      >
        {prefix}{count}{suffix}
      </span>
      <span className="text-[11px] font-mono-code tracking-wider uppercase text-neutral-400">
        {label}
      </span>
    </div>
  );
};

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Globe,
      num: '01',
      title: 'Full-Stack Engineering',
      subtitle: 'Scalable Systems & Dynamic Interfaces',
      desc: 'Building responsive, type-safe web ecosystems using React 19, Next.js, and TypeScript. Designing fluid, interaction-rich frontends engineered to communicate seamlessly with distributed backend microservices.',
      glowColor: 'rgba(59, 130, 246, 0.12)',
    },
    {
      icon: Server,
      num: '02',
      title: 'Backend & System Architecture',
      subtitle: 'High-Throughput Services & Distributed Data',
      desc: 'Architecting robust APIs, real-time telemetry streaming over MQTT, and decentralized verification protocols. Specializing in Python FastAPI, Node/Express, PostgreSQL, and blockchain smart contracts.',
      glowColor: 'rgba(16, 185, 129, 0.12)',
    },
    {
      icon: Cpu,
      num: '03',
      title: 'AI & Autonomous Agents',
      subtitle: 'Multimodal Safety & Cognitive Pipelines',
      desc: 'Engineering low-latency LLM applications with Gemini 1.5, LLaMA 3.3 via Groq, autonomous multi-agent task swarms, and explainable ML ensembles (XGBoost, SHAP) tuned for sub-second inference.',
      glowColor: 'rgba(244, 63, 94, 0.12)',
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Me"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden max-w-6xl mx-auto flex flex-col justify-center"
    >
      {/* Background Section Watermark */}
      <div
        className="absolute -top-10 -right-10 select-none pointer-events-none opacity-[0.02] text-white font-display font-black text-[12rem] sm:text-[20rem] leading-none"
        aria-hidden="true"
      >
        01
      </div>

      {/* Atmospheric Line */}
      <div className="w-12 h-[2px] bg-rose-500 mb-6" />

      {/* Section Identifier */}
      <div className="flex items-center gap-2 text-xs font-mono-code text-rose-400 tracking-widest uppercase mb-4">
        <span>ABOUT & PHILOSOPHY</span>
      </div>

      {/* Section Monumental Statement */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] max-w-4xl mb-14"
      >
        Engineering at the convergence of{' '}
        <span className="text-gradient-animated">
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
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 font-normal text-neutral-300 text-sm sm:text-base leading-relaxed space-y-5 flex flex-col justify-between"
        >
          <p>
            I am a Software Engineer and AI/ML Specialist pursuing my B.Tech in Computer Science & Engineering (AI/ML) at{' '}
            <span className="text-white font-semibold">Polaris School of Technology</span> in Bengaluru, India.
          </p>
          <p className="text-neutral-400">
            I believe software should be crafted with intentionality: every architecture has a concrete purpose, latency is treated as a core design metric, and user interfaces should feel fluid, intuitive, and alive.
          </p>
        </motion.div>

        {/* Video Editorial Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/60 min-h-[250px]"
        >
          <CinematicVideo
            src="/videos/walking-character.mp4"
            aspectRatio="fill"
            opacity={0.7}
            className="w-full h-full object-cover"
            badge="PROFILE • 2026"
            showControls={false}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-4 flex flex-col justify-between border-l border-white/[0.08] pl-6 sm:pl-8 space-y-6"
        >
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            From deploying multimodal AI safety nets that inspect high-volume user content to orchestrating blockchain-verified supply chains and autonomous agent swarms, my focus is delivering resilient, audit-grade systems.
          </p>

          {/* Animated Verified Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
            <AnimatedStat target={36} suffix="+" label="GitHub Repos" />
            <AnimatedStat target={8} suffix="" label="Flagship Systems" color="text-rose-400" />
            <AnimatedStat target={50} suffix="ms" label="Inference Latency" color="text-emerald-400" prefix="<" />
            <AnimatedStat target={150} suffix="+" label="DSA Solved" color="text-amber-400" />
          </div>
        </motion.div>
      </div>

      {/* Three Architectural Pillars with Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/[0.06]">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              <TiltCard
                className="rounded-2xl"
                glowColor={pillar.glowColor}
                tiltIntensity={8}
              >
                <div className="p-6 sm:p-7 rounded-2xl cinematic-card-premium noise-overlay">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono-code text-xs font-semibold text-rose-400/80 tracking-widest">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="font-mono-code text-xs text-rose-300/80 mb-3 font-medium">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
