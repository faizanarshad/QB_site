"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const serviceLinks = [
  { name: "Artificial Intelligence", href: "/ai-solutions" },
  { name: "Computer Vision", href: "/services" },
  { name: "E-commerce", href: "/services" },
  { name: "Robotics", href: "/services" },
];

const companyLinks = [
  { name: "Home", href: "/" },
  { name: "Team", href: "/team" },
  { name: "Careers", href: "/career" },
  { name: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="mb-4">
              <Image
                src="/images/qbrix-logo.png"
                alt="QBrix Solutions"
                width={180}
                height={180}
                className="h-14 w-14 object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Pioneering the future with cutting-edge AI, Machine Learning, Computer Vision, 
              E-commerce, and Robotics & Automation solutions.
            </p>
            <div className="flex space-x-4">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                >
                  {social === "Twitter" && "🐦"}
                  {social === "LinkedIn" && "💼"}
                  {social === "GitHub" && "📚"}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="hover:text-white transition-colors duration-200">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} QBrix Solutions. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 