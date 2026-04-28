"use client";

import { Box, Text } from "@react-three/drei";

export interface BookProps {
  width: number;
  height: number;
  depth: number;
  color: string;
  title: string;
  titleColor?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function Book({
  width,
  height,
  depth,
  color,
  title,
  titleColor = "#fff",
  position,
  rotation = [0, 0, 0]
}: BookProps) {
  const coverT = 0.02; // Épaisseur de la couverture
  return (
    <group position={position} rotation={rotation}>
      {/* Couverture Dessus */}
      <Box args={[width, coverT, depth]} position={[0, height / 2 - coverT / 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.6} />
      </Box>
      {/* Couverture Dessous */}
      <Box args={[width, coverT, depth]} position={[0, -height / 2 + coverT / 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.6} />
      </Box>

      {/* Tranche principale (Spine) - Côté visible (X+) */}
      <Box args={[coverT, height - coverT * 2, depth]} position={[width / 2 - coverT / 2, 0, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.6} />
      </Box>

      {/* Les Pages (Bloc blanc visible sur les tranches non-spine) */}
      {/* On le fait un chouïa plus grand pour qu'il soit bien flush sur les bords non-couvrant */}
      <Box args={[width - coverT, height - coverT * 2.1, depth - 0.01]} position={[-coverT / 2, 0, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </Box>

      {/* Texte Dessus */}
      <Text
        position={[0, height / 2 + 0.005, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={Math.min(width, depth) * 0.1}
        color={titleColor}
        maxWidth={width * 0.8}
        textAlign="center"
      >
        {title}
      </Text>

      {/* Texte Tranche LATÉRALE (X+) - Sur la partie colorée (Spine) */}
      <Text
        position={[width / 2 + 0.005, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={height * 0.4}
        color={titleColor}
        maxWidth={depth * 0.9}
        textAlign="center"
      >
        {title}
      </Text>
    </group>
  );
}
