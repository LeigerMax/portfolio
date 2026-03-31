"use client";

import { Box, Sphere, Text } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import ClickIndicator from "./ClickIndicator";

export default function BackendServers({
  position = [12, -1, -14],
  rotation = [0, 0, 0]
}: {
  position?: [number, number, number],
  rotation?: [number, number, number]
} = {}) {
  const [status, setStatus] = useState<"normal" | "rebooting" | "rebooted">("normal");
  const ledCount = 20;

  // Générer des données pour les LEDs
  const leds = useMemo(() => {
    const data = [];
    for (let i = 0; i < ledCount; i++) {
      data.push({
        pos: [
          (Math.random() - 0.5) * 1.8,  // X
          Math.random() * 4 + 0.5,      // Y (ajusté à la nouvelle hauteur)
          0.51                          // Z (face avant)
        ] as [number, number, number],
        color: Math.random() > 0.5 ? "#d8b4fe" : "#a855f7",
        speed: 1 + Math.random() * 3
      });
    }
    return data;
  }, [ledCount]);

  const handleReboot = () => {
    if (status !== "normal") return;

    setStatus("rebooting");
    setTimeout(() => {
      setStatus("rebooted");
      setTimeout(() => setStatus("normal"), 2000);
    }, 1500);
  };

  const LedGroup = () => (
    <group>
      {leds.map((led, i) => (
        <Led key={i} led={led} i={i} />
      ))}
    </group>
  );

  const Led = ({ led, i }: { led: any, i: number }) => {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
      if (!ref.current) return;
      const material = ref.current.material as THREE.MeshStandardMaterial;

      if (status === "rebooting") {
        const blink = Math.sin(state.clock.elapsedTime * 20) > 0;
        material.color.set("#ff0000");
        material.emissive.set("#ff0000");
        material.emissiveIntensity = blink ? 2 : 0.2;
      } else {
        const blink = Math.sin(state.clock.elapsedTime * led.speed + i) > 0.5;
        material.color.set(led.color);
        material.emissive.set(led.color);
        material.emissiveIntensity = blink ? 1 : 0.1;
      }
    });

    return (
      <Sphere ref={ref} args={[0.04, 8, 8]} position={led.pos}>
        <meshStandardMaterial
          color={led.color}
          emissive={led.color}
          emissiveIntensity={0.5}
        />
      </Sphere>
    );
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        handleReboot();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Indicateur de clic tactile */}
      <ClickIndicator position={[0, 0.1, 0]} scale={4.8} color="#a855f7" />

      {/* Structure du Rack (Hauteur réduite à 4.5) */}
      <Box args={[2.5, 4.5, 2]} position={[0, 2.25, 0]} castShadow>
        <meshStandardMaterial color="#080808" metalness={0.9} roughness={0.1} />
      </Box>

      {/* Lumières d'ambiance à l'intérieur du rack */}
      <pointLight
        position={[0, 2, 1]}
        intensity={status === "rebooting" ? 1.5 : 0.8}
        color={status === "rebooting" ? "red" : "#a855f7"}
        distance={5}
      />

      {/* Détails du Rack (Lignes horizontales / Serveurs) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box key={i} args={[2.3, 0.1, 0.05]} position={[0, i * 0.5 + 0.5, 1.01]}>
          <meshStandardMaterial color="#1a1a1a" emissive={status === "rebooted" ? "#a855f7" : "#000"} emissiveIntensity={0.2} />
        </Box>
      ))}

      {/* LEDs clignotantes */}
      <LedGroup />

      {/* Étiquette "SERVER ROOM" avec statut */}
      <group position={[0, 4.2, 1.01]}>
        <Box args={[1.2, 0.3, 0.02]}>
          <meshStandardMaterial color="#222" />
        </Box>
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.12}
          color={status === "rebooting" ? "red" : status === "rebooted" ? "#a855f7" : "#ffffff"}
        >
          {status === "rebooting" ? "SYSTEM REBOOT..." : status === "rebooted" ? "SYSTEM ONLINE" : "SERVER [BACKEND]"}
        </Text>
      </group>
    </group>
  );
}

