import { Suspense, lazy, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import { ScrollProvider } from "./context/ScrollContext";
import SectionDivider from "./components/ui/SectionDivider";
import { Category } from "./components/sections/CategoriesGrid";
import CategoryDetailView from "./components/sections/CategoryDetailView";
import Loader from "./components/ui/Loader";
import { useTranslation } from "react-i18next";
import { Analytics } from "@vercel/analytics/react"; // <-- Correct import for React
const About = lazy(() => import("./components/sections/About"));
const Process = lazy(() => import("./components/sections/Process"));
const Contact = lazy(() => import("./components/sections/Contact"));
const CategoriesGrid = lazy(() =>
  import("./components/sections/CategoriesGrid").then((module) => ({
    default: module.CategoriesGrid,
  }))
);

const ImageShowcase = lazy(() => import("./components/sections/ImageShowcase"));
const ComparisonSection = lazy(
  () => import("./components/sections/ComparisonSection")
);

function App() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleCloseDetail = () => {
    setSelectedCategory(null);
  };

  return (
    <ScrollProvider>
      <div className="bg-background text-text-primary min-h-screen">
        <Header />
        <Analytics />
        <main>
          <Suspense fallback={<Loader />}>
            {selectedCategory ? (
              <CategoryDetailView
                category={selectedCategory}
                onClose={handleCloseDetail}
              />
            ) : (
              <>
                <Hero />

                <CategoriesGrid onCategoryClick={handleCategoryClick} />
                <SectionDivider />

                <ImageShowcase />
                <SectionDivider />
                <ComparisonSection />
                <SectionDivider />
                <Process />
                <SectionDivider />
                <About />
                <SectionDivider />
                <Contact />
              </>
            )}
          </Suspense>
        </main>
        <Footer />
      </div>
    </ScrollProvider>
  );
}

export default App;
