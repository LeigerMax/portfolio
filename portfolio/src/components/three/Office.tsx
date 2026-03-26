"use client";

import { Box, Cylinder, Float, Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Office() {
  const screenRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (screenRef.current) {
        const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <group>
      {/* --- LA PIÈCE --- */}
      <Box args={[60, 0.2, 60]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#2d1b10" />
      </Box>

      {/* Murs */}
      <Box args={[60, 20, 0.1]} position={[0, 10, -15]}>
        <meshStandardMaterial color="#221108" />
      </Box>
      <Box args={[0.1, 20, 60]} position={[-15, 10, 0]}>
        <meshStandardMaterial color="#221108" />
      </Box>
      <Box args={[0.1, 20, 60]} position={[15, 10, 0]}>
        <meshStandardMaterial color="#221108" />
      </Box>

      {/* Fenêtre Sunset */}
      <group position={[-14.9, 8, -5]}>
          <Box args={[0.2, 5.2, 4.2]}><meshStandardMaterial color="#2d1b0f" /></Box>
          <Box args={[0.1, 2.4, 1.9]} position={[0.1, 1.3, 1.0]}><meshStandardMaterial color="#000" emissive="#ff8c00" emissiveIntensity={2} /></Box>
          <Box args={[0.1, 2.4, 1.9]} position={[0.1, -1.3, 1.0]}><meshStandardMaterial color="#000" emissive="#ff8c00" emissiveIntensity={2} /></Box>
          <Box args={[0.1, 2.4, 1.9]} position={[0.1, 1.3, -1.0]}><meshStandardMaterial color="#000" emissive="#ff8c00" emissiveIntensity={2} /></Box>
          <Box args={[0.1, 2.4, 1.9]} position={[0.1, -1.3, -1.0]}><meshStandardMaterial color="#000" emissive="#ff8c00" emissiveIntensity={2} /></Box>
          <pointLight position={[1.5, 0, 0]} intensity={20} color="#ff5e00" distance={25} />
      </group>

      {/* --- LA BIBLIOTHÈQUE DES COMPÉTENCES --- */}
      <group position={[-11.5, 0, -10]} rotation={[0, 0.4, 0]}> {/* Déplacé pour éviter le mur à -15 */}
          <Box args={[6, 14, 1.5]} position={[0, 7, 0]}>
              <meshStandardMaterial color="#2d1b0f" />
          </Box>
          
          {/* Étagères et Catégories */}
          {[
            { label: "LANGUAGES", color: "#3498db", y: 11, items: 10 },
            { label: "FRAMEWORKS", color: "#2ecc71", y: 8.5, items: 12 },
            { label: "DATABASES", color: "#f1c40f", y: 6, items: 6 },
            { label: "TOOLS", color: "#e74c3c", y: 3.5, items: 9 },
            { label: "SYSTEMS", color: "#9b59b6", y: 1, items: 8 },
          ].map((shelf, idx) => (
            <group key={idx} position={[0, shelf.y, 0.4]}>
                <Box args={[5.8, 0.15, 1.2]} position={[0, -0.6, 0]}>
                    <meshStandardMaterial color="#1a0f0a" />
                </Box>
                <Text position={[0, 0.8, 0.8]} fontSize={0.3} color="#fff" anchorX="center">
                    {shelf.label}
                </Text>
                {Array.from({ length: shelf.items }).map((_, i) => {
                    const itemWidth = 0.45;
                    const totalWidth = (shelf.items - 1) * itemWidth;
                    const startX = -totalWidth / 2;
                    return (
                        <Box key={i} args={[0.3, 1.2, 0.9]} position={[startX + i * itemWidth, 0.1, 0]}>
                            <meshStandardMaterial color={shelf.color} roughness={0.3} emissive={shelf.color} emissiveIntensity={0.2} />
                        </Box>
                    );
                })}
            </group>
          ))}
      </group>

      {/* --- LE BUREAU --- */}
      <group position={[0, 0, -2]}>
        <Box args={[6, 0.15, 3]} position={[0, 1.2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#4a2c16" roughness={0.9} />
        </Box>
        
        {/* Pieds du bureau */}
        <Box args={[0.2, 1.2, 0.2]} position={[-2.8, 0.6, 1.3]}><meshStandardMaterial color="#2d1b0f" /></Box>
        <Box args={[0.2, 1.2, 0.2]} position={[2.8, 0.6, 1.3]}><meshStandardMaterial color="#2d1b0f" /></Box>

        {/* 1. Écran PC */}
        <group position={[0, 1.3, -0.8]}>
          <Box args={[2.2, 1.3, 0.1]} position={[0, 0.65, 0]} castShadow><meshStandardMaterial color="#111111" /></Box>
          <Box ref={screenRef} args={[2.1, 1.2, 0.01]} position={[0, 0.65, 0.06]}>
            <meshStandardMaterial color="#000000" emissive="#ff4500" emissiveIntensity={0.8} />
          </Box>
          <pointLight position={[0, 0.5, 0.5]} intensity={1} color="#ff4500" distance={2} />
        </group>

        {/* --- DÉCORATION BUREAU --- */}
        {/* Clavier */}
        <Box args={[1.2, 0.05, 0.4]} position={[0, 1.275, 0.2]}>
            <meshStandardMaterial color="#222" />
        </Box>
        {/* Souris */}
        <Box args={[0.15, 0.06, 0.25]} position={[1.2, 1.275, 0.2]}>
            <meshStandardMaterial color="#222" />
        </Box>

        {/* 2. Carnet de notes */}
        <group position={[-1.8, 1.275, 0.5]} rotation={[0, 0.2, 0]}>
            <Box args={[1, 0.05, 1.4]} castShadow><meshStandardMaterial color="#fffbe6" /></Box>
            {/* Texte nettoyé pour éviter d'être perdu */}
            <Text position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.05} color="#2d3436" maxWidth={0.8} textAlign="center">
                M2 SOFTWARE ENGINEER\nRED HAT - UNITY
            </Text>
        </group>

        {/* 3. Smartphone */}
        <group position={[2.2, 1.275, 0.6]} rotation={[0, -0.3, 0]}>
            <Box args={[0.42, 0.06, 0.82]} castShadow><meshStandardMaterial color="#111" /></Box>
            <Box args={[0.38, 0.01, 0.78]} position={[0, 0.035, 0]}>
                <meshStandardMaterial color="#000" emissive="#00d2ff" emissiveIntensity={1} />
            </Box>
            <pointLight position={[0, 0.5, 0]} intensity={2} color="#00d2ff" distance={2} />
        </group>

        {/* Lampe */}
        <group position={[2.5, 1.3, -1]}>
            <Box args={[0.1, 1.2, 0.1]} position={[0, 0.6, 0]}><meshStandardMaterial color="#222" /></Box>
            <Box args={[0.8, 0.3, 0.5]} position={[0, 1.2, 0]} rotation={[0.4, 0, 0]}>
                <meshStandardMaterial color="#ffcc33" emissive="#cc9900" emissiveIntensity={1} />
            </Box>
            <pointLight position={[0, 1.0, 0]} intensity={2} color="#ffdf5e" distance={5} castShadow />
        </group>
      </group>

      {/* --- LE MOBILIER --- */}
      {/* Chaise */}
      <group position={[0, 0, 2]} rotation={[0, Math.PI, 0]}>
          <Box args={[1.5, 0.2, 1.5]} position={[0, 0.6, 0]}><meshStandardMaterial color="#111" /></Box>
          <Box args={[0.2, 0.6, 0.2]} position={[0, 0.3, 0]}><meshStandardMaterial color="#222" /></Box>
          <Box args={[1.5, 1.5, 0.2]} position={[0, 1.45, -0.65]}><meshStandardMaterial color="#111" /></Box>
      </group>

      {/* 4. Panneau en liège */}
      <group position={[0, 4.5, -14.8]}>
        <Box args={[8, 5, 0.2]} castShadow receiverShadow><meshStandardMaterial color="#a67c52" /></Box>
        <Box args={[8.4, 5.4, 0.1]} position={[0, 0, -0.1]}><meshStandardMaterial color="#3d2b1f" /></Box>
        <Text position={[-2, 1.5, 0.21]} fontSize={0.15} color="#333">RED HAT DO180</Text>
        <Text position={[2.5, -0.8, 0.21]} fontSize={0.15} color="#333">UNITY ESSENTIALS</Text>
      </group>

      {/* Lumières d'ambiance supplémentaires */}
      <pointLight position={[-8, 6, -5]} intensity={1.5} color="#ffaa66" distance={15} />
      <pointLight position={[8, 4, 5]} intensity={1} color="#66aaff" distance={12} />

    </group>
  );
}
