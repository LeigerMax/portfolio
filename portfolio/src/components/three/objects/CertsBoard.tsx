"use client";

import { Box, Sphere, Cylinder, Text } from "@react-three/drei";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as THREE from "three";
import { certifications } from "@/data/certs";

/** Génère des textures de papier variées pour les certificats */
export function useCertificateTextures() {
  const [textures] = useState(() => {
    const createPaper = (color: string, grainDensity = 0.1) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      // Fond
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 256, 256);

      // Grain / Bruit
      for (let i = 0; i < 256 * 256 * grainDensity; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const alpha = Math.random() * 0.05;
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fillRect(x, y, 1, 1);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    return [
      createPaper('#ffffff', 0.05), // Blanc pur
      createPaper('#fdfcf0', 0.08), // Crème / Ivoire
      createPaper('#f5f5f5', 0.1),  // Gris très clair
    ];
  });
  return textures;
}

export default function CertsBoard({ 
  position = [0, 4, -14.8], 
  rotation = [0, 0, 0] 
}: { 
  position?: [number, number, number], 
  rotation?: [number, number, number] 
} = {}) {
  const { t } = useTranslation();
  const paperTextures = useCertificateTextures();

  const variations = useMemo(() => [
    { w: 3.4, h: 4.2, rot: 0.02, tex: paperTextures[0] },
    { w: 3.8, h: 4.6, rot: -0.01, tex: paperTextures[1] },
    { w: 3.2, h: 4.0, rot: 0.03, tex: paperTextures[2] },
  ], [paperTextures]);

  return (
    <group position={position} rotation={rotation}>
      {/* Panneau de liège / bois */}
      <Box args={[12, 7, 0.2]} castShadow receiveShadow>
        <meshStandardMaterial color="#d4a373" />
      </Box>
      <Box args={[12.4, 7.4, 0.1]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#8b5e34" />
      </Box>

      {certifications.slice(0, 3).map((cert, i) => {
        const v = variations[i % variations.length];
        const x = (i % 3) * 4.2 - 4.2;
        const y = 0.5;

        return (
          <group key={i} position={[x, y, 0.15]} rotation={[0, 0, v.rot]}>
            <Box args={[v.w, v.h, 0.05]} castShadow>
              <meshStandardMaterial map={v.tex} roughness={0.8} />
            </Box>
            {/* Épingle (Pin) */}
            <Sphere args={[0.07, 16, 16]} position={[0, v.h / 2 - 0.15, 0.05]}>
              <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.2} />
            </Sphere>

            <Text position={[0, v.h * 0.25, 0.03]} fontSize={0.18} color="#111" maxWidth={v.w * 0.85} textAlign="center">
              {cert.titleKey.startsWith('certs_data.') ? t(cert.titleKey) : cert.titleKey}
            </Text>
            <Text position={[0, v.h * 0.05, 0.03]} fontSize={0.13} color="#444" maxWidth={v.w * 0.85} textAlign="center">
              {cert.issuer}
            </Text>
            {cert.descriptionKey && (
              <Text position={[0, -v.h * 0.15, 0.03]} fontSize={0.11} color="#666" maxWidth={v.w * 0.85} textAlign="center">
                {cert.descriptionKey.startsWith('certs_data.') ? t(cert.descriptionKey) : cert.descriptionKey}
              </Text>
            )}

            {/* Sceau / Badge symbolique */}
            <Cylinder args={[0.25, 0.25, 0.02]} position={[v.w / 2 - 0.6, -v.h / 2 + 0.6, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.3} />
            </Cylinder>
          </group>
        );
      })}
    </group>
  );
}
