"use client";

import { Box, Html } from "@react-three/drei";
import { useState, useEffect } from "react";
import ClickIndicator from "./ClickIndicator";

export default function Television({ position = [14.85, 6, -8], rotation = [0, -Math.PI / 2, 0] }: { position?: [number, number, number], rotation?: [number, number, number] } = {}) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const handleClick = () => {
    window.open("https://www.youtube.com/@allmaxou", "_blank");
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Indicateur de clic */}
      {/*{!hovered && <ClickIndicator position={[1, -2, 0.2]} scale={4.2} color="#9317dbff" />}*/}

      {/* Cadre de la TV */}
      <Box args={[4.2, 2.45, 0.15]} castShadow>
        <meshStandardMaterial color={hovered ? "#222" : "#111"} metalness={0.8} roughness={0.2} />
      </Box>
      {/* Écran */}
      <Box args={[4, 2.25, 0.05]} position={[0, 0, 0.06]}>
        <meshStandardMaterial
          color="#111"
          emissive={hovered ? "#333" : "#000"}
          emissiveIntensity={0.5}
          roughness={0.1}
        />
        <Html
          transform
          occlude
          position={[0, 0, 0.026]}
          distanceFactor={6.5}
          pointerEvents="none"
        >
          <div style={{
            width: "400px",
            height: "250px",
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: "10px"
          }}>
            <img
              src="/images/picture/télé.gif"
              alt="TV GIF"
              style={{
                width: "100%",
                height: "100%",

                opacity: hovered ? 1 : 0.8,
                transition: "opacity 0.3s ease"
              }}
            />
          </div>
        </Html>
      </Box>
      {/* Support mural (discret) */}
      <Box args={[0.8, 0.8, 0.1]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#222" />
      </Box>
    </group>
  );
}
