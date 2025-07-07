"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Features = () => {
  const technologies = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Next.js", icon: "▲", category: "Frontend" },
    { name: "TypeScript", icon: "📘", category: "Language" },
    { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
    { name: "Python", icon: "🐍", category: "Backend" },
    { name: "TensorFlow", icon: "🧠", category: "AI/ML" },
    { name: "PyTorch", icon: "🔥", category: "AI/ML" },
    { name: "OpenCV", icon: "👁️", category: "Computer Vision" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
    { name: "MongoDB", icon: "🍃", category: "Database" },
    { name: "AWS", icon: "☁️", category: "Cloud" },
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
                <div className="text-4xl mb-3">{tech.icon}</div>
                <div className="text-sm font-bold text-gray-900 mb-1">{tech.name}</div>
                <div className="text-xs text-gray-500">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Advanced AI & ML Capabilities
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Our solutions leverage the latest AI and machine learning technologies 
              to deliver intelligent automation and data-driven insights.
            </p>
            <div className="space-y-4">
              {[
                { text: "Deep Learning & Neural Networks", icon: "🕸️" },
                { text: "Computer Vision & Image Processing", icon: "👁️" },
                { text: "Natural Language Processing", icon: "💬" },
                { text: "Predictive Analytics & Forecasting", icon: "📊" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <span className="text-2xl mr-4">{feature.icon}</span>
                  <span className="text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🤖</div>
                  <h4 className="text-2xl font-bold mb-4">AI-Powered</h4>
                  <p className="text-blue-100">
                    Intelligent solutions that learn and adapt to your business needs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Technology Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-64 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🧠</div>
                  <h4 className="text-xl font-bold mb-2">Machine Learning</h4>
                  <p className="text-sm">Advanced algorithms and predictive models</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-64 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">👁️</div>
                  <h4 className="text-xl font-bold mb-2">Computer Vision</h4>
                  <p className="text-sm">Image and video processing solutions</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-64 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">📊</div>
                  <h4 className="text-xl font-bold mb-2">Data Analytics</h4>
                  <p className="text-sm">Insights-driven decision making</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 