'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { type MotionValue, useMotionValue } from 'framer-motion';

/* ---------- Helpers ---------- */
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/* ---------- Phase 1: Build (sphere wireframe) ---------- */
function BuildShape({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = progress.get();
    // Active in phase 0: 0 → 0.33 (fully visible 0.0 - 0.30, fades 0.30 - 0.36)
    const fadeIn = smoothstep(0, 0.02, p);
    const fadeOut = smoothstep(0.30, 0.36, p);
    const scale = fadeIn * (1 - fadeOut) * 1.8;
    ref.current.scale.setScalar(Math.max(scale, 0.001));
    ref.current.visible = scale > 0.01;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x += delta * 0.05;
    if (matRef.current) {
      matRef.current.opacity = 0.85 * (fadeIn * (1 - fadeOut));
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.4, 2]} />
        <meshBasicMaterial ref={matRef} color="#ef2b3d" wireframe transparent opacity={0.85} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="#ff4258" emissive="#ef2b3d" emissiveIntensity={1.5} flatShading />
      </mesh>
    </group>
  );
}

/* ---------- Phase 2: Secure (octahedron shield + rings) ---------- */
function SecureShape({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const matRefs = [useRef<THREE.MeshBasicMaterial>(null), useRef<THREE.MeshBasicMaterial>(null)];

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = progress.get();
    // Active in phase 1: 0.33 → 0.66 (fades 0.30-0.36 in, 0.62-0.68 out)
    const fadeIn = smoothstep(0.30, 0.36, p);
    const fadeOut = smoothstep(0.62, 0.68, p);
    const scale = fadeIn * (1 - fadeOut) * 1.7;
    ref.current.scale.setScalar(Math.max(scale, 0.001));
    ref.current.visible = scale > 0.01;
    ref.current.rotation.y += delta * 0.15;
    ref.current.rotation.z += delta * 0.05;
    if (ring1.current) ring1.current.rotation.x += delta * 0.6;
    if (ring2.current) {
      ring2.current.rotation.y += delta * 0.5;
      ring2.current.rotation.z += delta * 0.2;
    }
    matRefs.forEach((mr) => {
      if (mr.current) mr.current.opacity = 0.85 * (fadeIn * (1 - fadeOut));
    });
  });

  return (
    <group ref={ref}>
      {/* Solid shield core */}
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#ff4258" emissive="#ef2b3d" emissiveIntensity={1.2} flatShading />
      </mesh>
      {/* Outer wireframe shell */}
      <mesh>
        <octahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial ref={matRefs[0]} color="#ef2b3d" wireframe transparent opacity={0.85} />
      </mesh>
      {/* Orbital rings */}
      <mesh ref={ring1}>
        <torusGeometry args={[2, 0.012, 8, 64]} />
        <meshBasicMaterial ref={matRefs[1]} color="#ff4258" transparent opacity={0.85} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.4, 0.008, 8, 64]} />
        <meshBasicMaterial color="#ef2b3d" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ---------- Phase 3: Scale (network grid expanding outward) ---------- */
function ScaleShape({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.Group>(null);

  const { nodes, lineGeometry } = useMemo(() => {
    const NODE_COUNT = 60;
    const arr: [number, number, number][] = [];
    // Distribute on outer + inner shells
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = i % 3 === 0 ? 1.4 : i % 3 === 1 ? 1.9 : 2.3;
      arr.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    const positions: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const dx = arr[i][0] - arr[j][0];
        const dy = arr[i][1] - arr[j][1];
        const dz = arr[i][2] - arr[j][2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 1.3) positions.push(arr[i][0], arr[i][1], arr[i][2], arr[j][0], arr[j][1], arr[j][2]);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return { nodes: arr, lineGeometry: geo };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = progress.get();
    // Active in phase 2: 0.66 → 1.0 (fades in 0.62-0.68)
    const fadeIn = smoothstep(0.62, 0.68, p);
    const scale = fadeIn * 1.3;
    ref.current.scale.setScalar(Math.max(scale, 0.001));
    ref.current.visible = scale > 0.01;
    ref.current.rotation.y += delta * 0.1;
    ref.current.rotation.x += delta * 0.03;
  });

  return (
    <group ref={ref}>
      {/* Center core */}
      <mesh>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial color="#ff4258" emissive="#ef2b3d" emissiveIntensity={2} flatShading />
      </mesh>
      {/* Connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#ef2b3d" transparent opacity={0.32} blending={THREE.AdditiveBlending} />
      </lineSegments>
      {/* Network nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <icosahedronGeometry args={[0.06, 0]} />
          <meshBasicMaterial color="#ff4258" />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Background drifting particles ---------- */
function BgParticles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 12 + 4;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [count]);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ef2b3d" transparent opacity={0.4} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function ScrollScene3DCanvas({ progress }: { progress?: MotionValue<number> }) {
  const fb = useMotionValue(0);
  const mv = progress ?? fb;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={1.4} color="#ff4258" />
        <pointLight position={[-6, -3, 3]} intensity={0.7} color="#ffffff" />
        <pointLight position={[0, 0, -5]} intensity={0.5} color="#4c6ef5" />
        <BuildShape progress={mv} />
        <SecureShape progress={mv} />
        <ScaleShape progress={mv} />
        <BgParticles count={600} />
      </Suspense>
    </Canvas>
  );
}
