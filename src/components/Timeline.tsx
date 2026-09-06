import React from 'react';
import { motion } from 'framer-motion';
import { timelineEvents } from '../data/timeline';

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="relative py-28 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      {/* Background Section Watermark */}
      <div className="absolute top-1/3 left-0 select-none pointer-events-none opacity-[0.02] text-white font-display font-black text-[14rem] sm:text-[22rem] leading-none">
        JOURNEY
      </div>

      {/* Atmospheric Line */}
      <div className="w-12 h-[2px] bg-red-500/80 mb-8" />

      {/* Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono-code text-neutral-400 tracking-[0.3em] uppercase mb-4">
        <span>[04] // TRAJECTORY & CHRONOLOGY</span>
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-none mb-6"
      >
        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">Chronicle</span>
      </motion.h2>

      <p className="font-light text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-20">
        Milestones documenting academic specialization at Polaris School of Technology, distributed systems engineering, and autonomous agent systems.
      </p>

      {/* Vertical Continuous Cinematic Timeline */}
      <div className="relative border-l border-white/[0.08] ml-4 sm:ml-12 pl-6 sm:pl-12 space-y-16 sm:space-y-24">
        {timelineEvents.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-3 h-3 rounded-full bg-neutral-900 border-2 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />

            {/* Year & Period Header */}
            <div className="flex flex-wrap items-baseline gap-3 sm:gap-6 mb-3">
              <span className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                {event.year}
              </span>
              <span className="font-mono-code text-xs text-red-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-red-950/40 border border-red-500/20">
                {event.period}
              </span>
              <span className="font-mono-code text-xs text-neutral-400 uppercase tracking-wider">
                {event.location}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-100 uppercase tracking-tight mb-3">
              {event.title}
            </h3>

            {/* Description */}
            <p className="font-light text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
              {event.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
              {event.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.05] text-xs font-light text-neutral-400 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="text-red-500 font-mono-code shrink-0">›</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
