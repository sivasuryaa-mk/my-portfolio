"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  distort?: number;
}

function FloatingIcosahedron({
  position,
  color,
  scale = 1,
  speed = 1,
  distort = 0.3,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({
  position,
  color,
  scale = 1,
  speed = 1,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3 * speed;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2 * speed;
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({
  position,
  color,
  scale = 1,
  speed = 1,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 * speed;
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export function FloatingShapes() {
  return (
    <group>
      {/* Ambient and directional lights for metallic materials */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />

      {/* Primary shapes */}
      <FloatingIcosahedron
        position={[-3, 1.5, -2]}
        color="#6366f1"
        scale={0.5}
        speed={1}
        distort={0.4}
      />
      <FloatingIcosahedron
        position={[3.5, -1, -3]}
        color="#8b5cf6"
        scale={0.7}
        speed={0.8}
        distort={0.3}
      />

      {/* Secondary shapes */}
      <FloatingTorus
        position={[2.5, 2, -4]}
        color="#06b6d4"
        scale={0.4}
        speed={1.2}
      />
      <FloatingTorus
        position={[-2.5, -1.5, -2]}
        color="#6366f1"
        scale={0.3}
        speed={0.9}
      />

      {/* Accent shapes */}
      <FloatingOctahedron
        position={[0, 2.5, -5]}
        color="#8b5cf6"
        scale={0.6}
        speed={0.7}
      />
      <FloatingOctahedron
        position={[-4, 0, -4]}
        color="#06b6d4"
        scale={0.4}
        speed={1.1}
      />
    </group>
  );
}
