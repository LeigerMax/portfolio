"use client";

import { Box, Sphere, Cylinder } from '@react-three/drei';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const WOOD_COLOR = "#a06f3c";
const SHELF_DEPTH = 1.5;

// Pseudo-random stable
function seed(n: number): number {
  const x = Math.sin(n * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// --- COMPOSANT PRINCIPAL ---
const DetailedSkillsLibrary = ({ 
  position = [-11.5, 0, -10], 
  rotation = [0, 0.4, 0] 
}: { 
  position?: [number, number, number], 
  rotation?: [number, number, number] 
} = {}) => {
  const { t } = useTranslation();

  const woodMaterial = useMemo(() => (
    <meshStandardMaterial color={WOOD_COLOR} metalness={0.1} roughness={0.7} />
  ), []);

  const skillData = [
    { label: t("about.skillCategories.programming").toUpperCase(), color: "#4895ef", y: 11, items: 10 },
    { label: t("about.skillCategories.frameworks").toUpperCase(), color: "#4cc9f0", y: 8.5, items: 12 },
    { label: t("about.skillCategories.databases").toUpperCase(), color: "#f72585", y: 6, items: 6 },
    { label: t("about.skillCategories.tools").toUpperCase(), color: "#7209b7", y: 3.5, items: 9 },
    { label: t("about.skillCategories.systems").toUpperCase(), color: "#3a0ca3", y: 1, items: 8 },
  ];

  return (
    <group position={position} rotation={rotation} name="Skills_Library">

      {/* Structure du meuble */}
      <Box args={[0.4, 15, 1.8]} position={[-2.9, 6.5, 0]} castShadow>{woodMaterial}</Box>
      <Box args={[0.4, 15, 1.8]} position={[2.9, 6.5, 0]} castShadow>{woodMaterial}</Box>
      <Box args={[0.4, 15, 1.8]} position={[-2.9, 6.5, -0.8]} castShadow>{woodMaterial}</Box>
      <Box args={[0.4, 15, 1.8]} position={[2.9, 6.5, -0.8]} castShadow>{woodMaterial}</Box>

      {/* Tête du meuble + Globe */}
      <group position={[0, 14.5, 0]}>
        <Box args={[6.5, 0.3, 2.0]} position={[0, 0.1, 0]} castShadow>{woodMaterial}</Box>
        <group position={[1.5, 0.5, 0]}>
          <Sphere args={[0.6, 48, 48]}>
            <meshStandardMaterial color="#4cc9f0" metalness={0.9} roughness={0.1} emissive="#003344" emissiveIntensity={0.5} />
          </Sphere>
          <Cylinder args={[0.25, 0.4, 0.3, 16]} position={[0, -0.3, 0]}>
            <meshStandardMaterial color="#e8c9a3" metalness={0.7} roughness={0.3} />
          </Cylinder>
        </group>
      </group>

      {/* Étagères + Livres */}
      {skillData.map((shelf, shelfIdx) => {
        const shelfY = shelf.y - 0.6;
        const shelfW = 5.4;
        const bookThickness = 0.28;
        const gap = 0.04;
        const totalBookWidth = shelf.items * (bookThickness + gap);
        const offsetX = -totalBookWidth / 2 + bookThickness / 2;

        return (
          <group key={shelfIdx} position={[0, shelfY, 0.4]} name={`Shelf_${shelf.label}`}>
            {/* Étagère */}
            <Box args={[shelfW, 0.15, SHELF_DEPTH]} position={[0, -0.075, 0]} castShadow>{woodMaterial}</Box>
            {/* Bordure avant */}
            <Box args={[shelfW, 0.15, 0.08]} position={[0, -0.075, SHELF_DEPTH / 2 + 0.04]}>
              <meshStandardMaterial color="#905a2d" metalness={0.1} roughness={0.8} />
            </Box>


            {/* Livres — bien rangés, variations subtiles */}
            {Array.from({ length: shelf.items }).map((_, i) => {
              const s = seed(shelfIdx * 100 + i);
              // Hauteur variable (entre 1.0 et 1.5)
              const h = 1.0 + s * 0.5;
              // Légère inclinaison (max ±3°)
              const tilt = (seed(shelfIdx * 200 + i) - 0.5) * 0.1;
              // Variation de couleur
              const base = shelf.color.slice(1);
              const r = parseInt(base.substring(0, 2), 16);
              const g = parseInt(base.substring(2, 4), 16);
              const b = parseInt(base.substring(4, 6), 16);
              const f = 0.7 + seed(shelfIdx * 300 + i) * 0.6;
              const col = `#${Math.min(255, Math.floor(r * f)).toString(16).padStart(2, '0')}${Math.min(255, Math.floor(g * f)).toString(16).padStart(2, '0')}${Math.min(255, Math.floor(b * f)).toString(16).padStart(2, '0')}`;

              return (
                <Box
                  key={i}
                  args={[bookThickness, h, 0.85]}
                  position={[offsetX + i * (bookThickness + gap), h / 2, 0]}
                  rotation={[0, 0, tilt]}
                  castShadow
                >
                  <meshStandardMaterial color={col} roughness={0.5} metalness={0.05} />
                </Box>
              );
            })}
          </group>
        );
      })}
    </group>
  );
};

export default DetailedSkillsLibrary;