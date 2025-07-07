"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiPython, 
  SiTensorflow, 
  SiPytorch, 
  SiOpencv, 
  SiNodedotjs, 
  SiPostgresql, 
  SiMongodb, 
  SiAmazon 
} from "react-icons/si";

const Features = () => {
  const technologies = [
    { name: "React", icon: <SiReact className="text-4xl text-blue-500" />, category: "Frontend" },
    { name: "Next.js", icon: <SiNextdotjs className="text-4xl text-black" />, category: "Frontend" },
    { name: "TypeScript", icon: <SiTypescript className="text-4xl text-blue-600" />, category: "Language" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-4xl text-cyan-500" />, category: "Styling" },
    { name: "Python", icon: <SiPython className="text-4xl text-yellow-500" />, category: "Backend" },
    { name: "TensorFlow", icon: <SiTensorflow className="text-4xl text-orange-500" />, category: "AI/ML" },
    { name: "PyTorch", icon: <SiPytorch className="text-4xl text-red-500" />, category: "AI/ML" },
    { name: "OpenCV", icon: <SiOpencv className="text-4xl text-green-600" />, category: "Computer Vision" },
    { name: "Node.js", icon: <SiNodedotjs className="text-4xl text-green-600" />, category: "Backend" },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-4xl text-blue-600" />, category: "Database" },
    { name: "MongoDB", icon: <SiMongodb className="text-4xl text-green-500" />, category: "Database" },
    { name: "AWS", icon: <SiAmazon className="text-4xl text-orange-500" />, category: "Cloud" },
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
                <div className="flex justify-center mb-3">{tech.icon}</div>
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
              <Image
                src="/images/tenweb_media_rau5oqmzb.webp"
                alt="AI Technology"
                width={500}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent flex items-end">
                <div className="p-8 text-white">
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
              <Image
                src="/images/tenweb_media_rrs7lrcfw.webp"
                alt="Machine Learning"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="text-xl font-bold mb-2">Machine Learning</h4>
                  <p className="text-sm">Advanced algorithms and predictive models</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/tenweb_media_srxhumdgj (1).webp"
                alt="Computer Vision"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="text-xl font-bold mb-2">Computer Vision</h4>
                  <p className="text-sm">Image and video processing solutions</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/visual1.webp"
                alt="Data Analytics"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
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