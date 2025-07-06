"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Services = () => {
  const services = [
    {
      title: "Artificial Intelligence",
      description: "Cutting-edge AI solutions for intelligent automation",
      icon: "🤖",
      features: ["Machine Learning Models", "Neural Networks", "Predictive Analytics"],
    },
    {
      title: "Computer Vision",
      description: "Advanced image and video processing solutions",
      icon: "👁️",
      features: ["Object Detection", "Image Recognition", "Video Analytics"],
    },
    {
      title: "E-commerce Solutions",
      description: "Complete digital commerce platforms",
      icon: "🛒",
      features: ["Custom Platforms", "Payment Integration", "Inventory Management"],
    },
    {
      title: "Robotics & Automation",
      description: "Industrial automation and robotic systems",
      icon: "⚙️",
      features: ["Process Automation", "Smart Manufacturing", "IoT Integration"],
    },
    {
      title: "Machine Learning",
      description: "Data-driven insights and predictive models",
      icon: "🧠",
      features: ["Deep Learning", "Data Mining", "Model Training"],
    },
    {
      title: "Custom Software",
      description: "Tailored solutions for your business needs",
      icon: "💻",
      features: ["Enterprise Solutions", "API Development", "System Integration"],
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver innovative technology solutions that drive business transformation and growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-20 h-20 mx-auto mb-6">
                {/* Replace emoji with actual image */}
                <div className="text-5xl">{service.icon}</div>
                {/* Example of how to use actual image:
                <Image
                  src={`/images/icons/${service.title.toLowerCase().replace(/\s+/g, '-')}.svg`}
                  alt={`${service.title} Icon`}
                  fill
                  className="object-contain"
                />
                */}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 