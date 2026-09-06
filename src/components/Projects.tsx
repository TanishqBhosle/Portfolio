import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ProjectScene } from './ProjectScene';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 sm:mb-24">
        <div className="w-12 h-[2px] bg-red-500/80 mb-8" />
        
        <div className="flex items-center gap-3 text-xs font-mono-code text-neutral-400 tracking-[0.3em] uppercase mb-4">
          <span>[02] // PRODUCTION ARCHITECTURES</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-none mb-6"
        >
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">Systems</span>
        </motion.h2>

        <p className="font-light text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          Each project is engineered to solve a concrete real-world problem across multimodal safety, distributed supply chains, predictive ensembles, and autonomous agent swarms.
        </p>
      </div>

      {/* Cinematic Scene Cascade */}
      <div className="space-y-0">
        {projects.map((project, idx) => (
          <ProjectScene key={project.id} project={project} index={idx} />
        ))}
      </div>

      {/* GitHub Repository Counter Outro */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.015] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div>
            <span className="text-xs font-mono-code text-red-400 uppercase tracking-widest block mb-2">
              OPEN SOURCE REPOSITORIES
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase">
              Explore 36+ Open Repositories
            </h3>
            <p className="text-sm font-light text-neutral-400 mt-2 max-w-xl">
              From experimental deep learning notebooks to production CI/CD monorepos and algorithmic solutions.
            </p>
          </div>

          <a
            href="https://github.com/TanishqBhosle"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-red-500/40 text-white font-mono-code text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer shrink-0 shadow-lg"
          >
            <GithubIcon className="w-4 h-4 text-red-400" />
            <span>@TanishqBhosle</span>
          </a>
        </div>
      </div>
    </section>
  );
};
