import React from 'react';
import { ExternalLink, Terminal, ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { GithubIcon } from './Icons';
import { MagneticButton } from './MagneticButton';

interface ProjectSceneProps {
  project: Project;
  index: number;
  onInspect: (project: Project) => void;
}

export const ProjectScene: React.FC<ProjectSceneProps> = ({ project, index, onInspect }) => {
  return (
    <div className="relative group rounded-3xl bg-[#0d0d12] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl">
      {/* Background Ambient Glow */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: project.accentColor }}
      />

      <div className="p-8 sm:p-12 flex flex-col justify-between h-full relative z-10">
        <div>
          {/* Top metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-zinc-500">
                0{index + 1} // ARCHIVE
              </span>
              <span 
                className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border"
                style={{ 
                  backgroundColor: `${project.accentColor}15`, 
                  borderColor: `${project.accentColor}40`,
                  color: project.accentColor 
                }}
              >
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PRODUCTION LIVE</span>
                </span>
              )}
            </div>
          </div>

          {/* Project Title & Tagline */}
          <h3 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-4 group-hover:text-red-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-base sm:text-lg font-light text-zinc-300 mb-8 leading-relaxed max-w-2xl">
            {project.description}
          </p>

          {/* Terminal-Style Architecture Telemetry Box */}
          <div className="mb-8 p-5 rounded-2xl bg-black/60 border border-white/5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-zinc-500 text-[11px]">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>SYS_TELEMETRY</span>
              </span>
              <span>STACK_DEPTH: {project.technologies.length} PACKAGES</span>
            </div>

            {/* Architecture bullets */}
            <div className="space-y-2 text-zinc-400">
              {project.architectureHighlights.slice(0, 2).map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0">›</span>
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>

            {/* Metrics row */}
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-white/5">
                {project.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] text-zinc-500 uppercase">{m.label}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technologies Chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-[11px] font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <MagneticButton
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-950/50 transition-all"
              >
                <span>OPEN SYSTEM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </MagneticButton>
            )}

            <MagneticButton
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 hover:text-white font-mono text-xs font-medium flex items-center gap-2 transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>SOURCE</span>
            </MagneticButton>
          </div>

          <button
            onClick={() => onInspect(project)}
            className="group/btn text-xs font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>INSPECT ARCHITECTURE</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
