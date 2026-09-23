import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Compass,
  Move,
  Box,
  Rotate3d,
  RefreshCw,
  MousePointer2
} from 'lucide-react';
import * as THREE from 'three';
import { EASINGS, SPRINGS } from '../utils/motion';

export const InteractionLab: React.FC = () => {
  return (
    <section id="lab" aria-label="Interaction Design Lab" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden select-none">
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-rose-500/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-3xl mb-14 text-left">
        <div className="w-12 h-[2px] bg-rose-500 mb-6" />

        <div className="flex items-center gap-2 text-xs font-mono-code text-rose-400 tracking-widest uppercase mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>EXPERIMENTAL MOTION & CREATIVE DEVELOPMENT</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASINGS.easeCinematic }}
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4"
        >
          Interaction{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-amber-200">
            Lab
          </span>
        </motion.h2>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Six live micro-interaction experiments demonstrating physics springs, 3D spatial computing, dynamic clip-path reveals, and ergonomic tactile feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        <Experiment01Magnetic />
        <Experiment02ClipPathScrub />
        <Experiment03ThreeDObject />
        <Experiment04TiltCard />
        <Experiment05PhysicsDrop />
        <Experiment06CursorRipple />
      </div>
    </section>
  );
};

const Experiment01Magnetic: React.FC = () => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isPulled, setIsPulled] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distFactor = 0.28;
    const dx = (e.clientX - centerX) * distFactor;
    const dy = (e.clientY - centerY) * distFactor;
    setCoords({ x: Math.max(-18, Math.min(18, dx)), y: Math.max(-18, Math.min(18, dy)) });
    setIsPulled(true);
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setIsPulled(false);
  };

  return (
    <div className="p-6 rounded-2xl cinematic-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400 uppercase mb-3">
          <span className="text-rose-400 font-bold">EXP 01</span>
          <span>Magnetic Physics</span>
        </div>
        <h4 className="font-display font-bold text-lg text-white mb-1">
          Elastic Magnetic Pull
        </h4>
        <p className="text-xs text-neutral-400 mb-6">
          Calculates vector distance to cursor and stretches with spring recovery.
        </p>
      </div>

      <div
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-32 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-4 relative overflow-hidden"
      >
        <motion.button
          animate={{ x: coords.x, y: coords.y, scale: isPulled ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          data-cursor="DRAG"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold text-xs shadow-lg shadow-rose-500/30 flex items-center gap-2 cursor-pointer"
        >
          <Move className="w-3.5 h-3.5" />
          <span>Magnetic Target</span>
        </motion.button>
      </div>
    </div>
  );
};

const Experiment02ClipPathScrub: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="p-6 rounded-2xl cinematic-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400 uppercase mb-3">
          <span className="text-rose-400 font-bold">EXP 02</span>
          <span>Clip-Path Scrub</span>
        </div>
        <h4 className="font-display font-bold text-lg text-white mb-1">
          Interactive Wireframe Mask
        </h4>
        <p className="text-xs text-neutral-400 mb-6">
          Dynamic clip-path revealing wireframe blueprint vs rendered design.
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative h-32 rounded-xl border border-white/10 overflow-hidden bg-black/50">
          <div className="absolute inset-0 p-4 bg-zinc-950 flex flex-col justify-between font-mono-code text-[11px] text-rose-400/80">
            <div className="border border-dashed border-rose-500/40 p-2 rounded">
              [WIREFRAME SKELETON // BLUEPRINT]
            </div>
            <div className="flex justify-between text-[10px] text-neutral-500">
              <span>w: 100%</span>
              <span>flex-layout</span>
            </div>
          </div>

          <div
            className="absolute inset-0 p-4 bg-gradient-to-br from-[#12131f] to-[#1c1d2e] flex flex-col justify-between text-white"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-xs font-bold text-rose-300">
              ✓ Rendered High-Fidelity UI
            </div>
            <div className="text-[10px] text-neutral-300 font-mono-code">
              60 FPS Glassmorphic Surface
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-[2px] bg-rose-400 shadow-md shadow-rose-500/50 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          data-cursor="SCRUB"
          aria-label="Clip Path Scrub Range"
          className="w-full accent-rose-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
        />
      </div>
    </div>
  );
};

