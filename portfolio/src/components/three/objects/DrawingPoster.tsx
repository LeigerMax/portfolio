"use client";

import { Box, useTexture } from "@react-three/drei";

export default function MyDrawingPoster({ position = [9, 7.5, -14.8], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] } = {}) {
  const texture = useTexture("/my_drawing.jpg");

  return (
    <group position={position} rotation={rotation}>
      <Box args={[4, 2, 0.1]}>
        <meshStandardMaterial map={texture} />
      </Box>
    </group>
  );
}
