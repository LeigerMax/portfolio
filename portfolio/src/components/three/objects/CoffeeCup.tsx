"use client";

import { Cylinder, Torus, Points, PointMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import ClickIndicator from "./ClickIndicator";

export default function CoffeeCup({
  position = [-3.8, 1.275, 0.8],
  rotation = [0, 0, 0]
}: {
  position?: [number, number, number],
  rotation?: [number, number, number]
} = {}) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const particleCount = 20; // Augmenté pour plus de fumée

  // Initialisation des particules de fumée
  const [positions] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.15;
      pos[i * 3 + 1] = Math.random() * 0.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < particleCount; i++) {
      // Monte la particule avec une vitesse variable
      const speed = 0.2 + (i % 5) * 0.05;
      posAttr.array[i * 3 + 1] += delta * speed;

      // Oscillation latérale (vapeur qui ondule)
      posAttr.array[i * 3] += Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.001;
      posAttr.array[i * 3 + 2] += Math.cos(state.clock.elapsedTime * 1.5 + i) * 0.001;

      // Reset si trop haut (un peu plus haut qu'avant pour une fumée plus longue)
      if (posAttr.array[i * 3 + 1] > 0.8) {
        posAttr.array[i * 3 + 1] = 0;
        posAttr.array[i * 3] = (Math.random() - 0.5) * 0.1;
        posAttr.array[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        gsap.fromTo(groupRef.current.position,
          { y: position[1] },
          { y: position[1] + 0.15, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" }
        );
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Indicateur de clic */}
      <ClickIndicator position={[0, 0.01, 0]} scale={0.4} color="#a855f7" />

      {/* Corps de la tasse */}
      <Cylinder args={[0.15, 0.12, 0.3, 32]} position={[0, 0.15, 0]} castShadow>
        <meshStandardMaterial color="#f0f0f0" roughness={0.3} />
      </Cylinder>

      {/* Anse */}
      <Torus args={[0.08, 0.02, 16, 32, Math.PI]} position={[0.15, 0.15, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <meshStandardMaterial color="#f0f0f0" />
      </Torus>

      {/* Café à l'intérieur (abaissé pour mieux le voir) */}
      <Cylinder args={[0.13, 0.13, 0.02]} position={[0, 0.23, 0]}>
        <meshStandardMaterial color="#2b1b10" roughness={0.2} metalness={0.1} />
      </Cylinder>

      {/* Fumée (Steam) */}
      <Points ref={pointsRef} position={[0, 0.25, 0]}>
        <PointMaterial
          transparent
          vertexColors={false}
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          color="#ffffff"
          opacity={0.3} // Plus léger mais plus de particules
        />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
      </Points>
    </group>
  );
}
