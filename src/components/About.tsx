import React from 'react';
import { Cpu, ShieldCheck, Server, Sparkles, Terminal, Compass, GraduationCap, MapPin } from 'lucide-react';
import { SectionReveal } from './SectionReveal';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: 'Autonomous & Multimodal AI',
      subtitle: 'LLMs, Agentic Swarms & Vision',
      description: 'Designing agent systems that decompose complex workflows, and deploying multimodal LLMs (Gemini 1.5, LLaMA 3.3 70B via Groq) for real-time safety, speech, and constraint solving.',
      accent: 'from-red-500/20 to-transparent',
      borderColor: 'group-hover:border-red-500/40',
      iconColor: 'text-red-400',
    },
    {
      icon: Server,
      title: 'Full-Stack Distributed Systems',
      subtitle: 'React, Next.js, FastAPI & NestJS',
      description: 'Building resilient backend architectures, real-time telemetry streaming over MQTT, and blockchain-verified supply chains with Polygon smart contracts and Dockerized microservices.',
      accent: 'from-amber-500/20 to-transparent',
      borderColor: 'group-hover:border-amber-500/40',
      iconColor: 'text-amber-400',
    },
    {
      icon: ShieldCheck,
      title: 'Explainable ML & Safety',
      subtitle: 'XGBoost, SHAP & Constraint Solvers',
      description: 'Prioritizing interpretability and safety over black-box guesswork. Implementing SHAP vector explanations, deterministic fallback regex engines, and mathematical TF-IDF similarity algorithms.',
      accent: 'from-cyan-500/20 to-transparent',
      borderColor: 'group-hover:border-cyan-500/40',
      iconColor: 'text-cyan-400',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionReveal className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs uppercase tracking-widest mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>PHILOSOPHY & PERSONA</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight mb-6">
          Architecting systems that <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">think, scale & protect</span>
        </h2>
        <p className="text-zinc-400 font-light leading-relaxed text-base sm:text-lg">
          I am a Full-Stack Engineer and AI/ML Specialist studying at Polaris School of Technology in Bengaluru. I engineer software at the confluence of cognitive intelligence and distributed systems, transforming theoretical algorithms into scalable, production-grade applications.
        </p>
      </SectionReveal>

      {/* Narrative + Identity Card */}
      <SectionReveal delay={0.2} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        {/* Main Narrative */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-950/70 border border-white/5 backdrop-blur-xl flex flex-col justify-between">
          <div className="space-y-4 text-zinc-300 leading-relaxed font-light">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>THE ENGINEERING PERSPECTIVE</span>
            </div>
            <p>
              Modern artificial intelligence is only as impactful as the systems carrying it. My work centers on dismantling the boundary between machine learning research and rock-solid software engineering.
            </p>
            <p>
              From architecting <span className="text-white font-medium">Shield AI</span> (a multimodal moderation pipeline that guards against content violations) to <span className="text-white font-medium">HoneyChain</span> (a Web3 + deep learning IoT supply chain), I focus on building software that handles high throughput, delivers sub-second inference, and enforces rigorous type-safety.
            </p>
            <p>
              Whether orchestrating autonomous multi-agent task swarms or training predictive XGBoost churn models with SHAP explainability, my obsession is delivering tangible, auditable, and resilient value.
            </p>
          </div>

          {/* Quick Info Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/5 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-red-400" />
              <span>Polaris School of Tech (2024–28)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Bengaluru, Karnataka, India</span>
            </div>
          </div>
        </div>

        {/* Terminal Telemetry Card */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0b0b10] border border-white/5 flex flex-col justify-between font-mono relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Terminal Window Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-zinc-500 ml-2">tanishq@arch-node:~$</span>
              </div>
              <span className="text-[10px] text-zinc-600">PROFILE_V2</span>
            </div>

            {/* Code / Telemetry snippet */}
            <div className="space-y-2.5 text-xs text-zinc-400 leading-relaxed">
              <p className="text-zinc-500">// Core Persona Definition</p>
              <p><span className="text-red-400">const</span> <span className="text-white">engineer</span> = &#123;</p>
              <p className="pl-4"><span className="text-zinc-500">name:</span> <span className="text-emerald-300">'Tanishq Bhosale'</span>,</p>
              <p className="pl-4"><span className="text-zinc-500">degree:</span> <span className="text-emerald-300">'B.Tech CSE (AI & ML)'</span>,</p>
              <p className="pl-4"><span className="text-zinc-500">institution:</span> <span className="text-emerald-300">'Polaris School of Technology'</span>,</p>
              <p className="pl-4"><span className="text-zinc-500">activeRepos:</span> <span className="text-amber-300">36</span>,</p>
              <p className="pl-4"><span className="text-zinc-500">specialization:</span> [</p>
              <p className="pl-8 text-cyan-300">'Multimodal AI', 'Agent Swarms',</p>
              <p className="pl-8 text-cyan-300">'Distributed Full-Stack', 'ML Ensembles'</p>
              <p className="pl-4">],</p>
              <p className="pl-4"><span className="text-zinc-500">status:</span> <span className="text-emerald-400">'Ready for High-Impact Roles'</span></p>
              <p>&#125;;</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for 2025/2026 Opportunities</span>
            </span>
          </div>
        </div>
      </SectionReveal>

      {/* 3 Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <SectionReveal key={idx} delay={0.15 * idx}>
              <div className={`group h-full p-8 rounded-3xl bg-zinc-950/50 border border-white/5 ${pillar.borderColor} hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${pillar.accent} rounded-full blur-2xl pointer-events-none`} />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900/90 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform">
                    <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-light text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>SYSTEM PILLAR 0{idx + 1}</span>
                  <span>→</span>
                </div>
              </div>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
};
