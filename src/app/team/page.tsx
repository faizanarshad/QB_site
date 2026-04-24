"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedHero from "@/components/AnimatedHero";
import { teamMembers, expertiseForMember } from "@/data/teamMembers";
import { FaStar, FaLinkedin, FaGithub, FaTwitter, FaRobot, FaBrain, FaCode, FaChartLine, FaCogs, FaUserTie, FaCloud } from "react-icons/fa";

function socialHref(url: string): string {
  return url && url !== "#" ? url : "#";
}

function onSocialClick(e: React.MouseEvent<HTMLAnchorElement>, url: string) {
  e.stopPropagation();
  if (!url || url === "#") e.preventDefault();
}

const TeamPage = () => {
  const team = teamMembers;

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

      <AnimatedHero
        headline="Our Team"
        subheadline="People Behind QBrix Solutions"
        description="Engineers, strategists, and builders who ship AI, software, and automation that clients rely on."
        primaryAction={{
          text: "Meet the Team",
          onClick: () => {
            document.getElementById("team-grid")?.scrollIntoView({ behavior: "smooth" });
          },
        }}
        secondaryAction={{
          text: "Contact Us",
          href: "/contact",
        }}
        illustrationUrl="/images/join_our_team.jpg"
        illustrationObjectFit="cover"
        illustrationAlt="Collaborative team working together in a modern office"
      />

      {/* Team Grid */}
      <section id="team-grid" className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Decorative background shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-purple-400/10 rounded-full blur-2xl z-0" />
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
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

          {/* Team grid: equal-height cards (min height + flex) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, index) => {
              const isBlueRow = index < 3;
              return (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.04, boxShadow: isBlueRow ? "0 8px 32px 0 rgba(99,102,241,0.18)" : "0 8px 32px 0 rgba(236,72,153,0.18)" }}
                className={`relative isolate flex h-full min-h-0 flex-col rounded-3xl border bg-white/60 shadow-2xl backdrop-blur-lg transition-all duration-300 group overflow-visible ${
                  isBlueRow
                    ? "border-blue-100 hover:border-blue-400"
                    : "border-pink-100 hover:border-pink-400"
                }`}
              >
                <Link
                  href={`/team/${member.slug}`}
                  prefetch
                  className={`relative z-[1] flex flex-col rounded-3xl p-8 pb-4 cursor-pointer text-inherit no-underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isBlueRow ? "focus-visible:ring-blue-500" : "focus-visible:ring-pink-500"
                  }`}
                >
                  <div
                    className={`absolute -top-4 -left-4 bg-gradient-to-r text-white px-4 py-1 rounded-xl shadow-lg text-xs font-bold uppercase tracking-wider z-10 pointer-events-none ${
                      isBlueRow ? "from-blue-500 to-purple-500" : "from-pink-500 to-purple-500"
                    }`}
                  >
                    {member.role}
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 group-hover:scale-105 transition-transform duration-300 ${
                        isBlueRow
                          ? "border-gradient-to-br from-blue-400 via-purple-400 to-pink-400"
                          : "border-gradient-to-br from-pink-400 via-purple-400 to-blue-400"
                      }`}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        loading="lazy"
                        sizes="128px"
                        className={member.imageObjectClassName}
                      />
                    </div>
                    <h3
                      className={`text-2xl font-bold text-gray-900 mb-1 mt-2 transition-colors duration-200 ${
                        isBlueRow ? "group-hover:text-blue-700" : "group-hover:text-pink-700"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm text-center">{member.shortBio}</p>
                    <div className="mb-0 flex flex-wrap gap-2 justify-center">
                    {/* Colorful badges with icons */}
                    {expertiseForMember(member).map((skill, i) => (
                      <span
                        key={`${member.slug}-tag-${i}-${skill}`}
                        className={
                          `inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ` +
                          (isBlueRow
                            ? [
                                "from-blue-100 to-blue-200 text-blue-800",
                                "from-purple-100 to-purple-200 text-purple-800",
                                "from-pink-100 to-pink-200 text-pink-800",
                                "from-green-100 to-green-200 text-green-800",
                                "from-yellow-100 to-yellow-200 text-yellow-800",
                                "from-red-100 to-red-200 text-red-800",
                              ]
                            : [
                                "from-pink-100 to-pink-200 text-pink-800",
                                "from-purple-100 to-purple-200 text-purple-800",
                                "from-blue-100 to-blue-200 text-blue-800",
                                "from-green-100 to-green-200 text-green-800",
                                "from-yellow-100 to-yellow-200 text-yellow-800",
                                "from-red-100 to-red-200 text-red-800",
                              ]
                          )[i % 6]
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
                            case "Deep Learning": return <FaBrain className="text-base" />;
                            case "MLOps": return <FaCogs className="text-base" />;
                            case "Python": return <FaCode className="text-base" />;
                            case "Model Evaluation": return <FaChartLine className="text-base" />;
                            case "Cloud ML": return <FaCloud className="text-base" />;
                            case "Software Engineering": return <FaCode className="text-base" />;
                            case ".NET": return <FaCode className="text-base" />;
                            case "Microservices": return <FaCogs className="text-base" />;
                            case "Kubernetes": return <FaCloud className="text-base" />;
                            case "Kafka": return <FaChartLine className="text-base" />;
                            case "REST APIs": return <FaCode className="text-base" />;
                            case "Full Stack":
                            case "Full Stack Development":
                            case "Full-Stack Development":
                              return <FaCode className="text-base" />;
                            case "System Design": return <FaCogs className="text-base" />;
                            case "Meta Ads":
                            case "TikTok Ads":
                            case "Amazon PPC":
                            case "Paid Media":
                            case "Creative Strategy":
                            case "Digital Marketing":
                            case "SEO/SEM":
                            case "Social Media Strategy":
                              return <FaChartLine className="text-base" />;
                            default: return <FaStar className="text-base text-yellow-400" />;
                          }
                        })()}
                        {skill}
                      </span>
                    ))}
                  </div>
                  </div>
                </Link>
                <div className="relative z-[5] flex shrink-0 justify-center gap-1 border-t border-gray-100/80 bg-white/40 px-4 py-2.5 backdrop-blur-sm">
                  <a
                    href={socialHref(member.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                      !member.linkedin || member.linkedin === "#" ? "pointer-events-none opacity-35" : ""
                    }`}
                    onClick={(e) => onSocialClick(e, member.linkedin)}
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                  <a
                    href={socialHref(member.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${
                      !member.github || member.github === "#" ? "pointer-events-none opacity-35" : ""
                    }`}
                    onClick={(e) => onSocialClick(e, member.github)}
                    aria-label={`${member.name} on GitHub`}
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                  <a
                    href={socialHref(member.twitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-sky-500 transition-colors hover:bg-sky-50 hover:text-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                      !member.twitter || member.twitter === "#" ? "pointer-events-none opacity-35" : ""
                    }`}
                    onClick={(e) => onSocialClick(e, member.twitter)}
                    aria-label={`${member.name} on X`}
                  >
                    <FaTwitter className="text-2xl" />
                  </a>
                </div>
              </motion.div>
              );
            })}
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
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
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