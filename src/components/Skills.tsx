import React, { useState } from 'react';
import { 
  Brain, 
  Cpu, 
  LineChart, 
  Sparkles, 
  Bot, 
  Search, 
  Layout, 
  FileCode, 
  Palette, 
  Layers, 
  Zap, 
  Server, 
  Terminal, 
  Boxes, 
  Radio, 
  Shield, 
  Database, 
  HardDrive, 
  GitMerge, 
  BarChart2, 
  Container,
  Code2
} from 'lucide-react';
import { skillCategories } from '../data/skills';
import { SectionReveal } from './SectionReveal';

const iconMap: Record<string, any> = {
  Brain, Cpu, LineChart, Sparkles, Bot, Search,
  Layout, FileCode, Palette, Layers, Zap,
  Server, Terminal, Boxes, Radio, Shield,
  Database, HardDrive, GitMerge, BarChart2, Container, Code2
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ai-ml');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeCategory = skillCategories.find(c => c.id === selectedCategory) || skillCategories[0];

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs uppercase tracking-widest mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight mb-6">
          Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Proficiencies</span>
        </h2>
        <p className="text-zinc-400 font-light leading-relaxed text-base sm:text-lg">
          Mastered technologies spanning neural inference, deep learning models, asynchronous API microservices, and modern reactive frontends.
        </p>
      </SectionReveal>

      {/* Category Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {skillCategories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2.5 ${
                isSelected
                  ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-950/50'
                  : 'bg-zinc-950/70 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-white/5'
              }`}
            >
              <span>{category.title}</span>
            </button>
          );
        })}
      </div>

      {/* Category Content Box */}
      <SectionReveal delay={0.2} className="p-8 sm:p-12 rounded-3xl bg-[#0c0c12] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Category Header */}
        <div className="mb-10 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              {activeCategory.title}
            </h3>
            <p className="text-sm font-light text-zinc-400">
              {activeCategory.description}
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest shrink-0">
            {activeCategory.skills.length} SPECIALIZED CAPABILITIES
          </span>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.skills.map((skill, idx) => {
            const IconComponent = iconMap[skill.iconName] || Code2;
            const isHovered = hoveredSkill === skill.name;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-6 rounded-2xl bg-zinc-950/80 border transition-all duration-300 relative group flex flex-col justify-between ${
                  isHovered 
                    ? 'border-red-500/50 bg-zinc-900/90 shadow-xl shadow-red-950/20 -translate-y-1' 
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span 
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                        skill.level === 'Advanced'
                          ? 'bg-red-950/40 text-red-400 border-red-500/30'
                          : 'bg-zinc-900 text-zinc-400 border-white/10'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <h4 className="text-base font-display font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                    {skill.name}
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                    {skill.experience}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-600">
                  <span>PRODUCTION READY</span>
                  <span className="text-red-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
};
