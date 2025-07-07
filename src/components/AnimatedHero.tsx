"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

interface AnimatedHeroProps {
  headline: string;
  subheadline: string;
  description?: string;
  primaryAction?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  illustrationUrl?: string;
  showBrand?: boolean;
}

const headlineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 0.7, type: "spring", stiffness: 80 }
  })
};

const subheadlineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.7 } }
};

const descVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 0.7 } }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 1.2 + i * 0.15, duration: 0.6 } })
};

const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  headline,
  subheadline,
  description,
  primaryAction,
  secondaryAction,
  illustrationUrl,
  showBrand = true
}) => {
  // Split headline for animation
  const headlineWords = headline.split(" ");

  // Animated background SVG blobs
  const blobs = [
    { className: "top-0 left-0 w-96 h-96 opacity-40", color: "#6366f1" },
    { className: "bottom-0 right-0 w-80 h-80 opacity-30", color: "#a21caf" },
    { className: "top-1/2 left-1/2 w-72 h-72 opacity-20", color: "#f59e42" },
  ];

  const handleButtonClick = (action: any) => {
    if (action.onClick) action.onClick();
    else if (action.href) window.location.href = action.href;
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated SVG blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute ${blob.className} pointer-events-none z-0`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 0.95, 1], opacity: [0.7, 1, 0.8, 1] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, repeatType: "mirror" }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill={blob.color} d="M44.8,-67.2C57.2,-59.2,65.7,-44.2,70.2,-28.7C74.7,-13.2,75.2,2.8,70.2,16.7C65.2,30.6,54.7,42.4,41.7,51.7C28.7,61,14.3,67.8,-1.2,69.3C-16.7,70.8,-33.4,67,-45.2,57.1C-57,47.2,-63.8,31.2,-67.2,14.2C-70.6,-2.8,-70.6,-20.8,-62.7,-32.7C-54.8,-44.6,-39.1,-50.4,-24.1,-57.2C-9.1,-64,5.2,-71.7,20.7,-73.2C36.2,-74.7,52.4,-70.2,44.8,-67.2Z" transform="translate(100 100)" />
          </svg>
        </motion.div>
      ))}

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-20 md:py-32 gap-12">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left">
          {showBrand && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="inline-block mb-6 px-5 py-2 bg-white/20 rounded-full shadow-lg backdrop-blur-md border border-white/30"
            >
              <span className="text-lg font-semibold text-white tracking-widest uppercase">QBrik Solutions</span>
            </motion.div>
          )}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={headlineVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.h2
            variants={subheadlineVariants}
            initial="hidden"
            animate="visible"
            className="text-2xl md:text-3xl font-semibold text-indigo-200 mb-6 drop-shadow-lg"
          >
            {subheadline}
          </motion.h2>
          {description && (
            <motion.p
              variants={descVariants}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto md:mx-0"
            >
              {description}
            </motion.p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {primaryAction && (
              <motion.button
                custom={0}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.07, boxShadow: "0 4px 32px 0 rgba(99,102,241,0.18)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleButtonClick(primaryAction)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 group"
              >
                <span className="flex items-center gap-2">
                  {primaryAction.text}
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
            {secondaryAction && (
              <motion.button
                custom={1}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.07, boxShadow: "0 4px 32px 0 rgba(168,85,247,0.18)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleButtonClick(secondaryAction)}
                className="border-2 border-white/70 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-white hover:text-blue-700 transition-all duration-200"
              >
                {secondaryAction.text}
              </motion.button>
            )}
          </div>
        </div>
        {/* Right: Illustration */}
        {illustrationUrl && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10">
              <Image
                src={illustrationUrl}
                alt="Hero Illustration"
                fill
                className="object-contain"
                priority
                onError={(e) => {
                  // Hide the illustration container if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AnimatedHero; 