import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function StitchMachine3D({ onMachineClick }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(2.1, 1.55, 2.7);
    camera.lookAt(0, 0.32, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xfff2e0, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(3, 5, 3.5);
    scene.add(key);

    const iron = new THREE.MeshStandardMaterial({ color: 0x2b2622, metalness: 0.88, roughness: 0.3 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xb08d57, metalness: 0.95, roughness: 0.2 });

    const machine = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.9, 0.7), iron);
    body.position.set(0, 0.5, 0);
    machine.add(body);

    const goldTrim = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.05, 0.75), gold);
    goldTrim.position.set(0, 0.95, 0);
    machine.add(goldTrim);

    scene.add(machine);

    let animationId;
    let isSewingFast = false;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;

      machine.rotation.y = Math.sin(t * 0.5) * 0.2;
      if (isSewingFast) {
        machine.position.y = Math.sin(t * 50) * 0.02; // Fast sewing vibe on click
      }
      renderer.render(scene, camera);
    };
    animate();

    // Trigger sewing animation and present mascot overlay
    const handlePointerDown = () => {
      isSewingFast = true;
      setTimeout(() => {
        isSewingFast = false;
        if (onMachineClick) onMachineClick();
      }, 700);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('click', handlePointerDown);

    return () => {
      cancelAnimationFrame(animationId);
      domEl.removeEventListener('click', handlePointerDown);
      renderer.dispose();
      if (mount.contains(domEl)) mount.removeChild(domEl);
    };
  }, [onMachineClick]);

  return <div ref={mountRef} className="w-full h-full cursor-pointer" title="Click to start sewing signature" />;
}