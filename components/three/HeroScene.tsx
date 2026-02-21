"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import 3D components to reduce initial bundle size
const Scene = dynamic(
  () => import("./Scene").then((mod) => ({ default: mod.Scene })),
  { ssr: false }
);
const ParticleField = dynamic(
  () => import("./ParticleField").then((mod) => ({ default: mod.ParticleField })),
  { ssr: false }
);
const FloatingShapes = dynamic(
  () => import("./FloatingShapes").then((mod) => ({ default: mod.FloatingShapes })),
  { ssr: false }
);
const GradientMesh = dynamic(
  () => import("./GradientMesh").then((mod) => ({ default: mod.GradientMesh })),
  { ssr: false }
);

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={null}>
        <Scene>
          <ParticleField count={2000} size={0.005} />
          <FloatingShapes />
          <GradientMesh />
        </Scene>
      </Suspense>
    </div>
  );
}
