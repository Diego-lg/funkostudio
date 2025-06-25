import React, { useEffect, useState } from "react";
import { Model } from "./ModelGrid";
import LazyModel from "../3d/LazyModel";
import { useInView } from "react-intersection-observer";
import { useGLTF } from "@react-three/drei";
import { Eye } from "lucide-react";
import { ModelModal } from "../ui/ModelModal";

interface ShowcaseModelCardProps {
  model: Model;
  isMain?: boolean;
}

const ShowcaseModelCard: React.FC<ShowcaseModelCardProps> = ({
  model,
  isMain = false,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (inView && model.modelPath) {
      useGLTF.preload(model.modelPath);
    }
  }, [inView, model.modelPath]);

  const heightClass = isMain ? "h-96" : "h-72";
  const titleClass = isMain ? "text-2xl" : "text-xl";
  const descriptionClass = isMain ? "text-base" : "text-sm";

  return (
    <>
      <div ref={ref} className="group relative">
        <div
          className={`relative ${heightClass} rounded-2xl overflow-hidden shadow-lg hover:shadow-accent/20 transition-all duration-300 bg-background`}
        >
          {inView && (
            <LazyModel modelPath={model.modelPath} scale={model.scale} />
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 backdrop-blur-sm"
              aria-label="Preview model"
            >
              <Eye size={24} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className={`${titleClass} font-bold text-white`}>
              {model.name}
            </h3>
            <p className={`text-white/80 ${descriptionClass}`}>
              {model.description}
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModelModal
          modelPath={model.modelPath}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

interface CategoryModelShowcaseProps {
  models: Model[];
}

const CategoryModelShowcase: React.FC<CategoryModelShowcaseProps> = ({
  models,
}) => {
  if (!models || models.length === 0) {
    return null;
  }

  const [mainModel, ...otherModels] = models;

  return (
    <div className="w-full">
      {mainModel && (
        <div className="mb-8">
          <ShowcaseModelCard model={mainModel} isMain />
        </div>
      )}

      {otherModels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherModels.map((model) => (
            <ShowcaseModelCard key={model.id} model={model} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryModelShowcase;
