"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader, type Group } from "three";
import { RoundedBox, useTexture } from "@react-three/drei";

interface TradingCardProps {
  imageUrl: string;
  backImageUrl?: string;
  isHolo?: boolean;
}

export function TradingCard({
  imageUrl,
  backImageUrl,
  isHolo = false,
}: TradingCardProps) {
  const groupRef = useRef<Group>(null);
  const frontTexture = useTexture(imageUrl);
  const backTexture = backImageUrl
    ? useTexture(backImageUrl)
    : null;

  // Continuous floating bob
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(Date.now() * 0.0015) * 0.08;
  });

  // Standard trading card aspect ratio: 2.5 x 3.5 inches
  const width = 2.5;
  const height = 3.5;
  const depth = 0.04;

  return (
    <group ref={groupRef}>
      <RoundedBox
        args={[width, height, depth]}
        radius={0.08}
        smoothness={4}
      >
        {/* Front face */}
        <meshPhysicalMaterial
          attach="material-4"
          map={frontTexture}
          clearcoat={isHolo ? 1 : 0.5}
          clearcoatRoughness={isHolo ? 0.05 : 0.2}
          roughness={0.3}
          metalness={isHolo ? 0.3 : 0.05}
          iridescence={isHolo ? 1 : 0}
          iridescenceIOR={1.3}
          envMapIntensity={isHolo ? 1.5 : 0.8}
        />
        {/* Back face */}
        <meshPhysicalMaterial
          attach="material-5"
          map={backTexture ?? frontTexture}
          clearcoat={0.3}
          roughness={0.4}
          metalness={0.05}
        />
        {/* Edges - warm white card stock */}
        <meshPhysicalMaterial attach="material-0" color="#e8e0d4" roughness={0.6} />
        <meshPhysicalMaterial attach="material-1" color="#e8e0d4" roughness={0.6} />
        <meshPhysicalMaterial attach="material-2" color="#e8e0d4" roughness={0.6} />
        <meshPhysicalMaterial attach="material-3" color="#e8e0d4" roughness={0.6} />
      </RoundedBox>
    </group>
  );
}
