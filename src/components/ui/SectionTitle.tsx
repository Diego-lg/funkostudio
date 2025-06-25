import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div 
      className={`mb-12 max-w-2xl ${alignmentClasses[align]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="font-mono text-accent-500">&lt;</span>
        {title}
        <span className="font-mono text-accent-500">/&gt;</span>
      </h2>
      
      {subtitle && (
        <p className="text-neutral-400 text-lg">{subtitle}</p>
      )}
      
      <div className="w-20 h-1 bg-accent-500 mt-6" />
    </motion.div>
  );
};

export default SectionTitle;