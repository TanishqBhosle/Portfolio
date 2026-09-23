import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { timelineEvents } from '../data/timeline';
import { Calendar, MapPin, Milestone } from 'lucide-react';

const TimelineDot: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full flex items-center justify-center ${isActive ? 'timeline-dot-active' : ''}`}>
    <div className="w-3.5 h-3.5 rounded-full bg-[#07070a] border-2 border-rose-500" />
    {isActive && (
      <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
    )}
  </div>
);

const TimelineEntry: React.FC<{ event: typeof timelineEvents[0]; idx: number }> = ({ event, idx }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      key={idx}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      {/* Timeline Marker Dot with glow */}
      <TimelineDot isActive={isInView} />

      {/* Year & Period Header */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-2.5">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight"
        >
          {event.year}
        </motion.span>
        <span className="inline-flex items-center gap-1.5 font-mono-code text-xs text-rose-300 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
          <Calendar className="w-3 h-3" />
          <span>{event.period}</span>
        </span>
        <span className="inline-flex items-center gap-1 font-mono-code text-xs text-neutral-400">
          <MapPin className="w-3 h-3 text-neutral-400" />
          <span>{event.location}</span>
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-2.5">
        {event.title}
      </h3>

      {/* Description */}
      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-3xl mb-5 font-normal">
        {event.description}
      </p>

      {/* Highlights Grid with stagger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-w-3xl">
        {event.highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            className="p-3 rounded-xl cinematic-card-premium text-xs text-neutral-300 leading-relaxed flex items-start gap-2.5"
          >
            <span className="text-rose-400 font-mono-code font-bold shrink-0 mt-0.5">›</span>
            <span>{h}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked progress for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="timeline"
      aria-label="Career Journey and Milestones"
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background Section Watermark */}
      <div
        className="absolute top-1/3 left-0 select-none pointer-events-none opacity-[0.02] text-white font-display font-black text-[12rem] sm:text-[18rem] leading-none"
        aria-hidden="true"
      >
        JOURNEY
      </div>

      {/* Atmospheric Line */}
      <div className="w-12 h-[2px] bg-rose-500 mb-6" />

      {/* Section Label */}
      <div className="flex items-center gap-2 text-xs font-mono-code text-rose-400 tracking-widest uppercase mb-4">
        <Milestone className="w-3.5 h-3.5" />
        <span>JOURNEY & MILESTONES</span>
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4"
      >
        Academic &{' '}
        <span className="text-gradient-animated">
          Professional Trajectory
        </span>
      </motion.h2>

      <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-16">
        Milestones documenting academic specialization at Polaris School of Technology, distributed systems engineering, and autonomous agent systems.
      </p>

      {/* Vertical Continuous Timeline with scroll-linked progress */}
      <div className="relative ml-3 sm:ml-8 pl-6 sm:pl-10 space-y-14 sm:space-y-20">
        {/* Static background line */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.06]" />

        {/* Animated progress line that fills as you scroll */}
        <motion.div
          className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-rose-500 via-rose-400 to-rose-500 origin-top"
          style={{ height: lineHeight }}
        />

        {timelineEvents.map((event, idx) => (
          <TimelineEntry key={idx} event={event} idx={idx} />
        ))}
      </div>
    </section>
  );
};
