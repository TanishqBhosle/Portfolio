import React, { useState } from 'react';
import { Terminal, ExternalLink, ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { GithubIcon } from './Icons';
import { ProjectScene } from './ProjectScene';
import { ProjectModal } from './ProjectModal';
import { SectionReveal } from './SectionReveal';
import { MagneticButton } from './MagneticButton';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'aiml' | 'fullstack'>('all');
  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);

  const filterTabs = [
    { id: 'all', label: `ALL SYSTEMS (${projects.length})` },
    { id: 'featured', label: `FEATURED ARCHITECTURES (${projects.filter(p => p.featured).length})` },
    { id: 'aiml', label: 'AI & MACHINE LEARNING' },
    { id: 'fullstack', label: 'FULL-STACK & DISTRIBUTED' },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'featured') return project.featured;
    if (activeFilter === 'aiml') {
      return (
        project.category === 'AI / System Architecture' ||
        project.category === 'Machine Learning' ||
        project.category === 'Autonomous Agents'
      );
    }
    if (activeFilter === 'fullstack') {
      return (
        project.category === 'Full-Stack' ||
        project.category === 'Web3 / Distributed'
      );
    }
    return true;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const secondaryProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionReveal className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs uppercase tracking-widest mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>PRODUCTION ARCHITECTURES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight mb-6">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Systems & Codebases</span>
        </h2>
        <p className="text-zinc-400 font-light leading-relaxed text-base sm:text-lg">
          A showcase of 8 production-engineered applications, autonomous agents, and deep-learning platforms built and maintained with high architectural standards.
        </p>
      </SectionReveal>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-950/50'
                : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Primary Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project, idx) => (
            <SectionReveal key={project.id} delay={0.1}>
              <ProjectScene 
                project={project} 
                index={idx} 
                onInspect={(p) => setInspectedProject(p)} 
              />
            </SectionReveal>
          ))}
        </div>
      )}

      {/* Secondary Projects Grid */}
      {secondaryProjects.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400">
              // SPECIALIZED PLATFORMS & AGENTS
            </h3>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryProjects.map((project, idx) => (
              <SectionReveal key={project.id} delay={0.1 * idx}>
                <div className="p-8 rounded-3xl bg-zinc-950/60 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-red-400 bg-red-950/30 px-2.5 py-0.5 rounded-full border border-red-500/20">
                        {project.category}
                      </span>
                      {project.liveUrl && (
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>LIVE</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm font-light text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <span>Live App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                      >
                        <GithubIcon className="w-3 h-3" />
                        <span>Source</span>
                      </a>
                    </div>

                    <button
                      onClick={() => setInspectedProject(project)}
                      className="text-xs font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      )}

      {/* GitHub Repository Counter CTA */}
      <SectionReveal delay={0.2} className="mt-16 text-center">
        <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-display font-bold text-lg text-white">
              Explore 36+ Open Repositories
            </h4>
            <p className="text-xs text-zinc-400 font-light mt-1">
              Browse experimental scripts, algorithmic solutions, and ongoing AI systems on GitHub.
            </p>
          </div>
          <MagneticButton
            href="https://github.com/TanishqBhosle"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold border border-white/10 flex items-center gap-2 shrink-0 shadow-lg"
          >
            <GithubIcon className="w-4 h-4" />
            <span>@TanishqBhosle</span>
          </MagneticButton>
        </div>
      </SectionReveal>

      {/* Architecture Deep-Dive Modal */}
      <ProjectModal 
        project={inspectedProject} 
        onClose={() => setInspectedProject(null)} 
      />
    </section>
  );
};