const Experiment03ThreeDObject: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeOnly, setWireframeOnly] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = 128;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.z = 3.6;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.2, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x171924,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: wireframeOnly,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const light = new THREE.DirectionalLight(0xf43f5e, 3);
    light.position.set(2, 3, 2);
    scene.add(light);

    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.015;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [wireframeOnly]);

  return (
    <div className="p-6 rounded-2xl cinematic-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400 uppercase mb-3">
          <span className="text-rose-400 font-bold">EXP 03</span>
          <span>Three.js Spatial</span>
        </div>
        <h4 className="font-display font-bold text-lg text-white mb-1">
          3D Geometry Spatial Mesh
        </h4>
        <p className="text-xs text-neutral-400 mb-6">
          Real-time WebGL mesh rendering with dynamic wireframe toggle.
        </p>
      </div>

      <div className="space-y-3">
        <div
          ref={mountRef}
          className="h-32 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden relative"
        />
        <button
          onClick={() => setWireframeOnly(!wireframeOnly)}
          data-cursor="CLICK"
          className="w-full py-1.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-mono-code text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <Box className="w-3.5 h-3.5 text-rose-400" />
          <span>Toggle: {wireframeOnly ? 'Solid Material' : 'Wireframe Blueprint'}</span>
        </button>
      </div>
    </div>
  );
};

const Experiment04TiltCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-60, 60], [14, -14]), SPRINGS.snappy);
  const rotateY = useSpring(useTransform(x, [-60, 60], [-14, 14]), SPRINGS.snappy);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="p-6 rounded-2xl cinematic-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400 uppercase mb-3">
          <span className="text-rose-400 font-bold">EXP 04</span>
          <span>Spatial Depth</span>
        </div>
        <h4 className="font-display font-bold text-lg text-white mb-1">
          3D Perspective Gyro Card
        </h4>
        <p className="text-xs text-neutral-400 mb-6">
          Computes normal pitch/yaw matrix with specular glare tracking.
        </p>
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-32 [perspective:1000px] flex items-center justify-center"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          data-cursor="DRAG"
          className="w-full h-full rounded-xl bg-gradient-to-tr from-white/[0.05] via-white/[0.08] to-rose-500/10 border border-white/15 p-4 flex flex-col justify-between shadow-2xl backdrop-blur-md cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex justify-between items-center text-[10px] font-mono-code text-rose-400">
            <span>HOLOGRAPHIC // GYRO</span>
            <Rotate3d className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-white tracking-wide">
            Dynamic Pitch & Yaw Matrix
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Experiment05PhysicsDrop: React.FC = () => {
  const [tokens, setTokens] = useState(['UX Research', 'Design Systems', 'Framer Motion', 'Three.js']);

  const handleShuffle = () => {
    setTokens([...tokens].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="p-6 rounded-2xl cinematic-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400 uppercase mb-3">
          <span className="text-rose-400 font-bold">EXP 05</span>
          <span>Spring Physics</span>
        </div>
        <h4 className="font-display font-bold text-lg text-white mb-1">
          Layout Spring Reordering
        </h4>
        <p className="text-xs text-neutral-400 mb-6">
          Fluid layout morphing with zero sudden layout shifts.
        </p>
      </div>

      <div className="space-y-3">
        <div className="h-28 rounded-xl bg-black/40 border border-white/10 p-3 flex flex-wrap gap-2 items-center justify-center overflow-hidden">
          {tokens.map((tok) => (
            <motion.span
              key={tok}
              layout
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              className="px-3 py-1.5 rounded-full text-xs font-mono-code bg-white/[0.06] text-white border border-white/10 shadow-sm"
            >
              {tok}
            </motion.span>
          ))}
        </div>
        <button
          onClick={handleShuffle}
          data-cursor="CLICK"
          className="w-full py-1.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-mono-code text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
          <span>Trigger Spring Reorder</span>
        </button>
      </div>
    </div>
  );
};

const Experiment06CursorRipple: React.FC = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleAddRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev.slice(-3), { id, x, y }]);
  };

  return (
    <div className="p-6 rounded-2xl cinematic-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400 uppercase mb-3">
          <span className="text-rose-400 font-bold">EXP 06</span>
          <span>Tactile Feedback</span>
        </div>
        <h4 className="font-display font-bold text-lg text-white mb-1">
          Cursor Waveform Ripple
        </h4>
        <p className="text-xs text-neutral-400 mb-6">
          Radial wave propagation confirming micro-interaction touchpoints.
        </p>
      </div>

      <div
        onClick={handleAddRipple}
        data-cursor="CLICK"
        className="h-32 rounded-xl bg-black/40 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer group"
      >
        <div className="text-xs font-mono-code text-neutral-400 group-hover:text-white transition-colors flex items-center gap-1.5">
          <MousePointer2 className="w-3.5 h-3.5 text-rose-400" />
          <span>Click Anywhere in Canvas</span>
        </div>

        {ripples.map((rip) => (
          <motion.div
            key={rip.id}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 4.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASINGS.easeOutQuart }}
            className="absolute w-12 h-12 rounded-full border-2 border-rose-400 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: rip.x, top: rip.y }}
          />
        ))}
      </div>
    </div>
  );
};
