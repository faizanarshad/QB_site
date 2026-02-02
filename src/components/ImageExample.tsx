"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ImageExample = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Technology Showcase
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our cutting-edge AI, ML, and technology solutions through real project images
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI Technology */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">AI Technology</h3>
              <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/images/ai techo.png"
                  alt="AI Technology Solutions"
                  fill
                  className="object-cover"
                />
              </div>
            <p className="text-sm text-gray-600">
              Advanced artificial intelligence and machine learning solutions
            </p>
          </motion.div>

          {/* Computer Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Computer Vision</h3>
            <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <Image
                src="/images/computer vision.jpg"
                alt="Computer Vision Technology"
                fill
                className="object-cover object-center"
              />
            </div>
            <p className="text-sm text-gray-600">
              Cutting-edge image and video processing technology
            </p>
          </motion.div>

          {/* E-commerce Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">E-commerce Solutions</h3>
            <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <Image
                src="/images/ecomerace.webp"
                alt="E-commerce Solutions"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              Complete digital commerce and marketplace solutions
            </p>
          </motion.div>

          {/* Automation Systems */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Automation Systems</h3>
            <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <Image
                src="/images/robotics.webp"
                alt="Automation Systems"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              Industrial robotics and process automation systems
            </p>
          </motion.div>

          {/* Machine Learning */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Machine Learning</h3>
            <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <Image
                src="/images/machine learning.webp"
                alt="Machine Learning Technology"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              Advanced algorithms and predictive modeling
            </p>
          </motion.div>

          {/* Data Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Data Analytics</h3>
            <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <Image
                src="/images/data_visualization.webp"
                alt="Data Analytics"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              Insights-driven decision making and analytics
            </p>
          </motion.div>
        </div>

        {/* Featured Project Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Featured Project: Autonomous Vision Safety
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our latest project demonstrates real-time perception for autonomous
                  vehicles, fusing computer vision and sensor intelligence to identify
                  lanes, vehicles, cyclists, and pedestrians with high precision.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">360-degree object detection</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Lane and roadway understanding</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Pedestrian and cyclist safety</span>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/autonomous.webp"
                  alt="Autonomous Vision Safety Project"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageExample; 