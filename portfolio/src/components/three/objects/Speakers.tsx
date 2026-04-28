"use client";

import { Box, Cylinder, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ClickIndicator from "./ClickIndicator";

export default function Speakers({
  position = [0, 0.3, 0],
  rotation = [0, 0, 0]
}: {
  position?: [number, number, number],
  rotation?: [number, number, number]
} = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const leftWooferRef = useRef<THREE.Group>(null!);
  const rightWooferRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (isPlaying) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.05;
      if (leftWooferRef.current) leftWooferRef.current.scale.set(1, scale, scale);
      if (rightWooferRef.current) rightWooferRef.current.scale.set(1, scale, scale);
    } else {
      if (leftWooferRef.current) leftWooferRef.current.scale.set(1, 1, 1);
      if (rightWooferRef.current) rightWooferRef.current.scale.set(1, 1, 1);
    }
  });

  const renderSpeakerUnit = (isLeft: boolean) => (
    <group
      key={isLeft ? "left" : "right"}
      position={[isLeft ? -3.8 : 3.8, 1.275, -0.5]}
      rotation={[0, isLeft ? 0.3 : -0.3, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Indicateur de clic vibrant */}
      <ClickIndicator position={[0, -0.3, 0]} scale={1.0} color="#4caf50" />

      {/* Boîtier de l'enceinte - CLICABLE */}
      <Box
        args={[0.5, 0.9, 0.6]}
        castShadow
        onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
      >
        <meshStandardMaterial color={isPlaying ? "#333" : "#1a1a1a"} roughness={0.5} />
      </Box>

      {/* Woofer (Haut-parleur) */}
      <group ref={isLeft ? leftWooferRef : rightWooferRef} position={[0, 0, 0.31]}>
        <Cylinder args={[0.18, 0.18, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={isPlaying ? "#4cc9f0" : "#333"} emissive={isPlaying ? "#4cc9f0" : "#000"} emissiveIntensity={isPlaying ? 1 : 0} />
        </Cylinder>
        <Cylinder args={[0.05, 0.05, 0.06, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.02]}>
          <meshStandardMaterial color="#555" />
        </Cylinder>
      </group>

      {/* Musique Youtube (Cachée) */}
      {isPlaying && isLeft && (
        <Html>
          <div style={{ display: "none" }}>
             <iframe 
               width="0" 
               height="0" 
               src="https://www.youtube.com/embed/yBLdQ1a4-JI?autoplay=1&playlist=yBLdQ1a4-JI&loop=1" 
               title="YouTube video player" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             ></iframe>
          </div>
        </Html>
      )}

      {/* Tweeter (Petit haut-parleur) */}
      <group position={[0, 0.25, 0.31]}>
        <Cylinder args={[0.08, 0.08, 0.03, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#222" />
        </Cylinder>
      </group>
    </group>
  );

  return (
    <group position={position} rotation={rotation}>
      {renderSpeakerUnit(true)}
      {renderSpeakerUnit(false)}
    </group>
  );
}
