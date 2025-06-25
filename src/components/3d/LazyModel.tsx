import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Clone,
  useAnimations,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import ModelPlaceholder from "./ModelPlaceholder";
import * as THREE from "three";

function Model({
  modelPath,
  scale = 1,
  onLoaded,
}: {
  modelPath: string;
  scale?: number;
  onLoaded: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      if (actionKeys.length > 0) {
        actions[actionKeys[0]]?.play();
      }
    }
    onLoaded();
  }, [actions, onLoaded]);

  return (
    <group ref={group}>
      <Clone object={scene} scale={scale} />
    </group>
  );
}

interface LazyModelProps {
  modelPath: string;
  scale?: number;
}

export default function LazyModel({ modelPath, scale = 1 }: LazyModelProps) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isTimeoutPassed, setIsTimeoutPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeoutPassed(true);
    }, 500); // Minimum 500ms display time for placeholder
    return () => clearTimeout(timer);
  }, []);

  const handleModelLoaded = () => {
    setIsModelLoaded(true);
  };

  const showModel = isModelLoaded && isTimeoutPassed;

  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, 5]} intensity={1.5} />
      <directionalLight position={[5, 5, -5]} intensity={1.0} />
      <Environment preset="city" />

      <Suspense fallback={null}>
        {!showModel && (
          <ModelPlaceholder position={[0, 0, 0]} size={1.5} wireframe wobble />
        )}
        {modelPath && (
          <group visible={showModel}>
            <Model
              modelPath={modelPath}
              scale={scale}
              onLoaded={handleModelLoaded}
            />
          </group>
        )}
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}
