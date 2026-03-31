"use client";

import { Box, Cylinder } from "@react-three/drei";
import * as THREE from "three";

export default function Window({ position = [-14.9, 7, -5], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] } = {}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Fenêtre avec Stores Vénitiens */}
      <Box args={[0.2, 5.5, 4.5]}><meshStandardMaterial color="#fff" /></Box>
      {/* Stores */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Box key={i} args={[0.1, 0.05, 4.2]} position={[0.1, 2.5 - i * 0.35, 0]} rotation={[0, 0, 0.4]}>
          <meshStandardMaterial color="#fffbe6" emissive="#ff8800" emissiveIntensity={0.05} />
        </Box>
      ))}
      <spotLight
        position={[0.5, 0, 0]}
        target-position={[10, -2, 0]}
        intensity={80}
        color="#ff8833"
        angle={0.6}
        penumbra={0.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      {/* Faisceaux de lumière (Multiple Light Rays) aligned with slats */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Cylinder
          key={`ray-${i}`}
          args={[0.01, 0.2, 50, 8]}
          position={[9, 2.5 - i * 0.7 - 2.6, 1.4]}
          rotation={[4, 0.15, Math.PI / 2 + 0.28]} // Tilted down and slightly forward
        >
          <meshStandardMaterial
            color="#ffaa00"
            transparent
            opacity={0.06}
            emissive="#ff8800"
            emissiveIntensity={2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Cylinder>
      ))}
    </group>
  );
}
