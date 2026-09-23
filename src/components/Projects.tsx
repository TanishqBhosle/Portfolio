import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { ProjectScene } from './ProjectScene';
import { GithubIcon } from './Icons';
import { ExternalLink, Code2, Layers } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'fullstack' | 'web3'>('all');

  // Filter projects by active tab
  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.category.includes('AI') || p.category.includes('Machine Learning');
    if (filter === 'fullstack') return p.category.includes('Full-Stack');
    if (filter === 'web3') return p.category.includes('Web3') || p.category.includes('Autonomous');
    return true;
  });

  // Top featured projects vs additional projects
  const featuredList = filteredProjects.filter((p) => p.featured);
  const secondaryList = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
        <div className="w-12 h-[2px] bg-rose-500 mb-6" />

        <div className="flex items-center gap-2 text-xs font-mono-code text-rose-400 tracking-widest uppercase mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>PRODUCTION ARCHITECTURES & SYSTEMS</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4"
        >
          Selected{' '}
          <span className="text-gradient-animated">
            Engineering Projects
          </span>
        </motion.h2>

        <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8">
          Production systems engineered across multimodal safety, distributed supply chains, predictive machine learning, and autonomous agent swarms.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-6">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai', label: 'AI & Machine Learning' },
            { id: 'fullstack', label: 'Full-Stack Architecture' },
            { id: 'web3', label: 'Web3 & Autonomous Agents' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${filter === tab.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/10'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects — Full Viewport Slides */}
      {featuredList.length > 0 && (
        <div className="space-y-0">
          {featuredList.map((project, idx) => (
            <ProjectScene key={project.id} project={project} index={idx} total={featuredList.length} />
          ))}
        </div>
      )}

      {/* Additional Projects Grid */}
      {secondaryList.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24">
          <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-400 uppercase tracking-widest mb-6">
            <Code2 className="w-3.5 h-3.5 text-rose-400" />
            <span>ADDITIONAL SPECIALIZED PLATFORMS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {secondaryList.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
};

// Compact Secondary Project Card Component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <TiltCard
        className="rounded-2xl"
        glowColor={`${project.accentColor}20`}
        tiltIntensity={6}
      >
        <div className="p-6 sm:p-7 rounded-2xl cinematic-card-premium noise-overlay flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span className="text-xs font-medium font-mono-code" style={{ color: project.accentColor }}>
                  {project.category}
                </span>
              </div>
              {project.liveUrl && (
                <span className="flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live</span>
                </span>
              )}
            </div>

            <h4 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
              {project.title}
            </h4>

            <p className="text-xs sm:text-sm text-neutral-300 font-normal mb-4 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono-code text-neutral-400 hover:border-white/15 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-2 py-0.5 rounded bg-white/[0.02] text-[10px] font-mono-code text-neutral-500">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          </div>

          {/* Card Actions */}
          <div className="relative z-10 flex items-center gap-3 pt-3 border-t border-white/[0.06]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LIVE"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-rose-300 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="REPO"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};
