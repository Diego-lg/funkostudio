import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScroll } from "../../context/ScrollContext";
import LanguageToggler from "../ui/LanguageToggler";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollToSection, scrollY } = useScroll();

  const navItems = useMemo(
    () => [
      { id: "home", label: t("nav.home") },
      { id: "portfolio", label: t("nav.showcase") },
      { id: "comparison", label: t("nav.comparison") },
      { id: "process", label: t("nav.process") },
      { id: "about", label: t("nav.about") },
      { id: "contact", label: t("nav.contact") },
    ],
    [t]
  );

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const handleNavClick = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToSection(id);
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-2xl font-mono font-bold text-text-primary"
        >
          <img
            src="/icono.svg"
            alt="Funko Studio logo"
            className="h-10 w-10 mr-2"
          />
          <span className="text-accent">Funko</span> Studio
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {/* Desktop Nav */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="flex space-x-8"
          >
            {navItems.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ y: -2 }}
                className="relative group"
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="px-1 py-2 font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label}
                </button>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </motion.li>
            ))}
          </motion.ul>
          <LanguageToggler />
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden text-text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: "500px" }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-lg overflow-hidden"
          >
            <motion.ul
              className="container mx-auto px-6 py-4 flex flex-col space-y-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1 } },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -10 },
                  }}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="w-full text-left px-2 py-2 font-medium text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -10 },
                }}
              >
                <LanguageToggler isMobile />
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
