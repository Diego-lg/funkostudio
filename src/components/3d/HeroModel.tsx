import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "../../context/ScrollContext";
import { Group, MathUtils } from "three";

interface HeroModelProps {
  scrollFactor?: number;
}

const HeroModel: React.FC<HeroModelProps> = ({ scrollFactor = 0.001 }) => {
  const groupRef = useRef<Group>(null);
  const { scrollY } = useScroll();
  const { viewport } = useThree();

  // Handle responsive sizing
  const size = Math.min(5, viewport.width / 4);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Basic rotation animation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;

      // Scroll-based position changes
      const targetY = -scrollY * scrollFactor;
      groupRef.current.position.y = MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.05
      );

      // Scale based on scroll position (slightly shrink as user scrolls down)
      const scrollScale = 1 - Math.min(scrollY * 0.0005, 0.15);
      groupRef.current.scale.setScalar(scrollScale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body - A complex shape made from primitive geometries */}
      <mesh position={[0, 0, 0]} castShadow>
        <dodecahedronGeometry args={[size, 2]} />
        <meshStandardMaterial color="#8e69bf" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Floating wireframe outer shell */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[size * 1.2, 1]} />
        <meshStandardMaterial
          color="#8e69bf"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* Technical inner components */}
      <group position={[0, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[size * 0.6, 0.1, 16, 100]} />
          <meshStandardMaterial color="#F0F0F0" wireframe={true} />
        </mesh>
      </group>

      {/* Small detail components */}
      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x * size * 0.5, 0, 0]}>
          <sphereGeometry args={[size * 0.2, 16, 16]} />
          <meshStandardMaterial
            color="#F0F0F0"
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

export default HeroModel;
