import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="relative flex justify-center items-center my-24 w-full">
        <motion.div
          className="h-px w-1/3 bg-gradient-to-r from-transparent to-primary"
          initial={{ x: "-50%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        />
        <motion.div
          className="h-2 w-2 rounded-full bg-secondary mx-4"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "circOut", delay: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        />
        <motion.div
          className="h-px w-1/3 bg-gradient-to-l from-transparent to-primary"
          initial={{ x: "50%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        />
      </div>
    </div>
  );
};

export default SectionDivider;
