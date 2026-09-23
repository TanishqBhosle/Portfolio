import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { skillCategories } from '../data/skills';
import { TiltCard3D } from './TiltCard3D';
import { TechCore3D } from './TechCore3D';
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
  BookOpen,
  Layers,
  Activity
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

const categoryGlowColors: Record<string, { glow: string; highlight: string; accent: string }> = {
  'languages': { glow: 'rgba(244, 63, 94, 0.22)', highlight: 'rgba(251, 113, 133, 0.25)', accent: '#f43f5e' },
  'frontend': { glow: 'rgba(244, 63, 94, 0.22)', highlight: 'rgba(251, 113, 133, 0.25)', accent: '#f43f5e' },
  'backend': { glow: 'rgba(168, 85, 247, 0.22)', highlight: 'rgba(192, 132, 252, 0.25)', accent: '#a855f7' },
  'databases': { glow: 'rgba(245, 158, 11, 0.22)', highlight: 'rgba(251, 191, 36, 0.25)', accent: '#f59e0b' },
  'ai-ml': { glow: 'rgba(6, 182, 212, 0.22)', highlight: 'rgba(56, 189, 248, 0.25)', accent: '#06b6d4' },
  'tools': { glow: 'rgba(16, 185, 129, 0.22)', highlight: 'rgba(52, 211, 153, 0.25)', accent: '#10b981' },
  'learning': { glow: 'rgba(99, 102, 241, 0.25)', highlight: 'rgba(6, 182, 212, 0.3)', accent: '#6366f1' },
};

const levelToPercent: Record<string, number> = {
  'Advanced': 92,
  'Proficient': 75,
  'Learning': 58,
};

const levelToColor: Record<string, string> = {
  'Advanced': 'from-rose-500 via-rose-400 to-rose-300',
  'Proficient': 'from-amber-500 via-amber-400 to-amber-300',
  'Learning': 'from-cyan-500 via-sky-400 to-indigo-400',
};

const levelBadgeStyles: Record<string, string> = {
  'Advanced': 'text-rose-300 bg-rose-500/15 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.25)]',
  'Proficient': 'text-amber-300 bg-amber-500/15 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.25)]',
  'Learning': 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.25)]',
};

