"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaArrowLeft, FaUpload, FaCheck, FaTimes, FaUser, FaEnvelope, FaPhone, FaBriefcase, FaGraduationCap, FaFileAlt } from "react-icons/fa";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  resume: File | string | null;
}

const JobApplicationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  
  const [job, setJob] = useState<JobPosition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ApplicationData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    coverLetter: "",
    resume: null,
  });
  const [errors, setErrors] = useState<Partial<ApplicationData>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const jobs = await response.json();
          const selectedJob = jobs.find((j: JobPosition) => j.id === jobId);
          if (selectedJob) {
            setJob(selectedJob);
            setFormData(prev => ({ ...prev, position: selectedJob.title }));
          }
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    } else {
      setIsLoading(false);
    }
  }, [jobId]);

  const validateForm = () => {
    const newErrors: Partial<ApplicationData> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required";
    if (!formData.resume) newErrors.resume = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('position', formData.position);
      submitData.append('experience', formData.experience);
      submitData.append('coverLetter', formData.coverLetter);
      if (formData.resume instanceof File) {
        submitData.append('resume', formData.resume);
      }

      const response = await fetch('/api/career', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/career');
        }, 3000);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: undefined }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <FaCheck className="text-white text-3xl" />
            </motion.div>
            <h1 className="text-4xl font-bold text-green-800 mb-4">Application Submitted!</h1>
            <p className="text-xl text-green-600 mb-8">Thank you for your interest. We'll get back to you soon!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/career')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Back to Careers
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" 
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft />
            Back to Careers
          </motion.button>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Apply for Position
          </motion.h1>
          
          {job && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
              <p className="text-white/80 mb-4">{job.department} • {job.location} • {job.type}</p>
              <p className="text-white/90">{job.description}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Application Form</h2>
              <p className="text-blue-100">Tell us about yourself and why you'd be a great fit!</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <FaUser className="text-blue-500" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.name ? 'border-red-500' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <FaTimes />
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <FaEnvelope className="text-blue-500" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <FaTimes />
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <FaPhone className="text-blue-500" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, phone: e.target.value }));
                      setErrors(prev => ({ ...prev, phone: undefined }));
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <FaTimes />
                      {errors.phone}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <FaGraduationCap className="text-blue-500" />
                    Years of Experience *
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, experience: e.target.value }));
                      setErrors(prev => ({ ...prev, experience: undefined }));
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.experience ? 'border-red-500' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    placeholder="e.g., 3+ years"
                  />
                  {errors.experience && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <FaTimes />
                      {errors.experience}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Position */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                  <FaBriefcase className="text-blue-500" />
                  Position *
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, position: e.target.value }));
                    setErrors(prev => ({ ...prev, position: undefined }));
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.position ? 'border-red-500' : 'border-gray-200 hover:border-blue-300'
                  }`}
                  placeholder="Enter the position you're applying for"
                />
                {errors.position && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <FaTimes />
                    {errors.position}
                  </motion.p>
                )}
              </motion.div>

              {/* Resume Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                  <FaUpload className="text-blue-500" />
                  Resume/CV *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className={`block w-full px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                      errors.resume ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="text-center">
                      <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                      <p className="text-gray-600">
                        {formData.resume ? (
                          <span className="text-green-600 font-semibold">
                            ✓ {formData.resume instanceof File ? formData.resume.name : (typeof formData.resume === 'string' ? formData.resume : '')}
                          </span>
                        ) : (
                          "Click to upload your resume (PDF, DOC, DOCX)"
                        )}
                      </p>
                    </div>
                  </label>
                </div>
                {errors.resume && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <FaTimes />
                    {typeof errors.resume === "string" ? errors.resume : ""}
                  </motion.p>
                )}
              </motion.div>

              {/* Cover Letter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                  <FaFileAlt className="text-blue-500" />
                  Cover Letter *
                </label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, coverLetter: e.target.value }));
                    setErrors(prev => ({ ...prev, coverLetter: undefined }));
                  }}
                  rows={6}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                    errors.coverLetter ? 'border-red-500' : 'border-gray-200 hover:border-blue-300'
                  }`}
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                />
                {errors.coverLetter && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <FaTimes />
                    {errors.coverLetter}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-center"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Submitting...
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobApplicationPage; 