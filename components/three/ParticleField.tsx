"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  size?: number;
  color?: string;
}

export function ParticleField({
  count = 2000,
  size = 0.002,
  color = "#6366f1",
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions for particles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPrimary = new THREE.Color("#6366f1");
    const colorSecondary = new THREE.Color("#8b5cf6");
    const colorTertiary = new THREE.Color("#06b6d4");
    const colorArray = [colorPrimary, colorSecondary, colorTertiary];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread particles in a sphere
      const radius = Math.random() * 4 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random color from palette
      const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      colors[i3] = randomColor.r;
      colors[i3 + 1] = randomColor.g;
      colors[i3 + 2] = randomColor.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();

    // Slow rotation
    pointsRef.current.rotation.x = time * 0.02;
    pointsRef.current.rotation.y = time * 0.03;

    // Mouse interaction - more noticeable
    const { mouse } = state;
    pointsRef.current.rotation.x += mouse.y * 0.03;
    pointsRef.current.rotation.y += mouse.x * 0.03;
  });

  return (
    <Points ref={pointsRef} positions={particles.positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
