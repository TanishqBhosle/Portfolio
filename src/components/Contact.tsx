import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  FileText, 
  Terminal, 
  MapPin,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import { SectionReveal } from './SectionReveal';
import { MagneticButton } from './MagneticButton';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'tanishqbhosale2006@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ef4444', '#f59e0b', '#ffffff']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    // Trigger celebratory particle effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#ffffff']
    });

    setSubmitted(true);

    // Also compose mailto link for direct transmission
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      formState.subject || `Inquiry from ${formState.name || 'Portfolio Visitor'}`
    )}&body=${encodeURIComponent(
      `Sender: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
    )}`;

    window.open(mailtoUrl, '_blank');
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs uppercase tracking-widest mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>INITIATE TRANSMISSION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight mb-6">
          Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Something Extraordinary</span>
        </h2>
        <p className="text-zinc-400 font-light leading-relaxed text-base sm:text-lg">
          Whether you have an ambitious AI project, need a high-velocity full-stack engineer, or want to discuss research collaborations in Bengaluru.
        </p>
      </SectionReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Transmission Info */}
        <SectionReveal delay={0.2} className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-8 rounded-3xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
            <h3 className="text-xl font-display font-bold text-white mb-3">
              Direct Frequency
            </h3>
            <p className="text-xs text-zinc-400 font-light mb-6">
              Copy my primary email address directly to your clipboard or open your default client.
            </p>

            {/* Email Copy Card */}
            <div className="p-4 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-red-400" />
                </div>
                <span className="font-mono text-xs text-zinc-200 truncate">
                  {emailAddress}
                </span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-all shrink-0 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Availability & Location tags */}
            <div className="space-y-3 font-mono text-xs text-zinc-400 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>IST (UTC+05:30) • Open to Global Teams</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>Available for Summer/Fall Engineering Roles</span>
              </div>
            </div>
          </div>

          {/* Download Resume Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-red-950/30 via-zinc-950 to-zinc-950 border border-red-500/20 backdrop-blur-xl flex items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-bold text-white text-base">
                Curriculum Vitae
              </h4>
              <p className="text-xs font-light text-zinc-400 mt-1">
                Download verified technical credentials in PDF format.
              </p>
            </div>
            <MagneticButton
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Tanishq_Bhosale_Resume.pdf"
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-950/60 transition-all shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD</span>
            </MagneticButton>
          </div>

          {/* Social Links Network */}
          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/5 flex items-center justify-around">
            <a
              href="https://github.com/TanishqBhosle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 group-hover:border-red-500/40 flex items-center justify-center transition-colors">
                <GithubIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/tanishqbhosale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 group-hover:border-red-500/40 flex items-center justify-center transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono">LinkedIn</span>
            </a>

            <a
              href="https://leetcode.com/u/TanishqNitinBhosale/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 group-hover:border-red-500/40 flex items-center justify-center transition-colors">
                <LeetCodeIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono">LeetCode</span>
            </a>
          </div>
        </SectionReveal>

        {/* Right Column: Transmission Console */}
        <SectionReveal delay={0.3} className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0d12] border border-white/10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="font-mono text-xs text-zinc-400">TRANSMISSION_UPLINK</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-600">SECURE_CHANNEL</span>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center mx-auto text-red-400 mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white">
                    Transmission Dispatched
                  </h4>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto font-light">
                    Your message draft has been initialized. Thank you for connecting with Tanishq Bhosale.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 text-xs font-mono text-red-400 hover:text-red-300 underline underline-offset-4"
                  >
                    Send another transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Your Identity / Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Maya Chen"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 focus:border-red-500/80 focus:outline-none text-sm font-mono text-zinc-200 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. maya@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 focus:border-red-500/80 focus:outline-none text-sm font-mono text-zinc-200 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Topic / Subject
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. AI Engineering Collaboration / Full-Stack Role"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 focus:border-red-500/80 focus:outline-none text-sm font-mono text-zinc-200 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Message Parameters
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Briefly describe your objectives, project scope, or opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 focus:border-red-500/80 focus:outline-none text-sm font-mono text-zinc-200 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-sm font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-red-950/60 transition-all cursor-pointer"
                    >
                      <span>TRANSMIT MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-600">
              <span>STATUS: DISPATCH ENGINE READY</span>
              <span>LATENCY: ZERO</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};
