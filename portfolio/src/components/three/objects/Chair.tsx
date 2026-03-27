"use client";

import { Box, Cylinder } from "@react-three/drei";
import * as THREE from "three";

export default function Chair({ position = [0, 0, 2.5], rotation = [0, Math.PI, 0] }: { position?: [number, number, number], rotation?: [number, number, number] } = {}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Assise (Seat) */}
      <Box args={[2, 0.2, 2]} position={[0, 0.6, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </Box>

      {/* Dossier (Backrest) */}
      <Box args={[2, 2.5, 0.2]} position={[0, 1.95, -0.9]} castShadow>
        <meshStandardMaterial color="#333" roughness={0.8} />
      </Box>

      {/* Accoudoirs (Armrests) */}
      <group position={[0, 0.6, 0]}>
        {/* Support Gauche */}
        <Box args={[0.1, 0.6, 0.1]} position={[-1.05, 0.3, 0.2]} castShadow>
          <meshStandardMaterial color="#222" />
        </Box>
        {/* Partie supérieure Gauche */}
        <Box args={[0.25, 0.1, 1.3]} position={[-1.05, 0.6, 0]} castShadow>
          <meshStandardMaterial color="#111" roughness={0.4} />
        </Box>

        {/* Support Droit */}
        <Box args={[0.1, 0.6, 0.1]} position={[1.05, 0.3, 0.2]} castShadow>
          <meshStandardMaterial color="#222" />
        </Box>
        {/* Partie supérieure Droite */}
        <Box args={[0.25, 0.1, 1.3]} position={[1.05, 0.6, 0]} castShadow>
          <meshStandardMaterial color="#111" roughness={0.4} />
        </Box>
      </group>

      {/* Pied Central (Central Leg) - Rallongé pour atteindre le bas */}
      <Cylinder args={[0.12, 0.12, 1.2, 16]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Base en étoile avec roues */}
      <group position={[0, -0.6, 0]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
            {/* Branche de l'étoile */}
            <Box args={[0.15, 0.12, 1.2]} position={[0, 0, 0.5]} castShadow>
              <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </Box>
            {/* Roue */}
            <group position={[0, -0.25, 1]}>
              <Cylinder args={[0.15, 0.15, 0.1, 16]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <meshStandardMaterial color="#111" roughness={0.5} />
              </Cylinder>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}
