import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Sparkles, Compass, Eye, RotateCw } from 'lucide-react';

interface TechCore3DProps {
  activeCategory: string;
  categoryTitle: string;
  totalSkills: number;
}

const categoryThemeColors: Record<string, { primary: number; secondary: number; hex: string; name: string }> = {
  'all': { primary: 0xf43f5e, secondary: 0x06b6d4, hex: '#f43f5e', name: 'ALL DOMAINS' },
  'languages': { primary: 0xf43f5e, secondary: 0xfb7185, hex: '#f43f5e', name: 'CORE SYNTAX' },
  'frontend': { primary: 0xf43f5e, secondary: 0xe11d48, hex: '#f43f5e', name: 'UI / UX SYSTEMS' },
  'backend': { primary: 0xa855f7, secondary: 0xc084fc, hex: '#a855f7', name: 'DISTRIBUTED ARCHITECTURE' },
  'databases': { primary: 0xf59e0b, secondary: 0xfbbf24, hex: '#f59e0b', name: 'DATA STORAGE ENGINES' },
  'ai-ml': { primary: 0x06b6d4, secondary: 0x38bdf8, hex: '#06b6d4', name: 'NEURAL & GENERATIVE' },
  'tools': { primary: 0x10b981, secondary: 0x34d399, hex: '#10b981', name: 'INFRASTRUCTURE & CI/CD' },
  'learning': { primary: 0x6366f1, secondary: 0x06b6d4, hex: '#6366f1', name: 'FRONTIER EXPLORATION' },
};

