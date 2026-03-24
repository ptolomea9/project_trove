"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import { TradingCard } from "./TradingCard";

interface CardViewerProps {
  imageUrl: string;
  backImageUrl?: string;
  isHolo?: boolean;
  className?: string;
}

function CardScene({
  imageUrl,
  backImageUrl,
  isHolo,
}: Omit<CardViewerProps, "className">) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.25}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <spotLight
        position={[-5, 3, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#7C5CFC"
      />
      <pointLight position={[0, -3, 2]} intensity={0.3} color="#00D4AA" />

      {/* Card */}
      <Suspense fallback={null}>
        <TradingCard
          imageUrl={imageUrl}
          backImageUrl={backImageUrl}
          isHolo={isHolo}
          autoRotate
        />
      </Suspense>

      {/* Environment reflections */}
      <Environment preset="studio" />

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={8}
        blur={2.5}
        far={4}
      />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={false}
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          intensity={0.3}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
}

export function CardViewer({
  imageUrl,
  backImageUrl,
  isHolo = false,
  className = "",
}: CardViewerProps) {
  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <CardScene
          imageUrl={imageUrl}
          backImageUrl={backImageUrl}
          isHolo={isHolo}
        />
      </Canvas>
    </div>
  );
}
