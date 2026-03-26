"use client";

import { Environment } from "@react-three/drei";

export function Lights() {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.8} />
      
      {/* Soleil couchant */}
      <directionalLight 
        position={[10, 8, 5]} 
        intensity={3} 
        color="#ff8c00" 
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Lampe de bureau focalisée */}
      <pointLight 
        position={[1.8, 2, -2.5]} 
        intensity={4} 
        color="#ffcc33" 
        castShadow 
        distance={8}
      />

      <hemisphereLight intensity={0.5} color="#ffbbaa" groundColor="#442200" />
    </>
  );
}
