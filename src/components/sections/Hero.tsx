import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import AnimatedText from "../ui/AnimatedText";
import { useScroll } from "../../context/ScrollContext";
import SimplexSphere from "../3d/SimplexModel";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useTranslation } from "react-i18next";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { scrollToSection } = useScroll();
  const isMobile = useIsMobile();
  const controls = useAnimation();
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
      setModelReady(true);
    };
    sequence();
  }, [controls]);

  return (
    <section id="hero" className="relative h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isMobile ? (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-purple-900" />
        ) : (
          <SimplexSphere animate={modelReady} />
        )}
        {/* Overlay grid pattern for technical feel */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            hidden: { opacity: 0, y: 20 },
          }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-text-primary">
            <span className="font-mono text-accent">{t("hero.title1")}</span>{" "}
            <br />
            {t("hero.title2")}
          </h1>

          <AnimatedText
            text={t("hero.subtitle")}
            className="text-xl text-text-secondary mb-8"
            delay={0.7}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-accent hover:bg-purple-500 transition-colors text-white font-medium rounded-full shadow-lg shadow-accent/20"
              onClick={() => scrollToSection("categories")}
            >
              {t("hero.showcase_button")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-text-secondary bg-transparent text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors font-medium rounded-full"
              onClick={() => scrollToSection("contact")}
            >
              {t("hero.contact_button")}
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.8,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm font-mono text-text-secondary mb-2">
              {t("hero.scroll_text")}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent"
            >
              <path
                d="M12 5L12 19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
