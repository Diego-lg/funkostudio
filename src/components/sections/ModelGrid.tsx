import React, { useState, useCallback, memo, useEffect, useRef } from "react";
import { DivideIcon as LucideIcon } from "lucide-react";
import MobileOptimizedModel from "../3d/MobileOptimizedModel";
import { ModelModal } from "../ui/ModelModal";
import { useGLTF } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "../../hooks/useIsMobile";

export interface Model {
  id: number;
  name: string;
  icon: typeof LucideIcon;
  description: string;
  complexity: "Low" | "Medium" | "High";
  modelPath: string;
  imagePath?: string;
  scale?: number;
}

interface ModelCardProps {
  model: Model;
  index: number;
  onClick: (model: Model) => void;
}

const ModelCard = memo(({ model, index, onClick }: ModelCardProps) => {
  const Icon = model.icon;
  const mouseDownRef = useRef<{ x: number; y: number } | null>(null);
  const isMobile = useIsMobile();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && model.modelPath) {
      useGLTF.preload(model.modelPath);
    }
  }, [inView, model.modelPath]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseDownRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDownRef.current) return;

    const { x, y } = mouseDownRef.current;
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      onClick(model);
    }
    mouseDownRef.current = null;
  };

  return (
    <div
      ref={ref}
      className="group relative bg-gradient-to-br from-secondary/20 to-background border border-secondary/30 rounded-3xl p-4 shadow-lg shadow-background/50 hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
      style={{
        animationName: "fadeIn",
        animationDuration: "0.5s",
        animationTimingFunction: "ease-out",
        animationFillMode: "forwards",
        animationDelay: `${index * 100}ms`,
        opacity: 0,
      }}
      onClick={isMobile ? () => onClick(model) : undefined}
      onMouseDown={!isMobile ? handleMouseDown : undefined}
      onMouseUp={!isMobile ? handleMouseUp : undefined}
    >
      <div className="relative z-0 flex flex-col items-center text-center space-y-4 pb-10">
        <div className="relative w-full h-52 rounded-2xl overflow-hidden">
          {model.modelPath ? (
            <div className="w-full h-full bg-background">
              {inView && (
                <MobileOptimizedModel
                  modelPath={model.modelPath}
                  imagePath={model.imagePath}
                  scale={model.scale}
                />
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-background">
              <div className="w-20 h-20 bg-black/50 rounded-2xl flex items-center justify-center">
                <Icon size={40} className="text-text-secondary" />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 flex flex-col items-center pt-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {model.name}
          </h3>
          <p className="text-sm text-text-secondary max-w-[90%]">
            {model.description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-md border border-text-secondary/50 text-text-secondary transition-all duration-300 group-hover:scale-105">
          <span
            className={`w-2 h-2 rounded-full mr-2 ${
              model.complexity === "High"
                ? "bg-accent"
                : model.complexity === "Medium"
                ? "bg-secondary"
                : "bg-primary"
            }`}
          ></span>
          {model.complexity} Complexity
        </div>
      </div>
    </div>
  );
});
ModelCard.displayName = "ModelCard";

interface ModelGridProps {
  models: Model[];
  onModelClick?: (model: Model) => void;
  className?: string;
  columns?: "auto" | 1 | 2 | 3 | 4;
}

export function ModelGrid({
  models,
  onModelClick,
  className = "",
  columns = "auto",
}: ModelGridProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleModelClick = useCallback(
    (model: Model) => {
      if (onModelClick) {
        onModelClick(model);
      }
      setSelectedModel(model.modelPath);
    },
    [onModelClick]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedModel(null);
  }, []);

  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section id="portfolio">
      <div
        className={`grid ${getGridCols()} gap-8 max-w-7xl mx-auto ${className}`}
      >
        {models.map((model, index) => (
          <ModelCard
            key={model.id}
            model={model}
            index={index}
            onClick={handleModelClick}
          />
        ))}
      </div>

      {selectedModel && (
        <ModelModal modelPath={selectedModel} onClose={handleCloseModal} />
      )}
    </section>
  );
}
