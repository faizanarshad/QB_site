"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AISolutionsPage = () => {
  const aiSolutions = [
    {
      title: "Machine Learning Models",
      description: "Custom ML models tailored to your business needs",
      icon: "🧠",
      features: ["Predictive Analytics", "Pattern Recognition", "Automated Decision Making"],
      useCases: ["Customer Behavior Analysis", "Sales Forecasting", "Risk Assessment"],
    },
    {
      title: "Natural Language Processing",
      description: "Advanced text and speech processing solutions",
      icon: "💬",
      features: ["Text Analysis", "Sentiment Analysis", "Language Translation"],
      useCases: ["Chatbots & Virtual Assistants", "Document Processing", "Social Media Monitoring"],
    },
    {
      title: "Computer Vision",
      description: "Image and video analysis for automation",
      icon: "👁️",
      features: ["Object Detection", "Facial Recognition", "Quality Control"],
      useCases: ["Manufacturing Quality Control", "Security Systems", "Medical Imaging"],
    },
    {
      title: "Deep Learning",
      description: "Neural networks for complex problem solving",
      icon: "🕸️",
      features: ["Neural Networks", "Image Classification", "Sequence Modeling"],
      useCases: ["Autonomous Vehicles", "Medical Diagnosis", "Financial Trading"],
    },
    {
      title: "Predictive Analytics",
      description: "Data-driven insights for strategic decisions",
      icon: "📊",
      features: ["Trend Analysis", "Forecasting Models", "Risk Prediction"],
      useCases: ["Market Analysis", "Inventory Management", "Customer Churn Prediction"],
    },
    {
      title: "AI Automation",
      description: "Intelligent process automation solutions",
      icon: "⚡",
      features: ["Process Optimization", "Workflow Automation", "Intelligent Routing"],
      useCases: ["Customer Service", "Supply Chain Management", "Document Workflows"],
    },
  ];

  const technologies = [
    { name: "TensorFlow", icon: "🧠", color: "text-orange-600" },
    { name: "PyTorch", icon: "🔥", color: "text-red-600" },
    { name: "Scikit-learn", icon: "🔬", color: "text-blue-600" },
    { name: "OpenCV", icon: "👁️", color: "text-green-600" },
    { name: "NLTK", icon: "📝", color: "text-purple-600" },
    { name: "SpaCy", icon: "🔤", color: "text-blue-500" },
    { name: "Keras", icon: "⚡", color: "text-red-500" },
    { name: "Pandas", icon: "🐼", color: "text-blue-700" },
    { name: "NumPy", icon: "🔢", color: "text-green-700" },
    { name: "Matplotlib", icon: "📊", color: "text-blue-600" },
    { name: "Seaborn", icon: "📈", color: "text-orange-500" },
    { name: "Jupyter", icon: "📓", color: "text-gray-700" }
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
              AI Solutions
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Cutting-edge artificial intelligence solutions that transform data into actionable insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Solutions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our AI Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From machine learning to computer vision, we deliver intelligent solutions that drive business innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiSolutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-5xl mb-6">{solution.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-700 text-sm">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Use Cases:</h4>
                  <ul className="space-y-2">
                    {solution.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-center text-gray-700 text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Explore Solution
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage the latest AI and machine learning technologies to deliver cutting-edge solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-xl text-center hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="text-4xl mb-2">{tech.icon}</div>
                <div className={`text-sm font-bold ${tech.color}`}>{tech.name}</div>
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
              Ready to Harness the Power of AI?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can transform your business and give you a competitive edge.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200"
            >
              Start Your AI Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AISolutionsPage; 