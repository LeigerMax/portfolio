"use client";

import { Box, Cylinder, Sphere } from "@react-three/drei";

export default function HeadphoneStand({ position = [-3.8, 1.275, 0.2], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] } = {}) {
  return (
    <group position={position} rotation={rotation} name="Headphone_Stand_Assembly">
      {/* ----------------- SUPPORT DU CASQUE ----------------- */}

      {/* Base du support : Plus large et légèrement biseautée pour un look plus solide */}
      <Cylinder
        args={[0.25, 0.3, 0.08, 32]} // Augmentation des segments pour une meilleure courbe
        position={[0, 0.04, 0]}
        castShadow
        name="Stand_Base"
      >
        {/* Matériau : Métal foncé, bonne réflectivité mais pas miroir */}
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.18} envMapIntensity={1.2} />
      </Cylinder>

      {/* Tige verticale : Ajout d'un petit joint de connexion à la base */}
      <group position={[0, 0, 0]}>
        {/* Joint de base (petit anneau) */}
        <Cylinder args={[0.05, 0.05, 0.05, 16]} position={[0, 0.025, 0]}>
          <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.3} />
        </Cylinder>

        {/* Tige principale (légèrement affinée vers le haut) */}
        <Cylinder args={[0.04, 0.035, 1.0, 16]} position={[0, 0.535, 0]}>
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.15} envMapIntensity={1.1} />
        </Cylinder>
      </group>


      {/* Crochet arrondi (Haut du support) : Légèrement plus organique */}
      <Sphere args={[0.09, 24, 24]} position={[0, 1.05, 0]} name="Stand_Top_Hook">
        <meshStandardMaterial color="#1f1f1f" metalness={0.75} roughness={0.25} />
      </Sphere>

      {/* ----------------- CASQUE AUDIO (Modèle stylisé) ----------------- */}

      {/* Le casque est maintenant positionné au-dessus du crochet du support */}
      <group position={[0, 1.15, 0]} rotation={[0, 0, 0]} name="Headphones">

        {/* Arceau principal du casque (Vue de profil) */}
        <Box args={[0.6, 0.06, 0.18]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.35} />
        </Box>

        {/* Bandeau supérieur du casque (pour la structure, souvent plus fin) */}
        <Box args={[0.55, 0.03, 0.1]} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.2} />
        </Box>

        {/* Bras de connexion gauche (pour la suspension du coussinet) */}
        <Box args={[0.05, 0.25, 0.05]} position={[-0.32, 0.05, 0]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.4} />
        </Box>
        {/* Bras de connexion droit */}
        <Box args={[0.05, 0.25, 0.05]} position={[0.32, 0.05, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.4} />
        </Box>


        {/* Coussinet gauche (avec une forme légèrement plus cylindrique/arrondie) */}
        <group position={[-0.3, 0.05, 0]}>
          <Cylinder
            args={[0.18, 0.18, 0.28, 16]} // Base du coussinet
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, 0.1]} // Léger décalage pour qu'il ne soit pas complètement plat
          >
            {/* Coussinet : Matériau moins réfléchissant (cuir/mousse) */}
            <meshStandardMaterial color="#4a4a4a" roughness={0.9} metalness={0.1} />
          </Cylinder>
        </group>


        {/* Coussinet droit (avec une forme légèrement plus cylindrique/arrondie) */}
        <group position={[0.3, 0.05, 0]}>
          <Cylinder
            args={[0.18, 0.18, 0.28, 16]} // Base du coussinet
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, 0.1]}
          >
            <meshStandardMaterial color="#4a4a4a" roughness={0.9} metalness={0.1} />
          </Cylinder>
        </group>

      </group>
    </group>
  );
}
