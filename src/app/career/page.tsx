"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedHero from "@/components/AnimatedHero";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const CareerPage = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [jobOpenings, setJobOpenings] = useState<JobPosition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch job openings from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const jobs = await response.json();
          setJobOpenings(jobs);
        } else {
          // Fallback to hardcoded data if API fails
          setJobOpenings(fallbackJobOpenings);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to hardcoded data if API fails
        setJobOpenings(fallbackJobOpenings);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Open application form for a specific job
  const openApplicationForm = (job: JobPosition) => {
    router.push(`/career/apply?jobId=${job.id}`);
  };

  // Fallback job data if API fails
  const fallbackJobOpenings: JobPosition[] = [
    {
      id: "1",
      title: "Senior Machine Learning Engineer",
      department: "AI & ML",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "5+ years",
      description: "Join our AI team to develop cutting-edge machine learning models and algorithms.",
      requirements: [
        "Strong Python programming skills",
        "Experience with TensorFlow/PyTorch",
        "Knowledge of deep learning architectures",
        "Experience with model deployment",
      ],
      isActive: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Computer Vision Engineer",
      department: "Computer Vision",
      location: "On-site",
      type: "Full-time",
      experience: "3+ years",
      description: "Develop computer vision solutions for industrial and commercial applications.",
      requirements: [
        "Expertise in OpenCV and image processing",
        "Experience with object detection models",
        "Knowledge of deep learning frameworks",
        "Background in computer vision algorithms",
      ],
      isActive: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Full-Stack Developer",
      department: "E-commerce",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Build scalable e-commerce platforms and web applications.",
      requirements: [
        "Proficiency in React/Next.js",
        "Experience with Node.js and databases",
        "Knowledge of cloud platforms (AWS/Azure)",
        "Understanding of e-commerce systems",
      ],
      isActive: true,
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Robotics Engineer",
      department: "Robotics",
      location: "On-site",
      type: "Full-time",
      experience: "4+ years",
      description: "Design and implement robotics automation solutions for manufacturing.",
      requirements: [
        "Experience with industrial robotics",
        "Knowledge of automation systems",
        "Programming skills (Python/C++)",
        "Understanding of IoT and sensors",
      ],
      isActive: true,
      order: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Data Scientist",
      department: "AI & ML",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "3+ years",
      description: "Analyze data and develop predictive models for business insights.",
      requirements: [
        "Strong statistical analysis skills",
        "Experience with data visualization",
        "Knowledge of ML algorithms",
        "Proficiency in Python/R",
      ],
      isActive: true,
      order: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "6",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Manage infrastructure and deployment pipelines for our applications.",
      requirements: [
        "Experience with Docker and Kubernetes",
        "Knowledge of cloud platforms",
        "CI/CD pipeline expertise",
        "Infrastructure as Code skills",
      ],
      isActive: true,
      order: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const departments = [
    { id: "all", label: "All Departments" },
    { id: "AI & ML", label: "AI & Machine Learning" },
    { id: "Computer Vision", label: "Computer Vision" },
    { id: "E-commerce", label: "E-commerce" },
    { id: "Robotics", label: "Robotics" },
    { id: "Engineering", label: "Engineering" },
  ];

  const benefits = [
    {
      icon: "🏠",
      title: "Flexible Work",
      description: "Remote work options and flexible hours",
    },
    {
      icon: "📚",
      title: "Learning Budget",
      description: "Annual budget for courses and conferences",
    },
    {
      icon: "🏥",
      title: "Health Insurance",
      description: "Comprehensive health and dental coverage",
    },
    {
      icon: "🎯",
      title: "Career Growth",
      description: "Clear career progression and mentorship",
    },
    {
      icon: "🎉",
      title: "Team Events",
      description: "Regular team building and social events",
    },
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Attractive compensation packages",
    },
  ];

  const filteredJobs = activeFilter === "all" 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <AnimatedHero
        headline="Join Our Team"
        subheadline="Build The Future With Us"
        description="Join a dynamic team of innovators and problem-solvers. We're looking for talented individuals who are passionate about technology and making a difference."
        primaryAction={{
          text: "View Open Positions",
          onClick: () => {
            const jobsSection = document.getElementById('job-openings');
            if (jobsSection) {
              jobsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        secondaryAction={{
          text: "Learn About Culture",
          onClick: () => {
            const cultureSection = document.getElementById('company-culture');
            if (cultureSection) {
              cultureSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        illustrationUrl="/images/career-hero.webp"
      />

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a supportive environment where you can grow, learn, and make a real impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="job-openings" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our current job openings and find your next opportunity
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <motion.button
                key={dept.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(dept.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  activeFilter === dept.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {dept.label}
              </motion.button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading job openings...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No job openings found for this department.</p>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openApplicationForm(job)}
                    className="mt-4 lg:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Apply Now
                  </motion.button>
                </div>
                
                <p className="text-gray-600 mb-6">{job.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req) => (
                      <li key={req} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))
            )}
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
              Don't See the Right Fit?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200"
            >
              Send Your Resume
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Job Application Form */}
      {/* This section is removed as per the edit hint to remove JobApplicationForm */}

      <Footer />
    </div>
  );
};

export default CareerPage; 