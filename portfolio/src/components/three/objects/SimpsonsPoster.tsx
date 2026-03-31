import { Box, Text, useTexture } from '@react-three/drei';
import { useMemo } from 'react';

// --- CONFIGURATION DU POSTER ---
const POSTER_WIDTH = 5.0;
const POSTER_HEIGHT = 4.0;
const FRAME_THICKNESS = 0.15;
const FRAME_COLOR = "#333333"; // Cadre noir/gris foncé

const SimpsonsPoster = ({ position = [0, 0, 0] }) => {

    // 1. Matériau pour le cadre
    const frameMaterial = useMemo(() => (
        <meshStandardMaterial color={FRAME_COLOR} metalness={0.2} roughness={0.5} />
    ), []);

    // 2. Matériau pour le passe-partout (bordure blanche/crème autour de l'image)
    const mattingMaterial = useMemo(() => (
        <meshStandardMaterial color="#f0f0e0" metalness={0.1} roughness={0.8} />
    ), []);

    // 3. Matériau pour le fond jaune (légèrement plus riche que le précédent)
    const yellowBackgroundMaterial = useMemo(() => (
        <meshStandardMaterial color="#ffcc00" metalness={0.1} roughness={0.5} />
    ), []);

    return (
        <group position={position as [number, number, number]} name="Simpsons_Poster">

            {/* --- Structure du Poster (Cadre et Marge) --- */}

            {/* Cadre Extérieur (Le plus épais) */}
            <Box args={[POSTER_WIDTH, POSTER_HEIGHT, FRAME_THICKNESS]} castShadow receiveShadow>
                {frameMaterial}
            </Box>

            {/* Marge Intérieure (Passe-Partout Blanc/Crème) */}
            {/* Correction : Le matériau est directement un enfant de la géométrie */}
            <Box args={[POSTER_WIDTH - 0.4, POSTER_HEIGHT - 0.4, FRAME_THICKNESS * 0.5]} position={[0, 0, FRAME_THICKNESS / 2 + 0.01]}>
                {mattingMaterial}
            </Box>

            {/* --- Le Contenu du Poster --- */}

            {/* Fond Jaune (Le poster lui-même) */}
            <Box args={[POSTER_WIDTH - 0.8, POSTER_HEIGHT - 0.8, 0.01]} position={[0, 0, FRAME_THICKNESS + 0.01]}>
                {yellowBackgroundMaterial}
            </Box>

            {/* Texte "D'OH!" (Stylisé pour être plus visible) */}
            <Text
                position={[0, 0, FRAME_THICKNESS + 0.02]}
                fontSize={0.7} // Taille augmentée pour l'impact
                color="#000000"
                anchorX="center"
                anchorY="middle"
            >
                D'OH!
            </Text>

            {/* Optionnel : Un petit détail pour simuler un reflet ou une salissure */}
            <Box args={[POSTER_WIDTH - 0.8, POSTER_HEIGHT - 0.8, 0.005]} position={[0.3, -0.2, FRAME_THICKNESS + 0.015]}>
                <meshBasicMaterial color="gray" transparent opacity={0.1} />
            </Box>

        </group>
    );
}

export default SimpsonsPoster
