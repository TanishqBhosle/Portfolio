import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { skillCategories } from '../data/skills';
import { TiltCard } from './TiltCard';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Cpu, 
  Wrench, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  'languages': Code2,
  'frontend': Layout,
  'backend': Server,
  'databases': Database,
  'ai-ml': Cpu,
  'tools': Wrench,
  'learning': GraduationCap,
};

const levelToPercent: Record<string, number> = {
  'Advanced': 92,
  'Proficient': 75,
  'Learning': 58,
};

const levelToColor: Record<string, string> = {
  'Advanced': 'from-rose-500 to-rose-400',
  'Proficient': 'from-amber-500 to-amber-400',
  'Learning': 'from-cyan-500 to-cyan-400',
};

const levelBadgeStyles: Record<string, string> = {
  'Advanced': 'text-rose-400/90 bg-rose-500/10 border-rose-500/20',
  'Proficient': 'text-amber-400/90 bg-amber-500/10 border-amber-500/20',
  'Learning': 'text-cyan-400/90 bg-cyan-500/10 border-cyan-500/20',
};

// Animated proficiency bar
const ProficiencyBar: React.FC<{ level: string }> = ({ level }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const percent = levelToPercent[level] || 60;
  const gradient = levelToColor[level] || 'from-rose-500 to-rose-400';

  return (
    <div ref={ref} className="proficiency-bar mt-3">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percent}%` } : { width: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`proficiency-bar-fill bg-gradient-to-r ${gradient}`}
      />
    </div>
  );
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const displayedCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" aria-label="Technical Skills" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      {/* Background Watermark */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-white font-display font-black text-[12rem] sm:text-[18rem] leading-none"
        aria-hidden="true"
      >
        STACK
      </div>

      {/* Atmospheric Line */}
      <div className="w-12 h-[2px] bg-rose-500 mb-6" />

      {/* Section Label */}
      <div className="flex items-center gap-2 text-xs font-mono-code text-rose-400 tracking-widest uppercase mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>TECHNICAL CAPABILITIES</span>
      </div>

      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4"
      >
        Core Technical{' '}
        <span className="text-gradient-animated">
          Proficiencies
        </span>
      </motion.h2>

      <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10">
        Technologies, architectures, and foundational disciplines across production engineering, server systems, and continuous exploration.
      </p>

      {/* Interactive Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/[0.08] pb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeCategory === 'all'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/10'
              : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06] hover:bg-white/[0.06]'
            }`}
        >
          All Domains
        </button>

        {skillCategories.map((category) => {
          const Icon = categoryIcons[category.id] || Sparkles;
          const isActive = activeCategory === category.id;
          const isLearning = category.id === 'learning';
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? isLearning
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/10'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{category.title}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Categories Display */}
      <div className="space-y-12 sm:space-y-16">
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((category, catIdx) => {
            const Icon = categoryIcons[category.id] || Sparkles;
            const isLearningCategory = category.id === 'learning';
            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, delay: catIdx * 0.04 }}
                className="pt-4"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${
                      isLearningCategory
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
                    {category.description}
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.skills.map((skill, sIdx) => {
                    const isLearning = skill.level === 'Learning';
                    const glowColor = isLearning ? 'rgba(6, 182, 212, 0.15)' : 'rgba(244, 63, 94, 0.15)';
                    const badgeStyle = levelBadgeStyles[skill.level] || 'text-rose-400/90 bg-rose-500/10 border-rose-500/20';

                    return (
                      <motion.div
                        key={sIdx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: sIdx * 0.04 }}
                      >
                        <TiltCard 
                          className="rounded-xl h-full" 
                          tiltIntensity={6}
                          glowColor={glowColor}
                        >
                          <div className="p-4 sm:p-5 rounded-xl cinematic-card-premium h-full flex flex-col justify-between group">
                            <div className="relative z-10">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-rose-300 transition-colors">
                                  {skill.name}
                                </span>
                                <span className={`shrink-0 text-[10px] font-mono-code px-2 py-0.5 rounded border ${badgeStyle}`}>
                                  {skill.level}
                                </span>
                              </div>

                              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                                {skill.experience}
                              </p>

                              {/* Animated proficiency bar */}
                              <ProficiencyBar level={skill.level} />
                            </div>

                            <div className="relative z-10 mt-4 pt-2 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] font-mono-code">
                              {isLearning ? (
                                <>
                                  <BookOpen className="w-3 h-3 text-cyan-400/80" />
                                  <span className="text-cyan-400/80">In active focus</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-rose-400/80" />
                                  <span className="text-neutral-400">Production verified</span>
                                </>
                              )}
                            </div>
                          </div>
                        </TiltCard>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};
