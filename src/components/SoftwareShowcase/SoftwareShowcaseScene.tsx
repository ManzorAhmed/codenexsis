'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ===================================================================
   Software Showcase Scene — layered architecture (microservices)
   =================================================================== */

function ArchitectureLayers() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x = -0.4 + Math.sin(state.clock.elapsedTime * 0.25) * 0.05;
  });

  // Three architectural tiers
  const layers = [
    { y: 1.2, w: 3.2, label: 'Presentation', items: 5, color: '#ff4258', emi: 0.6 },
    { y: 0, w: 3.6, label: 'Business Logic', items: 7, color: '#ef2b3d', emi: 0.5 },
    { y: -1.2, w: 3.2, label: 'Data', items: 5, color: '#b8101f', emi: 0.4 },
  ];

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {layers.map((layer, li) => (
        <group key={li} position={[0, layer.y, 0]}>
          {/* Layer base plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[layer.w, layer.w * 0.55]} />
            <meshStandardMaterial
              color={layer.color}
              emissive={layer.color}
              emissiveIntensity={layer.emi * 0.4}
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Layer wireframe outline */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[layer.w, layer.w * 0.55]} />
            <meshBasicMaterial color={layer.color} wireframe transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          {/* Service modules on layer */}
          {Array.from({ length: layer.items }).map((_, i) => {
            const x = (i - (layer.items - 1) / 2) * (layer.w / layer.items);
            const z = ((i % 2) - 0.5) * 0.5;
            return (
              <group key={i} position={[x, 0.18, z]}>
                <mesh>
                  <boxGeometry args={[0.45, 0.36, 0.45]} />
                  <meshStandardMaterial
                    color={layer.color}
                    emissive={layer.color}
                    emissiveIntensity={layer.emi}
                    metalness={0.5}
                    roughness={0.4}
                    flatShading
                  />
                </mesh>
                <mesh>
                  <boxGeometry args={[0.5, 0.4, 0.5]} />
                  <meshBasicMaterial color={layer.color} wireframe transparent opacity={0.45} />
                </mesh>
              </group>
            );
          })}
        </group>
      ))}

      {/* Vertical connection lines between layers */}
      <ConnectionLines layers={layers} />
    </group>
  );
}

function ConnectionLines({ layers }: { layers: { y: number; w: number; items: number }[] }) {
  const lineGeo = useMemo(() => {
    const positions: number[] = [];
    // Connect each module to the one in the layer below
    for (let li = 0; li < layers.length - 1; li++) {
      const top = layers[li];
      const bottom = layers[li + 1];
      const topItems = top.items;
      const botItems = bottom.items;
      for (let i = 0; i < topItems; i++) {
        const x1 = (i - (topItems - 1) / 2) * (top.w / topItems);
        const z1 = ((i % 2) - 0.5) * 0.5;
        // Connect to corresponding module below (mod-mapped)
        const j = i % botItems;
        const x2 = (j - (botItems - 1) / 2) * (bottom.w / botItems);
        const z2 = ((j % 2) - 0.5) * 0.5;
        positions.push(x1, top.y + 0.18, z1, x2, bottom.y + 0.18, z2);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geo;
  }, [layers]);

  return (
    <lineSegments geometry={lineGeo}>
      <lineBasicMaterial color="#ef2b3d" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function Particles({ count = 600 }: { count?: number }) {
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
    if (ref.current) ref.current.rotation.y -= delta * 0.02;
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

export default function SoftwareShowcaseScene() {
  return (
    <Canvas camera={{ position: [3.5, 2, 5], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 6, 6]} intensity={1.4} color="#ff4258" />
        <pointLight position={[-6, -3, 3]} intensity={0.7} color="#ffffff" />
        <pointLight position={[0, 0, -5]} intensity={0.5} color="#ef2b3d" />
        <ArchitectureLayers />
        <Particles count={600} />
      </Suspense>
    </Canvas>
  );
}
