"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ImageExample = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            How to Add Images
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are examples of how to add images to your QBrik Solutions website
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example 1: Hero/Background Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hero Image</h3>
            <div className="relative h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-500">Place hero image here</p>
              {/* Example usage:
              <Image
                src="/images/hero/hero-bg.jpg"
                alt="QBrik Solutions Hero"
                fill
                className="object-cover rounded-lg"
                priority
              />
              */}
            </div>
            <p className="text-sm text-gray-600">
              Use for background images, hero sections, and large banners
            </p>
          </motion.div>

          {/* Example 2: Service Icons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Service Icons</h3>
            <div className="relative w-24 h-24 mx-auto bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-500 text-xs">Icon</p>
              {/* Example usage:
              <Image
                src="/images/icons/ai-icon.svg"
                alt="AI Icon"
                fill
                className="object-contain"
              />
              */}
            </div>
            <p className="text-sm text-gray-600">
              Use for service icons, feature icons, and small graphics
            </p>
          </motion.div>

          {/* Example 3: Team Photos */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Team Photos</h3>
            <div className="relative w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              <p className="text-gray-500 text-xs">Photo</p>
              {/* Example usage:
              <Image
                src="/images/team/sarah-chen.jpg"
                alt="Dr. Sarah Chen"
                fill
                className="object-cover rounded-full"
              />
              */}
            </div>
            <p className="text-sm text-gray-600">
              Use for team member photos, profile pictures, and avatars
            </p>
          </motion.div>

          {/* Example 4: Portfolio Images */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio Images</h3>
            <div className="relative h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-500 text-xs">Project Image</p>
              {/* Example usage:
              <Image
                src="/images/portfolio/project-1.jpg"
                alt="AI Manufacturing Project"
                fill
                className="object-cover rounded-lg"
              />
              */}
            </div>
            <p className="text-sm text-gray-600">
              Use for project screenshots, case study images, and portfolio items
            </p>
          </motion.div>

          {/* Example 5: Blog Images */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Blog Images</h3>
            <div className="relative h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-500 text-xs">Blog Image</p>
              {/* Example usage:
              <Image
                src="/images/blog/ai-manufacturing.jpg"
                alt="AI in Manufacturing"
                fill
                className="object-cover rounded-lg"
              />
              */}
            </div>
            <p className="text-sm text-gray-600">
              Use for blog post featured images and article illustrations
            </p>
          </motion.div>

          {/* Example 6: Logo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Company Logo</h3>
            <div className="relative w-32 h-16 mx-auto bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-500 text-xs">Logo</p>
              {/* Example usage:
              <Image
                src="/images/logo.png"
                alt="QBrik Solutions Logo"
                fill
                className="object-contain"
              />
              */}
            </div>
            <p className="text-sm text-gray-600">
              Use for company logo, brand elements, and navigation
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageExample; 