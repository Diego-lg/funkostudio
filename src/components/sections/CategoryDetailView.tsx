import React from "react";
import { X, Zap, Gem, Palette } from "lucide-react";
import { Category } from "./CategoriesGrid";
import CategoryModelShowcase from "./CategoryModelShowcase";
import ComparisonGallery from "../ui/ComparisonGallery";
import { useTranslation } from "react-i18next";

interface CategoryDetailViewProps {
  category: Category;
  onClose: () => void;
}

const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div
        className="bg-background/80 border border-white/10 rounded-3xl w-full max-w-5xl h-full max-h-[95vh] p-8 shadow-2xl shadow-primary/10 relative flex flex-col"
        style={{
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-text-secondary hover:text-accent transition-colors z-10 bg-white/5 hover:bg-white/10 rounded-full p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col h-full overflow-y-auto pr-4 -mr-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-accent mb-3">
              {category.title}
            </h1>
            <p className="text-lg text-text-secondary/80 max-w-3xl mx-auto">
              {category.description}
            </p>
          </div>

          <div className="flex-grow my-4">
            <CategoryModelShowcase models={category.detailModels} />
          </div>

          <ComparisonGallery images={category.imageGallery} />

          <div className="my-12">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-8">
              {t("category_detail.our_process")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl transition-all hover:border-secondary hover:shadow-xl hover:shadow-secondary/10">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-secondary/20 rounded-full">
                    <Zap size={32} className="text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("category_detail.conception_title")}
                </h3>
                <p className="text-text-secondary/80">
                  {t("category_detail.conception_description")}
                </p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/20 rounded-full">
                    <Palette size={32} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("category_detail.modeling_title")}
                </h3>
                <p className="text-text-secondary/80">
                  {t("category_detail.modeling_description")}
                </p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl transition-all hover:border-accent hover:shadow-xl hover:shadow-accent/10">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/20 rounded-full">
                    <Gem size={32} className="text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("category_detail.production_title")}
                </h3>
                <p className="text-text-secondary/80">
                  {t("category_detail.production_description")}
                </p>
              </div>
            </div>
          </div>

          <div className="my-12">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-8">
              {t("category_detail.materials_quality_title")}
            </h2>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <img
                  src="dragon_samoyed.png"
                  alt="High-quality materials"
                  className="rounded-2xl"
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-text-secondary/80 mb-4 leading-relaxed">
                  {t("category_detail.materials_quality_p1")}
                </p>
                <p className="text-text-secondary/80 leading-relaxed">
                  {t("category_detail.materials_quality_p2")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-4 text-center">
            <h2 className="text-3xl font-bold text-text-primary">
              {t("category_detail.ready_to_create_title")}
            </h2>
            <p className="text-text-secondary/80 mt-3 max-w-2xl mx-auto">
              {t("category_detail.ready_to_create_description")}
            </p>
            <a
              href="https://wa.me/16503515143"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent/90 transition-all text-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105"
            >
              {t("category_detail.request_quote_button")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailView;
