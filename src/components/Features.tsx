"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Features = () => {
  const technologies = [
    { name: "React", icon: "/images/tech/react.svg", category: "Frontend" },
    { name: "Next.js", icon: "/images/tech/nextjs.svg", category: "Frontend" },
    { name: "TypeScript", icon: "/images/tech/typescript.svg", category: "Language" },
    { name: "Tailwind CSS", icon: "/images/tech/tailwindcss.svg", category: "Styling" },
    { name: "Python", icon: "/images/tech/python.svg", category: "Backend" },
    { name: "TensorFlow", icon: "/images/tech/tensorflow.svg", category: "AI/ML" },
    { name: "PyTorch", icon: "/images/tech/pytorch.svg", category: "AI/ML" },
    { name: "OpenCV", icon: "/images/tech/opencv.svg", category: "Computer Vision" },
    { name: "Node.js", icon: "/images/tech/nodejs.svg", category: "Backend" },
    { name: "PostgreSQL", icon: "/images/tech/postgresql.svg", category: "Database" },
    { name: "MongoDB", icon: "/images/tech/mongodb.svg", category: "Database" },
    { name: "AWS", icon: "/images/tech/aws.svg", category: "Cloud" },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Technology Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge technologies that power our innovative solutions.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-xl text-center hover:bg-blue-50 transition-colors duration-200 border border-gray-200"
              >
                <div className="flex justify-center mb-3">
                  <Image
                    src={tech.icon}
                    alt={tech.name + " logo"}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="text-sm font-bold text-gray-900 mb-1">{tech.name}</div>
                <div className="text-xs text-gray-500">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Technology Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/AI Tech.jpg"
              alt="AI Technology Solutions"
              width={800}
              height={400}
              className="w-full h-80 object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Features; 