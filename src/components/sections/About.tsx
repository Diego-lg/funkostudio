import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import SectionTitle from "../ui/SectionTitle";
import ModelPlaceholder from "../3d/ModelPlaceholder";
import { Code, Clipboard, Cpu, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { useIsMobile } from "../../hooks/useIsMobile";

const getSkills = (t: TFunction) => [
  {
    icon: <Lightbulb size={24} />,
    title: t("about.skill1_title"),
    description: t("about.skill1_description"),
  },
  {
    icon: <Clipboard size={24} />,
    title: t("about.skill2_title"),
    description: t("about.skill2_description"),
  },
  {
    icon: <Code size={24} />,
    title: t("about.skill3_title"),
    description: t("about.skill3_description"),
  },
  {
    icon: <Cpu size={24} />,
    title: t("about.skill4_title"),
    description: t("about.skill4_description"),
  },
];

const About: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const skills = getSkills(t);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle
          title={t("about.section_title")}
          subtitle={t("about.section_subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - 3D model and image */}
          <div className="relative h-[400px] md:h-[500px]">
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute bottom-0 left-0 w-3/4 h-3/4 z-0 rounded-2xl overflow-hidden shadow-2xl shadow-background"
            >
              <img
                src="canival.png"
                alt="Designer Workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute top-0 right-0 w-2/3 h-2/3 z-10 rounded-2xl overflow-hidden shadow-2xl shadow-background"
            >
              <img
                src="dogy.png"
                alt="3D Modeling Software"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/1 to-transparent" />
            </motion.div>
          </div>

          {/* Right column - Bio */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-semibold mb-6 text-text-primary">
                {t("about.bio_title")}
              </h3>

              <div className="space-y-4 text-text-secondary">
                <p>{t("about.bio_p1")}</p>
                <p>{t("about.bio_p2")}</p>
                <p>{t("about.bio_p3")}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-secondary/30">
                <h4 className="text-xl font-semibold mb-6 text-text-primary">
                  {t("about.competencies_title")}
                </h4>

                <motion.div
                  ref={ref}
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex gap-4"
                    >
                      <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        {skill.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-lg text-text-primary">
                          {skill.title}
                        </h5>
                        <p className="text-text-secondary text-sm">
                          {skill.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
