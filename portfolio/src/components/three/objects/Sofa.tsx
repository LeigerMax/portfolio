"use client";

import { Box } from "@react-three/drei";

export default function Sofa({ position = [7, 0, -8], rotation = [0, Math.PI / 2, 0] }: { position?: [number, number, number], rotation?: [number, number, number] } = {}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Assise principale rallongée vers le bas */}
      <Box args={[5, 2.3, 2.5]} position={[0, 0.05, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#222" roughness={0.9} />
      </Box>
      {/* Dossier */}
      <Box args={[5, 1.8, 0.6]} position={[0, 1.3, -0.95]} castShadow>
        <meshStandardMaterial color="#222" roughness={0.9} />
      </Box>
      {/* Accoudoir Gauche */}
      <Box args={[0.6, 1.6, 2.5]} position={[-2.2, 0.8, 0]} castShadow>
        <meshStandardMaterial color="#222" roughness={0.9} />
      </Box>
      {/* Accoudoir Droit */}
      <Box args={[0.6, 1.6, 2.5]} position={[2.2, 0.8, 0]} castShadow>
        <meshStandardMaterial color="#222" roughness={0.9} />
      </Box>
      {/* Coussins d'assise (détails supplémentaires) */}
      <Box args={[2.1, 0.2, 2.1]} position={[-1, 1.25, 0]}>
        <meshStandardMaterial color="#2a2a2a" roughness={1} />
      </Box>
      <Box args={[2.1, 0.2, 2.1]} position={[1, 1.25, 0]}>
        <meshStandardMaterial color="#2a2a2a" roughness={1} />
      </Box>
    </group>
  );
}
