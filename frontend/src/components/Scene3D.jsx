/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = () => {
  const mesh = useRef();
  const count = 120;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.getElapsedTime() * 0.04;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#00ffaa" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const FloatingOrb = ({ position, color, speed }) => {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.5;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.3;
    mesh.current.rotation.z = clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[0.4, 1]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
    </mesh>
  );
};

const Scene3D = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00ffaa" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#00cfff" intensity={0.5} />
      <Particles />
      <FloatingOrb position={[-4, 2, -2]} color="#00ffaa" speed={0.8} />
      <FloatingOrb position={[4, -1, -3]} color="#00cfff" speed={1.2} />
      <FloatingOrb position={[0, 3, -4]} color="#7b61ff" speed={0.6} />
    </Canvas>
  </div>
);

export default Scene3D;