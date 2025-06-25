import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import {
  showcase1,
  showcase2,
  showcase3,
  showcase4,
} from "../../assets/images/images";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

const layouts = [
  {
    className: "w-2/3 h-2/3 top-0 left-0 z-0",
    rotate: -5,
  },
  {
    className: "w-1/2 h-1/2 top-1/4 right-0 z-0",
    rotate: 5,
  },
  {
    className: "w-1/3 h-1/3 bottom-0 left-1/4 z-20",
    rotate: -2,
  },
  {
    className: "w-1/2 h-1/2 bottom-1/4 right-1/4 z-10",
    rotate: 3,
  },
];

const MAX_COLLAGE_IMAGES = 6;

const getShowcaseImages = (t: TFunction) => [
  {
    src: showcase4,
    alt: t("showcase.image4_alt"),
  },
  {
    src: showcase2,
    alt: t("showcase.image2_alt"),
  },
  {
    src: showcase3,
    alt: t("showcase.image3_alt"),
  },
];

const ImageShowcase: React.FC = () => {
  const { t } = useTranslation();
  const showcaseImages = getShowcaseImages(t);
  const useCollageLayout = showcaseImages.length <= MAX_COLLAGE_IMAGES;
  const isMobile = useIsMobile();

  return (
    <section id="showcase" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle
          title={t("showcase.title")}
          subtitle={t("showcase.subtitle")}
          align="center"
        />
        {!isMobile ? (
          <div className="relative h-[600px] max-w-5xl mx-auto mt-16">
            {showcaseImages.map((image, index) => {
              const layout = layouts[index % layouts.length];
              return (
                <motion.div
                  key={index}
                  className={`absolute border-4 border-secondary/30 rounded-2xl shadow-2xl shadow-background overflow-hidden ${layout.className}`}
                  initial={{ opacity: 0, y: 50, rotate: layout.rotate }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ scale: 1.05, zIndex: 30, y: -10 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 mt-8">
            {showcaseImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-[4/3] border-2 border-secondary/20 rounded-lg shadow-lg shadow-background overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageShowcase;
