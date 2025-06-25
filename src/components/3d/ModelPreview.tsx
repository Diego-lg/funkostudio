import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Clone,
  useAnimations,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import ModelPlaceholder from "./ModelPlaceholder";
import * as THREE from "three";
import LazyModel from "./LazyModel";
import { useIsMobile } from "../../hooks/useIsMobile";

interface ModelPreviewProps {
  modelPath: string;
  scale?: number;
}

function ModelWithControls({
  modelPath,
  scale = 5,
  onLoaded,
}: {
  modelPath: string;
  scale?: number;
  onLoaded: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, group);
  const isMobile = useIsMobile();

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
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <OrbitControls
        enabled={!isMobile}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </group>
  );
}

export default function ModelPreview({
  modelPath,
  scale = 5,
}: ModelPreviewProps) {
  const is3DModel = modelPath.endsWith(".glb") || modelPath.endsWith(".gltf");
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isTimeoutPassed, setIsTimeoutPassed] = useState(false);
  const isMobile = useIsMobile();

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
    <Canvas dpr={[1, 1.5]}>
      <ambientLight intensity={4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        {!showModel && (
          <ModelPlaceholder position={[0, 0, 0]} size={1.5} wireframe wobble />
        )}
        <group visible={showModel}>
          {is3DModel ? (
            <ModelWithControls
              modelPath={modelPath}
              scale={scale}
              onLoaded={handleModelLoaded}
            />
          ) : (
            <ModelPlaceholder position={[0, 0, 0]} size={1.5} />
          )}
        </group>
      </Suspense>
      <OrbitControls
        enabled={!isMobile}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}
