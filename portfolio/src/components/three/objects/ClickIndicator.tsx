"use client";

import { Cylinder } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function ClickIndicator({
  position = [0, 0, 0],
  color = "#9805faff",
  scale = 1
}: {
  position?: [number, number, number],
  color?: string,
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsation de l'échelle et de la brillance
      const s = scale * (1 + Math.sin(state.clock.elapsedTime * 4) * 0.15);
      meshRef.current.scale.set(s, 1, s);
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.4;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity * 2;
    }
  });

  return (
    <Cylinder
      ref={meshRef}
      args={[0.4, 0.4, 0.02, 16]}
      position={position}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={1}
      />
    </Cylinder>
  );
}
