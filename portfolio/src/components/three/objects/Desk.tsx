"use client";

import { Box, Cylinder, Text } from "@react-three/drei";
import * as THREE from "three";
import MonitorScreen from "./MonitorScreen";
import Book from "./Book";
import HeadphoneStand from "./HeadphoneStand";
import Speakers from "./Speakers";
import PixarLamp from "./PixarLamp";
import CoffeeCup from "./CoffeeCup";
import Phone from "./Phone";

export default function Desk({
  screenRef,
  position = [0, 0, -2],
  rotation = [0, 0, 0]
}: {
  screenRef: React.RefObject<THREE.Mesh>,
  position?: [number, number, number],
  rotation?: [number, number, number]
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Plateau du bureau */}
      <Box args={[8.5, 0.15, 4.0]} position={[0, 1.2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#c68c53" roughness={0.7} />
      </Box>
      {/* Pieds rallongés vers le bas (hauteur 1.2 + 1.1) */}
      <Box args={[0.3, 2.3, 3.5]} position={[-4.1, 0.05, 0]}><meshStandardMaterial color="#c68c53" /></Box>
      <Box args={[0.3, 2.3, 3.5]} position={[4.1, 0.05, 0]}><meshStandardMaterial color="#c68c53" /></Box>

      {/* Clavier / Laptop details */}
      <Box args={[1.4, 0.05, 0.5]} position={[0, 1.275, 0.8]}><meshStandardMaterial color="#fff" /></Box>
      <Box args={[0.18, 0.06, 0.28]} position={[1.4, 1.275, 0.8]}><meshStandardMaterial color="#fff" /></Box>

      {/* Pot à crayons */}
      <group position={[2.2, 1.275, -0.5]}>
        <Cylinder args={[0.2, 0.2, 0.4]}><meshStandardMaterial color="#fff" /></Cylinder>
        <Box args={[0.05, 0.6, 0.05]} position={[0.1, 0.3, 0]} rotation={[0, 0, 0.2]}><meshStandardMaterial color="#4cc9f0" /></Box>
        <Box args={[0.05, 0.6, 0.05]} position={[-0.1, 0.3, 0]} rotation={[0, 0, -0.2]}><meshStandardMaterial color="#f72585" /></Box>
      </group>

      {/* --- ÉCRAN PC AVEC WALLPAPER OS --- */}
      <MonitorScreen screenRef={screenRef} />

      {/* Tablette / Notebook */}
      <group position={[-2.2, 1.275, 1.0]} rotation={[0, 0.4, 0]}>
        <Box args={[1.2, 0.05, 1.6]} castShadow><meshStandardMaterial color="#fff" /></Box>
        <Text position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.05} color="#333" maxWidth={1}>Faire un site responsive</Text>
      </group>

      {/* --- LIVRES EMPILÉS (coin gauche du bureau) --- */}
      <group position={[-2.5, 1.275, -0.6]} rotation={[0, 0.15, 0]}>
        <Book
          width={0.9}
          height={0.15}
          depth={1.2}
          color="#2563eb"
          title="Clean Code"
          position={[0, 0.075, 0]}
        />
        <Book
          width={0.85}
          height={0.18}
          depth={1.15}
          color="#374151"
          title="Design Patterns"
          position={[0.03, 0.24, 0.02]}
          rotation={[0, 0.05, 0]}
          titleColor="#e5e7eb"
        />
        <Book
          width={0.88}
          height={0.12}
          depth={1.18}
          color="#6d28d9"
          title="The Pragmatic Programmer"
          position={[-0.02, 0.39, -0.01]}
          rotation={[0, -0.08, 0]}
          titleColor="#ddd6fe"
        />
      </group>

      {/* --- CASQUE AUDIO SUR SUPPORT --- */}
      <HeadphoneStand />

      {/* --- ENCEINTES --- */}
      <Speakers />

      {/* --- LAMPE PIXAR --- */}
      <PixarLamp />

      {/* --- TASSE DE CAFÉ --- */}
      <CoffeeCup />

      {/* --- TÉLÉPHONE / TABLETTE --- */}
      <Phone />

    </group>
  );
}
