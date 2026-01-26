"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedHero from "@/components/AnimatedHero";
import { 
  FaRobot, 
  FaEye, 
  FaShoppingCart, 
  FaCogs, 
  FaBrain, 
  FaCode,
  FaArrowRight,
  FaCheck,
  FaStar,
  FaQuoteLeft,
  FaRocket,
  FaLightbulb,
  FaChartLine,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute
} from "react-icons/fa";

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Auto-play service rotation
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Progress bar animation
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const progressInterval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    
    return () => clearInterval(progressInterval);
  }, [isAutoPlaying]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      rotateY: 5,
      rotateX: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const services = [
    {
      title: "Artificial Intelligence",
      subtitle: "Intelligent Automation Solutions",
      description: "Transform your business with cutting-edge AI that learns, adapts, and evolves with your needs.",
      icon: <FaRobot className="text-6xl text-blue-600" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      features: [
        "Machine Learning Models",
        "Neural Networks", 
        "Predictive Analytics",
        "Natural Language Processing",
        "Intelligent Automation",
        "AI-Powered Insights"
      ],
      benefits: [
        "Reduce operational costs by 40%",
        "Improve decision accuracy by 85%",
        "Automate repetitive tasks",
        "Real-time data analysis"
      ],
      image: "/images/ai.jpg",
      stats: { accuracy: "99.5%", speed: "10x faster", efficiency: "85%" }
    },
    {
      title: "Computer Vision",
      subtitle: "Advanced Visual Intelligence",
      description: "Unlock the power of visual data with state-of-the-art computer vision solutions.",
      icon: <FaEye className="text-6xl text-green-600" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      features: [
        "Object Detection & Recognition",
        "Facial Recognition Systems",
        "Quality Control Automation",
        "Video Analytics",
        "Image Processing",
        "Visual Data Mining"
      ],
      benefits: [
        "99.9% detection accuracy",
        "Real-time processing",
        "24/7 automated monitoring",
        "Quality assurance automation"
      ],
      image: "/images/tenweb_media_rau5oqmzb.webp",
      stats: { accuracy: "99.9%", speed: "Real-time", efficiency: "90%" }
    },
    {
      title: "E-commerce Solutions",
      subtitle: "Digital Commerce Excellence",
      description: "Build powerful, scalable e-commerce platforms that drive sales and enhance customer experience.",
      icon: <FaShoppingCart className="text-6xl text-purple-600" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      features: [
        "Custom E-commerce Platforms",
        "Payment Gateway Integration",
        "Inventory Management",
        "Customer Analytics",
        "Mobile Commerce",
        "Multi-channel Selling"
      ],
      benefits: [
        "Increase conversion rates by 60%",
        "Reduce cart abandonment",
        "Streamlined inventory management",
        "Enhanced customer experience"
      ],
      image: "/images/ecomerace.webp",
      stats: { conversion: "60%", speed: "2x faster", efficiency: "75%" }
    },
    {
      title: "Robotics & Automation",
      subtitle: "Industrial Innovation",
      description: "Revolutionize manufacturing with intelligent robotics and automation systems.",
      icon: <FaCogs className="text-6xl text-orange-600" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      features: [
        "Industrial Automation",
        "Smart Manufacturing",
        "IoT Integration",
        "Process Optimization",
        "Quality Control",
        "Predictive Maintenance"
      ],
      benefits: [
        "Increase productivity by 70%",
        "Reduce operational costs",
        "Improve product quality",
        "24/7 automated operations"
      ],
      image: "/images/robotics.webp",
      stats: { productivity: "70%", uptime: "99.9%", efficiency: "80%" }
    },
    {
      title: "Machine Learning",
      subtitle: "Data-Driven Intelligence",
      description: "Harness the power of your data with advanced machine learning models and algorithms.",
      icon: <FaBrain className="text-6xl text-indigo-600" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      features: [
        "Deep Learning Models",
        "Predictive Analytics",
        "Data Mining & Analysis",
        "Model Training & Optimization",
        "Pattern Recognition",
        "Automated Decision Making"
      ],
      benefits: [
        "Predict trends with 90% accuracy",
        "Automate complex decisions",
        "Uncover hidden insights",
        "Optimize business processes"
      ],
      image: "/images/tenweb_media_rrs7lrcfw.webp",
      stats: { accuracy: "90%", speed: "5x faster", efficiency: "85%" }
    },
    {
      title: "Custom Software",
      subtitle: "Tailored Digital Solutions",
      description: "Bespoke software solutions designed specifically for your unique business requirements.",
      icon: <FaCode className="text-6xl text-teal-600" />,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      features: [
        "Enterprise Software",
        "API Development",
        "System Integration",
        "Cloud Solutions",
        "Mobile Applications",
        "Web Applications"
      ],
      benefits: [
        "Streamlined workflows",
        "Improved efficiency",
        "Scalable solutions",
        "Competitive advantage"
      ],
      image: "/images/tenweb_media_srxhumdgj (1).webp",
      stats: { efficiency: "95%", speed: "3x faster", satisfaction: "98%" }
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      content: "QBrix's AI solutions transformed our operations completely. We've seen a 60% increase in efficiency.",
      rating: 5,
      initials: "SJ",
      company: "TechCorp",
      industry: "Technology"
    },
    {
      name: "Michael Chen",
      role: "CEO, InnovateLab",
      content: "The computer vision system they built for us is incredibly accurate and has revolutionized our quality control.",
      rating: 5,
      initials: "MC",
      company: "InnovateLab",
      industry: "Manufacturing"
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director, RetailPlus",
      content: "Our e-commerce platform built by QBrix has increased our online sales by 150% in just 6 months.",
      rating: 5,
      initials: "ER",
      company: "RetailPlus",
      industry: "Retail"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: <FaRocket className="text-2xl" />, color: "from-blue-500 to-purple-500" },
    { number: "50+", label: "Happy Clients", icon: <FaLightbulb className="text-2xl" />, color: "from-green-500 to-blue-500" },
    { number: "99%", label: "Client Satisfaction", icon: <FaStar className="text-2xl" />, color: "from-yellow-500 to-orange-500" },
    { number: "24/7", label: "Support Available", icon: <FaChartLine className="text-2xl" />, color: "from-purple-500 to-pink-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <AnimatedHero 
        headline="Transform Your Business"
        subheadline="With Our Services"
        description="From AI-powered automation to cutting-edge robotics, we deliver innovative solutions that drive growth, efficiency, and competitive advantage."
        primaryAction={{
          text: "Explore Services",
          href: "#services"
        }}
        secondaryAction={{
          text: "Get Free Consultation",
          href: "#contact"
        }}
      />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-block p-4 bg-gradient-to-r ${stat.color} rounded-full mb-4 text-white shadow-lg`}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                  className="text-4xl md:text-5xl font-bold text-blue-600 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Our Core Services
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Comprehensive technology solutions designed to accelerate your business growth and innovation
            </motion.p>
            
            {/* Auto-play Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {isAutoPlaying ? <FaPause /> : <FaPlay />}
                {isAutoPlaying ? 'Pause' : 'Play'} Auto-rotation
              </motion.button>
              
              {/* Progress Bar */}
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Service Cards */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                  onHoverStart={() => setHoveredService(index)}
                  onHoverEnd={() => setHoveredService(null)}
                  onClick={() => setActiveService(index)}
                  className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                    activeService === index 
                      ? 'bg-white shadow-2xl scale-105 border-2 border-blue-200' 
                      : 'bg-white/50 hover:bg-white/80 shadow-lg hover:shadow-xl border border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 rounded-xl bg-gradient-to-r ${service.color} bg-opacity-20`}
                    >
                      {service.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-3">{service.subtitle}</p>
                      <p className="text-gray-700 text-sm">{service.description}</p>
                    </div>
                    <motion.div
                      animate={{ 
                        rotate: activeService === index ? 90 : 0,
                        x: hoveredService === index ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaArrowRight className="text-gray-400" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Service Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="bg-white rounded-2xl shadow-2xl p-8 h-fit border border-gray-100"
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${services[activeService].color} bg-opacity-20 flex items-center justify-center mb-6`}
                >
                  {services[activeService].icon}
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl font-bold text-gray-900 mb-4"
                >
                  {services[activeService].title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-gray-600 mb-6"
                >
                  {services[activeService].description}
                </motion.p>

                {/* Service Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(services[activeService].stats).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                        className="text-center"
                      >
                        <div className="text-2xl font-bold text-blue-600">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">{key}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mb-8"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services[activeService].features.map((feature, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                        className="flex items-center space-x-3"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaCheck className="text-green-500 text-sm" />
                        </motion.div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mb-8"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Benefits</h4>
                  <div className="space-y-3">
                    {services[activeService].benefits.map((benefit, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                        className="flex items-center space-x-3"
                      >
                        <motion.div 
                          animate={pulseAnimation}
                          className="w-2 h-2 bg-blue-500 rounded-full" 
                        />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${services[activeService].color} hover:shadow-lg transition-all duration-200 group`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Started
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <FaArrowRight />
                    </motion.div>
                  </span>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center mb-4"
                >
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.4 + i * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <FaStar className="text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <FaQuoteLeft className="text-3xl text-blue-500 mb-4" />
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-gray-700 mb-6 italic"
                >
                  "{testimonial.content}"
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                  >
                    <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-blue-600 text-xs font-medium">{testimonial.company}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div 
          animate={floatingAnimation}
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={floatingAnimation}
          transition={{ delay: 1.5 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={pulseAnimation}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" 
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-white mb-6"
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
            >
              Join hundreds of successful businesses that have already transformed their operations 
              with our cutting-edge technology solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-200 group inline-flex"
                >
                  <span className="flex items-center gap-2">
                    Start Your Project
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <FaArrowRight />
                    </motion.div>
                  </span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 inline-flex"
                >
                  Schedule Consultation
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage; 