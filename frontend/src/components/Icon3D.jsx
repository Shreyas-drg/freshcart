import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const shapes = {
  cart: { geometry: <boxGeometry args={[1, 0.8, 0.8]} />, color: '#00ffaa' },
  home: { geometry: <coneGeometry args={[0.6, 1, 4]} />, color: '#00ffaa' },
  orders: { geometry: <cylinderGeometry args={[0.5, 0.5, 1, 6]} />, color: '#00ffaa' },
  user: { geometry: <sphereGeometry args={[0.6, 16, 16]} />, color: '#00ffaa' },
  heart: { geometry: <torusGeometry args={[0.4, 0.2, 8, 16]} />, color: '#ff4d6d' },
  search: { geometry: <torusGeometry args={[0.4, 0.15, 8, 16]} />, color: '#00ffaa' },
  admin: { geometry: <octahedronGeometry args={[0.6]} />, color: '#7b61ff' },
  logout: { geometry: <tetrahedronGeometry args={[0.6]} />, color: '#ff4d6d' },
  star: { geometry: <dodecahedronGeometry args={[0.5]} />, color: '#ffd700' },
  coupon: { geometry: <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />, color: '#00cfff' },
  success: { geometry: <icosahedronGeometry args={[0.6, 1]} />, color: '#00ffaa', final: true },
  payment: { geometry: <torusKnotGeometry args={[0.4, 0.15, 128, 16]} />, color: '#ffd700', final: true },
};

// CSS 3D icons for small sizes — no WebGL needed
const cssIcons = {
  cart: { symbol: '⬡', color: '#00ffaa' },
  home: { symbol: '⌂', color: '#00ffaa' },
  orders: { symbol: '◈', color: '#00ffaa' },
  user: { symbol: '◉', color: '#00ffaa' },
  heart: { symbol: '♥', color: '#ff4d6d' },
  search: { symbol: '⊙', color: '#00ffaa' },
  admin: { symbol: '⬡', color: '#7b61ff' },
  logout: { symbol: '⏻', color: '#ff4d6d' },
  star: { symbol: '★', color: '#ffd700' },
  coupon: { symbol: '◈', color: '#00cfff' },
  success: { symbol: '✦', color: '#00ffaa' },
  payment: { symbol: '◆', color: '#ffd700' },
};

const IconMesh = ({ type, hovered }) => {
  const mesh = useRef();
  const shape = shapes[type] || shapes.home;

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.getElapsedTime() * (hovered ? 3 : 1);
    mesh.current.rotation.x = clock.getElapsedTime() * (hovered ? 1.5 : 0.5);
    if (shape.final) {
      mesh.current.rotation.z = clock.getElapsedTime() * 2;
    }
    const scale = hovered ? 1.3 : 1;
    mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <mesh ref={mesh}>
      {shape.geometry}
      <meshStandardMaterial
        color={shape.color}
        metalness={shape.final ? 0.9 : 0.4}
        roughness={shape.final ? 0.1 : 0.3}
        emissive={shape.color}
        emissiveIntensity={hovered ? 0.6 : 0.2}
        wireframe={shape.final}
      />
    </mesh>
  );
};

const Icon3D = ({ type = 'home', size = 36 }) => {
  const [hovered, setHovered] = useState(false);

  // Use CSS icon for small sizes to save WebGL contexts
  if (size <= 32) {
    const icon = cssIcons[type] || cssIcons.home;
    return (
      <span
        className="icon3d-css"
        style={{
          fontSize: size,
          color: icon.color,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          animation: 'icon-spin 4s linear infinite',
          filter: `drop-shadow(0 0 4px ${icon.color})`,
          pointerEvents: 'none',
        }}
      >
        {icon.symbol}
      </span>
    );
  }

  // Use Three.js Canvas for larger icons
  return (
    <div
      className="icon3d-wrap"
      style={{ width: size, height: size, pointerEvents: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} color="#00ffaa" intensity={1.5} />
        <pointLight position={[-2, -2, -2]} color="#00cfff" intensity={0.5} />
        <IconMesh type={type} hovered={hovered} />
      </Canvas>
    </div>
  );
};

export default Icon3D;