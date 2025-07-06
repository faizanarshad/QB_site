"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TeamPage = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Executive Officer",
      image: "👩‍💼",
      bio: "AI researcher with 15+ years experience in machine learning and business strategy",
      expertise: ["AI Strategy", "Business Development", "Team Leadership"],
      linkedin: "#",
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      image: "👨‍💻",
      bio: "Full-stack engineer and AI specialist with expertise in scalable systems",
      expertise: ["System Architecture", "AI Development", "Cloud Computing"],
      linkedin: "#",
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      image: "👩‍🔬",
      bio: "PhD in Computer Science with focus on deep learning and computer vision",
      expertise: ["Deep Learning", "Computer Vision", "Research & Development"],
      linkedin: "#",
    },
    {
      name: "David Kim",
      role: "Lead Robotics Engineer",
      image: "👨‍🔧",
      bio: "Robotics expert with experience in industrial automation and IoT systems",
      expertise: ["Robotics", "Automation", "IoT Integration"],
      linkedin: "#",
    },
    {
      name: "Lisa Thompson",
      role: "Head of E-commerce Solutions",
      image: "👩‍💼",
      bio: "Digital commerce specialist with 10+ years building scalable platforms",
      expertise: ["E-commerce", "Digital Strategy", "Platform Development"],
      linkedin: "#",
    },
    {
      name: "Alex Johnson",
      role: "Senior Machine Learning Engineer",
      image: "👨‍💻",
      bio: "ML engineer specializing in predictive analytics and model deployment",
      expertise: ["Machine Learning", "Data Science", "Model Deployment"],
      linkedin: "#",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description: "Pushing the boundaries of what's possible with cutting-edge technology",
      icon: "🚀",
    },
    {
      title: "Excellence",
      description: "Delivering the highest quality solutions that exceed expectations",
      icon: "⭐",
    },
    {
      title: "Collaboration",
      description: "Working together to achieve extraordinary results for our clients",
      icon: "🤝",
    },
    {
      title: "Integrity",
      description: "Building trust through transparency and ethical business practices",
      icon: "🔒",
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
              Meet Our Team
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Passionate experts dedicated to transforming businesses through innovative technology solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
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
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team brings together decades of expertise in AI, technology, and business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-8xl mb-6">{member.image}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Expertise:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Connect on LinkedIn
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at QBrik Solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Culture
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                At QBrik Solutions, we foster a culture of innovation, collaboration, and continuous learning. 
                Our team members are passionate about technology and committed to delivering exceptional results for our clients.
              </p>
              <div className="space-y-4">
                {[
                  "Flexible work environment with remote options",
                  "Continuous learning and professional development",
                  "Collaborative team culture",
                  "Innovation-focused mindset",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <span className="w-6 h-6 bg-green-500 rounded-full mr-4 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
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
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <div className="text-6xl mb-6">🎯</div>
                <h4 className="text-2xl font-bold mb-4">Join Our Team</h4>
                <p className="text-blue-100 mb-6">
                  We're always looking for talented individuals who share our passion for innovation and technology.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
                >
                  View Open Positions
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage; 