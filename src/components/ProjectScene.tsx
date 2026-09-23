import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Terminal, CheckCircle2 } from 'lucide-react';
import type { Project } from '../data/projects';
import { GithubIcon } from './Icons';

interface ProjectSceneProps {
  project: Project;
  index: number;
  total: number;
}

export const ProjectScene: React.FC<ProjectSceneProps> = ({ project, index, total }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92]);

  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  return (
    <div
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center py-16 sm:py-24 overflow-hidden"
    >
      {/* Full-width accent gradient background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${project.accentColor}40 0%, transparent 70%)`,
        }}
      />

      {/* Giant Background Number Watermark */}
      <div
        className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none font-display font-black text-[10rem] sm:text-[18rem] lg:text-[24rem] leading-none opacity-[0.03] text-white z-0"
        aria-hidden="true"
      >
        {formattedIndex}
      </div>

      {/* Content Container */}
      <motion.div
        style={{ y: contentY, opacity, scale }}
        className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-8"
      >
        {/* Top Header Information */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            {/* Accent color dot */}
            <div
              className="w-3 h-3 rounded-full shadow-lg"
              style={{ backgroundColor: project.accentColor, boxShadow: `0 0 12px ${project.accentColor}80` }}
            />
            <span className="font-mono-code text-xs font-semibold tracking-wider uppercase" style={{ color: project.accentColor }}>
              FEATURED // {formattedIndex} of {total < 10 ? `0${total}` : total}
            </span>
            <span className="h-3 w-[1px] bg-white/20" />
            <span className="text-xs font-medium text-neutral-400">
              {project.category}
            </span>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-500/20 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Application</span>
            </a>
          )}
        </div>

        {/* Project Title */}
        <h3 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-4">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-normal mb-10 max-w-3xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>

            {/* Architecture Highlights */}
            {project.architectureHighlights && project.architectureHighlights.length > 0 && (
              <div className="pt-2 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-3">
                  Key Architectural Highlights
                </span>
                {project.architectureHighlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: project.accentColor }} />
                    <span>{highlight}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Metrics & Tech Stack Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-2xl cinematic-card-premium noise-overlay">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-400 pb-3 border-b border-white/[0.06] mb-4">
                <Terminal className="w-3.5 h-3.5" style={{ color: project.accentColor }} />
                <span className="uppercase tracking-wider">SYSTEM METRICS</span>
              </div>

              {project.metrics && (
                <div className="space-y-3 mb-6">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex justify-between items-baseline text-xs">
                      <span className="text-neutral-400 font-medium">{metric.label}</span>
                      <span className="text-neutral-100 font-semibold font-mono-code">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tech Stack Chips */}
            <div className="relative z-10">
              <span className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider block mb-2">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono-code text-neutral-300 hover:border-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LIVE"
              className="btn-primary text-xs font-semibold py-2.5 px-5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative">Launch Application</span>
              <ExternalLink className="w-3.5 h-3.5 relative" />
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="REPO"
            className="btn-secondary text-xs font-medium py-2.5 px-5"
          >
            <GithubIcon className="w-4 h-4 text-neutral-300" />
            <span>View Source Code</span>
          </a>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-10">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                i === index
                  ? 'w-8 h-1.5'
                  : 'w-1.5 h-1.5 bg-white/20'
              }`}
              style={i === index ? { backgroundColor: project.accentColor, boxShadow: `0 0 8px ${project.accentColor}60` } : {}}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
