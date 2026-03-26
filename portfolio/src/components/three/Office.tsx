"use client";

import { Box, Sphere, Cylinder } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import DetailedSkillsLibrary from "./objects/DetailedSkillsLibrary";
import SimpsonsPoster from "./objects/SimpsonsPoster";
import DetailedShelf from "./objects/DetailedShelf";
import Desk from "./objects/Desk";
import Chair from "./objects/Chair";
import TrashCan from "./objects/TrashCan";
import Television from "./objects/Television";
import Sofa from "./objects/Sofa";
import Window from "./objects/Window";
import CertsBoard from "./objects/CertsBoard";
import PhotoFrames from "./objects/PhotoFrames";
import RickAndMortyPoster from "./objects/RickAndMortyPoster";
import BackendServers from "./objects/BackendServers";
import FallingTableau from "./objects/FallingTableau";

export function Office() {
  const screenRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (screenRef.current) {
      const intensity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <group>
      {/* --- LE SOL (FIXE) --- */}
      <Box args={[100, 0.2, 100]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#f0f0f0" />
      </Box>

      {/* --- TOUT LE RESTE REMONTÉ À Y=1 --- */}
      <group position={[0, 1, 0]}>
        {/* Murs bleu nuit profond */}
        <Box args={[50, 20, 0.1]} position={[0, 9, -15]}>
          <meshStandardMaterial color="#0f0f1b" />
        </Box>
        <Box args={[0.1, 20, 60]} position={[-15, 9, 0]}>
          <meshStandardMaterial color="#0f0f1b" />
        </Box>
        {/* Mur de droite */}
        <Box args={[0.1, 20, 60]} position={[15, 9, 0]}>
          <meshStandardMaterial color="#0f0f1b" />
        </Box>

        {/* CADRES PHOTOS */}
        <PhotoFrames />

        {/* Posters Rick & Morty & Simpsons */}
        <RickAndMortyPoster />
        <group position={[-9, 10, -14.8]}>
          <SimpsonsPoster />
        </group>

        {/* Étagère à Figurines */}
        <DetailedShelf />

        {/* Tapis sous le bureau */}
        <Box args={[12, 0.05, 8]} position={[0, -0.99, 0]}>
          <meshStandardMaterial color="#555" roughness={1} />
        </Box>

        {/* Plante décorative (Pot + Sphère) */}
        <group position={[-6, -1, 4]}>
          <Cylinder args={[0.6, 0.4, 1]} position={[0, 0.5, 0]}><meshStandardMaterial color="#8b5e34" /></Cylinder>
          <Sphere args={[0.8, 16, 16]} position={[0, 1.2, 0]}><meshStandardMaterial color="#2d5a27" /></Sphere>
        </group>

        {/* Fenêtre avec Stores Vénitiens */}
        <Window />

        {/* LA BIBLIOTHÈQUE DES COMPÉTENCES */}
        <DetailedSkillsLibrary />

        {/* LE BUREAU ET SES ACCESSOIRES */}
        <Desk screenRef={screenRef} />

        {/* LE MOBILIER */}
        <Chair position={[0, 0, 2.5]} />
        <TrashCan position={[-5, -1, 0]} />

        {/* TABLEAU DES CERTIFICATIONS */}
        <CertsBoard />

        {/* TV ET CANAPÉ */}
        <Television />
        <Sofa />

        {/* RACK DE SERVEURS BACKEND */}
        <BackendServers />

        {/* TABLEAU INTERACTIF (QUI TOMBE) - Désormais avec les autres cadres photos */}
        <FallingTableau position={[-14.8, 8, -0.3]} rotation={[0, Math.PI / 2, 0]} />
      </group>

      {/* Lumières d'ambiance */}
      <pointLight position={[-10, 13, 10]} intensity={0.4} color="#a78bfa" distance={30} />
      <pointLight position={[10, 11, -5]} intensity={0.3} color="#818cf8" distance={30} />
    </group>
  );
}
