"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Office } from "./Office";
import { Lights } from "./Lights";
import { CameraManager } from "./CameraManager";
import { PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { Particles } from "./Particles";

export default function Experience({ isUIVisible }: { isUIVisible: boolean }) {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#0a0502] pointer-events-auto">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={["#0a0502"]} />
        <fog attach="fog" args={["#0a0502", 5, 50]} />

        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 6, 12]} fov={40} />

          <Lights />
          <Office />
          <Particles count={100} />

          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.5}
            scale={20}
            blur={2.5}
            far={4}
          />

          <CameraManager isUIVisible={isUIVisible} />

        </Suspense>
      </Canvas>
    </div>
  );
}
