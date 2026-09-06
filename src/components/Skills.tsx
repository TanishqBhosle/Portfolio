import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';
import { CinematicVideo } from './CinematicVideo';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-white font-display font-black text-[14rem] sm:text-[22rem] leading-none">
        STACK
      </div>

      {/* Atmospheric Line */}
      <div className="w-12 h-[2px] bg-red-500/80 mb-8" />

      {/* Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono-code text-neutral-400 tracking-[0.3em] uppercase mb-4">
        <span>[03] // TECHNICAL ARSENAL</span>
      </div>

      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-none mb-6"
      >
        Capabilities & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">Tooling</span>
      </motion.h2>

      <p className="font-light text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-12">
        Technologies mastered through production engineering, open-source repositories, and autonomous system research.
      </p>

      {/* Featured AI Neural Interface Cinematic Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl overflow-hidden border border-red-500/20 bg-gradient-to-br from-red-950/20 via-black/80 to-zinc-950/60 p-6 sm:p-8 mb-16 backdrop-blur-md group"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Video Preview Aspect */}
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <CinematicVideo
              src="/videos/ai-universe.mp4"
              aspectRatio="16:9"
              opacity={0.88}
              className="w-full h-full"
              badge="NEURAL PIPELINE // 24FPS"
              showControls={true}
            />
          </div>

          {/* Telemetry & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-2 font-mono-code text-[11px] text-red-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>COGNITIVE RUNTIME ENGINE</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Multimodal AI & Neural Swarms
            </h3>

            <p className="text-sm font-light text-neutral-300 leading-relaxed">
              Orchestrating sub-50ms inference workflows, autonomous multi-agent task swarms with consensus resolution, and production guardrails powered by Gemini 1.5, Groq LPUs, and LangChain.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 font-mono-code text-[10px] text-neutral-400">
              <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">GEMINI 1.5 FLASH</span>
              <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">GROQ LPU</span>
              <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">LANGCHAIN SWARMS</span>
              <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">FASTAPI ASYNC</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cascading Categories */}
      <div className="space-y-16 sm:space-y-24">
        {skillCategories.map((category, catIdx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: catIdx * 0.1 }}
            className="border-t border-white/[0.08] pt-10"
          >
            {/* Category Header Row */}
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono-code text-xs text-red-500 font-bold tracking-widest">
                  0{catIdx + 1}
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  {category.title}
                </h3>
              </div>
              <p className="font-light text-neutral-400 text-sm max-w-lg">
                {category.description}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-xl bg-white/[0.015] border border-white/[0.05] hover:border-red-500/40 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-bold text-white text-base group-hover:text-red-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="font-mono-code text-[10px] text-neutral-400 uppercase tracking-widest px-2 py-0.5 rounded border border-white/[0.08]">
                        {skill.level}
                      </span>
                    </div>
                    <p className="font-mono-code text-xs text-neutral-400 leading-relaxed">
                      {skill.experience}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
