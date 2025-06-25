import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import ModelPlaceholder from "../3d/ModelPlaceholder";

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail: string;
  modelPath?: string;
  technologies: string[];
  year: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  thumbnail,
  modelPath,
  technologies,
  year,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-background h-full flex flex-col transition-all duration-300 border border-secondary/30"
      whileHover={{ y: -5, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full h-64">
        {modelPath ? (
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Suspense fallback={null}>
              <ModelPlaceholder position={[0, 0, 0]} />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={isHovered}
              autoRotateSpeed={5}
            />
          </Canvas>
        ) : (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />

        <div className="absolute top-4 right-4 bg-accent text-white text-xs font-mono py-1 px-3 rounded-full">
          {year}
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-text-primary">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-4 flex-grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-secondary/50 text-text-secondary px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 border-2 border-accent pointer-events-none rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
