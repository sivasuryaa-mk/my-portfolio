"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface GradientMeshProps {
  color?: string;
  secondaryColor?: string;
}

export function GradientMesh({
  color = "#6366f1",
  secondaryColor = "#8b5cf6",
}: GradientMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Target position for smooth mouse following
  const targetPosition = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    // Update target based on mouse position
    targetPosition.current.x = (state.mouse.x * viewport.width) / 4;
    targetPosition.current.y = (state.mouse.y * viewport.height) / 4;

    // Smooth interpolation (lerp)
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetPosition.current.x,
      0.02
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetPosition.current.y,
      0.02
    );

    // Subtle rotation based on time
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// Alternative blob with custom shader-like appearance
export function GradientBlob() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create gradient texture
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, "#6366f1");
      gradient.addColorStop(0.5, "#8b5cf6");
      gradient.addColorStop(1, "#06b6d4");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Morphing animation
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.y = time * 0.1;

    // Scale pulsing
    const scale = 1 + Math.sin(time * 0.5) * 0.05;
    meshRef.current.scale.setScalar(scale * 2);

    // Mouse interaction
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      state.mouse.x * 0.5,
      0.02
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      state.mouse.y * 0.5,
      0.02
    );
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -4]}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        map={gradientTexture}
        distort={0.4}
        speed={1.5}
        roughness={0.3}
        metalness={0.2}
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}
