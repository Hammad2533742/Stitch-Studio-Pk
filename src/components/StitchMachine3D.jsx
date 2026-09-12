import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * SECURITY / STABILITY FIXES:
 * 1. Renderer and all THREE objects are properly disposed on unmount (memory leak fix).
 * 2. ResizeObserver used instead of window resize listener for contained elements.
 * 3. canvas element appended/removed cleanly.
 * 4. animationId tracked via ref to guarantee cancellation on unmount.
 */
export default function StitchMachine3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(2.1, 1.55, 2.7);
    camera.lookAt(0, 0.32, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0xfff2e0, 0.35));

    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(3, 5, 3.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 20;
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.bias = -0.0004;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xb08d57, 0.7);
    fill.position.set(-4, 2, 2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 1.1);
    rim.position.set(-1, 3.5, -4);
    scene.add(rim);

    const warm = new THREE.PointLight(0xffd9a0, 0.5, 8);
    warm.position.set(0.6, 0.6, 0.6);
    scene.add(warm);

    // --- Materials ---
    const iron = new THREE.MeshStandardMaterial({ color: 0x2b2622, metalness: 0.88, roughness: 0.3 });
    const ironDark = new THREE.MeshStandardMaterial({ color: 0x1a1612, metalness: 0.9, roughness: 0.42 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xb08d57, metalness: 0.95, roughness: 0.2 });
    const steel = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: 1, roughness: 0.1 });
    const threadMat = new THREE.MeshStandardMaterial({ color: 0xf3efe6, metalness: 0, roughness: 0.95 });
    const wood = new THREE.MeshStandardMaterial({ color: 0x6b4a2b, metalness: 0.1, roughness: 0.7 });

    const machine = new THREE.Group();
    const Y = 0;

    // Bed
    const bed = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.1, 1.2), ironDark);
    bed.position.set(0, Y + 0.05, 0);
    bed.castShadow = true; bed.receiveShadow = true;
    machine.add(bed);
    const bedTrim = new THREE.Mesh(new THREE.BoxGeometry(2.64, 0.02, 1.24), gold);
    bedTrim.position.set(0, Y + 0.11, 0);
    machine.add(bedTrim);

    // Body / standard (back-left)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.7), iron);
    body.position.set(-0.85, Y + 0.1 + 0.45, 0);
    body.castShadow = true; body.receiveShadow = true;
    machine.add(body);
    const bodyBand = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.04, 0.74), gold);
    bodyBand.position.set(-0.85, Y + 0.1 + 0.7, 0);
    machine.add(bodyBand);
    const emblem = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03, 28), gold);
    emblem.rotation.x = Math.PI / 2;
    emblem.position.set(-0.85, Y + 0.1 + 0.45, 0.37);
    machine.add(emblem);

    // Arm over the bed
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.34, 0.5), iron);
    arm.position.set(0.05, Y + 0.1 + 0.62, 0);
    arm.castShadow = true;
    machine.add(arm);
    const armSeam = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.02, 0.52), gold);
    armSeam.position.set(0.05, Y + 0.1 + 0.46, 0);
    machine.add(armSeam);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.5, 0.55), iron);
    head.position.set(0.62, Y + 0.1 + 0.5, 0);
    head.castShadow = true;
    machine.add(head);

    // Needle bar + foot + needle (animated)
    const needleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.28, 16), steel);
    needleBar.position.set(0.62, Y + 0.1 + 0.3, 0);
    machine.add(needleBar);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.26), ironDark);
    foot.position.set(0.62, Y + 0.1 + 0.16, 0);
    machine.add(foot);
    const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.16, 8), steel);
    needle.position.set(0.62, Y + 0.1 + 0.08, 0);
    machine.add(needle);
    const needleTip = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.05, 8), steel);
    needleTip.position.set(0.62, Y + 0.1 + 0.0, 0);
    needleTip.rotation.x = Math.PI;
    machine.add(needleTip);

    // Needle plate / bobbin
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 28), gold);
    plate.position.set(0.62, Y + 0.1 + 0.02, 0);
    machine.add(plate);

    // Spool on top of body
    const spoolPin = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 12), steel);
    spoolPin.position.set(-0.85, Y + 0.1 + 0.9 + 0.2, 0);
    machine.add(spoolPin);
    const spoolTop = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.03, 24), wood);
    spoolTop.position.set(-0.85, Y + 0.1 + 0.9 + 0.35, 0);
    machine.add(spoolTop);
    const spoolBot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.03, 24), wood);
    spoolBot.position.set(-0.85, Y + 0.1 + 0.9 + 0.05, 0);
    machine.add(spoolBot);
    const spool = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.3, 24), threadMat);
    spool.position.set(-0.85, Y + 0.1 + 0.9 + 0.2, 0);
    spool.castShadow = true;
    machine.add(spool);

    // Handwheel
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.07, 40), iron);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(-0.85, Y + 0.1 + 0.55, -0.42);
    wheel.castShadow = true;
    machine.add(wheel);
    const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.03, 16, 40), gold);
    wheelRim.rotation.x = Math.PI / 2;
    wheelRim.position.set(-0.85, Y + 0.1 + 0.55, -0.43);
    machine.add(wheelRim);
    const wheelHub = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.09, 20), gold);
    wheelHub.rotation.x = Math.PI / 2;
    wheelHub.position.set(-0.85, Y + 0.1 + 0.55, -0.42);
    machine.add(wheelHub);

    // Thread path
    const threadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.85, Y + 0.1 + 0.9 + 0.38, 0),
      new THREE.Vector3(-0.85, Y + 0.1 + 0.7, 0.05),
      new THREE.Vector3(-0.2, Y + 0.1 + 0.7, 0.05),
      new THREE.Vector3(0.5, Y + 0.1 + 0.55, 0.05),
      new THREE.Vector3(0.62, Y + 0.1 + 0.18, 0.04),
    ]);
    const threadTube = new THREE.Mesh(
      new THREE.TubeGeometry(threadCurve, 40, 0.01, 8, false),
      threadMat
    );
    machine.add(threadTube);

    scene.add(machine);
    machine.position.y = -0.4;

    // Needle animation refs — kept outside the loop for minimal GC pressure
    const needleGroup = new THREE.Group();
    needleGroup.add(needleBar, foot, needle, needleTip);
    machine.add(needleGroup);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;

      // Slow camera orbit
      machine.rotation.y = Math.sin(t * 0.18) * 0.35;

      // Needle bob
      const bob = Math.abs(Math.sin(t * 2.8)) * 0.12;
      needleBar.position.y = Y + 0.1 + 0.3 - bob;
      foot.position.y = Y + 0.1 + 0.16 - bob;
      needle.position.y = Y + 0.1 + 0.08 - bob;
      needleTip.position.y = Y + 0.1 + 0.0 - bob;

      // Handwheel rotation
      wheel.rotation.z += 0.018;
      wheelRim.rotation.z += 0.018;
      wheelHub.rotation.z += 0.018;

      renderer.render(scene, camera);
    };
    animate();

    // FIX: Use ResizeObserver (more accurate than window resize for contained elements)
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(mount);

    // FIX: Full cleanup on unmount — prevents memory leaks
    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();

      // Dispose all geometries and materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}   // FIX: was ref__
      className="w-full h-full"
      role="img"
      aria-label="3D sewing machine — live studio study"
    />
  );
}
