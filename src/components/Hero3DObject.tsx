import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Hero3DObject: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const container = mountRef.current;
    if (!container || prefersReduced) return;

    let animationFrameId: number;
    let isVisible = true;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32, 2, 3);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x12131c,
      emissive: 0x22050e,
      roughness: 0.22,
      metalness: 0.85,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const wireframeGeo = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.18,
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    mesh.add(wireframe);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0xf43f5e, 3.2);
    rimLight.position.set(4, 3, 3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    const topLight = new THREE.PointLight(0xfff1f2, 2.5, 12);
    topLight.position.set(0, 4, 2);
    scene.add(topLight);

    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetPosX = 0;
    let targetPosY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = normalizedX * 0.75;
      targetRotationX = -normalizedY * 0.55;
      targetPosX = normalizedX * 0.25;
      targetPosY = normalizedY * 0.2;
    };

    let scrollYOffset = 0;
    const handleScroll = () => {
      scrollYOffset = window.scrollY * 0.0015;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const idleRotY = elapsedTime * 0.28;
      const idleRotX = Math.sin(elapsedTime * 0.35) * 0.18;

      mesh.rotation.y += (targetRotationY + idleRotY + scrollYOffset - mesh.rotation.y) * 0.05;
      mesh.rotation.x += (targetRotationX + idleRotX - mesh.rotation.x) * 0.05;

      mesh.position.x += (targetPosX - mesh.position.x) * 0.05;
      mesh.position.y += (targetPosY - mesh.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      renderer.dispose();
    };
  }, [prefersReduced]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] flex items-center justify-center pointer-events-none select-none"
      aria-label="Interactive 3D Abstract UI Sculpture"
    >
      <div className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full bg-rose-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-2 right-4 text-[10px] font-mono-code text-neutral-500/70 uppercase tracking-widest pointer-events-none">
        Three.js // Interactive Mesh
      </div>
    </div>
  );
};
