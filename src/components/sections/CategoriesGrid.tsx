import { memo } from "react";
import ModelPreview from "../3d/ModelPreview";
import { Model } from "./ModelGrid";
import { models as allModels } from "../models_data/models";
import { GalleryImage } from "../ui/ImageGallery";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

export interface Category {
  id: number;
  title: string;
  description: string;
  modelPath: string;
  detailModels: Model[];
  imageGallery: GalleryImage[];
}

interface CategoryCardProps {
  category: Category;
  index: number;
  onClick: (category: Category) => void;
}

const CategoryCard = memo(({ category, index, onClick }: CategoryCardProps) => {
  const handleCardClick = () => {
    onClick(category);
  };

  return (
    <div
      className="group relative bg-gradient-to-br from-secondary/20 to-background border border-secondary/30 rounded-3xl p-4 shadow-lg shadow-background/50 hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
      style={{
        animationName: "fadeIn",
        animationDuration: "0.5s",
        animationTimingFunction: "ease-out",
        animationFillMode: "forwards",
        animationDelay: `${index * 100}ms`,
        opacity: 0,
      }}
      onClick={handleCardClick}
    >
      <div className="relative z-0 flex flex-col items-center text-center space-y-4 pb-10">
        <div className="relative w-full h-52 rounded-2xl overflow-hidden">
          <div className="w-full h-full bg-background">
            <ModelPreview modelPath={category.modelPath} />
          </div>
        </div>

        <div className="space-y-2 flex flex-col items-center pt-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {category.title}
          </h3>
          <p className="text-sm text-text-secondary max-w-[90%]">
            {category.description}
          </p>
        </div>
      </div>
    </div>
  );
});
CategoryCard.displayName = "CategoryCard";

interface CategoriesGridProps {
  className?: string;
  onCategoryClick: (category: Category) => void;
}

export function CategoriesGrid({
  className = "",
  onCategoryClick,
}: CategoriesGridProps) {
  const { t } = useTranslation();

  const categoriesData: Category[] = [
    {
      id: 1,
      title: t("categories.custom_funkos.title"),
      description: t("categories.custom_funkos.description"),
      modelPath: "/mama_chiki.glb",
      detailModels: [allModels[2], allModels[9], allModels[3]],
      imageGallery: [
        {
          src: "/mom_carryingdog.png",
          src2: "../src/assets/images/sample_1.png",
          alt: "Custom Funko Pop 1",
        },
      ],
    },
    {
      id: 2,
      title: t("categories.anime_figures.title"),
      description: t("categories.anime_figures.description"),
      modelPath: "/FMA_alphonse.glb",
      detailModels: [allModels[0], allModels[6], allModels[10]],
      imageGallery: [
        {
          src: "/FMA_alphonse_1.png",
          src2: "/real_alphonse.png",
          alt: "Custom Funko Pop 2",
        },
      ],
    },
    {
      id: 3,
      title: t("categories.pets.title"),
      description: t("categories.pets.description"),
      modelPath: "/chiki_funko.glb",
      detailModels: [allModels[1], allModels[2], allModels[11]],
      imageGallery: [
        {
          src: "/angelical_sketch.png",
          src2: "/angelical_samoyed.png",
          alt: "Pet 3D Model 1",
        },
      ],
    },
    {
      id: 4,
      title: t("categories.and_more.title"),
      description: t("categories.and_more.description"),
      modelPath: "/halflife.glb",
      detailModels: [allModels[13], allModels[4], allModels[12]],
      imageGallery: [
        {
          src: "horror_dragon.png",
          src2: "real_horror_dragon.png",
          alt: "Miscellaneous Model 1",
        },
      ],
    },
  ];

  return (
    <section id="categories" className={className}>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto`}
      >
        {categoriesData.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            onClick={onCategoryClick}
          />
        ))}
      </div>
    </section>
  );
}
