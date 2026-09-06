import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';
import type { Project } from '../data/projects';
import { GithubIcon } from './Icons';

interface ProjectSceneProps {
  project: Project;
  index: number;
}

export const ProjectScene: React.FC<ProjectSceneProps> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms for cinematic depth
  const numY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3]);

  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-center py-20 sm:py-28 border-b border-white/[0.06] last:border-b-0 overflow-hidden"
    >
      {/* Giant Background Number Watermark */}
      <motion.div
        style={{ y: numY }}
        className="absolute right-2 sm:right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none font-display font-black text-[12rem] sm:text-[20rem] lg:text-[26rem] leading-none opacity-[0.03] text-white z-0"
      >
        {formattedIndex}
      </motion.div>

      {/* Atmospheric Accent Radial Glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] sm:w-[650px] h-[350px] rounded-full blur-[140px] opacity-15 pointer-events-none z-0"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Content Container */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-8"
      >
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs text-red-500 font-bold tracking-[0.25em] uppercase">
              PROJECT // {formattedIndex}
            </span>
            <span className="h-3 w-[1px] bg-white/20" />
            <span className="font-mono-code text-xs text-neutral-400 uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          {project.liveUrl && (
            <span className="flex items-center gap-2 text-[11px] font-mono-code text-emerald-400 bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE SYSTEM</span>
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-[0.95] mb-4">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="font-mono-code text-xs sm:text-sm text-neutral-400 uppercase tracking-wider mb-8 max-w-3xl">
          {project.tagline}
        </p>

        {/* Project Core Description & Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed">
              {project.longDescription || project.description}
            </p>

            {/* Architecture Highlights */}
            {project.architectureHighlights && project.architectureHighlights.length > 0 && (
              <div className="pt-4 space-y-2">
                <span className="font-mono-code text-[11px] text-neutral-500 uppercase tracking-widest block mb-2">
                  Key Architectural Accomplishments
                </span>
                {project.architectureHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400">
                    <span className="text-red-500/90 font-mono-code mt-0.5">›</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Metrics & Telemetry Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono-code text-neutral-500 uppercase tracking-wider pb-3 border-b border-white/[0.06] mb-4">
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                <span>SPECIFICATIONS & METRICS</span>
              </div>

              {project.metrics && (
                <div className="space-y-3 mb-6">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex justify-between items-baseline text-xs font-mono-code">
                      <span className="text-neutral-400">{metric.label}</span>
                      <span className="text-white font-bold">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tech Stack Chips */}
            <div>
              <span className="font-mono-code text-[10px] text-neutral-500 uppercase tracking-wider block mb-2">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-black/40 border border-white/[0.08] text-[11px] font-mono-code text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LIVE"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono-code text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.35)] transition-all cursor-pointer"
            >
              <span>LAUNCH APP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="REPO"
            className="px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/20 text-neutral-200 hover:text-white font-mono-code text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            <span>VIEW SOURCE CODE</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
