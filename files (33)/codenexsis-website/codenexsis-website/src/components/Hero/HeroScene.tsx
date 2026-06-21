'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { type MotionValue, useMotionValue } from 'framer-motion';

const ACTIVE_LERP = 0.06;
type Vec3 = [number, number, number];

/* -------------------------------------------------------------------
   Visibility hook — lerps scale toward 1 (active) or 0 (inactive)
   ------------------------------------------------------------------- */
function useShapeAnim(active: boolean, rotateY = 0.18, rotateX = 0.04) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = active ? 1 : 0;
    const cur = ref.current.scale.x;
    const next = THREE.MathUtils.lerp(cur, target, ACTIVE_LERP);
    ref.current.scale.setScalar(next);
    ref.current.visible = next > 0.005;
    if (active) {
      ref.current.rotation.y += delta * rotateY;
      ref.current.rotation.x += delta * rotateX;
    }
  });
  return ref;
}

/* ===================================================================
   1. MOBILE APPLICATIONS — Phone with screen + app icons
   =================================================================== */
function MobileShape({ active }: { active: boolean }) {
  const ref = useShapeAnim(active, 0.22, 0.05);
  return (
    <group ref={ref}>
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[1.3, 2.5, 0.18]} />
        <meshStandardMaterial color="#16161f" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.095]}>
        <planeGeometry args={[1.15, 2.3]} />
        <meshStandardMaterial color="#ef2b3d" emissive="#ff4258" emissiveIntensity={0.6} />
      </mesh>
      {/* Wireframe outline */}
      <mesh>
        <boxGeometry args={[1.4, 2.6, 0.2]} />
        <meshBasicMaterial color="#ff4258" wireframe transparent opacity={0.35} />
      </mesh>
      {/* App icon grid */}
      {[
        [-0.32, 0.7], [0, 0.7], [0.32, 0.7],
        [-0.32, 0.32], [0, 0.32], [0.32, 0.32],
        [-0.32, -0.06], [0, -0.06], [0.32, -0.06],
      ].map((p, i) => (
        <mesh key={i} position={[p[0], p[1], 0.105]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#fff" transparent opacity={0.92} />
        </mesh>
      ))}
      {/* Bottom indicator bar */}
      <mesh position={[0, -1.05, 0.1]}>
        <planeGeometry args={[0.4, 0.06]} />
        <meshBasicMaterial color="#fff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* ===================================================================
   2. CRM PLATFORMS — Connected contact nodes (people network)
   =================================================================== */
function CRMShape({ active }: { active: boolean }) {
  const ref = useShapeAnim(active, 0.16, 0.05);

  const { nodes, lineGeo } = useMemo(() => {
    const arr: Vec3[] = [
      [0, 1.4, 0.2],
      [-1.4, 0.6, -0.3],
      [1.4, 0.6, 0.3],
      [-1.0, -0.7, 0.4],
      [1.0, -0.7, -0.4],
      [0, -1.3, 0.1],
      [0, 0, 0], // hub (last index)
    ];
    const positions: number[] = [];
    const hub = arr[arr.length - 1];
    for (let i = 0; i < arr.length - 1; i++) {
      positions.push(...arr[i], ...hub);
    }
    // peripheral connections
    [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5]].forEach(([a, b]) => {
      positions.push(...arr[a], ...arr[b]);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return { nodes: arr, lineGeo: geo };
  }, []);

  return (
    <group ref={ref}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#ef2b3d" transparent opacity={0.45} />
      </lineSegments>
      {nodes.map((pos, i) => {
        const isHub = i === nodes.length - 1;
        return (
          <mesh key={i} position={pos}>
            <icosahedronGeometry args={[isHub ? 0.4 : 0.22, isHub ? 1 : 0]} />
            <meshStandardMaterial
              color="#ff4258"
              emissive="#ef2b3d"
              emissiveIntensity={isHub ? 1.6 : 0.9}
              flatShading
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ===================================================================
   3. ERP SYSTEMS — Stacked database tiers
   =================================================================== */
function ERPShape({ active }: { active: boolean }) {
  const ref = useShapeAnim(active, 0.18, 0.02);
  const layers = [
    { y: -1.05, w: 1.7, h: 0.4, opacity: 0.85 },
    { y: -0.45, w: 1.45, h: 0.4, opacity: 0.9 },
    { y: 0.15, w: 1.2, h: 0.4, opacity: 0.95 },
    { y: 0.75, w: 0.95, h: 0.4, opacity: 1 },
  ];
  return (
    <group ref={ref}>
      {layers.map((layer, i) => (
        <group key={i} position={[0, layer.y, 0]}>
          <mesh rotation={[0, i * 0.08, 0]}>
            <boxGeometry args={[layer.w, layer.h, layer.w]} />
            <meshStandardMaterial
              color="#ef2b3d"
              emissive="#ff4258"
              emissiveIntensity={0.4}
              metalness={0.4}
              roughness={0.5}
              flatShading
            />
          </mesh>
          <mesh rotation={[0, i * 0.08, 0]}>
            <boxGeometry args={[layer.w + 0.06, layer.h + 0.06, layer.w + 0.06]} />
            <meshBasicMaterial color="#ff4258" wireframe transparent opacity={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ===================================================================
   4. CYBERSECURITY — Octahedron shield + orbital rings
   =================================================================== */
function CybersecurityShape({ active }: { active: boolean }) {
  const ref = useShapeAnim(active, 0.18, 0.04);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!active) return;
    if (ring1.current) ring1.current.rotation.x += delta * 0.6;
    if (ring2.current) {
      ring2.current.rotation.y += delta * 0.5;
      ring2.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <octahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial color="#ef2b3d" emissive="#ff4258" emissiveIntensity={1} flatShading />
      </mesh>
      <mesh>
        <octahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color="#ef2b3d" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[2.2, 0.022, 8, 64]} />
        <meshBasicMaterial color="#ff4258" />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.55, 0.016, 8, 64]} />
        <meshBasicMaterial color="#ef2b3d" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* ===================================================================
   5. IT NETWORKS — Hub + 8 satellite nodes
   =================================================================== */
function NetworkShape({ active }: { active: boolean }) {
  const ref = useShapeAnim(active, 0.15, 0.03);

  const { satellites, lineGeo } = useMemo(() => {
    const N = 10;
    const sats: Vec3[] = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.9;
      sats.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    const positions: number[] = [];
    sats.forEach((s) => positions.push(0, 0, 0, ...s));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return { satellites: sats, lineGeo: geo };
  }, []);

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#ff4258" emissive="#ef2b3d" emissiveIntensity={1.5} flatShading />
      </mesh>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#ef2b3d" transparent opacity={0.45} />
      </lineSegments>
      {satellites.map((pos, i) => (
        <mesh key={i} position={pos}>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#ff4258" emissive="#ef2b3d" emissiveIntensity={0.8} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* ===================================================================
   6. CLOUD PLATFORMS — Cluster of overlapping spheres (cloud puff)
   =================================================================== */
function CloudShape({ active }: { active: boolean }) {
  const ref = useShapeAnim(active, 0.13, 0.025);
  const spheres: { p: Vec3; r: number }[] = [
    { p: [0, 0, 0], r: 1.15 },
    { p: [-1.0, 0.2, 0.3], r: 0.85 },
    { p: [1.0, 0.1, -0.2], r: 0.9 },
    { p: [-0.5, -0.7, 0.2], r: 0.75 },
    { p: [0.55, -0.65, -0.1], r: 0.8 },
    { p: [0, 0.75, 0.2], r: 0.7 },
  ];
  return (
    <group ref={ref}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.p}>
          <icosahedronGeometry args={[s.r, 1]} />
          <meshStandardMaterial
            color="#ef2b3d"
            emissive="#ff4258"
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
            flatShading
          />
        </mesh>
      ))}
      {spheres.slice(0, 3).map((s, i) => (
        <mesh key={`w${i}`} position={s.p}>
          <icosahedronGeometry args={[s.r + 0.08, 1]} />
          <meshBasicMaterial color="#ff4258" wireframe transparent opacity={0.32} />
        </mesh>
      ))}
    </group>
  );
}

/* ===================================================================
   7. SaaS PRODUCTS — Stacked dashboard cards (layered planes)
   =================================================================== */
function SaaSShape({ active }: { active: boolean }) {
  const ref = useShapeAnim(active, 0.12, 0.05);
  const cards = [
    { offset: [-0.35, 0.45, -0.4] as Vec3, color: '#1a1a24', emissive: '#000', ei: 0 },
    { offset: [0, 0, -0.1] as Vec3, color: '#ef2b3d', emissive: '#ef2b3d', ei: 0.4 },
    { offset: [0.35, -0.45, 0.2] as Vec3, color: '#ff4258', emissive: '#ff4258', ei: 0.6 },
  ];
  return (
    <group ref={ref}>
      {cards.map((c, i) => (
        <group key={i} position={c.offset} rotation={[-0.12, 0.06, 0]}>
          <mesh>
            <planeGeometry args={[2.3, 1.5]} />
            <meshStandardMaterial color={c.color} emissive={c.emissive} emissiveIntensity={c.ei} side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <planeGeometry args={[2.4, 1.6]} />
            <meshBasicMaterial color="#ff4258" wireframe transparent opacity={0.32} side={THREE.DoubleSide} />
          </mesh>
          {/* small "rows" on the front card */}
          {i === 2 && [0.45, 0.15, -0.15, -0.45].map((y, k) => (
            <mesh key={k} position={[-0.2, y, 0.01]}>
              <planeGeometry args={[1.6, 0.08]} />
              <meshBasicMaterial color="#fff" transparent opacity={0.55} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ===================================================================
   8. AI AUTOMATIONS — Neural network (3 layers, dense connections)
   =================================================================== */
function AIShape({ active }: { active: boolean }) {
  const ref = useShapeAnim(active, 0.1, 0.02);

  const { nodes, lineGeo } = useMemo(() => {
    const layers = [
      { count: 4, x: -1.6 },
      { count: 6, x: 0 },
      { count: 4, x: 1.6 },
    ];
    const ns: { pos: Vec3; layer: number }[] = [];
    layers.forEach((layer, li) => {
      for (let i = 0; i < layer.count; i++) {
        const y = (i - (layer.count - 1) / 2) * 0.55;
        ns.push({ pos: [layer.x, y, 0], layer: li });
      }
    });
    const positions: number[] = [];
    for (let i = 0; i < ns.length; i++) {
      for (let j = 0; j < ns.length; j++) {
        if (ns[j].layer === ns[i].layer + 1) positions.push(...ns[i].pos, ...ns[j].pos);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return { nodes: ns, lineGeo: geo };
  }, []);

  return (
    <group ref={ref}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#ef2b3d" transparent opacity={0.32} blending={THREE.AdditiveBlending} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#ff4258" emissive="#ef2b3d" emissiveIntensity={1.3} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Background particle field ---------- */
function Particles({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 14 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.025;
      ref.current.rotation.x += delta * 0.008;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ef2b3d"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene({
  scrollMv,
  activeService = 0,
}: {
  scrollMv?: MotionValue<number>;
  activeService?: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[8, 8, 8]} intensity={1.6} color="#ff4258" />
        <pointLight position={[-8, -4, 4]} intensity={0.7} color="#ffffff" />
        <pointLight position={[0, 0, -5]} intensity={0.5} color="#4c6ef5" />

        {/* 8 distinct shapes — one per rotating service */}
        <MobileShape active={activeService === 0} />
        <CRMShape active={activeService === 1} />
        <ERPShape active={activeService === 2} />
        <CybersecurityShape active={activeService === 3} />
        <NetworkShape active={activeService === 4} />
        <CloudShape active={activeService === 5} />
        <SaaSShape active={activeService === 6} />
        <AIShape active={activeService === 7} />

        <Particles count={800} />
      </Suspense>
    </Canvas>
  );
}
