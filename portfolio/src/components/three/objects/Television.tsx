"use client";

import { Box } from "@react-three/drei";

export default function Television({ position = [14.85, 6, -8], rotation = [0, -Math.PI / 2, 0] }: { position?: [number, number, number], rotation?: [number, number, number] } = {}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cadre de la TV */}
      <Box args={[6, 3.5, 0.15]} castShadow>
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Écran */}
      <Box args={[5.7, 3.2, 0.05]} position={[0, 0, 0.06]}>
        <meshStandardMaterial color="#222" emissive="#aaccff" emissiveIntensity={0.8} roughness={0.1} />
      </Box>
      {/* Support mural (discret) */}
      <Box args={[1, 1, 0.1]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#222" />
      </Box>
    </group>
  );
}
