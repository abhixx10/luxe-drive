import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

const ChallengerSilhouette = () => (
  <Float speed={1.3} rotationIntensity={0.28} floatIntensity={0.35}>
    <group rotation={[0, -0.28, 0]}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[3.8, 0.55, 1.35]} />
        <meshStandardMaterial color="#15151a" metalness={0.8} roughness={0.24} />
      </mesh>
      <mesh position={[-0.2, 0.62, 0]}>
        <boxGeometry args={[1.9, 0.48, 1.05]} />
        <meshStandardMaterial color="#202029" metalness={0.72} roughness={0.18} />
      </mesh>
      <mesh position={[2.05, 0.18, 0]}>
        <boxGeometry args={[0.5, 0.32, 1.2]} />
        <meshStandardMaterial color="#d94a38" emissive="#45120d" roughness={0.28} />
      </mesh>
      <mesh position={[-2.05, 0.18, 0]}>
        <boxGeometry args={[0.5, 0.32, 1.2]} />
        <meshStandardMaterial color="#d8b66a" emissive="#3f310e" roughness={0.28} />
      </mesh>
      {[-1.28, 1.24].map((x) =>
        [-0.72, 0.72].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.26, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.26, 48]} />
            <meshStandardMaterial color="#050507" metalness={0.7} roughness={0.3} />
          </mesh>
        ))
      )}
      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.1, 96]} />
        <meshBasicMaterial color="#d8b66a" transparent opacity={0.28} />
      </mesh>
    </group>
  </Float>
);

const CarModelPlaceholder = () => {
  return (
    <div
      className="relative h-[430px] min-h-[320px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(216,182,106,0.22),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-glass lg:h-[560px]"
      aria-label="React Three Fiber placeholder for a future Dodge Challenger 3D model"
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 1.3, 5.2]} fov={42} />
        <ambientLight intensity={0.58} />
        <spotLight
          position={[3, 5, 4]}
          angle={0.45}
          penumbra={0.9}
          intensity={95}
          color="#d8b66a"
        />
        <pointLight position={[-4, 1, -2]} intensity={12} color="#5eead4" />
        <Suspense fallback={null}>
          <ChallengerSilhouette />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.75}
          minPolarAngle={Math.PI / 2.7}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-8 bottom-7 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
      <div className="pointer-events-none absolute right-6 top-6 h-3 w-3 rounded-full bg-mint shadow-[0_0_22px_rgba(94,234,212,0.75)]" />
    </div>
  );
};

export default CarModelPlaceholder;
