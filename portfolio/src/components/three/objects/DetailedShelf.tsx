import { Box, Cylinder } from '@react-three/drei';
import { useMemo } from 'react';

// --- CONFIGURATION ET MATÉRIAUX ---
const WOOD_COLOR_DETAIL = "#8a5a3e"; // Bois plus foncé pour les étagères

type DetailedShelfProps = {
    position?: [number, number, number];
};

const Creeper = () => (
    <group position={[-1.5, 0.6, 0]} name="Figurine_Creeper">
        {/* Corps principal (Cylindre légèrement affiné ou Box standard si on veut rester simple) */}
        <Box args={[0.4, 0.8, 0.4]} position={[1.5, 0.1, 0]}>
            <meshStandardMaterial color="#00aa00" metalness={0.1} roughness={0.4} /> {/* Vert plus profond */}
        </Box>

        {/* Tête (Légèrement plus petite que le corps) */}
        <Box args={[0.4, 0.4, 0.4]} position={[1.5, 0.6, 0]}>
            <meshStandardMaterial color="#008800" metalness={0.1} roughness={0.4} />
        </Box>

        {/* Yeux (Deux petits carrés noirs) */}
        <Box args={[0.08, 0.08, 0.08]} position={[1.40, 0.65, 0.21]}><meshBasicMaterial color="#000000" /></Box>
        <Box args={[0.08, 0.08, 0.08]} position={[1.60, 0.65, 0.21]}><meshBasicMaterial color="#000000" /></Box>

        {/* Pieds (Simulés par de petits blocs sous le corps) */}
        <Box args={[0.12, 0.15, 0.12]} position={[1.40, -0.3, 0]}><meshBasicMaterial color="#006600" /></Box>
        <Box args={[0.12, 0.15, 0.12]} position={[1.60, -0.3, 0]}><meshBasicMaterial color="#006600" /></Box>

    </group>
);

// --- 2. Figurine Soldat Battlefield (Plus abstrait/militaire) ---
const Soldier = () => (
    <group position={[1.5, 0.6, 0]} name="Figurine_Soldier">
        {/* Torse/Corps (Forme plus rectangulaire pour l'armure) */}
        <Box args={[0.35, 0.65, 0.3]} position={[0, 0.15, 0]}>
            <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
        </Box>

        {/* Casque (Utilisation d'un Cylindre pour la base) */}
        <Cylinder args={[0.15, 0.2, 0.2, 12]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </Cylinder>

        {/* Jambes (Deux petites boîtes) */}
        <Box args={[0.1, 0.3, 0.1]} position={[-0.1, -0.25, 0]}><meshBasicMaterial color="#444444" /></Box>
        <Box args={[0.1, 0.3, 0.1]} position={[0.1, -0.25, 0]}><meshBasicMaterial color="#444444" /></Box>

        {/* Arme simplifiée (fusil) */}
        <Box args={[0.05, 0.7, 0.05]} position={[0.25, 0.2, 0]} rotation={[0, 0, Math.PI / 8]}>
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
        </Box>

    </group>
);

const Cube = () => (
    <group position={[2.5, 0.4, 0]} name="Figurine_Cube">

        {/* 1. Le Noyau Central (pour la structure et l'épaisseur) */}
        <Box args={[0.45, 0.45, 0.45]} position={[0, 0.05, 0]}>
            {/* Matériau de base, légèrement moins brillant pour laisser les faces ressortir */}
            <meshStandardMaterial color="#333333" metalness={0.2} roughness={0.5} />
        </Box>

        {/* --- Ligne Supérieure --- */}
        <Box args={[0.14, 0.14, 0.02]} position={[-0.14, 0.05 + 0.14, 0.23]}>
            <meshStandardMaterial color={"#ffff00"} />
        </Box>
        <Box args={[0.14, 0.14, 0.02]} position={[0, 0.05 + 0.14, 0.23]}>
            <meshStandardMaterial color={"#ff0000"} />
        </Box>
        <Box args={[0.14, 0.14, 0.02]} position={[0.14, 0.05 + 0.14, 0.23]}>
            <meshStandardMaterial color={"#0000ff"} />
        </Box>

        {/* --- Ligne Centrale --- */}
        <Box args={[0.14, 0.14, 0.02]} position={[-0.14, 0.05, 0.23]}>
            <meshStandardMaterial color={"#ff8800"} />
        </Box>
        {/* Le centre est déjà couvert par la face rouge principale du noyau ci-dessus, mais on peut le redéfinir pour être sûr */}
        <Box args={[0.14, 0.14, 0.02]} position={[0, 0.05, 0.23]}>
            <meshStandardMaterial color={"#ff0000"} />
        </Box>
        <Box args={[0.14, 0.14, 0.02]} position={[0.14, 0.05, 0.23]}>
            <meshStandardMaterial color={"#00aa00"} />
        </Box>

        {/* --- Ligne Inférieure --- */}
        {/* Pour simplifier, nous allons utiliser une couleur de contour pour le bas si nous ne voulons pas mettre 3 autres couleurs différentes */}
        <Box args={[0.14, 0.14, 0.02]} position={[-0.14, 0.05 - 0.14, 0.23]}>
            <meshStandardMaterial color="#555555" />
        </Box>
        <Box args={[0.14, 0.14, 0.02]} position={[0, 0.05 - 0.14, 0.23]}>
            <meshStandardMaterial color="#555555" />
        </Box>
        <Box args={[0.14, 0.14, 0.02]} position={[0.14, 0.05 - 0.14, 0.23]}>
            <meshStandardMaterial color="#555555" />
        </Box>

    </group>
);

const DetailedShelf = ({ position = [7, 5, -14.8] }: DetailedShelfProps) => {

    const woodMat = useMemo(() => (
        <meshStandardMaterial color={WOOD_COLOR_DETAIL} metalness={0.2} roughness={0.6} />
    ), []);
    // --- Rendu de l'Étagère et des Figurines ---
    return (
        <group position={position as [number, number, number]} name="Figurine_Display">

            {/* Étagère principale (Plus épaisse et avec un support arrière) */}
            <Box args={[6.2, 0.25, 1.3]} position={[2.5, 0.1, 0]} castShadow>
                {woodMat}
            </Box>

            {/* Support arrière du mur */}
            <Box args={[0.1, 1.5, 1.3]} position={[1, 0.5, -0.625]} castShadow>
                <meshStandardMaterial color={WOOD_COLOR_DETAIL} metalness={0.1} roughness={0.7} />
            </Box>

            {/* Support arrière du mur */}
            <Box args={[0.1, 1.5, 1.3]} position={[4, 0.5, -0.625]} castShadow>
                <meshStandardMaterial color={WOOD_COLOR_DETAIL} metalness={0.1} roughness={0.7} />
            </Box>

            {/* Éléments sur l'étagère (décalés en Y pour être au-dessus du niveau 0 de l'étagère) */}
            <Creeper />
            <Soldier />
            <Cube />

        </group>
    );
}

export default DetailedShelf;