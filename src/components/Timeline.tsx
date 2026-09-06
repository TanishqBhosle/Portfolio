import React, { useState } from 'react';
import { Clock, MapPin, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { timelineEvents } from '../data/timeline';
import { SectionReveal } from './SectionReveal';

export const Timeline: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeEvent = timelineEvents[selectedIdx];

  return (
    <section id="timeline" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs uppercase tracking-widest mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>TRAJECTORY & CHRONOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight mb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Milestone Engine</span>
        </h2>
        <p className="text-zinc-400 font-light leading-relaxed text-base sm:text-lg">
          An interactive chronicle documenting my academic specialization at Polaris School of Technology, system launches, and ongoing research into autonomous models.
        </p>
      </SectionReveal>

      {/* Interactive Time-Rail Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
        {timelineEvents.map((evt, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-28 ${
                isSelected
                  ? 'bg-red-950/30 border-red-500/60 shadow-xl shadow-red-950/40 translate-y-[-2px]'
                  : 'bg-zinc-950/60 border-white/5 hover:border-white/20 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`font-mono text-xs font-bold ${isSelected ? 'text-red-400' : 'text-zinc-500'}`}>
                  {evt.year}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>

              <div>
                <span className="block text-xs font-display font-bold text-white line-clamp-1">
                  {evt.period}
                </span>
                <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
                  {evt.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Featured Milestone Display Card */}
      <SectionReveal delay={0.2} className="p-8 sm:p-12 rounded-3xl bg-[#0b0b10] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-red-950/40 text-red-400 border border-red-500/30 font-mono text-xs uppercase tracking-wider">
              {activeEvent.category}
            </span>
            <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {activeEvent.year}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{activeEvent.location}</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
          {activeEvent.title}
        </h3>

        <p className="text-base sm:text-lg font-light text-zinc-300 leading-relaxed max-w-3xl mb-8">
          {activeEvent.description}
        </p>

        {/* Milestone highlights */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>KEY ACHIEVEMENTS & MILESTONE IMPACT</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeEvent.highlights.map((highlight, i) => (
              <div key={i} className="p-5 rounded-2xl bg-zinc-950/80 border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-xs text-zinc-300 font-light leading-relaxed">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
