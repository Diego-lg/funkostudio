import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import ModelPlaceholder from "../3d/ModelPlaceholder";

interface ModelModalProps {
  modelPath: string;
  onClose: () => void;
}

export function ModelModal({ modelPath, onClose }: ModelModalProps) {
  const { scene } = useGLTF(modelPath);
  const is3DModel = modelPath.endsWith(".glb") || modelPath.endsWith(".gltf");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white bg-black rounded-full hover:bg-gray-800"
        >
          ✕
        </button>
        <Canvas className="w-full h-full" camera={{ fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-5, 5, 5]} intensity={1.5} />
          <directionalLight position={[5, 5, -5]} intensity={1.0} />
          <Environment preset="city" />

          <Suspense
            fallback={<ModelPlaceholder position={[0, 0, 0]} size={1.5} />}
          >
            {is3DModel ? (
              <>
                <primitive object={scene} scale={3} />
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  enableRotate={true}
                  autoRotate
                  autoRotateSpeed={0.3}
                />
              </>
            ) : (
              <ModelPlaceholder position={[0, 0, 0]} size={1.5} />
            )}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
