'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RED = '#ef2b3d';
const RED_HI = '#ff4258';

/* ----- Central AI core: nested wireframe shells that counter-rotate ----- */
function Core() {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (outer.current) {
      outer.current.rotation.y += dt * 0.18;
      outer.current.rotation.x += dt * 0.06;
    }
    if (inner.current) {
      inner.current.rotation.y -= dt * 0.4;
      inner.current.rotation.z += dt * 0.12;
    }
  });

  return (
    <group ref={outer}>
      {/* Outer faceted shell */}
      <mesh>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color={RED} wireframe transparent opacity={0.28} />
      </mesh>
      {/* Mid shell */}
      <mesh rotation={[0.5, 0.3, 0]}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color={RED_HI} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Glowing inner core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={RED_HI}
          emissive={RED}
          emissiveIntensity={2.4}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <pointLight color={RED_HI} intensity={6} distance={6} />
    </group>
  );
}

/* ----- Orbiting "model" nodes connected back to the core ----- */
function Orbit({
  radius,
  speed,
  tilt,
  size,
}: {
  radius: number;
  speed: number;
  tilt: number;
  size: number;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * speed;
  });

  const linePts = useMemo(
    () => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(radius, 0, 0)],
    [radius]
  );
  const lineGeo = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(linePts),
    [linePts]
  );

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={group}>
        {/* connection line */}
        <primitive
          object={
            new THREE.Line(
              lineGeo,
              new THREE.LineBasicMaterial({
                color: RED,
                transparent: true,
                opacity: 0.22,
              })
            )
          }
        />
        {/* node */}
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial
            color={RED_HI}
            emissive={RED}
            emissiveIntensity={1.8}
            roughness={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ----- Ambient particle field ----- */
function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={RED}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function AICoreScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <Core />
      <Orbit radius={2.4} speed={0.5} tilt={0.4} size={0.1} />
      <Orbit radius={2.9} speed={-0.35} tilt={-0.6} size={0.08} />
      <Orbit radius={3.3} speed={0.28} tilt={1.1} size={0.12} />
      <Particles />
    </Canvas>
  );
}
