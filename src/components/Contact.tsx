import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, FileText, ArrowUpRight, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import { TiltCard } from './TiltCard';

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
      glowColor: 'rgba(255, 255, 255, 0.08)',
    },
    {
      name: 'LinkedIn',
      handle: 'in/tanishqbhosale',
      url: 'https://www.linkedin.com/in/tanishqbhosale/',
      icon: LinkedinIcon,
      cursor: 'LINKEDIN',
      glowColor: 'rgba(59, 130, 246, 0.12)',
    },
    {
      name: 'LeetCode',
      handle: '150+ Problems Solved',
      url: 'https://leetcode.com/u/TanishqNitinBhosale/',
      icon: LeetCodeIcon,
      cursor: 'LEETCODE',
      glowColor: 'rgba(251, 191, 36, 0.12)',
    },
    {
      name: 'Resume',
      handle: 'Curriculum Vitae',
      url: 'https://drive.google.com/file/d/15a1JQavD9AOKO9QJm_4z6s3UdsHsboDa/view?usp=sharing',
      icon: FileText,
      cursor: 'RESUME',
      glowColor: 'rgba(244, 63, 94, 0.12)',
    },
  ];

  return (
    <section
      id="contact"
      aria-label="Contact and Collaboration"
      className="relative min-h-[85vh] flex flex-col justify-between py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden max-w-6xl mx-auto"
    >
      {/* Warm Ambient Glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[350px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Watermark */}
      <div
        className="absolute top-1/4 right-0 select-none pointer-events-none opacity-[0.02] text-white font-display font-black text-[12rem] sm:text-[18rem] leading-none"
        aria-hidden="true"
      >
        CONNECT
      </div>

      <div>
        {/* Section Identifier */}
        <div className="w-12 h-[2px] bg-rose-500 mb-6" />
        <div className="flex items-center gap-2 text-xs font-mono-code text-rose-400 tracking-widest uppercase mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>CONTACT & COLLABORATION</span>
        </div>

        {/* Monumental Closing Statement with animated gradient */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05] max-w-4xl mb-6"
        >
          Let's build{' '}
          <span className="text-gradient-animated">
            something impactful.
          </span>
        </motion.div>

        {/* Context Narrative */}
        <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-14">
          Whether you are exploring high-performance AI implementations, hiring for engineering roles, or seeking collaborative research opportunities.
        </p>
      </div>

      {/* Interactive Communication Channels */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-8 border-t border-white/[0.08]">
        {/* Direct Email Channel Card */}
        <TiltCard className="md:col-span-6 rounded-2xl" glowColor="rgba(244, 63, 94, 0.1)" tiltIntensity={5}>
          <div className="p-6 sm:p-8 rounded-2xl cinematic-card-premium noise-overlay h-full flex flex-col justify-between">
            <div className="relative z-10">
              <span className="font-mono-code text-xs text-rose-400 uppercase tracking-wider block mb-3 font-medium">
                DIRECT EMAIL INQUIRIES
              </span>
              <a
                href={`mailto:${email}`}
                data-cursor="EMAIL"
                className="font-display font-bold text-lg sm:text-2xl text-white hover:text-rose-400 transition-colors block break-all mb-3"
              >
                {email}
              </a>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Based in Bengaluru, India (IST) • Open to on-site and worldwide remote engineering opportunities.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
              <button
                onClick={handleCopy}
                data-cursor="COPY"
                className="btn-secondary text-xs py-2.5 px-4 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                data-cursor="COMPOSE"
                className="btn-primary text-xs py-2.5 px-5 cursor-pointer relative overflow-hidden group"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Mail className="w-3.5 h-3.5 relative" />
                <span className="relative">Send Email</span>
              </a>
            </div>
          </div>
        </TiltCard>

        {/* Social & Professional Credentials Grid */}
        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {socialLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <TiltCard className="rounded-2xl h-full" glowColor={link.glowColor} tiltIntensity={8}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor={link.cursor}
                    className="group p-5 rounded-2xl cinematic-card-premium flex flex-col justify-between cursor-pointer h-full block"
                  >
                    <div className="relative z-10 flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-white/[0.04] text-neutral-400 group-hover:text-rose-400 group-hover:bg-rose-500/10 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <div className="relative z-10">
                      <span className="font-mono-code text-[11px] text-neutral-400 uppercase tracking-wider block">
                        {link.name}
                      </span>
                      <span className="font-display font-bold text-white text-sm sm:text-base group-hover:text-rose-200 transition-colors">
                        {link.handle}
                      </span>
                    </div>
                  </a>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
