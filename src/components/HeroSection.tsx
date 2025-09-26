"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  showBrand?: boolean;
  gradientColors?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  showBrand = true,
  gradientColors = "from-blue-600 via-purple-600 to-pink-600"
}) => {
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const handleButtonClick = (button: any) => {
    if (button.onClick) {
      button.onClick();
    } else if (button.href) {
      window.location.href = button.href;
    }
  };

  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors}`} />
      <div className="absolute inset-0 bg-black/20" />
      
      <motion.div 
        animate={floatingAnimation}
        className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={floatingAnimation}
        transition={{ delay: 1 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={pulseAnimation}
        className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl" 
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {showBrand && (
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
              className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-8"
            >
              <span className="text-white/90 text-lg font-medium">QBrix Solutions</span>
            </motion.div>
          )}
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-white/80 mb-4 font-medium"
            >
              {subtitle}
            </motion.p>
          )}
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            {title.split(' ').map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            {description}
          </motion.p>
          
          {(primaryButton || secondaryButton) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {primaryButton && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleButtonClick(primaryButton)}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <span className="flex items-center gap-2">
                    {primaryButton.text}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <FaArrowRight />
                    </motion.div>
                  </span>
                </motion.button>
              )}
              
              {secondaryButton && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleButtonClick(secondaryButton)}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                >
                  {secondaryButton.text}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 