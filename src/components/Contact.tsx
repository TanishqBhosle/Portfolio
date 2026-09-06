import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'tanishqbhosale2006@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      handle: '@TanishqBhosle',
      url: 'https://github.com/TanishqBhosle',
      icon: GithubIcon,
      cursor: 'GITHUB',
    },
    {
      name: 'LinkedIn',
      handle: '/in/tanishqbhosale',
      url: 'https://linkedin.com/in/tanishqbhosale',
      icon: LinkedinIcon,
      cursor: 'LINKEDIN',
    },
    {
      name: 'LeetCode',
      handle: '150+ Solved',
      url: 'https://leetcode.com/u/TanishqNitinBhosale/',
      icon: LeetCodeIcon,
      cursor: 'LEETCODE',
    },
    {
      name: 'Resume',
      handle: 'PDF Archive',
      url: '/resume.pdf',
      icon: FileText,
      cursor: 'RESUME',
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-[90vh] flex flex-col justify-between py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden max-w-7xl mx-auto"
    >
      {/* Intense Red Ambient Glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[400px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Watermark */}
      <div className="absolute top-1/4 right-0 select-none pointer-events-none opacity-[0.02] text-white font-display font-black text-[14rem] sm:text-[22rem] leading-none">
        FINALE
      </div>

      <div>
        {/* Section Identifier */}
        <div className="w-12 h-[2px] bg-red-500/80 mb-8" />
        <div className="flex items-center gap-3 text-xs font-mono-code text-neutral-400 tracking-[0.3em] uppercase mb-6">
          <span>[05] // TRANSMISSION FINALE</span>
        </div>

        {/* Monumental Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-white uppercase tracking-tight leading-[0.92] max-w-5xl mb-12 sm:mb-16"
        >
          Let's build{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
            something
          </span>{' '}
          intelligent.
        </motion.div>

        {/* Narrative / Context */}
        <p className="font-light text-neutral-300 text-base sm:text-xl max-w-2xl leading-relaxed mb-16">
          Whether you are building next-generation AI platforms, architecting distributed systems, or exploring engineering collaborations in Bengaluru or globally.
        </p>
      </div>

      {/* Interactive Communication Channels */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 pt-10 border-t border-white/[0.08]">
        {/* Direct Email Display / Copy Channel */}
        <div className="md:col-span-6 flex flex-col justify-between p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-md">
          <div>
            <span className="font-mono-code text-xs text-neutral-500 uppercase tracking-widest block mb-4">
              DIRECT DISPATCH FREQUENCY
            </span>
            <a
              href={`mailto:${email}`}
              data-cursor="EMAIL"
              className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white hover:text-red-400 transition-colors block break-all mb-4"
            >
              {email}
            </a>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <button
              onClick={handleCopy}
              data-cursor="COPY"
              className="px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono-code text-neutral-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              data-cursor="COMPOSE"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-mono-code text-white font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>SEND MAIL</span>
            </a>
          </div>
        </div>

        {/* Social & Credentials Grid */}
        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={link.cursor}
                className="group p-6 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:border-red-500/40 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5 text-neutral-400 group-hover:text-red-400 transition-colors" />
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <span className="font-mono-code text-[11px] text-neutral-500 uppercase tracking-widest block">
                    {link.name}
                  </span>
                  <span className="font-display font-bold text-white text-base">
                    {link.handle}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
