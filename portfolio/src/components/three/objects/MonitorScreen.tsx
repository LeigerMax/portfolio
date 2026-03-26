"use client";

import { Box } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * Génère une texture de fond d'écran OS par défaut (dégradé bleu/violet).
 * Remplacez par votre propre image en plaçant un fichier à public/images/wallpaper.png
 */
export function useOSWallpaper() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;
    // Dégradé type macOS Sonoma
    const grad = ctx.createLinearGradient(0, 0, 512, 320);
    grad.addColorStop(0, '#1a1a2e');
    grad.addColorStop(0.3, '#16213e');
    grad.addColorStop(0.6, '#0f3460');
    grad.addColorStop(1, '#533483');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 320);
    // Barre de dock en bas
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.roundRect(130, 290, 252, 24, 8);
    ctx.fill();
    // Horloge en haut à droite
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('14:12', 498, 18);
    // Barre de menu en haut
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, 512, 22);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('  Finder  File  Edit  View', 20, 15);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

export default function MonitorScreen({ 
  screenRef, 
  position = [0, 1.3, -0.8], 
  rotation = [0, 0, 0] 
}: { 
  screenRef: React.RefObject<THREE.Mesh>, 
  position?: [number, number, number], 
  rotation?: [number, number, number] 
}) {
  const wallpaperTex = useOSWallpaper();
  return (
    <group position={position} rotation={rotation}>
      {/* Cadre moniteur */}
      <Box args={[2.4, 1.4, 0.1]} position={[0, 0.7, -0.1]} castShadow><meshStandardMaterial color="#333" /></Box>
      {/* Écran avec wallpaper */}
      <Box ref={screenRef} args={[2.2, 1.3, 0.01]} position={[0, 0.7, 0.01]}>
        <meshStandardMaterial map={wallpaperTex} emissive="#ffffff" emissiveIntensity={0.15} />
      </Box>
      {/* Post-its décoratifs */}
      <Box args={[0.2, 0.2, 0.01]} position={[-1, 0.1, 0.1]}><meshStandardMaterial color="#f9f871" /></Box>
      <Box args={[0.2, 0.2, 0.01]} position={[1, 0.2, 0.1]}><meshStandardMaterial color="#ff9671" /></Box>
    </group>
  );
}
