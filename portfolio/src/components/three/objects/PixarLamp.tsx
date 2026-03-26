"use client";

import { Box, Cylinder, Sphere, SpotLight } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import ClickIndicator from "./ClickIndicator";

export default function PixarLamp({ 
  position = [3.2, 1.275, -1.2], 
  rotation = [0, -0.6, 0] 
}: { 
  position?: [number, number, number], 
  rotation?: [number, number, number] 
} = {}) {
  const [isOn, setIsOn] = useState(true);

  return (
    <group 
      position={position} 
      rotation={rotation}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Indicateur de clic vibrant */}
      <ClickIndicator position={[0, 0.05, 0]} scale={0.7} color="#ffeb3b" />

      {/* Base de la lampe - DEVIENT CLICABLE */}
      <Cylinder 
        args={[0.3, 0.3, 0.05, 32]} 
        position={[0, 0.025, 0]}
        onClick={(e) => { e.stopPropagation(); setIsOn(!isOn); }}
      >
        <meshStandardMaterial color={isOn ? "#fff" : "#888"} metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Bras inférieur */}
      <group position={[0, 0.05, 0]} rotation={[0, 0, 0.4]}>
        <Box args={[0.05, 0.8, 0.05]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#ddd" />
        </Box>
        
        {/* Jointure */}
        <group position={[0, 0.8, 0]} rotation={[0, 0, -0.8]}>
          <Sphere args={[0.06, 16, 16]}>
            <meshStandardMaterial color="#bbb" />
          </Sphere>
          
          {/* Bras supérieur */}
          <Box args={[0.05, 0.8, 0.05]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#ddd" />
          </Box>

          {/* Tête de la lampe - DEVIENT CLICABLE AUSSI */}
          <group 
            position={[0, 0.8, 0]} 
            rotation={[0, 0, 0.6]}
            onClick={(e) => { e.stopPropagation(); setIsOn(!isOn); }}
          >
            <Sphere args={[0.08, 16, 16]}>
              <meshStandardMaterial color="#bbb" />
            </Sphere>
            
            {/* Abat-jour */}
            <group rotation={[Math.PI / 2, 0, 0]}>
              <Cylinder args={[0.4, 0.15, 0.5, 32, 1, true]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color={isOn ? "#fff" : "#ddd"} side={THREE.DoubleSide} />
              </Cylinder>
              
              {/* Ampoule (émettrice si allumée) */}
              <Sphere args={[0.12, 16, 16]} position={[0, 0, 0]}>
                <meshStandardMaterial 
                  color={isOn ? "#fff" : "#444"} 
                  emissive={isOn ? "#fff" : "#000"} 
                  emissiveIntensity={isOn ? 2 : 0} 
                />
              </Sphere>

              {/* Lumière projetée */}
              {isOn && (
                <SpotLight
                  position={[0, 0, 0]}
                  distance={15}
                  angle={0.7}
                  attenuation={5}
                  anglePower={5}
                  intensity={2}
                  color="#fff"
                />
              )}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