export const TechCore3D: React.FC<TechCore3DProps> = ({
  activeCategory,
  categoryTitle,
  totalSkills,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isInteracting, setIsInteracting] = useState(false);
  const currentTheme = categoryThemeColors[activeCategory] || categoryThemeColors['all'];

  // Ref to hold update functions
  const updateThemeRef = useRef<((color1: number, color2: number) => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || prefersReduced) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group to hold all 3D core elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d0d14,
      emissive: currentTheme.primary,
      emissiveIntensity: 0.28,
      roughness: 0.18,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.92,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // 2. Wireframe Cage overlay
    const wireframeGeo = new THREE.WireframeGeometry(icoGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: currentTheme.primary,
      transparent: true,
      opacity: 0.45,
      linewidth: 1,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    icoMesh.add(wireframeMesh);

    // 3. Orbiting Gyro Ring 1 (X/Z plane)
    const ring1Geo = new THREE.TorusGeometry(1.85, 0.022, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: currentTheme.primary,
      emissive: currentTheme.primary,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 4. Orbiting Gyro Ring 2 (Y/Z plane)
    const ring2Geo = new THREE.TorusGeometry(2.15, 0.018, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: currentTheme.secondary,
      emissive: currentTheme.secondary,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    coreGroup.add(ring2);

    // 5. Orbital nodes attached to rings
    const nodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const node1 = new THREE.Mesh(nodeGeo, nodeMat);
    ring1.add(node1);
    node1.position.set(1.85, 0, 0);

    const node2 = new THREE.Mesh(nodeGeo, nodeMat);
    ring2.add(node2);
    node2.position.set(0, 2.15, 0);

    // 6. Floating Particle Constellation
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.003,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: currentTheme.secondary,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(currentTheme.primary, 3.5, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(currentTheme.secondary, 2.5, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    // Function to dynamically update theme colors on category switch
    updateThemeRef.current = (primaryColor: number, secondaryColor: number) => {
      icoMat.emissive.setHex(primaryColor);
      wireframeMat.color.setHex(primaryColor);
      ring1Mat.color.setHex(primaryColor);
      ring1Mat.emissive.setHex(primaryColor);
      ring2Mat.color.setHex(secondaryColor);
      ring2Mat.emissive.setHex(secondaryColor);
      particleMat.color.setHex(secondaryColor);
      pointLight1.color.setHex(primaryColor);
      pointLight2.color.setHex(secondaryColor);
    };

    // Interaction variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        dragVelocityY = deltaX * 0.007;
        dragVelocityX = deltaY * 0.007;

        targetRotationY += dragVelocityY;
        targetRotationX += dragVelocityX;

        previousMousePosition = { x: clientX, y: clientY };
      } else {
        // Soft tilt tracking when not dragging
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = normX * 0.45;
        targetRotationX = -normY * 0.35;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Responsive resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Idle auto-rotation
      const idleSpinY = elapsed * 0.22;
      const idleBob = Math.sin(elapsed * 1.2) * 0.08;

      coreGroup.position.y = idleBob;

      // Smooth damping interpolation
      coreGroup.rotation.y += (targetRotationY + idleSpinY - coreGroup.rotation.y) * 0.06;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.06;

      // Independent ring counter-rotations
      ring1.rotation.z += 0.015;
      ring2.rotation.x -= 0.018;

      // Pulse the central icosahedron wireframe
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.035;
      icoMesh.scale.set(pulse, pulse, pulse);

      // Drift particles slightly
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3 + 2] += particleVelocities[i].z;

        // Bounce back if drifted too far
        const dist = Math.sqrt(
          positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2
        );
        if (dist > 3.2 || dist < 1.4) {
          particleVelocities[i].x *= -1;
          particleVelocities[i].y *= -1;
          particleVelocities[i].z *= -1;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      icoGeo.dispose();
      icoMat.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [prefersReduced]);

  // Update theme when activeCategory changes
  useEffect(() => {
    if (updateThemeRef.current) {
      updateThemeRef.current(currentTheme.primary, currentTheme.secondary);
    }
  }, [activeCategory, currentTheme]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#0b0c14]/90 via-[#07070c]/90 to-[#0b0c14]/90 backdrop-blur-xl mb-12 shadow-2xl shadow-black/80">
      {/* 3D Cyber HUD Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentTheme.hex }} />
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.hex }} />
          </div>
          <span className="text-[11px] font-mono-code uppercase tracking-wider text-neutral-300 font-semibold">
            3D SPATIAL KERNEL // {currentTheme.name}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono-code text-neutral-400">
          <span className={`flex items-center gap-1 transition-colors ${isInteracting ? 'text-rose-400 font-bold' : ''}`}>
            <RotateCw className={`w-3 h-3 ${isInteracting ? 'animate-spin text-rose-400' : 'text-neutral-400'}`} style={{ animationDuration: isInteracting ? '1.5s' : '8s' }} />
            {isInteracting ? 'ORBITING (ACTIVE DRAG)' : 'DRAG TO ORBIT 360°'}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-neutral-300 font-bold" style={{ color: currentTheme.hex }}>
            {totalSkills} MODULES ONLINE
          </span>
        </div>
      </div>

      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-[260px] sm:h-[320px] md:h-[360px] cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
        title="Click and drag to rotate the 3D Tech Core"
      >
        {/* Soft Ambient Glow in Center */}
        <div
          className="absolute inset-0 m-auto w-1/2 h-1/2 rounded-full blur-[80px] pointer-events-none transition-all duration-700 opacity-25"
          style={{ backgroundColor: currentTheme.hex }}
        />

        {/* Cyber Holographic Grid Ring Overlay */}
        <div className="absolute inset-x-8 bottom-4 flex items-center justify-between text-[10px] font-mono-code text-neutral-500 pointer-events-none select-none">
          <span className="flex items-center gap-1">
            <Compass className="w-3 h-3 text-neutral-400" />
            SYS.NODE.ROTATION: ACTIVE
          </span>
          <span className="flex items-center gap-1 text-right">
            <Eye className="w-3 h-3 text-neutral-400" />
            REALTIME THREE.JS WEBGL RENDERER
          </span>
        </div>
      </div>

      {/* HUD Bottom Bar with Selected Category Info */}
      <div className="px-4 sm:px-6 py-2.5 border-t border-white/[0.06] bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 font-mono-code text-[11px]">ACTIVE SPECTRUM:</span>
          <span className="font-semibold text-white font-mono-code">{categoryTitle}</span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono-code" style={{ backgroundColor: `${currentTheme.hex}22`, color: currentTheme.hex }}>
            LIVE
          </span>
        </div>
        <div className="text-[11px] font-mono-code text-neutral-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>Interactive 3D Perspective Physics Enabled</span>
        </div>
      </div>
    </div>
  );
};
