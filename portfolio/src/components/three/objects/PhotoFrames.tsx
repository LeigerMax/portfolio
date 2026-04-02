"use client";

import { Box, Plane, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function PhotoFrames({
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: {
  position?: [number, number, number],
  rotation?: [number, number, number]
} = {}) {
  const picture1 = useTexture("/images/picture/picture1.png");
  const picture2 = useTexture("/images/picture/picture2.jpg");
  const picture3 = useTexture("/images/picture/picture3.jpg");

  return (
    <group position={position} rotation={rotation}>
      {/* CADRE PHOTO 1 - MUR GAUCHE, loin de la fenêtre */}
      <group position={[-14.8, 6, 10]} rotation={[0, Math.PI / 2, 0]}>
        {/* Cadre extérieur bois foncé */}
        <Box args={[4, 5, 0.3]} castShadow receiveShadow>
          <meshStandardMaterial color="#3d2b1f" />
        </Box>
        {/* Bordure dorée intérieure */}
        <Box args={[3.6, 4.6, 0.05]} position={[0, 0, 0.16]}>
          <meshStandardMaterial color="#c9a96e" metalness={0.6} roughness={0.3} />
        </Box>
        {/* Zone photo */}
        <Plane args={[3.2, 4.2]} position={[0, 0, 0.19]}>
          <meshStandardMaterial map={picture1} />
        </Plane>
      </group>

      {/* Variante 2 : Cadre horizontal, plus petit */}
      <group position={[-14.8, 4, 2]} rotation={[0, Math.PI / 2, 0]}>
        {/* Cadre extérieur bois foncé */}
        <Box args={[3, 2, 0.2]} castShadow receiveShadow>
          <meshStandardMaterial color="#3d2b1f" />
        </Box>
        {/* Bordure dorée intérieure */}
        <Box args={[2.7, 1.7, 0.05]} position={[0, 0, 0.11]}>
          <meshStandardMaterial color="#c9a96e" metalness={0.6} roughness={0.3} />
        </Box>
        {/* Zone photo */}
        <Plane args={[2.3, 1.3]} position={[0, 0, 0.19]}>
          <meshStandardMaterial map={picture2} />
        </Plane>
      </group>

      {/* Variante 3 : Cadre vertical, plus petit */}
      <group position={[-14.8, 7, 4]} rotation={[0, Math.PI / 2, 0]}>
        {/* Cadre extérieur bois foncé */}
        <Box args={[1.5, 2, 0.1]} castShadow receiveShadow>
          <meshStandardMaterial color="#3d2b1f" />
        </Box>
        {/* Bordure dorée intérieure */}
        <Box args={[1.2, 1.7, 0.05]} position={[0, 0, 0.11]}>
          <meshStandardMaterial color="#c9a96e" metalness={0.6} roughness={0.3} />
        </Box>
        {/* Zone photo */}
        <Plane args={[1, 1.3]} position={[0, 0, 0.19]}>
          <meshStandardMaterial map={picture3} />
        </Plane>
      </group>
    </group>
  );
}
