import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="w-36 h-36 rounded-full border-2 border-secondary/30 flex items-center justify-center"
            >
              <div className="text-2xl font-mono font-bold text-text-primary">
                <span className="text-accent">Funko</span>Studio
              </div>
            </motion.div>
            <motion.div
              className="absolute top-0 left-0 w-36 h-36 rounded-full border-t-2 border-accent"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.3,
              duration: 0.5,
            },
          }}
          className="text-text-secondary font-mono"
        >
          Loading creative experience...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
