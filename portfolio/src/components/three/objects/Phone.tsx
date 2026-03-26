"use client";

import { Box, Text } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ClickIndicator from "./ClickIndicator";

export default function Phone({
  position = [3.2, 1.275, 1.2],
  rotation = [0, -0.5, 0]
}: {
  position?: [number, number, number],
  rotation?: [number, number, number]
} = {}) {
  const ref = useRef<THREE.Group>(null!);
  const [showNotif, setShowNotif] = useState(false);
  const [notifText, setNotifText] = useState("Merci Maxou pour le travail !");

  const handleClick = () => {
    if (showNotif) return;

    // Vibration (GSAP)
    gsap.to(ref.current.position, {
      x: position[0] + 0.05,
      y: position[1],
      z: position[2] + 0.05,
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        gsap.to(ref.current.position, { x: position[0], y: position[1], z: position[2], duration: 0.1 });
      }
    });

    // Notification
    setShowNotif(true);
    setTimeout(() => {
      setShowNotif(false);
    }, 2000);
  };

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Indicateur de clic */}
      <ClickIndicator position={[0, 0.05, 0]} scale={0.5} color="#ffffff" />

      {/* Corps du téléphone */}
      <Box args={[0.42, 0.08, 0.85]} castShadow>
        <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} />
      </Box>

      {/* Écran */}
      <Box args={[0.38, 0.01, 0.78]} position={[0, 0.045, 0]}>
        <meshStandardMaterial color="#000" emissive="#4cc9f0" emissiveIntensity={0.5} />
      </Box>

      {/* Notification flottante */}
      {showNotif && (
        <group position={[0, 0.3, 0]} rotation={[-Math.PI / 4, 0, 0]}>
          <Box args={[1.5, 0.25, 0.01]}>
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
          </Box>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.08}
            color="#222"
            anchorX="center"
            anchorY="middle"
          >
            {notifText}
          </Text>
        </group>
      )}
    </group>
  );
}
