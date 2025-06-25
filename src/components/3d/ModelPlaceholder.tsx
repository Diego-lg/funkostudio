import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";
import { Mesh } from "three";

interface ModelPlaceholderProps {
  position: [number, number, number];
  wireframe?: boolean;
  wobble?: boolean;
  size?: number;
}

const ModelPlaceholder: React.FC<ModelPlaceholderProps> = ({
  position,
  wireframe = true,
  wobble = true,
  size = 2,
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return wobble ? (
    <mesh position={position} ref={meshRef}>
      <dodecahedronGeometry args={[size, 0]} />
      <MeshWobbleMaterial
        color="#8e69bf"
        factor={0.3}
        speed={2}
        wireframe={wireframe}
      />
    </mesh>
  ) : (
    <mesh position={position} ref={meshRef}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color="#8e69bf" wireframe={wireframe} />
    </mesh>
  );
};

export default ModelPlaceholder;
