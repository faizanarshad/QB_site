"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedHero from "@/components/AnimatedHero";
import { FaStar, FaLinkedin, FaGithub, FaTwitter, FaRobot, FaBrain, FaCode, FaChartLine, FaCogs, FaUserTie, FaCloud } from "react-icons/fa";

const TeamPage = () => {
  const team = [
    {
      name: "Faizan Arshad",
      role: "Chief Executive Officer",
      image: "/images/team/faizan.webp",
      bio: "Visionary leader driving innovation and excellence at QBrix Solutions.",
      expertise: ["AI Strategy", "Business Leadership", "Innovation"],
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    {
      name: "Zeeshan Arshad",
      role: "Chief Technology Officer",
      image: "/images/team/zeeshan.webp",
      bio: "Technology expert overseeing all technical aspects and product development.",
      expertise: ["System Architecture", "AI Development", "Cloud Computing"],
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    {
      name: "Iqra Nazir",
      role: "Lead Robotics Engineer",
      image: "/images/team/iqra.webp",
      bio: "Robotics engineer with a passion for automation and intelligent systems.",
      expertise: ["Robotics", "Automation", "IoT Integration"],
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    {
      name: "Mohammad Farhan",
      role: "Senior AI/ML Engineer",
      image: "/images/team/farhan.webp",
      bio: "Business development lead driving growth and strategic partnerships.",
      expertise: ["Business Strategy", "Partnerships", "Growth Hacking"],
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    {
      name: "Hamza",
      role: "Head of Digital Marketing",
      image: "/images/team/hamza.webp",
      bio: "Digital marketing expert driving growth and brand awareness through innovative strategies.",
      expertise: ["Digital Marketing", "SEO/SEM", "Social Media Strategy"],
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    {
      name: "Muhammad Usman",
      role: "Senior Software Engineer",
      image: "/images/team/usman.webp",
      bio: "AI specialist focused on developing intelligent solutions and advanced analytics.",
      expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
      linkedin: "#",
      github: "#",
      twitter: "#",
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
      <AnimatedHero
        headline="Meet Our Team"
        subheadline="The Minds Behind Innovation"
        description="Passionate experts dedicated to transforming businesses through innovative technology solutions and cutting-edge AI development."
        primaryAction={{
          text: "Meet the Team",
          onClick: () => {
            const teamSection = document.getElementById('team-grid');
            if (teamSection) {
              teamSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        secondaryAction={{
          text: "View Values",
          onClick: () => {
            const valuesSection = document.getElementById('values');
            if (valuesSection) {
              valuesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        illustrationUrl="/images/team-hero.webp"
      />

      {/* Team Grid */}
      <section id="team-grid" className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Decorative background shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-purple-400/10 rounded-full blur-2xl z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-4 drop-shadow-lg"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              Passionate experts dedicated to transforming businesses through innovative technology solutions
            </motion.p>
          </motion.div>

          {/* Custom 2-row, 3-column grid for team */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* First row */}
            {team.slice(0, 3).map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.04, boxShadow: "0 8px 32px 0 rgba(99,102,241,0.18)" }}
                className="relative bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-blue-100 hover:border-blue-400 transition-all duration-300 group overflow-visible"
              >
                {/* Colored ribbon for role */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-xl shadow-lg text-xs font-bold uppercase tracking-wider z-10">
                  {member.role}
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-gradient-to-br from-blue-400 via-purple-400 to-pink-400 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={
                        member.name === "Muhammad Usman"
                          ? "object-cover object-center"
                          : ["Faizan Arshad", "Zeeshan Arshad", "Mohammad Farhan"].includes(member.name)
                            ? "object-cover object-top"
                            : "object-cover"
                      }
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 mt-2 group-hover:text-blue-700 transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm text-center">{member.bio}</p>
                  {/* Social Media Icons */}
                  <div className="flex gap-4 mb-4">
                    <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xl transition-colors"><FaLinkedin /></a>
                    <a href={member.github || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black text-xl transition-colors"><FaGithub /></a>
                    <a href={member.twitter || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 text-xl transition-colors"><FaTwitter /></a>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2 justify-center">
                    {/* Colorful badges with icons */}
                    {member.expertise.map((skill, i) => (
                      <span
                        key={skill}
                        className={
                          `inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ` +
                          [
                            "from-blue-100 to-blue-200 text-blue-800",
                            "from-purple-100 to-purple-200 text-purple-800",
                            "from-pink-100 to-pink-200 text-pink-800",
                            "from-green-100 to-green-200 text-green-800",
                            "from-yellow-100 to-yellow-200 text-yellow-800",
                            "from-red-100 to-red-200 text-red-800"
                          ][i % 6]
                        }
                      >
                        {(() => {
                          switch (skill) {
                            case "AI Strategy": return <FaBrain className="text-base" />;
                            case "Business Leadership": return <FaUserTie className="text-base" />;
                            case "Innovation": return <FaStar className="text-base text-yellow-400" />;
                            case "System Architecture": return <FaCogs className="text-base" />;
                            case "AI Development": return <FaBrain className="text-base" />;
                            case "Cloud Computing": return <FaCloud className="text-base" />;
                            case "Robotics": return <FaRobot className="text-base" />;
                            case "Automation": return <FaCogs className="text-base" />;
                            case "IoT Integration": return <FaChartLine className="text-base" />;
                            case "E-commerce": return <FaChartLine className="text-base" />;
                            case "Digital Strategy": return <FaChartLine className="text-base" />;
                            case "Platform Development": return <FaCode className="text-base" />;
                            case "Business Strategy": return <FaUserTie className="text-base" />;
                            case "Partnerships": return <FaUserTie className="text-base" />;
                            case "Growth Hacking": return <FaChartLine className="text-base" />;
                            case "Artificial Intelligence": return <FaBrain className="text-base" />;
                            case "Machine Learning": return <FaBrain className="text-base" />;
                            case "Data Science": return <FaChartLine className="text-base" />;
                            default: return <FaStar className="text-base text-yellow-400" />;
                          }
                        })()}
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Second row */}
            {team.slice(3, 6).map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.18)" }}
                className="relative bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-pink-100 hover:border-pink-400 transition-all duration-300 group overflow-visible"
              >
                {/* Colored ribbon for role */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-xl shadow-lg text-xs font-bold uppercase tracking-wider z-10">
                  {member.role}
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-gradient-to-br from-pink-400 via-purple-400 to-blue-400 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={
                        member.name === "Muhammad Usman"
                          ? "object-cover object-center"
                          : ["Faizan Arshad", "Zeeshan Arshad", "Mohammad Farhan"].includes(member.name)
                            ? "object-cover object-top"
                            : "object-cover"
                      }
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 mt-2 group-hover:text-pink-700 transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm text-center">{member.bio}</p>
                  {/* Social Media Icons */}
                  <div className="flex gap-4 mb-4">
                    <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xl transition-colors"><FaLinkedin /></a>
                    <a href={member.github || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black text-xl transition-colors"><FaGithub /></a>
                    <a href={member.twitter || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 text-xl transition-colors"><FaTwitter /></a>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2 justify-center">
                    {/* Colorful badges with icons */}
                    {member.expertise.map((skill, i) => (
                      <span
                        key={skill}
                        className={
                          `inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ` +
                          [
                            "from-pink-100 to-pink-200 text-pink-800",
                            "from-purple-100 to-purple-200 text-purple-800",
                            "from-blue-100 to-blue-200 text-blue-800",
                            "from-green-100 to-green-200 text-green-800",
                            "from-yellow-100 to-yellow-200 text-yellow-800",
                            "from-red-100 to-red-200 text-red-800"
                          ][i % 6]
                        }
                      >
                        {(() => {
                          switch (skill) {
                            case "AI Strategy": return <FaBrain className="text-base" />;
                            case "Business Leadership": return <FaUserTie className="text-base" />;
                            case "Innovation": return <FaStar className="text-base text-yellow-400" />;
                            case "System Architecture": return <FaCogs className="text-base" />;
                            case "AI Development": return <FaBrain className="text-base" />;
                            case "Cloud Computing": return <FaCloud className="text-base" />;
                            case "Robotics": return <FaRobot className="text-base" />;
                            case "Automation": return <FaCogs className="text-base" />;
                            case "IoT Integration": return <FaChartLine className="text-base" />;
                            case "E-commerce": return <FaChartLine className="text-base" />;
                            case "Digital Strategy": return <FaChartLine className="text-base" />;
                            case "Platform Development": return <FaCode className="text-base" />;
                            case "Business Strategy": return <FaUserTie className="text-base" />;
                            case "Partnerships": return <FaUserTie className="text-base" />;
                            case "Growth Hacking": return <FaChartLine className="text-base" />;
                            case "Artificial Intelligence": return <FaBrain className="text-base" />;
                            case "Machine Learning": return <FaBrain className="text-base" />;
                            case "Data Science": return <FaChartLine className="text-base" />;
                            default: return <FaStar className="text-base text-yellow-400" />;
                          }
                        })()}
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-20 bg-white">
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
              The principles that guide everything we do at QBrix Solutions
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
                At QBrix Solutions, we foster a culture of innovation, collaboration, and continuous learning. 
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/join_our_team.jpg"
                  alt="Join Our Team at QBrix Solutions"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover"
                />
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