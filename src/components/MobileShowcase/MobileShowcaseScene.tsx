'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ===================================================================
   Mobile Showcase Scene — central phone + orbiting UI cards
   =================================================================== */

function PhoneBody() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.15;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
  });
  return (
    <group ref={ref}>
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[1.5, 3.0, 0.2]} />
        <meshStandardMaterial color="#16101a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.05, 0.105]}>
        <planeGeometry args={[1.32, 2.7]} />
        <meshStandardMaterial color="#ef2b3d" emissive="#ff4258" emissiveIntensity={0.7} />
      </mesh>
      {/* Wireframe outline */}
      <mesh>
        <boxGeometry args={[1.6, 3.1, 0.22]} />
        <meshBasicMaterial color="#ff4258" wireframe transparent opacity={0.35} />
      </mesh>
      {/* Notch */}
      <mesh position={[0, 1.32, 0.115]}>
        <planeGeometry args={[0.5, 0.08]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      {/* App grid — 3 rows of 3 */}
      {[
        [-0.4, 0.85], [0, 0.85], [0.4, 0.85],
        [-0.4, 0.45], [0, 0.45], [0.4, 0.45],
        [-0.4, 0.05], [0, 0.05], [0.4, 0.05],
      ].map((p, i) => (
        <mesh key={`app-${i}`} position={[p[0], p[1], 0.12]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshBasicMaterial color="#fff" transparent opacity={0.92} />
        </mesh>
      ))}
      {/* Bottom dock */}
      <mesh position={[0, -0.55, 0.115]}>
        <planeGeometry args={[1.15, 0.55]} />
        <meshBasicMaterial color="#fff" transparent opacity={0.18} />
      </mesh>
      {[-0.32, 0, 0.32].map((x, i) => (
        <mesh key={`dock-${i}`} position={[x, -0.55, 0.12]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshBasicMaterial color="#fff" transparent opacity={0.85} />
        </mesh>
      ))}
      {/* Bottom indicator */}
      <mesh position={[0, -1.25, 0.115]}>
        <planeGeometry args={[0.45, 0.05]} />
        <meshBasicMaterial color="#fff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* Floating UI cards orbiting the phone */
function FloatingCard({ angle, radius, yOffset, scale, hue }: { angle: number; radius: number; yOffset: number; scale: number; hue: 'red' | 'red-hi' }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const orbital = t * 0.15 + angle;
    ref.current.position.x = Math.cos(orbital) * radius;
    ref.current.position.z = Math.sin(orbital) * radius;
    ref.current.position.y = yOffset + Math.sin(t * 0.6 + angle) * 0.15;
    ref.current.rotation.y = -orbital + Math.PI / 2;
    ref.current.rotation.x = Math.sin(t * 0.3 + angle) * 0.1;
  });
  const color = hue === 'red-hi' ? '#ff4258' : '#ef2b3d';
  return (
    <group ref={ref} scale={scale}>
      <mesh>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial color="#1a121a" metalness={0.4} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <planeGeometry args={[1.25, 0.85]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* "Content" lines */}
      {[0.22, 0.05, -0.12].map((y, i) => (
        <mesh key={i} position={[-0.2, y, 0.005]}>
          <planeGeometry args={[0.7, 0.06]} />
          <meshBasicMaterial color={i === 0 ? color : '#fff'} transparent opacity={i === 0 ? 0.95 : 0.4} />
        </mesh>
      ))}
      {/* Small icon dot */}
      <mesh position={[-0.45, 0.22, 0.005]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function Particles({ count = 500 }: { count?: number }) {
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
    if (ref.current) ref.current.rotation.y += delta * 0.02;
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

export default function MobileShowcaseScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={1.5} color="#ff4258" />
        <pointLight position={[-6, -3, 3]} intensity={0.7} color="#ffffff" />
        <PhoneBody />
        <FloatingCard angle={0} radius={2.6} yOffset={0.7} scale={0.7} hue="red-hi" />
        <FloatingCard angle={Math.PI * 0.7} radius={2.8} yOffset={-0.4} scale={0.6} hue="red" />
        <FloatingCard angle={Math.PI * 1.3} radius={2.7} yOffset={0.2} scale={0.55} hue="red-hi" />
        <Particles count={500} />
      </Suspense>
    </Canvas>
  );
}
