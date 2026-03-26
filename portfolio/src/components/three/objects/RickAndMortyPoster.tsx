"use client";

import { Box, Text } from "@react-three/drei";

export default function RickAndMortyPoster({ position = [10, 10, -14.8], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] } = {}) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={[4, 5, 0.1]}>
        <meshStandardMaterial color="#32cd32" />
      </Box>
      <Text position={[0, 0, 0.1]} fontSize={0.35} color="#fff">
        RICK & MORTY
      </Text>
    </group>
  );
}
