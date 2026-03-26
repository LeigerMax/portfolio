"use client";

import { useRef, useState } from "react";
import { Box, Text } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import ClickIndicator from "./ClickIndicator";

export default function FallingTableau({ 
  position = [14.9, 5, 2], 
  rotation = [0, -Math.PI / 2, 0] 
}: { 
  position?: [number, number, number], 
  rotation?: [number, number, number] 
}) {
  const ref = useRef<THREE.Group>(null!);
  const [hasFallen, setHasFallen] = useState(false);

  const handleClick = () => {
    if (hasFallen) return;
    setHasFallen(true);

    // Animation de chute
    const tl = gsap.timeline();

    // 1. Décrochage (légère rotation vers l'avant)
    tl.to(ref.current.rotation, {
      x: 0.2,
      duration: 0.2,
      ease: "power2.in"
    });

    // 2. Chute libre et rebond au sol
    tl.to(ref.current.position, {
      y: -0.9, 
      x: position[0] + (position[0] > 0 ? -0.5 : 0.5), // S'écarte du mur (positif ou négatif)
      duration: 0.6,
      ease: "bounce.out"
    }, "-=0.1");

    // 3. Atterrissage à plat
    tl.to(ref.current.rotation, {
      x: Math.PI / 2,
      z: 0.2, 
      duration: 0.6,
      ease: "bounce.out"
    }, "<");
  };

  return (
    <group 
      ref={ref} 
      position={position} 
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      onPointerOver={() => !hasFallen && (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Indicateur de clic si le tableau est encore accroché */}
      {!hasFallen && <ClickIndicator position={[0, 0, 0.2]} scale={2} color="#ffaa00" />}

      {/* Cadre du tableau */}
      <Box args={[4, 3, 0.1]} castShadow>
        <meshStandardMaterial color="#2a1a0a" />
      </Box>

      {/* Surface du tableau (Canvas) */}
      <Box args={[3.8, 2.8, 0.05]} position={[0, 0, 0.04]}>
        <meshStandardMaterial color="#f5f5f5" />
      </Box>

      {/* Texte informatif ou décoratif */}
      <Text
        position={[0, 0, 0.08]}
        fontSize={0.2}
        color="#333"
        maxWidth={3.5}
        textAlign="center"
      >
        {hasFallen ? "OUPSS..." : "NE PAS TOUCHER"}
      </Text>

      {/* Un petit paysage abstrait */}
      {!hasFallen && (
        <group position={[0, 0.2, 0.07]}>
           <Box args={[1, 0.5, 0.01]} position={[-0.5, 0, 0]}><meshStandardMaterial color="#4466aa" /></Box>
           <Box args={[0.8, 0.8, 0.01]} position={[0.5, 0.2, 0]}><meshStandardMaterial color="#aa4444" /></Box>
           <Box args={[2, 0.2, 0.01]} position={[0, -0.5, 0]}><meshStandardMaterial color="#44aa66" /></Box>
        </group>
      )}
    </group>
  );
}
