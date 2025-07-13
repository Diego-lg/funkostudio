import React from "react";
import { motion } from "framer-motion";
import { Github as GitHub, Dribbble, Linkedin, Mail } from "lucide-react";
import { useScroll } from "../../context/ScrollContext";

const Footer: React.FC = () => {
  const { scrollToSection } = useScroll();

  return (
    <footer className="bg-background border-t border-secondary/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-mono font-bold mb-4 text-text-primary">
              <span className="text-accent">Funko</span>Studio
            </h3>
            <p className="text-text-secondary mb-4">
              Creating exceptional industrial design solutions with precision,
              innovation, and artistic vision.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <GitHub size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="Dribbble"
              >
                <Dribbble size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-text-primary">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("showcase")}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("comparison")}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("process")}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-text-primary">
              Services
            </h4>
            <ul className="space-y-2">
              <li className="text-text-secondary">Product Design</li>
              <li className="text-text-secondary">Prototyping</li>
              <li className="text-text-secondary">3D Modeling</li>
              <li className="text-text-secondary">
                Manufacturing Consultation
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-text-primary">
              Contact
            </h4>
            <address className="not-italic text-text-secondary">
              <p>Av.Wawita 123.</p>
              <p> Lima, Peru.</p>
              <p className="mt-2">contact@funkostudio.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary/20 text-center text-text-secondary text-sm">
          <p>© {new Date().getFullYear()} FunkoStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
