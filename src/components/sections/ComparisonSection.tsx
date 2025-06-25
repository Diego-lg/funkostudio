import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import SectionTitle from "../ui/SectionTitle";
import { motion } from "framer-motion";
import { CustomHandle } from "../ui/CustomHandle";
import { useTranslation } from "react-i18next";
import { real4, showcase4 } from "../../assets/images/images";

const ComparisonSection = () => {
  const { t } = useTranslation();
  return (
    <section id="comparison" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle
          title={t("comparison.title")}
          subtitle={t("comparison.subtitle")}
          align="center"
        />
        <div className="mt-16 grid grid-cols-1 gap-12 max-w-7xl mx-auto">
          <motion.div
            className="bg-white/5 p-4 rounded-3xl border border-white/10 shadow-lg backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              y: -10,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              delay: 0.1,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ReactCompareSlider
              handle={<CustomHandle />}
              itemOne={
                <ReactCompareSliderImage
                  src={real4}
                  alt={t("comparison.image_one_alt")}
                  style={{ objectFit: "fill" }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={showcase4}
                  alt={t("comparison.image_two_alt")}
                  style={{ objectFit: "fill" }}
                />
              }
              className="rounded-2xl overflow-hidden aspect-video"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
