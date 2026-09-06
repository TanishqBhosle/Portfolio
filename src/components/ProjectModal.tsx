import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Terminal, CheckCircle2, Cpu } from 'lucide-react';
import type { Project } from '../data/projects';
import { GithubIcon } from './Icons';
import { MagneticButton } from './MagneticButton';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e0e14] border border-white/10 shadow-2xl p-6 sm:p-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-red-950/40 text-red-400 border border-red-500/30">
                  {project.category}
                </span>
                <span className="text-zinc-500 font-mono text-xs">
                  REPO: {project.repoName}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-sm font-light text-zinc-400 mt-1">
                {project.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="py-8 space-y-8">
            {/* System Overview */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                <span>ARCHITECTURAL OVERVIEW</span>
              </h4>
              <p className="text-zinc-300 leading-relaxed font-light text-base">
                {project.longDescription}
              </p>
            </div>

            {/* Metrics Chips */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5">
                    <span className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      {metric.label}
                    </span>
                    <span className="font-display font-bold text-lg text-white">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Architectural Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>KEY IMPLEMENTATION HIGHLIGHTS</span>
              </h4>
              <ul className="space-y-3">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300 font-light">
                    <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                DEPLOYED TECHNOLOGIES & STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <MagneticButton
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-950/40"
                >
                  <span>LAUNCH LIVE SYSTEM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </MagneticButton>
              )}

              <MagneticButton
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 hover:text-white font-mono text-xs font-bold flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>INSPECT REPO</span>
              </MagneticButton>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              CLOSE WINDOW [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
