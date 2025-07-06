"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Manufacturing: A Complete Guide",
      excerpt: "Discover how artificial intelligence is revolutionizing manufacturing processes and what it means for the industry.",
      category: "AI & ML",
      date: "March 15, 2024",
      readTime: "8 min read",
      image: "🏭",
      author: "Dr. Sarah Chen",
    },
    {
      id: 2,
      title: "Building Scalable E-commerce Platforms with AI",
      excerpt: "Learn how to integrate AI-powered recommendations and automation into your e-commerce platform.",
      category: "E-commerce",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "🛒",
      author: "Lisa Thompson",
    },
    {
      id: 3,
      title: "Computer Vision Applications in Healthcare",
      excerpt: "Exploring the latest developments in medical imaging and diagnostic AI systems.",
      category: "Computer Vision",
      date: "March 5, 2024",
      readTime: "10 min read",
      image: "🏥",
      author: "Dr. Emily Watson",
    },
    {
      id: 4,
      title: "Robotics Automation: From Theory to Implementation",
      excerpt: "A practical guide to implementing robotics automation in industrial settings.",
      category: "Robotics",
      date: "February 28, 2024",
      readTime: "12 min read",
      image: "🤖",
      author: "David Kim",
    },
    {
      id: 5,
      title: "Machine Learning Model Deployment Best Practices",
      excerpt: "Essential strategies for deploying ML models in production environments.",
      category: "AI & ML",
      date: "February 20, 2024",
      readTime: "7 min read",
      image: "📊",
      author: "Alex Johnson",
    },
    {
      id: 6,
      title: "The Rise of Edge Computing in AI Applications",
      excerpt: "How edge computing is enabling real-time AI processing and what it means for the future.",
      category: "Technology",
      date: "February 15, 2024",
      readTime: "9 min read",
      image: "⚡",
      author: "Michael Rodriguez",
    },
  ];

  const categories = ["All", "AI & ML", "E-commerce", "Computer Vision", "Robotics", "Technology"];

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
              Our Blog
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Insights, trends, and expert perspectives on AI, technology, and innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="text-6xl mb-6 text-center">{post.image}</div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">By {post.author}</span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Read More
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter for the latest insights on AI, technology, and innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage; 