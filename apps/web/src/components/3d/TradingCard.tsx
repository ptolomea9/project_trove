"use client";

import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, type Mesh, MathUtils } from "three";
import { RoundedBox } from "@react-three/drei";

interface TradingCardProps {
  imageUrl: string;
  backImageUrl?: string;
  isHolo?: boolean;
  autoRotate?: boolean;
}

export function TradingCard({
  imageUrl,
  backImageUrl,
  isHolo = false,
  autoRotate = true,
}: TradingCardProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const frontTexture = useLoader(TextureLoader, imageUrl);
  const backTexture = backImageUrl
    ? useLoader(TextureLoader, backImageUrl)
    : null;

  useFrame((_, delta) => {
    if (!meshRef.current || !autoRotate) return;

    // Gentle floating animation
    meshRef.current.position.y =
      Math.sin(Date.now() * 0.001) * 0.05;

    // Slow auto-rotation
    if (!hovered) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  // Standard trading card aspect ratio: 2.5 x 3.5 inches
  const width = 2.5;
  const height = 3.5;
  const depth = 0.04;

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={[width, height, depth]}
        radius={0.08}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
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
        {/* Edge material */}
        <meshPhysicalMaterial
          attach="material-0"
          color="#e8e0d4"
          roughness={0.6}
        />
        <meshPhysicalMaterial
          attach="material-1"
          color="#e8e0d4"
          roughness={0.6}
        />
        <meshPhysicalMaterial
          attach="material-2"
          color="#e8e0d4"
          roughness={0.6}
        />
        <meshPhysicalMaterial
          attach="material-3"
          color="#e8e0d4"
          roughness={0.6}
        />
      </RoundedBox>
    </group>
  );
}
