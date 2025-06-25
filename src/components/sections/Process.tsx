import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  OrbitControls,
  useAnimations,
} from "@react-three/drei";
import SectionTitle from "../ui/SectionTitle";
import * as THREE from "three";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

// Process steps data
const getProcessSteps = (t: TFunction) => [
  {
    id: 1,
    title: t("process.step1_title"),
    description: t("process.step1_description"),
  },
  {
    id: 2,
    title: t("process.step2_title"),
    description: t("process.step2_description"),
  },
  {
    id: 3,
    title: t("process.step3_title"),
    description: t("process.step3_description"),
  },
  {
    id: 4,
    title: t("process.step4_title"),
    description: t("process.step4_description"),
  },
  {
    id: 5,
    title: t("process.step5_title"),
    description: t("process.step5_description"),
  },
];

const Process: React.FC = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);
  const processSteps = getProcessSteps(t);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <section
      id="process"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-5" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle
          title={t("process.section_title")}
          subtitle={t("process.section_subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - 3D visualization */}
          <div
            className="h-[600px]  rounded-2xl overflow-hidden border border-secondary/20 shadow-xl shadow-background"
            onContextMenu={(e) => e.preventDefault()}
            style={{ touchAction: "pan-y" }}
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              dpr={isMobile ? [1, 1.5] : [1, 2]}
              gl={{ powerPreference: "low-power" }}
            >
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={!isMobile}
                autoRotateSpeed={0.5}
                dampingFactor={0.25}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
              />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              {!isMobile && (
                <spotLight
                  position={[-10, 10, 5]}
                  angle={0.3}
                  penumbra={1}
                  intensity={2}
                />
              )}
              <FunkoModel
                position={[0, -1.5, 0]}
                scale={2.5}
                isMobile={isMobile}
              />
              {!isMobile && <Environment preset="city" />}
            </Canvas>
          </div>

          {/* Right column - Process steps */}
          <div>
            <h3 className="text-3xl font-semibold mb-8 text-text-primary">
              {t("process.approach_title")}
            </h3>

            <div className="space-y-8">
              {processSteps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0.5, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative pl-12 cursor-pointer transition-all duration-300 ${
                    activeStep === step.id
                      ? "scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  {/* Step number */}
                  <div
                    className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                      activeStep === step.id
                        ? "bg-accent text-white"
                        : "bg-secondary text-text-secondary"
                    }`}
                  >
                    {step.id}
                  </div>

                  {/* Vertical line connecting steps */}
                  {step.id !== processSteps.length && (
                    <div className="absolute left-4 top-8 w-0.5 h-full bg-secondary/50" />
                  )}

                  {/* Step content */}
                  <div className="mb-8">
                    <h4 className="text-xl font-medium mb-2 text-text-primary">
                      {step.title}
                    </h4>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Method cards */}
        <div className="mt-24">
          <h3 className="text-3xl font-semibold mb-12 text-center text-text-primary">
            {t("process.methods_title")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t("process.method1_title"),
                description: t("process.method1_description"),
              },
              {
                title: t("process.method2_title"),
                description: t("process.method2_description"),
              },
              {
                title: t("process.method3_title"),
                description: t("process.method3_description"),
              },
              {
                title: t("process.method4_title"),
                description: t("process.method4_description"),
              },
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="bg-gradient-to-br from-secondary/20 to-background p-6 rounded-2xl border border-secondary/30"
              >
                <div className="w-12 h-12 mb-4 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  {index + 1}
                </div>
                <h4 className="text-xl font-medium mb-2 text-text-primary">
                  {method.title}
                </h4>
                <p className="text-text-secondary text-sm">
                  {method.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FunkoModel = (props: any) => {
  const { isMobile } = props;
  const modelRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(
    "dark_charizard_animations/biped/Animation_Skill_01_withSkin.glb"
  );
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      if (actionKeys.length > 0) {
        const firstAction = actions[actionKeys[0]];
        if (firstAction) {
          firstAction.setLoop(THREE.LoopPingPong, Infinity);
          firstAction.timeScale = isMobile ? 0.25 : 0.5;
          firstAction.play();
        }
      }
    }
  }, [actions, isMobile]);

  useFrame((state, delta) => {
    if (modelRef.current && !isMobile) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive object={scene} ref={modelRef} {...props} />;
};

export default Process;
