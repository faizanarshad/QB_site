"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedHero from "@/components/AnimatedHero";

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "AI-Powered Manufacturing Quality Control",
      category: "ai",
      description: "Computer vision system for automated quality inspection in manufacturing",
      image: "🏭",
      technologies: [
        { name: "Computer Vision", icon: "👁️" },
        { name: "Machine Learning", icon: "🧠" },
        { name: "IoT", icon: "🌐" }
      ],
      results: "Reduced defects by 85% and increased production efficiency by 40%",
      client: "Global Manufacturing Corp",
    },
    {
      id: 2,
      title: "E-commerce Platform with AI Recommendations",
      category: "ecommerce",
      description: "Complete e-commerce solution with intelligent product recommendations",
      image: "🛒",
      technologies: [
        { name: "React", icon: "⚛️" },
        { name: "Node.js", icon: "🟢" },
        { name: "Machine Learning", icon: "🧠" },
        { name: "MongoDB", icon: "🍃" }
      ],
      results: "Increased conversion rate by 35% and average order value by 25%",
      client: "TechRetail Inc",
    },
    {
      id: 3,
      title: "Predictive Analytics Dashboard",
      category: "ai",
      description: "Real-time analytics platform for business intelligence",
      image: "📊",
      technologies: [
        { name: "Python", icon: "🐍" },
        { name: "TensorFlow", icon: "🔧" },
        { name: "React", icon: "⚛️" },
        { name: "PostgreSQL", icon: "🐘" }
      ],
      results: "Improved decision-making speed by 60% and accuracy by 45%",
      client: "DataCorp Solutions",
    },
    {
      id: 4,
      title: "Robotic Process Automation System",
      category: "robotics",
      description: "Automated workflow system for document processing",
      image: "🤖",
      technologies: [
        { name: "RPA", icon: "🤖" },
        { name: "AI", icon: "🧠" },
        { name: "Python", icon: "🐍" },
        { name: "Azure", icon: "☁️" }
      ],
      results: "Reduced processing time by 70% and eliminated manual errors",
      client: "FinanceTech Ltd",
    },
    {
      id: 5,
      title: "Computer Vision Security System",
      category: "ai",
      description: "Advanced security monitoring with facial recognition",
      image: "🔒",
      technologies: [
        { name: "OpenCV", icon: "👁️" },
        { name: "Deep Learning", icon: "🕸️" },
        { name: "Python", icon: "🐍" },
        { name: "AWS", icon: "☁️" }
      ],
      results: "Improved security accuracy by 95% and reduced false alarms by 80%",
      client: "SecureTech Systems",
    },
    {
      id: 6,
      title: "B2B Marketplace Platform",
      category: "ecommerce",
      description: "Enterprise marketplace connecting manufacturers and suppliers",
      image: "🏢",
      technologies: [
        { name: "Next.js", icon: "⚡" },
        { name: "Node.js", icon: "🟢" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Stripe", icon: "💳" }
      ],
      results: "Facilitated $50M+ in transactions and connected 500+ businesses",
      client: "SupplyChain Hub",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & ML" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "robotics", label: "Robotics" },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <AnimatedHero
        headline="Our Portfolio"
        subheadline="Showcasing Innovation"
        description="Showcasing our innovative projects and successful client transformations that demonstrate our expertise in AI, technology, and business solutions."
        primaryAction={{
          text: "View Projects",
          onClick: () => {
            const projectsSection = document.getElementById('projects-grid');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        secondaryAction={{
          text: "Get In Touch",
          href: "/contact"
        }}
        illustrationUrl="/images/hero/portfolio.webp"

      />

      {/* Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects-grid" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="text-6xl mb-6 text-center">{project.image}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.name}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-1"
                        >
                          <span>{tech.icon}</span>
                          <span>{tech.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Results:</h4>
                    <p className="text-green-600 font-medium">{project.results}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Client:</h4>
                    <p className="text-gray-700">{project.client}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Case Study
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
              Our Impact in Numbers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "200+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
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
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Our team is ready to bring your vision to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200"
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage; 