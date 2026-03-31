"use client";

import { Cylinder, Sphere, useTexture } from "@react-three/drei";
import { useState, useRef, useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ClickIndicator from "./ClickIndicator";

/** Génère une texture de mesh métal pour la poubelle */
export function useTrashTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Fond noir/gris très foncé
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 128, 128);

    // Trous de la grille
    ctx.fillStyle = '#000000';
    const spacing = 16;
    const radius = 5;
    for (let x = 0; x <= 128; x += spacing) {
      for (let y = 0; y <= 128; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Offset rows for a better mesh look
        ctx.beginPath();
        ctx.arc(x + spacing / 2, y + spacing / 2, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 4);
    return tex;
  }, []);
}

export default function TrashCan({
  position = [-3.8, 0, -1],
  rotation = [0, 0, 0]
}: {
  position?: [number, number, number],
  rotation?: [number, number, number]
} = {}) {
  const meshTex = useTrashTexture();
  const [planes, setPlanes] = useState<{ id: number; position: [number, number, number], rotation: [number, number, number], scale: number }[]>([]);

  const throwPlane = () => {
    const id = Date.now();
    const newPlane = { id, position: [5, 1.5, -1] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], scale: 1 };
    setPlanes(prev => [...prev, newPlane]);

    // Animation via GSAP (nettoyage après délai)
    setTimeout(() => {
      setPlanes(prev => prev.filter(p => p.id !== id));
    }, 2500);
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Indicateur de clic */}
      <ClickIndicator position={[0, 0.9, 0]} scale={0.7} color="#ffffff" />

      {/* Corps de la poubelle ajusté en hauteur (0.8) */}
      <Cylinder
        args={[0.55, 0.42, 0.9, 32]}
        position={[0, 0.4, 0]}
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          throwPlane();
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <meshStandardMaterial
          map={meshTex}
          metalness={0.6}
          roughness={0.4}
          transparent={true}
          opacity={0.6}
          alphaTest={0.01}
          side={THREE.DoubleSide}
        />
      </Cylinder>

      {/* Rebord supérieur */}
      <Cylinder args={[0.57, 0.57, 0.04, 32]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Fond de la poubelle */}
      <Cylinder args={[0.43, 0.43, 0.02, 32]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#111" />
      </Cylinder>

      {/* Un peu de "déchets" à l'intérieur */}
      <group position={[0, 0.1, 0]}>
        <Sphere args={[0.12, 8, 8]} position={[0.08, 0, 0.08]}><meshStandardMaterial color="#eee" roughness={1} /></Sphere>
        <Sphere args={[0.1, 8, 8]} position={[-0.1, 0.03, -0.08]}><meshStandardMaterial color="#ddd" roughness={1} /></Sphere>
        <Sphere args={[0.15, 8, 8]} position={[0, 0.05, -0.15]}><meshStandardMaterial color="#fff" roughness={1} /></Sphere>
      </group>

      {/* Avions en papier animés */}
      {planes.map(plane => (
        <AnimatedPaperPlane key={plane.id} />
      ))}
    </group>
  );
}

function AnimatedPaperPlane() {
  const ref = useRef<THREE.Group>(null!);

  useLayoutEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current.position,
        { x: 5, y: 3, z: -1 },
        { x: 0, y: 0.4, z: 0, duration: 1.5, ease: "slow(0.7, 0.7, false)" }
      );
      gsap.fromTo(ref.current.rotation,
        { x: 0, y: 0, z: 0 },
        { x: Math.PI * 2, y: Math.PI * 3, z: 0, duration: 1.5, ease: "power1.inOut" }
      );
      gsap.to(ref.current.scale, {
        x: 0, y: 0, z: 0, delay: 1.8, duration: 0.4
      });
    }
  }, []);

  return (
    <group ref={ref}>
      {/* Forme simplifiée d'avion en papier (2 triangles) */}
      <mesh rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.15, 0.4, 3]} />
        <meshStandardMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.1]} castShadow>
        <coneGeometry args={[0.1, 0.3, 3]} />
        <meshStandardMaterial color="#eee" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
