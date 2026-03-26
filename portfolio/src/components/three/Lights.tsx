"use client";

import { Environment } from "@react-three/drei";

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.05} color="#ffd1b3" />
      <Environment preset="sunset" />
      <spotLight
        position={[10, 15, 10]}
        angle={0.6}
        penumbra={1}
        intensity={1.5}
        color="#ff7700"
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Lampe de bureau encore plus chaleureuse */}
      <pointLight
        position={[1.8, 3, -2.5]}
        intensity={4}
        color="#ff9900"
        castShadow
        shadow-bias={-0.0001}
        distance={10}
      />

      <hemisphereLight intensity={0.15} color="#ffaa55" groundColor="#221100" />
    </>
  );
}
