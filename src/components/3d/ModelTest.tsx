import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { Suspense, useState } from "react";

function BlackCharizardModel() {
  try {
    const { scene } = useGLTF("/black_charizard.glb");
    return <primitive object={scene} scale={3} />;
  } catch (error: unknown) {
    return (
      <Html center>
        <div className="text-red-500">
          Failed to load model: {(error as Error).message}
        </div>
      </Html>
    );
  }
}

function BlackCharizardTest() {
  return (
    <Canvas>
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <Suspense
        fallback={
          <Html center>
            <div>Loading model...</div>
          </Html>
        }
      >
        <BlackCharizardModel />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default BlackCharizardTest;