// 3D Animated proficiency bar
const ProficiencyBar3D: React.FC<{ level: string; colorKey: string }> = ({ level }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const percent = levelToPercent[level] || 60;
  const gradient = levelToColor[level] || 'from-rose-500 to-rose-400';

  return (
    <div 
      ref={ref} 
      className="relative mt-3.5 h-[4px] w-full rounded-full bg-white/[0.06] overflow-hidden"
      style={{ transform: 'translateZ(18px)' }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percent}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_10px_currentColor]`}
      />
    </div>
  );
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const totalSkillsCount = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  const displayedCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter((c) => c.id === activeCategory);

  const activeCategoryObj = skillCategories.find(c => c.id === activeCategory);
  const currentCategoryTitle = activeCategoryObj ? activeCategoryObj.title : 'All Technical Domains';

  return (
    <section id="skills" aria-label="Technical Skills" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      {/* 3D Atmospheric Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-rose-500/10 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Cybernetic Watermark */}
      <div
        className="absolute top-12 right-0 select-none pointer-events-none opacity-[0.02] text-white font-display font-black text-[12rem] sm:text-[18rem] leading-none -z-10"
        aria-hidden="true"
      >
        CORE 3D
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          {/* Atmospheric Line */}
          <div className="w-12 h-[2px] bg-gradient-to-r from-rose-500 to-cyan-400 mb-6" />

          {/* Section Label */}
          <div className="flex items-center gap-2 text-xs font-mono-code text-rose-400 tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>3D SPATIAL KERNEL // CAPABILITY MATRIX</span>
          </div>

          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight"
          >
            Core Technical{' '}
            <span className="text-gradient-animated">
              Proficiencies
            </span>
          </motion.h2>
        </div>

        {/* Live HUD telemetry pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start md:self-end">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono-code text-emerald-400 font-semibold">ONLINE</span>
          </div>
          <span className="text-neutral-500 text-xs">|</span>
          <span className="text-[11px] font-mono-code text-neutral-300">
            {totalSkillsCount} CAPABILITIES LOADED
          </span>
          <Activity className="w-3.5 h-3.5 text-neutral-400" />
        </div>
      </div>

      <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8">
        Interactive 3D representation of engineering disciplines, systems design, production stacks, and frontier computational learning.
      </p>

      {/* ========================================================================= */}
      {/* 3D TECH CORE VISUALIZER (Real-Time Three.js Quantum Icosahedron + Rings) */}
      {/* ========================================================================= */}
      <TechCore3D
        activeCategory={activeCategory}
        categoryTitle={currentCategoryTitle}
        totalSkills={activeCategory === 'all' ? totalSkillsCount : (activeCategoryObj?.skills.length || 0)}
      />

      {/* Cybernetic Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/[0.08] pb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono-code transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-500/20 scale-[1.02]'
              : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06] hover:bg-white/[0.06]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Domains ({totalSkillsCount})</span>
        </button>

        {skillCategories.map((category) => {
          const Icon = categoryIcons[category.id] || Sparkles;
          const isActive = activeCategory === category.id;
          const isLearning = category.id === 'learning';
          const theme = categoryGlowColors[category.id] || categoryGlowColors['languages'];

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono-code transition-all cursor-pointer ${
                isActive
                  ? isLearning
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-500/20 scale-[1.02]'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: isActive ? theme.accent : undefined }} />
              <span>{category.title}</span>
              <span className="text-[10px] opacity-60">({category.skills.length})</span>
            </button>
          );
        })}
      </div>

      {/* Skills Categories Display with 3D Spatial Cards */}
      <div className="space-y-14 sm:space-y-20">
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((category, catIdx) => {
            const Icon = categoryIcons[category.id] || Sparkles;
            const theme = categoryGlowColors[category.id] || categoryGlowColors['languages'];

            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: catIdx * 0.05 }}
                className="pt-2"
              >
                {/* Category Header with Cybernetic Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2.5 rounded-xl border backdrop-blur-md shadow-md"
                      style={{
                        backgroundColor: `${theme.accent}15`,
                        borderColor: `${theme.accent}35`,
                        color: theme.accent,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2">
                        {category.title}
                        <span 
                          className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border uppercase"
                          style={{
                            backgroundColor: `${theme.accent}12`,
                            borderColor: `${theme.accent}30`,
                            color: theme.accent,
                          }}
                        >
                          {category.skills.length} modules
                        </span>
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* 3D Spatial Grid */}
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
                  style={{ perspective: 1200 }}
                >
                  {category.skills.map((skill, sIdx) => {
                    const isLearning = skill.level === 'Learning';
                    const badgeStyle = levelBadgeStyles[skill.level] || 'text-rose-300 bg-rose-500/15 border-rose-500/30';

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: sIdx * 0.04 }}
                        className="h-full"
                      >
                        <TiltCard3D
                          className="rounded-2xl h-full"
                          tiltIntensity={15}
                          glowColor={theme.glow}
                          highlightColor={theme.highlight}
                        >
                          <div 
                            className="p-5 rounded-2xl h-full flex flex-col justify-between bg-gradient-to-b from-[#12131d]/90 via-[#0d0e16]/95 to-[#090a10]/95 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden group shadow-lg"
                            style={{ transformStyle: 'preserve-3d' }}
                          >
                            {/* Subtle 3D Depth Circuit Watermark in Background */}
                            <div 
                              className="absolute top-2 right-2 opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none select-none text-white"
                              style={{ transform: 'translateZ(6px)' }}
                            >
                              <Icon className="w-20 h-20 -mr-4 -mt-4" />
                            </div>

                            {/* Top Content Layer with 3D Pop */}
                            <div style={{ transformStyle: 'preserve-3d' }}>
                              <div 
                                className="flex items-start justify-between gap-2 mb-2.5"
                                style={{ transform: 'translateZ(26px)' }}
                              >
                                <span className="font-display font-bold text-base sm:text-lg text-white group-hover:text-rose-200 transition-colors drop-shadow-md">
                                  {skill.name}
                                </span>
                                <span 
                                  className={`shrink-0 text-[10px] font-mono-code font-semibold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}
                                  style={{ transform: 'translateZ(36px)' }}
                                >
                                  {skill.level}
                                </span>
                              </div>

                              <p 
                                className="text-xs text-neutral-400 leading-relaxed font-normal"
                                style={{ transform: 'translateZ(14px)' }}
                              >
                                {skill.experience}
                              </p>

                              {/* 3D Animated Progress Bar */}
                              <ProficiencyBar3D level={skill.level} colorKey={category.id} />
                            </div>

                            {/* Card Footer Tag with 3D Depth */}
                            <div 
                              className="relative mt-5 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono-code"
                              style={{ transform: 'translateZ(22px)' }}
                            >
                              {isLearning ? (
                                <div className="flex items-center gap-1.5 text-cyan-400">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>In Active Study</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 text-rose-400/90">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span className="text-neutral-400">Production Verified</span>
                                </div>
                              )}

                              <span className="text-[10px] text-neutral-400 group-hover:text-white transition-colors">
                                0{sIdx + 1}
                              </span>
                            </div>
                          </div>
                        </TiltCard3D>
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
