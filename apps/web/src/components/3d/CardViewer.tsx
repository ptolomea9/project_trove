"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PresentationControls,
  Environment,
  ContactShadows,
  Float,
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
      <ambientLight intensity={0.3} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.25}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <spotLight
        position={[-3, 4, -4]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#CA8A04"
      />
      <pointLight position={[0, -3, 3]} intensity={0.4} color="#CA8A04" />

      <PresentationControls
        global
        snap
        rotation={[0.1, 0.4, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Float
          rotationIntensity={0.4}
          floatIntensity={0.6}
          speed={2}
        >
          <Suspense fallback={null}>
            <TradingCard
              imageUrl={imageUrl}
              backImageUrl={backImageUrl}
              isHolo={isHolo}
            />
          </Suspense>
        </Float>
      </PresentationControls>

      {/* Environment reflections */}
      <Environment preset="studio" />

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.5}
        scale={6}
        blur={2.5}
        far={4}
        color="#CA8A04"
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.7}
          luminanceSmoothing={0.9}
          intensity={0.4}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
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
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
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
