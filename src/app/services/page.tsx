"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  const services = [
    {
      title: "Artificial Intelligence",
      description: "Cutting-edge AI solutions for intelligent automation",
      icon: "🤖",
      features: ["Machine Learning Models", "Neural Networks", "Predictive Analytics"],
      details: "Our AI solutions leverage the latest machine learning algorithms to automate complex processes, predict trends, and provide intelligent insights that drive business growth.",
    },
    {
      title: "Computer Vision",
      description: "Advanced image and video processing solutions",
      icon: "👁️",
      features: ["Object Detection", "Image Recognition", "Video Analytics"],
      details: "Transform visual data into actionable insights with our computer vision solutions. From facial recognition to quality control automation.",
    },
    {
      title: "E-commerce Solutions",
      description: "Complete digital commerce platforms",
      icon: "🛒",
      features: ["Custom Platforms", "Payment Integration", "Inventory Management"],
      details: "Build powerful e-commerce platforms that scale with your business. From B2B marketplaces to consumer retail solutions.",
    },
    {
      title: "Robotics & Automation",
      description: "Industrial automation and robotic systems",
      icon: "⚙️",
      features: ["Process Automation", "Smart Manufacturing", "IoT Integration"],
      details: "Revolutionize your manufacturing processes with intelligent robotics and automation systems that increase efficiency and reduce costs.",
    },
    {
      title: "Machine Learning",
      description: "Data-driven insights and predictive models",
      icon: "🧠",
      features: ["Deep Learning", "Data Mining", "Model Training"],
      details: "Harness the power of your data with custom machine learning models that provide predictive insights and automated decision-making.",
    },
    {
      title: "Custom Software",
      description: "Tailored solutions for your business needs",
      icon: "💻",
      features: ["Enterprise Solutions", "API Development", "System Integration"],
      details: "Custom software solutions designed specifically for your business requirements, from enterprise applications to specialized tools.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive technology solutions that transform businesses and drive innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <p className="text-gray-700 mb-6">{service.details}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals and drive innovation in your industry.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage; 