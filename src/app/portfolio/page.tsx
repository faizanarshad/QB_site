"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedHero from "@/components/AnimatedHero";
import { portfolioProjects } from "@/data/portfolioProjects";
import { SITE_STATS } from "@/lib/siteStats";

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "healthcare", label: "Healthcare & BI" },
    { id: "ai", label: "AI & ML" },
    { id: "data", label: "Data & Analytics" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header />

      <AnimatedHero
        headline="Our Portfolio"
        subheadline="Showcasing Innovation"
        description="Product-grade systems across healthcare BI, voice AI, RAG, analytics, and more — with measurable outcomes."
        primaryAction={{
          text: "View Projects",
          onClick: () => {
            document.getElementById("projects-grid")?.scrollIntoView({ behavior: "smooth" });
          },
        }}
        secondaryAction={{
          text: "Contact Us",
          href: "/contact",
        }}
        illustrationUrl="/images/portfolio-hero.webp"
        illustrationAlt="AI engineer working across multiple monitors showing dashboards, code, ML pipelines and cloud architecture"
        illustrationWide
        illustrationObjectFit="cover"
      />

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

      <section id="projects-grid" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 group"
              >
                {/* Screenshot preview — shown when the project has an image */}
                {project.image ? (
                  <div className={`relative w-full h-52 overflow-hidden shrink-0 ${project.imageTheme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      quality={95}
                    />
                    {/* Bottom gradient — adapts to image theme */}
                    <div className={`absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${
                      project.imageTheme === "light"
                        ? "from-white/80 to-transparent"
                        : "from-gray-900/60 to-transparent"
                    }`} />
                    {/* Emoji badge */}
                    <span
                      className={`absolute bottom-3 left-3 text-xl rounded-full w-9 h-9 flex items-center justify-center shadow-lg ${
                        project.imageTheme === "light" ? "bg-white border border-gray-200" : "bg-white/90"
                      }`}
                      aria-hidden
                    >
                      {project.emoji}
                    </span>
                    {/* Category pill */}
                    <span className={`absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      project.imageTheme === "light"
                        ? "bg-blue-600/90 text-white"
                        : "bg-black/50 backdrop-blur-sm text-white border border-white/20"
                    }`}>
                      {project.category === "data" ? "Data & Analytics" : project.category === "healthcare" ? "Healthcare" : "AI & ML"}
                    </span>
                  </div>
                ) : (
                  /* Fallback: large emoji for projects without screenshots */
                  <div className="pt-8 pb-2 text-center">
                    <span className="text-6xl" aria-hidden>{project.emoji}</span>
                  </div>
                )}

                <div className={`flex flex-col flex-1 ${project.image ? "p-6" : "px-8 pb-8"}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-blue-700 font-medium mb-3 line-clamp-2">
                    {project.subtitle}
                  </p>
                  <p className="text-gray-600 mb-5 text-sm leading-relaxed flex-1">
                    {project.summary}
                  </p>

                  <div className="mb-5">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">
                      Stack highlights
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 ? (
                        <span className="text-xs text-gray-500 self-center">
                          +{project.technologies.length - 5} more
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="block w-full text-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View project
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

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
              { number: SITE_STATS.projectsCompleted, label: "Projects Completed" },
              { number: SITE_STATS.happyClients, label: "Happy Clients" },
              { number: SITE_STATS.clientSatisfaction, label: "Client Satisfaction" },
              { number: SITE_STATS.supportAvailable, label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Let&apos;s create something amazing together. Our team is ready to
              bring your vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
